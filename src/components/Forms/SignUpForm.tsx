'use client';
import {
  Controller,
  FormProvider,
  useForm
} from 'react-hook-form';
import Button from '@/components/UI/Button';
import TextInput from '@/components/UI/TextInput';

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUpForm () {
  const methods = useForm<SignUpFormValues>()
  const {
    control,
    formState: { errors, isDirty, isValid },
    handleSubmit
  } = methods;

  return (
    <div className='form-container'>
      <FormProvider {...methods} >

        <div className='input-container'>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <TextInput
                {...field}
                id="username"
                label="Username"
                required
              />
            )}
          />
        </div>
        <div className='input-container'>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextInput
                {...field}
                id="email"
                label="Email"
                required
              />
            )}
          />
        </div>
        <div className='input-container'>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextInput
                {...field}
                id="password"
                label="Password"
                type="password"
                required
              />
            )}
          />
        </div>
        <div className='input-container'>
          <Controller
            control={control}
            name="password-confirm"
            render={({ field }) => (
              <TextInput
                {...field}
                id="password-confirm"
                label="Confirm Password"
                type="password"
                required
              />
            )}
          />
        </div>
        <Button type='submit'>
          Sign Up
        </Button>
      </FormProvider>
    </div>
  )
};