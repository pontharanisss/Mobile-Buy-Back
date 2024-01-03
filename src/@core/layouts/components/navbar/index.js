// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
import NavbarBookmarks from './NavbarBookmarks'
import {
  NavItem,
  NavLink
} from 'reactstrap'
import * as Icon from 'react-feather'
const ThemeNavbar = props => {
  // ** Props
  // setMenuVisibility
  const { skin, setSkin, setMenuVisibility  } = props

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
      {/* <Fragment> */}
      <ul className='navbar-nav d-xl-none'>
        <NavItem className='mobile-menu me-auto'>
          <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
            <Icon.Menu className='ficon' />
          </NavLink>
        </NavItem>
      </ul>
        {/* <NavbarBookmarks setMenuVisibility={setMenuVisibility} /> */}
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
