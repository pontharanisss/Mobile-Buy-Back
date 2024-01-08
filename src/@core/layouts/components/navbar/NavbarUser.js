// ** Dropdowns Imports
import UserDropdown from "./UserDropdown"

// ** Third Party Components
import { Sun, Moon } from "react-feather"

// ** Reactstrap Imports
import { NavItem, NavLink } from "reactstrap"  
const NavbarUser = (props) => {
  // ** Props
  const { skin, setSkin } = props 
  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === "dark") {
      return <Sun className="ficon" onClick={() => setSkin("light")} />
    } else {
      return <Moon className="ficon" onClick={() => setSkin("dark")} />
    }
  }
  return ( 
    <>
       <div className="align-items-center" style={{ display: 'flex', fontSize: '22px' }}>
        <span style={{ color: '#9d9d9d' }}>Mobile Buy-Back</span>
      </div> 
      <ul className="nav navbar-nav align-items-center ms-auto">
        <NavItem className="d-none d-lg-block">
          <NavLink className="nav-link-style">
            <ThemeToggler />
          </NavLink>
        </NavItem>
        <NavItem className="d-none d-lg-block">
          <p className="mb-0" style={{textAlign: 'right', fontWeight: '600'}}>Admin</p>
          <p className="mb-0">06/01/2024, 10:30 AM</p>
        </NavItem>
        <UserDropdown />
      </ul>
    </>
  )
}
export default NavbarUser
