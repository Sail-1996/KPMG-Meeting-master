// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Button } from 'reactstrap'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from '@utils'

// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/not-authorized.svg'
import illustrationsDark from '@src/assets/images/pages/not-authorized-dark.svg'
import { ReactComponent as AppLogo } from '@@assets/images/logo/logo.svg'

// ** Styles
import '@styles/base/pages/page-misc.scss'
import themeConfig from '@src/configs/themeConfig'
import Shimmer from '../components/shimmers/Shimmer'
import { useAppSelector } from '@src/redux/store'

const NotAuthorized = () => {
  // ** Hooks
  const { skin } = useSkin()

  const appSettings = useAppSelector((state) => state.layout.appSettings)

  // ** Vars
  const user = getUserData()

  const source = skin === 'dark' ? illustrationsDark : illustrationsLight

  return (
    <div className='misc-wrapper'>
      <Link className='brand-logo' to='/'>
        {appSettings?.app_logo ? (
          <img src={appSettings?.app_logo} alt='logo' style={{ height: '30px' }} />
        ) : (
          <Shimmer width={100} height={30} />
        )}
      </Link>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>You are not authorized! 🔐</h2>
          <p className='mb-2'>
            You don't have enough permission to access this page. Please contact your administrator.
          </p>
          <Button tag={Link} color='primary' className='btn-sm-block mb-1' to={'/login'}>
            Back to Login
          </Button>
          <img className='img-fluid' src={source} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default NotAuthorized
