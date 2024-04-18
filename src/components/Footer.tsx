import Link from "next/link";
import { IconButton } from "@mui/material";
import { GitHub } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer>
      <div id="footer-content">
        <div className="link-group">
          <Link href="/tos">
            Terms of Service
          </Link>
        </div>
        <div className="link-group">
          <div className="social-group">
            <IconButton href="https://github.com/Sun-Mountain/shelf-esteem" target="_blank" size="large">
              <GitHub />
            </IconButton>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer