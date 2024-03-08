import Link from 'next/link';
import { AutoStoriesTwoTone } from '@mui/icons-material';

const MainNavigation = async () => {

  return (
    <nav>
      <div id="main-navigation">
        <div className="icon-container">
          <Link href="/">
            <div className="home-icon">
              <AutoStoriesTwoTone className="icon" />
            </div>
          </Link>
        </div>
        <div className='nav-link-group'>
          <div>
            <Link href='/about'>
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
};

export default MainNavigation;