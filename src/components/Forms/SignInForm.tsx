'use client';
import {
  Controller,
  FormProvider,
  useForm
} from 'react-hook-form';
import Button from '@/components/UI/Button';
import TextInput from '@/components/UI/TextInput';

interface SignInFormValues {
  email: string;
  password: string;
}

const SignInForm = () => {
  const methods = useForm<SignInFormValues>()
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
        <Button type='submit'>
          Sign In
        </Button>
      </FormProvider>
    </div>
  )
};

export default SignInForm;