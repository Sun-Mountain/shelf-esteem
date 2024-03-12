'use client';

import { FC } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "@components/UI/Button";
import FormTextField from "@components/UI/FormTextField";

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUpForm = () => {

  const methods = useForm<SignUpFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    }
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    // handle form submission
    console.log(data)
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <div className="input-container">
            <FormTextField
              name="username"
              label="Username"
            />
          </div>
          <div className="input-container">
            <FormTextField
              label="Email"
              name="email"
            />
          </div>
          <div className="input-container">
            <FormTextField
              label="Password"
              name="password"
              type="password"
            />
          </div>
          <div className="input-container">
            <FormTextField
              label="Confirm Password"
              name="passwordConfirm"
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