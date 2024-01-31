import User from "@/components/User";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Notice from "@/components/Notice";


export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div id="home-title">      
        <h1>Welcome to Shelf Esteem!</h1>
        <div>The library cateloging web app.</div>
      </div>
      <Notice>
        <strong>Shelf Esteem Disclaimer:</strong> This was made a personal coding project and is not intended for commercial use. Third-party integration is subject to their terms. Shelf Esteem doesn't endorse specific content, and external information accuracy is not guaranteed. The disclaimer may change, so users are urged to review periodically. For more information, <Link href="/termsofservice">please read the terms of service</Link>.
      </Notice>
    </>
  );
}
