import Link from "next/link";
import SignInForm from "@/components/Forms/SignInForm";

const AuthSignIn = () => {
  return (
    <section>
      <h1>Sign In</h1>
      <SignInForm />
      <div className='auth-links-container'>
        Do not have an account? <Link href='/sign-up'>Sign up here</Link>
      </div>
    </section>
  )
}

export default AuthSignIn;