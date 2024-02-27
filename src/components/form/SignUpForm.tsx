'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Notification from '@/components/Notification';

const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    Notification({
      message: 'Loading...',
      toastId: 'sign-up-loading',
    })

    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const msg = await response.json();

    Notification({ type: 'dismiss' })

    if (response.ok) {
      router.push('/sign-in');
      Notification({
        type: 'success',
        message: 'Registration successful. Sign in to continue.',
        toastId: 'sign-up-toast',
      });
    } else {
      Notification({
        type: 'error',
        message: msg.error,
        toastId: 'sign-up-toast'
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <div className="form-container account-form">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="form-wrapper">
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel id='username-label'>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='johndoe' data-testid='username-field' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='mail@example.com' data-testid='email-field' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Enter your password'
                        data-testid='password-field'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Re-Enter your password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Re-Enter your password'
                        type='password'
                        data-testid='confirm-password-field'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='button-container'>
              <Button type='submit' data-testid='submit-button'>
                Sign up
              </Button>
            </div>
          </form>
          <div>
            or
          </div>
          <div>
            If you have an account, please&nbsp;
            <Link href='/sign-in'>
              Sign in
            </Link>
          </div>
        </div>
      </Form>
    </>
  );
};

export default SignUpForm;
