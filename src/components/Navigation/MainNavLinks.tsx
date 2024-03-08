import Link from "next/link";
import { Home } from "@mui/icons-material";

const NavLinks = () => {
  return (
    <>
      <Link href="/">
        Home
      </Link>
      <Link href="/sign-in">
        Sign In
      </Link>
    </>
  )
}

export default NavLinks;