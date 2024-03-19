'use client';

import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "@components/UI/Button";
import FormTextField from "@components/UI/FormTextField";

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUpForm:FC = () => {
  const router = useRouter();

  const methods = useForm<SignUpFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    }
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    const JsonData = JSON.stringify(data);
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JsonData,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      router.push('/sign-in');
    } else {
      console.log('Registration failed.')
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <div className="input-container">
            <FormTextField
              name="username"
              label="Username"
              required={true}
            />
          </div>
          <div className="input-container">
            <FormTextField
              label="Email"
              name="email"
              required={true}
            />
          </div>
          <div className="input-container">
            <FormTextField
              label="Password"
              name="password"
              required={true}
              type="password"
            />
          </div>
          <div className="input-container">
            <FormTextField
              label="Confirm Password"
              name="passwordConfirm"
              required={true}
              type="password"
            />
          </div>
          <Button type="submit">Sign Up</Button>
        </FormProvider>
      </form>
    </div>
  )
}

export default SignUpForm;