import Link from "next/link";
import { Home } from "@mui/icons-material";

const NavLinks = () => {
  return (
    <>
      <Link className="link-w-icon" href="/">
        Home <Home />
      </Link>
      <Link href="/sign-in">
        Sign In
      </Link>
    </>
  )
}

export default NavLinks;