import Link from "next/link"

const Footer = () => {
  return (
    <footer>
      <div id="footer-content">
        <Link href="/tos">
          Terms of Service
        </Link>
      </div>
    </footer>
  )
}

export default Footer