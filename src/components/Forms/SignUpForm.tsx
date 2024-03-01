'use client';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '@/components/UI/Button';
import TextInput from '@/components/UI/TextInput';

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUpForm: FC = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<SignUpFormValues>({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  } as SignUpFormValues);
  const { handleSubmit } = useForm<SignUpFormValues>();

  const submitForm = async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(formValues),
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
    <div className='form-container'>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className='input-container'>
          <TextInput
            defaultValue={formValues.username}
            id="username"
            label="Username"
            onChange={(e) => setFormValues({ ...formValues, username: e.target.value })}
            required
          />
        </div>
        <div className='input-container'>
          <TextInput
            defaultValue={formValues.email}
            id="email"
            label="Email"
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
            required
          />
        </div>
        <div className='input-container'>
          <TextInput
            defaultValue={formValues.password}
            id="password"
            label="Password"
            onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
            required
            type="password"
          />
        </div>
        <div className='input-container'>
          <TextInput
            defaultValue={formValues.passwordConfirm}
            id="password-confirm"
            label="Confirm Password"
            onChange={(e) => setFormValues({ ...formValues, passwordConfirm: e.target.value })}
            type="password"
            required
          />
        </div>
        <Button type='submit'>
          Sign Up
        </Button>
      </form>
    </div>
  )
};

export default SignUpForm;