import { FC, ReactNode } from 'react';
import { Button } from './ui/Button';

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = () => console.log('login with google');

  return (
    <Button onClick={loginWithGoogle}>
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
