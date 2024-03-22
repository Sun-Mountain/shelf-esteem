'use client';
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Link from 'next/link';
import { NavigateNext } from "@mui/icons-material";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {

  const links = [
    <Link key="1" href="/">
      Home
    </Link>
  ]

  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
    >
      {links}
    </Breadcrumbs>
  )
}

export default Breadcrumbs