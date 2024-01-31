'use client';

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
import { Input } from '../ui/input';
import { ButtonUI as Button } from '@/components/ui/Button';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
});

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (signInData?.error) {
      console.log(`Sign in failed!`);
    } else {
      router.refresh();
      router.push('/dashboard');
    }
  };

  return (
    <Form {...form}>
      <div className="form-container account-form">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='form-wrapper'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='mail@example.com' {...field} />
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='button-container'>
            <Button type='submit'>
              Sign in
            </Button>
          </div>
        </form>
        <div>
          or
        </div>
        {/* <GoogleSignInButton>Sign in with Google</GoogleSignInButton> */}
        <div>
          If you don&apos;t have an account, please&nbsp;
          <Link href='/sign-up'>
            Sign up
          </Link>
        </div>
      </div>
    </Form>
  );
};

export default SignInForm;
