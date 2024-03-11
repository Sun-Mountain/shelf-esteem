'use client';

import { FC } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "@components/UI/Button";
import TextField from "@components/UI/TextField";

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUpForm: FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<SignUpFormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: ''
    },
    mode: 'all'
  });

  const onSubmit = async (data: SignUpFormValues) => {
    console.log(data);
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <TextField
            {...register('username', { required: 'Username is required' })}
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
            label="Username"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="input-container">
          <TextField
            {...register('email', { required: 'Email is required' })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            label="Email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-container">
          <TextField
            {...register('password', { required: 'Password is required' })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            label="Password"
            placeholder="Enter your password"
            required
            type="password"
          />
        </div>
        <div className="input-container">
          <TextField
            {...register('passwordConfirm', {
              required: 'Password confirmation is required',
              validate: (value) => value === getValues('password') || 'Passwords do not match'
            })}
            error={Boolean(errors.passwordConfirm)}
            helperText={errors.passwordConfirm?.message}
            label="Confirm Password"
            placeholder="Confirm your password"
            required
            type="password"
          />
        </div>
      </form>
    </div>
  )
}

export default SignUpForm;