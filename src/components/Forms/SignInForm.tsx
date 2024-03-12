'use client';

import { FC } from "react";
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Controller, FormProvider, useForm } from "react-hook-form";
import Button from "@components/UI/Button";
import FormTextField from "@components/UI/FormTextField";

interface SignInFormValues {
  email: string;
  password: string;
}

const SignInForm:FC = () => {
  const router = useRouter();
  const methods = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {

    const response = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    
    if (response.error) {
      console.log('Sign in failed.')
    } else {
      router.refresh();
      router.push('/');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
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
          <Button type="submit">Sign In</Button>
        </FormProvider>
      </form>
    </div>
  )
}

export default SignInForm