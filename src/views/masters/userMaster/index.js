// ** React Imports
import React, { useState, useEffect  } from 'react'
import {
  Card, CardHeader, CardTitle, CardBody, UncontrolledTooltip, Input, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Label 
} from 'reactstrap'
import { ChevronDown, Trash  } from 'react-feather'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/pages/app-invoice.scss'
import '../../../assets/style/style.css'
import Select from 'react-select'
import InputPasswordToggle from '@components/input-password-toggle'


const UserMaster = () => {
  // ** Store vars
  // const navigate = useNavigate()
  const [userList, setUserList] = useState([])  
  const [userData, setUserData] = useState('')  
  const [addUserModal, setAddUserModal] = useState('')  
  const [deleteModal, setDeleteModal] = useState(false)

  const getUserList = () => {
    setUserList([{ id: '1', user_name: 'Uma Devi', user_id: 'UD1111', user_role: 'Admin', password: 'Shiva$123'}, {id: '2', user_name: 'Aruna Devi', user_id: 'AD1111', user_role: 'User', password: 'Shiva$123'}, { id: '3', user_name: 'Priya', user_id: 'UD1111', user_role: 'User', password: 'Shiva$123'}, { id: '4', user_name: 'Vetrivel', user_id: 'UD1111', user_role: 'Admin', password: 'Shiva$123'}])
  }

  useEffect(() => {
    getUserList()
  }, [])

  const user_roles = [{value: 'Admin', label: 'Admin'}, {value: 'User', label: 'User'}]
  
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
      selector: row => row.user_role,
      cell: row => {
        return (
          <div className='justify-content-left  paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.user_role}</h6>
          </div>

        )
      }
    },  
    
    {
      name: 'Action',
      minWidth: '110px',
      cell: (row, index) => (
        <div className='column-action d-flex align-items-center'>          
          <Trash size={14} className='me-50' id={`delete-tooltip-${index}`} onClick={() => setDeleteModal(true)}/>
          <UncontrolledTooltip placement='top' target={`delete-tooltip-${index}`}>
            Delete
        </UncontrolledTooltip>
        </div>
      )
    }
  ]

  // add click
  const AddUser = () => {
    setUserData('')
    setAddUserModal(!addUserModal)
  }  

  // add click
  const SaveUser = () => {
    setUserData('')
    setAddUserModal(!addUserModal)
  }  

  const closePopup = () => {
    setUserData('')
    setAddUserModal(false)
  }

  const onChangeUserName = (e) => {
    setUserData({...userData, user_name: e.target.value})
  }

  const onchangeUserId = (e) => {
    setUserData({...userData, user_id: e.target.value})
  }

  const onchangeUserRole = (e) => {
    setUserData({...userData, user_role: e})
  }

  const onchangePassword = (e) => {
    setUserData({...userData, password: e.target.value})
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
            value={userData && userData.user_name ? userData.user_name : ''}
             />
          </div>   
          <div className='mb-2'>
            <Label className='form-label' for='email'>
              User ID
            </Label>            
            <Input type='text'  maxLength={50}  onChange={(e) => onchangeUserId(e)} 
            autoComplete="off"  value={userData && userData.user_id ? userData.user_id : ''}
             />
          </div>   
          <div className='mb-2'>
            <Label className='form-label required' for='email'>
             User Role
            </Label>
            <Select
              isClearable={false}
              options={user_roles}
              className='react-select'
              value={userData && userData.user_role ? userData.user_role : ''}
              onChange={(e) => onchangeUserRole(e)}
            />
          </div>
          <div className='mb-2'>
            <Label className='form-label' for='email'>
             Password
            </Label>   
            <InputPasswordToggle className='input-group-merge'
              id='login-password' maxLength={50} value={userData && userData.password ? userData.password : ''} onChange={(e) => onchangePassword(e)} />         
            {/* <Input type='text' maxLength={50}  autoComplete="off"  
             value={userData && userData.password ? userData.password : ''}
            onChange={(e) => onchangePassword(e)}
             /> */}
          </div>                    
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => SaveUser()} >           
            Save
          </Button>{' '}
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
