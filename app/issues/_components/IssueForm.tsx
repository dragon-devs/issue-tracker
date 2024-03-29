'use client'
import {Button, TextField} from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {issueSchema} from "@/app/validationSchema";
import {z} from 'zod';
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import {Issue} from "@prisma/client";
import SimpleMDE from 'react-simplemde-editor';
import toast, {Toaster} from "react-hot-toast";

// getting the values from the zod validation
type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = ({issue}: { issue?: Issue }) => {
  const router = useRouter();
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  });
  const [isSubmiting, setIsSubmiting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmiting(true)
      if (issue){
        await axios.patch('/api/issues/' + issue.id, data)
        toast.success('issue is successfully updated.');
      } else{
        await axios.post('/api/issues', data);
        toast.success('issue is successfully created.');
      }
      router.push('/issues/list')
      router.refresh()
      setIsSubmiting(false)
    } catch (error) {
      setIsSubmiting(false)
      toast.error('An unexpected error occurred.');
    }
  });

  return (
      <div className="max-w-xl ">
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
        <Toaster />
      </div>

  );
};

export default IssueForm;
