// ** React Imports
import React, { useState, useEffect  } from 'react'
import {
  Card, CardHeader, CardTitle, CardBody, UncontrolledTooltip, Input, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Label 
} from 'reactstrap'
import { ChevronDown, Trash, Edit, Unlock } from 'react-feather'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/pages/app-invoice.scss'
import '../../../assets/style/style.css'
import Select from 'react-select'
import InputPasswordToggle from '@components/input-password-toggle'
import { USER, Common_variable } from '../../../utility/constants'
import { getUserData } from '@utils'
import { getData, getmaster, saveData, handleStatusFlag } from './store'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-hot-toast"
import UILoader from '@components/ui-loader'


const UserMaster = () => {
  // ** Store vars
  // const navigate = useNavigate()
  const user = getUserData()
  const dispatch = useDispatch()
  const store = useSelector(state => state.UsersData)
  const [userList, setUserList] = useState([])  
  const [userData, setUserData] = useState('')  
  const [addUserModal, setAddUserModal] = useState('')  
  const [deleteModal, setDeleteModal] = useState(false)
  // const [currentPage, setCurrentPage] = useState(1)
  // const [rowsPerPage, setRowsPerPage] = useState(10)
  // const user_validation = Common_variable.Regax_validation
  const [loader, setloader] = useState(false)
  const [userError, SetuserError] = useState(false)
  const [usernameError, SetusernameError] = useState('')
  const [userIdError, SetUserIdError] = useState(false)
  const [userIDError, SetUserIDError] = useState('')
  const [passwordError, SetpasswordError] = useState(false)
  const [userpasswordError, SetuserpasswordError] = useState('')
  const [roleError, SetroleError] = useState(false)
  const [userroleError, SetuserroleError] = useState('')
  const [btntrigger, SetBtnTrigger] = useState('')
  const [isEdit, setIsEdit] = useState('')
  const [selUserRole, setSelUserRole] = useState('')

  //Validation
  const userName_validation = USER.USERNAME_VALIDATION
  const name_validation = USER.NAME_VALIDATION
  const password_validation = USER.PASSWORD_VALIDATION
  

  const getUserList = () => {
    setUserList([{ id: '1', user_name: 'Uma Devi', user_id: 'UD1111', user_role: 'Admin', password: 'Shiva$123'}, {id: '2', user_name: 'Aruna Devi', user_id: 'AD1111', user_role: 'User', password: 'Shiva$123'}, { id: '3', user_name: 'Priya', user_id: 'UD1111', user_role: 'User', password: 'Shiva$123'}, { id: '4', user_name: 'Vetrivel', user_id: 'UD1111', user_role: 'Admin', password: 'Shiva$123'}])
  }

  useEffect(() => {
    getUserList()
  }, [])

  // const user_roles = [{value: 'Admin', label: 'Admin'}, {value: 'User', label: 'User'}]

  
  //edit click
  const editUser = (data) => {    
    setUserData(data)
    if (store.userroleList) {
      setSelUserRole(store.userroleList.filter(e => e.value === data.user_role)[0])
    }    
    setIsEdit(true)
    setAddUserModal(true)
  }
  
  const columns = [ 
    {
      name: 'S.No.',
      sortable: true,
      minWidth: '10px',
      id: 'id',
      cell: (row, index)  => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{index + 1}</h6>
          </div>

        )
      }
    },
    {
      name: 'User Name',
      sortable: true,
      minWidth: '200px',
      id: 'id',
      cell: (row)  => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align' >{row.user_name}</h6>
          </div>

        )
      }
    },
    {
      name: 'User ID',
      sortable: true,
      minWidth: '200px',
      id: 'user_id',
      selector: row => row.user_id,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.user_id}</h6>
          </div>

        )
      }
    },

  
    {
      name: 'User Role',
      sortable: true,
      minWidth: '100px',
      id: 'user_role',
      selector: row => row.role_name,
      cell: row => {
        return (
          <div className='justify-content-left  paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.role_name}</h6>
          </div>

        )
      }
    },  
    
    {
      name: 'Action',
      minWidth: '110px',
      cell: (row, index) => (
        <div className='column-action d-flex align-items-center'>   
        <Edit size={14} className='me-50' id={`edit-tooltip-${row.id}`} onClick={() => editUser(row)} />
           <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
            Edit
          </UncontrolledTooltip>
          <Unlock size={14} className='me-50' id={`edit-tooltip-${row.id}`}  />
          <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
            Reset Password
          </UncontrolledTooltip>       
          <Trash size={14} className='me-50' id={`delete-tooltip-${index}`} onClick={() => setDeleteModal(true)}/>
          <UncontrolledTooltip placement='top' target={`delete-tooltip-${index}`}>
            Delete
        </UncontrolledTooltip>
        </div>
      )
    }
  ]

  //getmaster api for dropdown
  useEffect(() => {
    setloader(true)
    dispatch(
      getmaster({
        user_id: 2,
        role_id:1
      })
    )
    dispatch(
      getData({
        user_id: 2,
        role_id: 1
      })
    )
  }, [dispatch])

  useEffect(() => {
    if (store.data && store.data.length > 0) {
      console.log(store.data, user, 'store.data')
      setUserList(store.data)
    }
  }, [store.data])

  //getgata api
  useEffect(async () => {    
    if (store.statusFlag === 1) {
      setloader(false)
      dispatch(handleStatusFlag(0))     
      if (btntrigger !== '') {
        // setCurrentPage(1)
        toast.success(store.message, { duration: 2000, style:{color:'#000', backgroundColor:'#d7d2d2'} })
        if (btntrigger === 'save' || btntrigger === 'update') {          
          SetBtnTrigger('')
          setUserData('')
          setAddUserModal(false)
          dispatch(
            getData({
              user_id: 2,
              role_id: 1
            })
          )
        }      
      }
    } else if (store.statusFlag === 2) {
      setloader(false)
      dispatch(handleStatusFlag(0)) 
      toast.error(store.message, { duration: 2000, style:{color:'#000', backgroundColor:'#d7d2d2'} })
    }
  }, [dispatch, store.data.length, store.statusFlag])

  // add click
  const AddUser = () => {
    setUserData('')
    setIsEdit(false)
    setAddUserModal(!addUserModal)
  }  

  // add click
  const SaveUser = (action) => {
    SetBtnTrigger(action)    
    let has_error = false
    if (!userData || !userData.user_name || userData.user_name === '') {
      SetuserError(true)
      SetusernameError(USER.USERNAME_ERROR)
      has_error = true
    }  else if (!name_validation.test(userData.user_name)) {
      SetuserError(true)
      has_error = true
      SetusernameError(USER.USERNAME_VALIDATIONERROR)      
    } else {
      SetuserError(false)
      SetusernameError('')
    }

    if (!userData || !userData.user_id || userData.user_id === '') {
      SetUserIdError(true)
      has_error = true
      SetUserIDError(USER.USERNAME_ERROR)
    }  else if (!userName_validation.test(userData.user_id)) {
      SetUserIdError(true)
      has_error = true
      SetUserIDError(USER.USERNAME_VALIDATIONERROR)      
    } else {
      SetUserIdError(false)
      SetUserIDError('')
    }

    if (!userData || !userData.user_role || userData.user_role === '') {
      SetroleError(true)
      has_error = true
      SetuserroleError(USER.USERROLE_ERROR)
    }  else {
      SetroleError(false)
      SetuserroleError('')
    }

    if (!userData || !userData.password || userData.password === '') {
      SetpasswordError(true)
      has_error = true
      SetuserpasswordError(USER.PASSWORD_ERROR)
    } else if (!password_validation.test(userData.password)) {
      SetpasswordError(true)
      has_error = true
      SetuserpasswordError(USER.PASSWORD_VALIDATIONERROR)
    } else {
      SetpasswordError(false)
      SetuserpasswordError('')
    }

    console.log(user, userData, 'userData')

    if (!has_error) {       
      dispatch(
        saveData({
          user_id: 2,
          role_id:1,
          user_name: userData && userData.user_name ? userData.user_name : '',
          user_role: userData && userData.user_role ? userData.user_role.role_id : '',
          password: userData && userData.password ? userData.password : '',
          new_user_id: userData && userData.user_id ? userData.user_id : '',
          process_type: action
        })
      )
    }
   
  }  

  const closePopup = () => {
    setUserData('')
    setAddUserModal(false)
  }

  const onBluruserName = () => {   
    if (!userData || !userData.user_name || userData.user_name === '') {
      SetuserError(true)
      SetusernameError(USER.USERNAME_ERROR)
    }  else if (!name_validation.test(userData.user_name)) {
      SetuserError(true)
      SetusernameError(USER.USERNAME_VALIDATIONERROR)      
    } else {
      SetuserError(false)
      SetusernameError('')
    }
  }

  const onChangeUserName = (e) => {
    setUserData({...userData, user_name: e.target.value})
  }

  const onchangeUserId = (e) => {
    setUserData({...userData, user_id: e.target.value})
  }

  const onBluruserID = () => {   
    if (!userData || !userData.user_id || userData.user_id === '') {
      SetUserIdError(true)
      SetUserIDError(USER.USERNAME_ERROR)
    }  else if (!userName_validation.test(userData.user_id)) {
      SetUserIdError(true)
      SetUserIDError(USER.USERNAME_VALIDATIONERROR)      
    } else {
      SetUserIdError(false)
      SetUserIDError('')
    }
  }

  const onchangeUserRole = (e) => {
    setUserData({...userData, user_role: e})
    setSelUserRole({...userData, user_role: e})
  }

  const onBlurUserRole = () => {
    if (!userData || !userData.user_role || userData.user_role === '') {
      SetroleError(true)
      SetuserroleError(USER.USERROLE_ERROR)
    }  else {
      SetroleError(false)
      SetuserroleError('')
    }
  }

  const onchangePassword = (e) => {
    setUserData({...userData, password: e.target.value})
  }

  const onBlurpassword = () => {
    if (!userData || !userData.password || userData.password === '') {
      SetpasswordError(true)
      SetuserpasswordError(USER.PASSWORD_ERROR)
    } else if (!password_validation.test(userData.password)) {
      SetpasswordError(true)
      SetuserpasswordError(USER.PASSWORD_VALIDATIONERROR)
    } else {
      SetpasswordError(false)
      SetuserpasswordError('')
    }
  }

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>User Master</CardTitle>
        </CardHeader>
        <CardBody>
        <div className='invoice-list-table-header w-100 py-2'>
          <Row>
            <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
              <div className='d-flex align-items-center me-2'>
                <label htmlFor='rows-per-page'>Show</label>
                <Input
                  type='select'
                  id='rows-per-page'
                  // value={rowsPerPage}
                  // onChange={handlePerPage}
                  className='form-control ms-50 pe-3'
                >
                  <option value='10'>10</option>
                  <option value='25'>25</option>
                  <option value='50'>50</option>
                </Input>
              </div>
              <Button onClick={() => AddUser()} color='primary'>
                Add
              </Button>
            </Col>  
            <Col lg='6'className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'>
            <div className='d-flex align-items-center'>
              <label htmlFor='search-invoice'>Search</label>
              <Input
                id='search-invoice'
                className='ms-50 me-2 w-100'
                type='text'
                // value={value}
                // onChange={e => handleFilter(e.target.value)}
                placeholder='Search'
              />
            </div>          
          </Col>          
          </Row>
        </div>
        </CardBody>
        <CardBody className='invoice-padding' style={{paddingTop:'0px', paddingBottom:'3%'}}>
        <div className='sc-dmctIk fuLPYh react-dataTable'>
        <UILoader blocking={loader}>
          <DataTable
            // noDataComponent="There are no records to display"
            // subHeader={true}
            pagination
            columns={columns}
            responsive={true}
            data={userList}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='id'
            //  selectableRows
            // onSelectedRowsChange={handleChange}
          />
          </UILoader>
          </div>
          
        </CardBody>
      </Card>

      <Modal isOpen={addUserModal} toggle={() => setAddUserModal(!addUserModal)}
        className='vertically-centered-modal' fade={false}>
        <ModalHeader toggle={() => setAddUserModal(!addUserModal)} style={{backgroundColor: '#b3003b !important'}}>Add User</ModalHeader>
        <ModalBody>         
          <div className='mb-2'>
            <Label className='form-label' for='email'>
             User Name
            </Label>            
            <Input type='text' maxLength={50}  autoComplete="off" 
            onChange={(e) => onChangeUserName(e)}
            onBlur={(e) => onBluruserName(e)}
            value={userData && userData.user_name ? userData.user_name : ''}
             />
             <span className="errorAlert"> {userError === true ? usernameError : ''} </span>
          </div>   
          <div className='mb-2'>
            <Label className='form-label' for='email'>
              User ID
            </Label>            
            <Input type='text'  maxLength={50}  onChange={(e) => onchangeUserId(e)}
            onBlur={(e) => onBluruserID(e)} autoComplete="off"  value={userData && userData.user_id ? userData.user_id : ''}
             />
             <span className="errorAlert"> {userIdError === true ? userIDError : ''} </span>
          </div>   
          <div className='mb-2'>
            <Label className='form-label required' for='email'>
             User Role
            </Label>
            <Select
              isClearable={false}
              options={store.userroleList || []}
              className='react-select'
              value={selUserRole}
              onChange={(e) => onchangeUserRole(e)}
              onBlur={(e) => onBlurUserRole(e)}
            />
            <span className="errorAlert"> {roleError === true ? userroleError : ''} </span>
          </div>
          <div className='mb-2'>
            <Label className='form-label' for='email'>
             Password
            </Label>   
            <InputPasswordToggle className='input-group-merge'
              id='login-password' maxLength={50} value={userData && userData.password ? userData.password : ''} 
              onBlur={onBlurpassword} onChange={(e) => onchangePassword(e)} /> 
              <span className="errorAlert"> {passwordError === true ? userpasswordError : ''} </span>        
            {/* <Input type='text' maxLength={50}  autoComplete="off"  
             value={userData && userData.password ? userData.password : ''}
            onChange={(e) => onchangePassword(e)}
             /> */}
          </div>                    
        </ModalBody>
        <ModalFooter>
          {!isEdit && (
             <Button color='primary' onClick={() => SaveUser('save')} >           
             Save
           </Button>
          )}
          {isEdit && (
             <Button color='primary' onClick={() => SaveUser('update')} >           
             Update
           </Button>
          )}
         
          <Button color='primary' outline onClick={() => closePopup()}>
            Close
          </Button>{' '}
        </ModalFooter>
      </Modal>

      <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} 
        className='vertically-centered-modal' fade={false}>
          <ModalHeader toggle={() => setDeleteModal(!deleteModal)}>Confirmation</ModalHeader>
          <ModalBody>
            <div className='mb-2'>
              <Label className='form-label' for='email'>
                Are you sure you want to delete ? 
              </Label>
            </div>            
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={() => setDeleteModal(false)}>
              Yes
            </Button>{' '}
            <Button color='primary' outline onClick={() => setDeleteModal(false)}>
              No
            </Button>{' '}
          </ModalFooter>
        </Modal>
    
    </div>
  )
}
export default UserMaster
