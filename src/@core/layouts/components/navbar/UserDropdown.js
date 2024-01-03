// ** React Imports
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

// api url
import { api } from '../../../../utility/constants'
// ** Utils
import { getUserData } from '@utils'
// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'

// ** Third Party Components
import { User, Power, RotateCcw } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, 
  Modal, ModalHeader, ModalBody, ModalFooter, Label, Button, FormFeedback } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
// ** Default Avatar Image
import avatarlogo from '@src/assets/images/avatars/profile.png'

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const user = getUserData()
  const navigate = useNavigate()
  // ** State
  // const [userData, setUserData] = useState(null)
  const [oldPassword, setoldPassword] = useState('')
  const [newPassword, setnewPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [logoutDeleteModal, setlogoutDeleteModal] = useState(false)
  const [errors, setErrors] = useState({oldPassword: false,
    validoldpass:false,  
    newPassword: false, 
    validnewpass:false,  
    confirmPassword: false,
    equalconfirmPassword:false, 
    validconfirmpass:false})
  const [changePasswordModal, setchangePasswordModal] = useState(false)
  const [isValid, setIsValid] = useState(false)
    //** ComponentDidMount
  useEffect(() => {
   
      // setUserData(JSON.parse(localStorage.getItem('userData')))
  
  }, [])

  const onBlurEvent = async(e) => {
    console.log(e)
    if (oldPassword !== "") {
      
    const user_id = JSON.parse(localStorage.getItem('userDetails'))
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({userid:user_id.user_id, oldpassword:oldPassword})
    }
    try {
     await fetch(
        `${api.api_url}/login/OldPasswordCheckJwt`,
        requestOptions
      )
        .then((res) => res.json())
        .then((json) => {
          let status = 0
          status = json ? (json.body ? json.body.status : 0) : 0
          if (status === 200) {
            const token = json ? (json.body ? json.body.token : "") : ""
            const listRequestOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ jwtToken: token })
            }
            // OldPassword API call
           fetch(
              `${api.api_url}/login/OldPasswordCheck`,
              listRequestOptions
            )
              .then((res) => res.json())
              .then((json) => {
                let status = 0
                status = json ? (json.body ? json.body.status : 0) : 0
                if (status === false)  setIsValid(true)
                else setIsValid(false)
              })
          }
        })

    } catch (error) {
      console.log(error)
    }
    
  }
  
  }

  const saveAPI = async() => {
    if (isValid) return

    // if(oldPassword == "")
    //   setErrors
    const userId = JSON.parse(localStorage.getItem('userDetails'))
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Authorization': 'Bearer my-token',
      },
      body: JSON.stringify({userid:userId.user_id, password:confirmPassword})
    }
    try {
     await fetch(
        `${api.api_url}/login/ChangePasswordJwt`,
        requestOptions
      )
        .then((res) => res.json())
        .then((json) => {
          let status = 0
          status = json ? (json.body ? json.body.status : 0) : 0
          if (status === 200) {
            const token = json ? (json.body ? json.body.token : "") : ""
            const listRequestOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
                // 'Authorization': 'Bearer my-token',
              },
              body: JSON.stringify({ jwtToken: token })
            }
            // OldPassword API call
           fetch(
              `${api.api_url}/login/ChangePassword`,
              listRequestOptions
            )
              .then((res) => res.json())
              .then((json) => {
                let status = 0
                status = json ? (json.body ? json.body.status : 0) : 0
                if (status === true) {
                  toast.success('Password changed successfully', { duration: 2000, style:{color:'#000', backgroundColor:'#d7d2d2'}})
                }  else  {
                  toast.error('Something went to be wrong', { duration: 2000, style:{color:'#000', backgroundColor:'#d7d2d2'} })               
                  
                }
                setchangePasswordModal(false)

              })
          }
        })

    } catch (error) {
      console.log(error)
    }
  }
  const logout = async() => {
    setlogoutDeleteModal(!logoutDeleteModal)
  }
 
  const handleLogouts = async() => {
    dispatch(handleLogout())
    navigate('/login')
  }
  const handleSubmit = async() => {

    if (newPassword === "" && confirmPassword === "" && oldPassword === "") {
      setErrors({...errors, newPassword:true, confirmPassword:true, oldPassword:true})
    } else if (oldPassword === undefined || oldPassword === "") {
      setErrors({...errors, oldPassword:true})
    } else if (newPassword === undefined || newPassword === "") {
      setErrors({...errors, newPassword:true})
    } else if (confirmPassword === undefined || confirmPassword === "") {
       setErrors({...errors, confirmPassword:true})
    } else if (confirmPassword !== newPassword) {
      setErrors({...errors, equalconfirmPassword:true})
    } else {
      setErrors({...errors, newPassword:false, confirmPassword:false, equalconfirmPassword:false})     
     await saveAPI()
    }
  }

  const passwordchangeevent = (e, passwordname) => {
    console.log(e, passwordname)
    passwordname === "oldPassword" ? setoldPassword(e) : (passwordname === "newPassword" ? setnewPassword(e) : setconfirmPassword(e))
    if (e === "" || e === undefined) {
       passwordname === "oldPassword" ? setErrors({...errors, 
          oldPassword: true, 
          validoldpass:false
        }) : passwordname === "newPassword" ? setErrors({...errors, 
        newPassword: true, 
        validnewpass:false
      }) : setErrors({...errors, 
        confirmPassword: true, 
        validconfirmpass:false
      })
        
    } else {
      passwordname === "oldPassword" ? setErrors({...errors, 
        oldPassword: false, 
        validoldpass:false
      }) : passwordname === "newPassword" ? setErrors({...errors, 
        newPassword: false, 
        validnewpass:false
      }) : setErrors({...errors, 
        confirmPassword: false, 
        validconfirmpass:false
      })
        
    }
  }
  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none' style= {{ marginTop : '5px', fontSize: '17px', textTransform: 'capitalize',  marginLeft : '-5px'}}>  
          <span className='user-name fw-bold'>{(user && user.username) || ''}</span> 
        </div>
        <img className='me-75' src={avatarlogo} alt='Avatar' height='35' width='35' style={{ boxShadow: 'none' }} /> 
      </DropdownToggle>
      <DropdownMenu end> 
         <DropdownItem  style={{display:'flex'}} onClick={() => {
           setoldPassword('')      
           setnewPassword('')
           setconfirmPassword('')    
           setchangePasswordModal(!changePasswordModal)
           setErrors({...errors, newPassword:false, confirmPassword:false, oldPassword:false, equalconfirmPassword:false})
         }        

        }>
          <RotateCcw size={14} className='me-75' />
          <span className='align-middle'>Change Password</span>
        </DropdownItem>
        <DropdownItem  style={{display:'flex', width:'100%'}}  onClick={() => { 
           logout()
        }}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
      <Modal isOpen={changePasswordModal} toggle={() => setchangePasswordModal(!changePasswordModal)} 
        className='vertically-centered-modal' fade={false}>
            <ModalHeader toggle={() => setchangePasswordModal(!changePasswordModal)}>Change Password</ModalHeader>
          <ModalBody>
          <div className='mb-2' style={{textAlign:'right'}}>
              <Label className='form-label' for='email'>
              <User size={14} className='me-50'/>
                {(user && user.username)}
              </Label>
            </div> 
            <div className='mb-2'>
              <Label className='form-label' for='email'>
                Old Password
              </Label>
              <InputPasswordToggle className='input-group-merge' 
                  id='login-password' value={oldPassword} onChange={(e) => passwordchangeevent(e.target.value, "oldPassword")}  onBlur={(e) => onBlurEvent(e.target.value)} />
                  {isValid && !errors.oldPassword && <FormFeedback className='d-block'> Old password is incorrect </FormFeedback>
                    }
               
                {errors && errors.oldPassword &&   <FormFeedback className='d-block'>Please enter old password</FormFeedback>}
            </div> 
            <div className='mb-2'>
              <Label className='form-label' for='email'>
                New Password
              </Label>
              <InputPasswordToggle className='input-group-merge' 
                  id='login-password' value={newPassword} onChange={(e) => passwordchangeevent(e.target.value, "newPassword")}/>
                {/* {errors && errors.validnewpass &&   <FormFeedback className='d-block'>Enter validate Password..</FormFeedback>} */}
                {errors && errors.newPassword &&   <FormFeedback className='d-block'>Please enter new password</FormFeedback>}
            </div> 
            <div className='mb-2'>
              <Label className='form-label' for='email'>
                Confirm Password
              </Label> 
              <InputPasswordToggle className='input-group-merge' 
                  id='login-password' value={confirmPassword} onChange={(e) => passwordchangeevent(e.target.value, "confirmPassword")}/>
                {errors && errors.validconfirmpass &&   <FormFeedback className='d-block'></FormFeedback>}
                {errors && errors.confirmPassword &&   <FormFeedback className='d-block'>Please enter confirm password</FormFeedback>}
                {errors && errors.equalconfirmPassword &&   <FormFeedback className='d-block'> New password and conform password does not match</FormFeedback>}
            </div>
        
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={handleSubmit}  disabled={isValid} style= {{cursor:"pointer"}} >
             Save
            </Button>
          </ModalFooter>
        </Modal>
      <Modal isOpen={logoutDeleteModal} toggle={() => setlogoutDeleteModal(!logoutDeleteModal)}
        className='vertically-centered-modal' fade={false}>
        <ModalHeader toggle={() => setlogoutDeleteModal(!logoutDeleteModal)}>Confirmation</ModalHeader>
        <ModalBody>
          <div className='mb-2'>
            <Label className='form-label' for='email'>
            Are you sure you want to logout ?
            </Label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary'  onClick={() => handleLogouts() }>
            Yes
          </Button>{' '}
          <Button color='primary' outline onClick={() => setlogoutDeleteModal(!logoutDeleteModal)}>
            No
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </UncontrolledDropdown>
  )
}
export default UserDropdown