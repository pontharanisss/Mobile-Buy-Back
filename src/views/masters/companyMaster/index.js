// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
// ** Custom Components
import Sidebar from '@components/sidebar'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Edit, Trash } from 'react-feather'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
// ** Reactstrap Imports
import '../../../assets/style/style.css'
import { toast } from "react-hot-toast"
import {  COMPANY, api } from '../../../utility/constants'
// ** Reactstrap Imports
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input,
  Row, Col, Card, UncontrolledTooltip, Badge
} from 'reactstrap'
// ** Store & Actions
// import { handleStatusFlag } from './store'
// import { useSelector } from 'react-redux'
// import { paginateArray } from '../../..//utility/commonfunc'
// import { BsTelephoneFill } from "react-icons/bs"
// import { BiMobile } from "react-icons/bi"
import UILoader from '@components/ui-loader'

// ** Styles

import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { MdLocationOn, MdLocationCity, MdEmail } from "react-icons/md"

const CustomHeader = ({showItemPopup }) => {
  return (
    <div  className='invoice-list-table-header w-100 py-2'>
    <Row className='pb-2'>
      <Col md='6' className='actions-right d-flex align-items-center'>
       
        <Col md='2'>
          <Button color='primary' onClick={() => showItemPopup()}>
            Add
        </Button>
        </Col>
      </Col>
    </Row>
  </div>
  )
}

const CompanyList = () => {
  // ** Store vars
  // const list = [{ companyname: 'Zity Ztyle', shortname: 'Zity Ztyle', addressline1: 'New Avadi Rd', addressline2: 'Wholesale Market Complex, TNHB Mig V Block,', status: 'Active', cityname: 'Chennai', statename: 'Tamil Nadu', pincode:'600071', telephone:'044 - 2655 1014', mobileno:'9876542345', emailid:'zityztyle2gmail.com', area :'Arundhati Palaiyam', gstin:'29GGGGG1314R9Z6'}]
  const user_id = JSON.parse(localStorage.getItem('userDetails'))

  // const dispatch = useDispatch()
  // const store = useSelector(state => state.Itemgroup)
  // ** States
  // const [value, setValue] = useState('')
  // const [currentPage] = useState(1)
  // const [statusValue, setStatusValue] = useState(1)
  // const [rowsPerPage, setRowsPerPage] = useState(10)
  const [companyError, SetcompanyError] = useState(false)
  // const [cityError, SetcityError] = useState(false)
  // const [addressError, SetaddressError] = useState(false)
  // const [stateError, SetstateError] = useState(false)
  // const [mobileError, SetmobileError] = useState(false)
  const [userDetails] = useState(user_id)

  const [companyNameError, SetcompanyNameError] = useState('')
  // const [cityNameError, SetcityNameError] = useState('')
  // const [addressNameError, SetaddressNameError] = useState('')
  // const [stateNameError, SetstateNameError] = useState('')
  // const [mobileNoError, SetmobileNoError] = useState('')

  const [CompanyName, SetCompanyName] = useState('')
  // const [ShortName, SetShortName] = useState('')
  // const [Address, setAddress] = useState('')
  // const [Area, setArea] = useState('')
  // const [City, setCity] = useState('')
  // const [State, setState] = useState(1)
  // const [Phoneno, setPhoneno] = useState('')
  // const [Mobileno, setMobileno] = useState('')
  // const [Emailid, setEmailid] = useState('')
  // const [Pincode, setPincode] = useState('')

  const [companyModal, setCompanyModal] = useState(false)
  const [customerDeleteModal, setCustomerDeleteModal] = useState(false)
  const [userButton, setuserButton] = useState('Save')
  const [companyMasterList, setCompanyMasterList] = useState([])
  const [loader, setloader] = useState(false)
  // const [btntigger, SetBtnTrigger] = useState('')
  // const [deletetigger, SetDeleteTrigger] = useState('')
  const [companyheader, setcompanyheader] = useState('Add Company')
  const [companyData, setCompanyData] = useState("")
  // const Statearray = [
  //   { label: "Tamil Nadu", value: 1 },
  //   { label: "Bihar", value: 2 },
  //   { label: "West Bengal", value: 3 },
  //   { label: "Uttar Pradesh", value: 4 },
  //   { label: "Andhra Pradesh", value: 5 }
  // ]

// List Api

const getCompanyList = () => {
  const userId = userDetails
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // 'Authorization': 'Bearer my-token',
    },
    body: JSON.stringify({ user_id: userId.user_id })
  }
  try {
    fetch(
      `${api.api_url}/sales-import/listoutCompanyJwt`, 
      requestOptions)
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
          // Login API call
          fetch(
            `${api.api_url}/sales-import/listoutCompany`,
            listRequestOptions
          )
            .then((res) => res.json())
            .then((json) => {
              let status = 0
              status = json ? (json.body ? json.body.status : 0) : 0
              if (status === 200) {
                const arrayToSend = []
                const companyArray = json ? json.body ? json.body.Company_array : [] : []
                companyArray.forEach((e) => {
                  const companyJson = {
                    label: e.company_name,
                    value: e.id
                  }
                  arrayToSend.push(companyJson)
                })
                setCompanyMasterList(companyArray)
              }
            })
        }
      })
  } catch (error) {
    console.log(error)
  }
}
const deletedata = () => {

  const userId = userDetails
  setCustomerDeleteModal(!customerDeleteModal)
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // 'Authorization': 'Bearer my-token',
    },
    body: JSON.stringify({
      user_id: userId.user_id,
      company_id: companyData.id
    })
  }
  try {
    fetch(`${api.api_url}/sales-import/deleteCompanyJwt`, requestOptions)
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
          // List API call
          fetch(`${api.api_url}/sales-import/deleteCompany`, listRequestOptions)
            .then((res) => res.json())
            .then((json) => {
              let status = 0
              status = json ? (json.body ? json.body.status : 0) : 0
              if (status === 200) {
                toast.success("Deleted Sucessfully", {
                  duration: 2000,
                  style: { color: "#000", backgroundColor: "#d7d2d2" }
                })
                getCompanyList()
              } else {
                toast.error("Company name already in use", {
                  duration: 2000,
                  style: { color: "#000", backgroundColor: "#d7d2d2" }
                })
              }
            })
        }
      })
  } catch (error) {
    toast.error("Company not found", {
      duration: 2000,
      style: { color: "#000", backgroundColor: "#d7d2d2" }
    })
  }
}

  // add click 
  const showItemPopup = (CompanyName) => {
    setuserButton('Save')
    setcompanyheader('Add Company')
    SetcompanyError(false)
    SetcompanyNameError('')
   SetCompanyName(CompanyName)
    setCompanyModal(!companyModal)
    // SetaddressError(false)
    // SetaddressNameError('')
    // // SetcityError(false)
    // SetcityNameError('')
    // SetstateError(false)
    // SetstateNameError('')
    // setState(1)
   
  }

  //save click
  const saveCompany = (action) => {
    if (CompanyName === '' || CompanyName === undefined) {
      toast.error('Please enter company name', { duration: 2000, style:{color:'#000', backgroundColor:'#d7d2d2'} })
      return false
    }
      const userId = userDetails
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // 'Authorization': 'Bearer my-token',
        },
        body: JSON.stringify({ user_id: userId.user_id, company_name:CompanyName})
      }
      try {
        fetch(
          `${api.api_url}/sales-import/InsertCompanyJwt`,
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
                body: JSON.stringify({ jwtToken: token,    salesList:companyMasterList ? companyMasterList.validData : [] })
              }
              // List API call
              fetch(
                `${api.api_url}/sales-import/InsertCompany`,
                listRequestOptions
              )
                .then((res) => res.json())
                .then((json) => {
                  let status = 0
                  status = json ? (json.body ? json.body.status : 0) : 0
                  if (status === 200) {
                   toast.success('Record Inserted Sucessfully', {duration: 2000, style:{color:'#000', backgroundColor:'#d7d2d2'}})
                    getCompanyList()
                    if (action === 'savecontinue') {
                      setCompanyModal(true)
                      SetCompanyName('')
                    } else {
                      setCompanyModal(false)
                    }
                    
                  }
                  if (status === false) {
                    toast.error('Company name already exists', { duration: 2000, style:{color:'#000', backgroundColor:'#d7d2d2'} })
                  }
                })
            }
          })
      } catch (error) {
         toast.error('Something went to be wrong', { duration: 2000, style:{color:'#000', backgroundColor:'#d7d2d2'} })
      }
      
    
  }

  
  //Edit Click
  // const editCompany = (data) => {
  //   console.log(data)
  //   setState(1)
  //   setCompanyModal(!companyModal)
  // }

  // Delete Click
  const deleteCompany = (data) => {
    setCompanyData(data)
    setCustomerDeleteModal(!customerDeleteModal)
  }
 
  //table cloums
  const columns = [
    {
      name: 'S.No',
      sortField: 'rownum',
      maxWidth:'10px',
      cell: (row, index) => <span>{index + 1}</span>
    },
    {
      name: 'Company Name',
      sortable: true,
      minWidth: '300px',
      sortField: 'itemgroupname',
      sortable:true,
      selector: row => row.company_name,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.company_name}</h6>
          </div>

        )
      }
    },
   
    {
      name: 'Action',
      minWidth: '30px',
      cell: row => (
        <div style={{cursor:'pointer'}}className='column-action d-flex align-items-center'>
          {/* <Edit size={14} className='me-50' id={`edit-tooltip-${row.id}`} onClick={() => editCompany(row)} />
          <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`} >
            Edit
          </UncontrolledTooltip> */}
          <Trash size={14} className='me-50' id={`delete-tooltip-${row.id}`} onClick={() => deleteCompany(row)} />
          <UncontrolledTooltip placement='top' target={`delete-tooltip-${row.id}`}>
            Delete
          </UncontrolledTooltip>
        </div>
      )
    }
  ]

  //list show api
  // useEffect(() => {

  //   setloader(false)
  //   if (store.statusFlag === 1) {
  //     setloader(false)
  //     dispatch(handleStatusFlag(0))

  //     if (btntigger !== '') {
  //       setCurrentPage(1)
  //       toast.success(store.message, { duration: 2000, style: { color: '#000', backgroundColor: '#d7d2d2' } })
  //       if (btntigger === 'Save' || btntigger === 'Update') {
  //         SetBtnTrigger('')
  //         setCompanyModal(false)
  //       }
  //       if (btntigger === 'savecontinue') {
  //         SetBtnTrigger('')
  //         setCompanyModal(true)
  //       }
  //     }
  //     if (deletetigger !== '') {
  //       setCurrentPage(1)
  //       toast.success(store.message, { duration: 2000, style: { color: '#000', backgroundColor: '#d7d2d2' } })
  //       setCustomerDeleteModal(false)
  //       if (deletetigger === 'Yes') {
  //         SetDeleteTrigger('')
  //       }
  //     }
  //     setStatusValue(1)
  //     setValue('')
  //     setState(1)
  //   } else if (store.statusFlag === 2) {
  //     dispatch(handleStatusFlag(0))
  //     if (deletetigger && deletetigger !== 'Yes') {
  //       setCompanyModal(true)
  //     } else {
  //       setCustomerDeleteModal(false)
  //     }
  //     toast.error(store.message, { duration: 2000, style: { color: '#000', backgroundColor: '#d7d2d2' } })
  //   }
  // }, [dispatch, store.data.length, store.statusFlag])

  // useEffect(() => {
  //   const arraydata = companyMasterList
  //   const list = arraydata.length <= rowsPerPage ? arraydata : paginateArray(arraydata, rowsPerPage, currentPage)
  //   setloader(false)
  //   if (arraydata && arraydata.length > 0) {
  //     setCompanyMasterList(list)
  //   }
  // }, [list, store.total, companyMasterList.whenToUpdateProp, rowsPerPage, currentPage])

 
  useEffect(() => {
    SetCompanyName('')
    setloader(false)
    getCompanyList()
  }, []) 
  //search filter
  // const handleFilter = val => {
  //   setValue(val)
  //   if (val !== "" && val !== undefined && val !== null) {
  //     const arraydata = list.filter((e) => e.companyname.toLowerCase().includes(val.toLowerCase()) ||
  //       e.cityname.toLowerCase().includes(val.toLowerCase()) || e.statename.toLowerCase().includes(val.toLowerCase()) || e.pincode.toLowerCase().includes(val.toLowerCase()))
  //       setCompanyMasterList(arraydata)
  //   } else {
  //     const arraydata = list.length <= rowsPerPage ? list : paginateArray(list, rowsPerPage, currentPage)
  //     if (list && list.length > 0) {
  //       setCompanyMasterList(arraydata)
  //     } else {
  //       setCompanyMasterList([])
  //     }
  //   }
  // }
  // for sorting 

  const onChangecompany = (text) => {
    const name = text.charAt(0).toUpperCase() + text.slice(1)
    SetCompanyName(name)
    if (text.length > 0) {
      SetcompanyError(false)
      SetcompanyNameError('')
    }
  }

  const onBlurEventCompany = event => {
    if (event === "" || event === undefined) {
      SetcompanyError(true)
      SetcompanyNameError(COMPANY.COMPANYNAME_ERROR)
    } else {
      SetcompanyError(false)
      SetcompanyNameError('')
    }
  }
  //react-datatable
  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='invoice-list-dataTable react-dataTable' style={{ marginBottom: '15px' }}>
          <UILoader blocking={loader}>
            <DataTable
              title='Company'
              pagination
              // sortServer
              // paginationServer
              noDataComponent="There are no records to display"
              subHeader={true}
              columns={columns}
              responsive={true}
 
              data={companyMasterList}
              sortIcon={<ChevronDown />}
              className='react-dataTable'
              defaultSortField='invoiceId'
              // paginationDefaultPage={currentPage}
              // paginationComponent={CustomPagination}
              subHeaderComponent={
                <CustomHeader
                  // value={value}
                  // statusValue={statusValue}
                  // rowsPerPage={rowsPerPage}
                  // // handleFilter={handleFilter}
                  // handlePerPage={handlePerPage}
                  // handleStatusValue={handleStatusValue}
                  showItemPopup={showItemPopup}
                />
              }
            />
          </UILoader>
        </div>
      </Card>

      <Modal isOpen={customerDeleteModal} toggle={() => setCustomerDeleteModal(!customerDeleteModal)}
        className='vertically-centered-modal' fade={false}>
        <ModalHeader toggle={() => setCustomerDeleteModal(!customerDeleteModal)}>Confirmation</ModalHeader>
        <ModalBody>
          <div className='mb-2'>
            <Label className='form-label' for='email'>
              Are you sure you want to delete this company ?
            </Label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => deletedata()}>
            Yes
          </Button>{' '}
          <Button color='primary' outline onClick={() => setCustomerDeleteModal(!customerDeleteModal)}>
            No
          </Button>{' '}
        </ModalFooter>
      </Modal>

      <Modal isOpen={companyModal} toggle={() => {
        SetCompanyName('')
        setCompanyModal(!companyModal)
      }}
        className='vertically-centered-modal' fade={false}>
        <ModalHeader toggle={() => setCompanyModal(!companyModal)}>{companyheader}</ModalHeader>
        <ModalBody>

          <Row className='invoice-spacing'>
            {/* <Col className='p-1' xl='6'> */}
              <div>
                <Label className='form-label required' for='email'>
                  Company Name
                </Label>

                <Input type='text' maxLength={50} width={100} onBlur={(event) => onBlurEventCompany(event.target.value)} autoComplete="off" id='item' value={CompanyName} onChange={(event) => onChangecompany(event.target.value)} />
                <span style={{ color: 'red', fontSize: '10px' }}> {companyError === true ? companyNameError : ''} </span>
              </div>

          </Row>

        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => saveCompany(userButton)}>
            {userButton}
          </Button>{' '}
          {userButton === 'Save' && <Button color='primary' onClick={() => saveCompany('savecontinue')}>
            Save & Continue
          </Button>}{' '}
          <Button color='primary' outline onClick={() => setCompanyModal(!companyModal)}>
            Close
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default CompanyList
