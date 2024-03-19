import Link from "next/link";
import SignUpForm from "@components/Forms/SignUpForm";

const AuthSignUp = () => {
  return (
    <section>
      <h1>Sign Up</h1>
      <SignUpForm />
      <div className='auth-links-container'>
        Already have an account? <Link href='/sign-in'>Sign in here</Link>
      </div>
    </section>
  )
}

export default AuthSignUp;