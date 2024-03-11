'use client';

import { FC } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "@components/UI/Button";

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUpForm = () => {

  const { handleSubmit } = useForm<SignUpFormValues>();

  const onSubmit = async (data: SignUpFormValues) => {
    console.log(data);
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm;