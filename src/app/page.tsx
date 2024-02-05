import Link from "next/link";
import Notice from "@/components/Notice";

export default function Home() {
  return (
    <>
      <section id="home-title">      
        <h1>Welcome to Shelf Esteem!</h1>
        <div>The library cateloging web app.</div>
        <Notice>
          <strong>Shelf Esteem Disclaimer:</strong> This was made as a personal coding project and is not intended for commercial use. Third-party integration is subject to their terms. Shelf Esteem does not endorse specific content, and external information accuracy is not guaranteed. The disclaimer may change, so users are urged to review periodically. For more information, <Link href="/tos">please read the terms of service</Link>.
        </Notice>
      </section>
    </>
  );
}
