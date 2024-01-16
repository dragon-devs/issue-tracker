'use client'
import {Button, Callout, Text, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {MdCheckCircle, MdError} from "react-icons/md";
import {zodResolver} from "@hookform/resolvers/zod";
import {createIssueSchema} from "@/app/validationSchema";
import {z} from 'zod';
import ErrorMessage from "@/app/components/ErrorMessage";


// getting the values from the zod validation
type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
            onSubmit={handleSubmit(async (data) => {
              try {
                await axios.post('/api/issues', data);
                setSuccess('issue is successfully created.');
              } catch (error) {
                setError('An unexpected error occurred.');
              }
            })}
        >
          <TextField.Root>
            <TextField.Input placeholder="Title" {...register('title')}/>
          </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller
              name="description"
              control={control}
              render={({field}) => <SimpleMDE placeholder="Description" {...field}/>}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
          <Button>Submit New Issue</Button>
        </form>
      </div>

  );
};

export default NewIssuePage;
