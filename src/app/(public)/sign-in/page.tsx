import Link from "next/link";

const AuthSignIn = () => {
  return (
    <section>
      <h1>Sign In</h1>
      <div className='auth-links-container'>
        Do not have an account? <Link href='/sign-up'>Sign up here</Link>
      </div>
    </section>
  )
}

export default AuthSignIn;