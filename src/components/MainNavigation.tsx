import Link from 'next/link';
import { AutoStoriesTwoTone } from '@mui/icons-material';

const MainNavigation = () => {
  return (
    <nav>
      <div id="main-navigation">
        <div className="icon-container">
          <Link href='/'>
            <AutoStoriesTwoTone className="icon" />
          </Link>
        </div>
      </div>
    </nav>
  )
};

export default MainNavigation;