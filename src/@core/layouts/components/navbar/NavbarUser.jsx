// ** Dropdowns Imports
import IntlDropdown from './IntlDropdown'
import CartDropdown from './CartDropdown'
import UserDropdown from './UserDropdown'
import NavbarSearch from './NavbarSearch'
import NotificationDropdown from './NotificationDropdown'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'
// ** Third Party Components
import { Sun, Moon } from 'react-feather'

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap'
import Show from '@src/utility/Show'
import { Permissions } from '@src/utility/Permissions'
import { getPath } from '@src/router/RouteHelper'

const NavbarUser = (props) => {
  // ** Props
  const { skin, setSkin } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <ul className='nav navbar-nav align-items-center ms-auto'>
      {/* <IntlDropdown /> */}
      {/* <NavItem className='d-none d-lg-block'>
        <NavLink className='nav-link-style'>
          <ThemeToggler />
        </NavLink>
      </NavItem> */}
      {/* <NavbarSearch />
      <CartDropdown />*/}
      <NotificationDropdown />
      <UserDropdown />
    </ul>
  )
}
export default NavbarUser
