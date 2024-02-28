'use client';
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import Button from '@/components/UI/Button';
import TextInput from '@/components/UI/TextInput';

interface SignInFormValues {
  email: string;
  password: string;
}

const SignInForm = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<SignInFormValues>({
    email: '',
    password: ''
  } as SignInFormValues);

  const { handleSubmit } = useForm<SignInFormValues>();

  const submitForm = async () => {
    const response = await signIn('credentials', {
      redirect: false,
      email: formValues.email,
      password: formValues.password,
    });
    
    if (response.error) {
      console.log('Sign in failed.')
    } else {
      router.refresh();
      router.push('/');
    }
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className='input-container'>
          <TextInput
            id="email"
            label="Email"
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
            required
          />
        </div>
        <div className='input-container'>
          <TextInput
            id="password"
            label="Password"
            onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
            required
            type="password"
          />
        </div>
        <Button type='submit'>
          Sign In
        </Button>
      </form>
    </div>
  )
};

export default SignInForm;