'use client'
import {Button, Callout, TextField} from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {MdCheckCircle, MdError} from "react-icons/md";
import {zodResolver} from "@hookform/resolvers/zod";
import {issueSchema} from "@/app/validationSchema";
import {z} from 'zod';
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import {Issue} from "@prisma/client";
import SimpleMDE from 'react-simplemde-editor';

// getting the values from the zod validation
type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = ({issue}: { issue?: Issue }) => {
  const router = useRouter();
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmiting(true)
      if (issue){
        await axios.patch('/api/issues/' + issue.id, data)
        setSuccess('issue is updated created.');
      } else{
        await axios.post('/api/issues', data);
        setSuccess('issue is successfully created.');
      }
      router.push('/issues')
      router.refresh()
      setIsSubmiting(false)
    } catch (error) {
      setIsSubmiting(false)
      setError('An unexpected error occurred.');
    }
  })
  return (
      <div className="max-w-xl ">
        {success && <Callout.Root color="green" className="mb-5">
          <Callout.Icon><MdCheckCircle/></Callout.Icon>
          <Callout.Text>{success}</Callout.Text>
        </Callout.Root>}

        {error && <Callout.Root color="red" className="mb-5">
          <Callout.Icon><MdError/></Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
        <form
            className="space-y-3"
            onSubmit={onSubmit}
        >
          <TextField.Root>
            <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register('title')}/>
          </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller
              name="description"
              control={control}
              defaultValue={issue?.description}
              render={({field}) => <SimpleMDE placeholder="Description" {...field}/>}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
          <Button disabled={isSubmiting}>
            {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
            {isSubmiting && <Spinner/>}
          </Button>
        </form>
      </div>

  );
};

export default IssueForm;
