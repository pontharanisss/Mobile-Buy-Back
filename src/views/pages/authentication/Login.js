// ** React Imports
import { useState } from 'react'
// useContext
import { Link, useNavigate } from 'react-router-dom'
// useNavigate
// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import useJwt from '@src/auth/jwt/useJwt'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
// import {  useForm, Controller } from 'react-hook-form'
import { Coffee, X } from 'react-feather'

// APi Url

// import axios from 'axios'
import { api } from '../../../utility/constants'
// // ** Actions
import { handleLogin } from '@store/authentication'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Row, Col, Form, Input, Label, Alert, Button, 
  CardText, CardTitle, UncontrolledTooltip, FormFeedback } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
// import ZityLogo from '@src/assets/images/logo/svs_logo.png'
import triosLogo from '@src/assets/images/logo/trio-s_logo.png'
const Login = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch() 
  const navigate = useNavigate()
  
  // const ability = useContext(AbilityContext)
  
  const [errors, setErrors] = useState({username:false, passworddata:false})
  const [userName, setUsername] = useState('')
  const [passworddata, setPassworddata] = useState('')
  const [isApiCall, setisApiCall] = useState(false)
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

   const loginAPI = async() => {
    setisApiCall(true)
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Authorization': 'Bearer my-token',
      },
      body: JSON.stringify({ username: userName, password:passworddata })
    }
    try {
     await fetch(
        `${api.api_url}/login/login`,
        requestOptions
      )
        .then((res) => res.json())
        .then((json) => {
          let status = 0
          status = json ? (json.body ? json.body.status : 0) : 0
          setisApiCall(false)
          if (status === 200) {
            console.log(json.body, 'json.body.UserInfo')
            localStorage.setItem('userDetails', JSON.stringify(json.body.UserInfo))
              toast.success('Login Sucessfully', {duration: 2000, style:{color:'#000', backgroundColor:'#d7d2d2'}})
              dispatch(handleLogin(json.body.UserInfo))
              navigate('/process')
          }  else {
            toast.error('Username or password is incorrect', { duration: 2000, style:{color:'#000', backgroundColor:'#d7d2d2'} })
          }
         
        })

    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async() => {
    if (userName === "" && passworddata === "") {
      setErrors({...errors, username:true, passworddata:true})
    } else if (userName === undefined || userName === "") {
      
      setErrors({...errors, username:true})
    } else if (passworddata === undefined || passworddata === "") {
      // alert('Please enter the user name')
      setErrors({...errors, passworddata:true})
    } else {
      setErrors({...errors, username:false, passworddata:false})       
      await loginAPI()
    }
  }
 
  const handleEnter = async(event) => {
    if (event.keyCode === 13) {
      await loginAPI()
    }
  }
   const passwordchangeevent = (e) => {
    setPassworddata(e) 
    if (e === "" || e === undefined) {
      setErrors({...errors, 
        passworddata:true})
    }  else {
      setErrors({...errors, 
        passworddata:false})
    
    }
  }
  const onBluruserName = e => {
    if (e === "" || e === undefined) {
      setErrors({...errors, 
        username:true})
    }  else {
      setErrors({...errors, 
        username:false})
    
    }
  }
  
return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <img className='img-fluid' src={triosLogo} alt='Login Cover' width={80}/>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex auth-bg px-2 p-lg-5' lg='4' sm='12'>          
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <Row style={{justifyContent:'center'}}>
              <img src={triosLogo} alt='Zity Ztyle logo' style={{width:'200px'}}/>
              </Row>
            
            {/* onSubmit={handleSubmit(onSubmit)}  */}
            <Form className='auth-login-form mt-5'>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  User Name
                </Label>
                <Input type='text' id='login-email' autoComplete="off" placeholder='' 
               value={userName} onKeyDown={handleEnter} onBlur={(e) => onBluruserName(e)} onChange={(e) => setUsername(e.target.value)}/>
              {errors && errors.username &&   <FormFeedback className='d-block'>Please enter user name</FormFeedback>}
                 
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                </div>
                <InputPasswordToggle className='input-group-merge' 
                id='login-password' onKeyDown={handleEnter} onChange={(e) => passwordchangeevent(e.target.value)} value={passworddata} />
              {errors && errors.passworddata &&   <FormFeedback className='d-block'>Please enter password</FormFeedback>}
             
              </div>
              <Button  color='primary' block onClick={handleSubmit} disabled={isApiCall} onKeyPress={(e) => e.key === 'Enter'} >
                Sign in
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  )
}
// export default Loginuser.reducer
export default Login
