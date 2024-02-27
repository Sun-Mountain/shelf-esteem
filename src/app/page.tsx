import Link from "next/link";
import Notice from "@/components/Notice";
import UserWelcome from "@/components/UserWelcome";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Button } from '@/components/ui/button';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <section id="home-title">      
        <h1>Welcome to Shelf Esteem!</h1>
        <div>The library cateloging web app.</div>
        <Notice>
          <strong>Shelf Esteem Disclaimer:</strong> This was made as a personal coding project and is not intended for commercial use. Third-party integration is subject to their terms. Shelf Esteem does not endorse specific content, and external information accuracy is not guaranteed. The disclaimer may change, so users are urged to review periodically. For more information, <Link href="/tos">please read the terms of service</Link>.
        </Notice>
      </section>
      <section className="welcome">
        {!session?.user ? (
          <div className="no-user-welcome">
            <div id="new-user">
              <h2>New?</h2>
              <div className="button-container">
                <Button href="/sign-up" testId="sign-up">
                  Sign Up Here
                </Button>
              </div>
              <div className="button-divider">
                - or -
              </div>
              <div className="button-container">
                <Button href="/library">
                  Try It Out
                </Button>
              </div>
            </div>
            <div id="return-user">
              <h2>Returning?</h2>
              <div className="button-container">
                <Button href="/sign-in" testId="sign-in">
                  Sign In Here
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <UserWelcome />
        )}
      </section>
    </>
  );
}
