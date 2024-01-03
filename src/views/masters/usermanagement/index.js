// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
// ** Custom Components
import Sidebar from '@components/sidebar'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Edit, Trash, Unlock } from 'react-feather'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
// ** Reactstrap Imports
import '../../../assets/style/style.css'
import { toast } from "react-hot-toast"
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input,
  Row, Col, Card, UncontrolledTooltip, Badge, FormFeedback
} from 'reactstrap'

import { paginateArray } from '../../..//utility/commonfunc'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import UILoader from '@components/ui-loader'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { api } from '../../../utility/constants'

const CustomHeader = ({ handleFilter, value, handleStatusValue, statusValue, handlePerPage, rowsPerPage, showItemPopup, statusMasterList }) => {

  return (
    <div className='invoice-list-table-header w-100 py-2'>
    <Row className='pb-2'>
      <Col md='5' className='d-flex align-items-center'>
        <div className='d-flex align-items-center me-2'>
          <label htmlFor='rows-per-page'>Show</label>
          <Input
            type='select'
            id='rows-per-page'
            value={rowsPerPage}
            onChange={handlePerPage}
            className='form-control ms-50 pe-3'
          >
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='50'>50</option>
          </Input>
        </div>
      </Col>
      <Col md='6' className='actions-right d-flex align-items-center'>
        <Col md='6'>
          <div className='d-flex align-items-center'>
            <label htmlFor='search-invoice'>Search</label>
            <Input
              autoComplete="off"
              id='search-invoice'
              className='ms-50 me-2 w-100'
              type='text'
              value={value}
              onChange={e => handleFilter(e.target.value)}
              placeholder='Search'
            />
          </div>
        </Col>

        <Col md='6' className='me-1'>
          <div className='d-flex align-items-center'>
            <label htmlFor='search-invoice'>Status</label>
            <Select
              isClearable={false}
              options={statusMasterList}
              className='react-select ms-50 me-2 '
              value={statusMasterList.filter(e => e.value === statusValue)[0]}
              onChange={(e) => handleStatusValue(e)}
            />
          </div>
        </Col>

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


const UserList = () => {
  const user_id = JSON.parse(localStorage.getItem('userDetails'))
  const [userDetails] = useState(user_id)

  // ** Store vars

  // const store = useSelector(state => state.Itemgroup)
  // ** States
  const [value, setValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState(-1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [userModal, setUserModal] = useState(false)
  const [userDeleteModal, setuserDeleteModal] = useState(false)
  const [resetPasswordModal, setresetPasswordModal] = useState(false)
  const [userButton, setuserButton] = useState('Save')
  const [userresetButton, setuserresetButton] = useState('Save')
  const [agencyMasterList, setAgencyMasterList] = useState([])
  const [allAgencyMasterList, setAllAgencyMasterList] = useState([])
  const [loader, setloader] = useState(false)

  const [userheader, setuserheader] = useState('Add Agency')
  const [statusActive, setStatusActive] = useState(0)
  const [active, setActive] = useState(false)
  const [inactive, setInActive] = useState(false)
  const [passwordType, setPasswordType] = useState("password")
  const [passwordInput, setPasswordInput] = useState("")
  const [companyMasterInput, setCompanyMasterInput] = useState([])
  const [companyMasterList, setCompanyMasterList] = useState([])
  const [statusMasterList, setStatusMasterList] = useState([])
  const [agencyData, setAgencyData] = useState([])
  const [agencyName, setAgencyName] = useState("")
  const [errors, setErrors] = useState({agencyName:false, deviceId:false, pin:false, companyName:false})
  const [agencyId, setAgencyId] = useState("0")
  const [deviceId, setDeviceId] = useState("")
   
 
  const statusObj = {
    pending: 'light-warning',
    1: 'light-success',
    0: 'light-danger'
  }
  // add click
  const showItemPopup = () => {
    setuserButton('Save')
    setuserheader('Add Agency')
    setUserModal(!userModal)
    setAgencyId("0")
    setAgencyName('')
    setDeviceId('')
    setPasswordInput('')
    setStatusActive(1)
    setCompanyMasterInput([])
    setActive(true)
    setInActive(false)

    setErrors({...errors, agencyName:false, deviceId:false, pin:false, companyName:false})
  }

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
                  setCompanyMasterList(arrayToSend)
                  console.log(companyArray, 'companyArray')
                }
              })
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  // const getAgencyDetails = async() => {
  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //       // 'Authorization': 'Bearer my-token',
  //     },
  //     body: JSON.stringify({ agency_id: agencyData.agency_id  })
  //   }
  //   try {
  //     fetch(
  //       `${api.api_url}/sales-import/getAgencyDetailsJwt`, 
  //       requestOptions)
  //       .then((res) => res.json())
  //       .then((json) => {
  //         let status = 0
  //         status = json ? (json.body ? json.body.status : 0) : 0
  //         if (status === 200) {
  //           const token = json ? (json.body ? json.body.token : "") : ""
  //           const listRequestOptions = {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json"
  //               // 'Authorization': 'Bearer my-token',
  //             },
  //             body: JSON.stringify({ jwtToken: token })
  //           }
  //           // Login API call
  //           fetch(
  //             `${api.api_url}/sales-import/getAgencyDetails`,
  //             listRequestOptions
  //           )
  //             .then((res) => res.json())
  //             .then((json) => {
  //               let status = 0
  //               status = json ? (json.body ? json.body.status : 0) : 0
  //               if (status === 200) {
  //                                 const AgencyDetails = json ? json.body ? json.body.AgencyDetails[0] : [] : []
  //                 // const Mappings_array = json ? json.body ? json.body.Mappings_array : [] : []                                              
  //                 setAgencyName(AgencyDetails.agency_name)
  //                 setDeviceId(AgencyDetails.device_id)
  //                 setPasswordInput(AgencyDetails.pin_number)
  //                 setcompanyMasterInput([]) 
                
  //             }  else toast.error(json.body.message, { duration: 2000, style:{color:'#000', backgroundColor:'#d7d2d2'} })
            
  //             })
  //         }
  //       })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  const getAgencyList = () => {
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
        `${api.api_url}/sales-import/listoutAgencyJwt`, 
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
              `${api.api_url}/sales-import/listoutAgency`,
              listRequestOptions
            )
              .then((res) => res.json())
              .then((json) => {
                let status = 0
                status = json ? (json.body ? json.body.status : 0) : 0
                if (status === 200) {
                 
                  const AgencyArray = json ? json.body ? json.body.AgencyList : [] : []
                  setAllAgencyMasterList(AgencyArray)
                  const arraydata = AgencyArray.length <= rowsPerPage ? AgencyArray : paginateArray(AgencyArray, rowsPerPage, currentPage)
                  setAgencyMasterList(arraydata)
                
                }
              })
          }
        })
    } catch (error) {
      console.log(error)
    }
  } 
  const handlePasswordChange = (evnt) => {
    if (evnt.target.value === "" || evnt.target.value === undefined) {
      setErrors({...errors, 
        pin:true})
    }  else {
      setErrors({...errors, 
        pin:false})
    }
    setPasswordInput(evnt.target.value)
}
const handleInput = (label, evnt) => {
  if (label === 'agencyName') {
    if (evnt.target.value === "" || evnt.target.value === undefined) {
      setErrors({...errors, 
        agencyName:true})
        setAgencyName(evnt.target.value)
    }  else {
      setErrors({...errors, 
        agencyName:false})
      setAgencyName(evnt.target.value)
    }
  }
  if (label === 'deviceId') {
    if (evnt.target.value === "" || evnt.target.value === undefined) {
      setErrors({...errors, 
        deviceId:true})
        setAgencyName(evnt.target.value)
    }  else {
      setErrors({...errors, 
        deviceId:false})
      setDeviceId(evnt.target.value)
    }
  }
}
const handleCompanyChange = (evnt) => {
  if (evnt.length === 0 || evnt === undefined) {
    setErrors({...errors, 
      companyName:true})
  }  else {
    setErrors({...errors, 
      companyName:false})
  }
  console.log(evnt)
  setCompanyMasterInput(evnt)
}

const saveUserDetails = async() => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // 'Authorization': 'Bearer my-token',
    },
    body: JSON.stringify({ agency_id : agencyId })
  }
  try {
    fetch(
      `${api.api_url}/sales-import/insertAgencyDetailsJwt`, 
      requestOptions)
      .then((res) => res.json())
      .then((json) => {
        let status = 0
        status = json ? (json.body ? json.body.status : 0) : 0
        if (status === 200) {
          const token = json ? (json.body ? json.body.token : "") : ""
          const company_id = []
          for (let i = 0; i < companyMasterInput.length > 0; i++) {
            company_id.push({company_id : companyMasterInput[i].value})
          }

          const listRequestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
              // 'Authorization': 'Bearer my-token',
            },
            body: JSON.stringify({ 
              jwtToken: token,  
              agencyDetails :[
                {
              agency_name: agencyName,
              pin_number: passwordInput,
              device_id: deviceId,
              active_status: statusActive,
              mappingsList:company_id
              }
            ]})
          }
          // Login API call
          fetch(
            `${api.api_url}/sales-import/insertAgencyDetails`,
            listRequestOptions
          )
            .then((res) => res.json())
            .then((json) => {
              getAgencyList()
              let status = 0
              status = json ? (json.body ? json.body.status : 0) : 0
              if (status === 200) {
                toast.success(json?.body?.message, {duration: 2000, style:{color:'#000', backgroundColor:'#d7d2d2'}})
                setuserButton('Save')
                setuserheader('Add User')               
                setAgencyName("")
                setDeviceId("")
                setActive(true)
                setInActive(false)
                setStatusActive(1)
                setCompanyMasterInput([])
                setPasswordInput("")
                setErrors({...errors, agencyName:false, deviceId:false, pin:false, companyName:false})
               
              } else {
                
              }
            })
        }
      })
  } catch (error) {
    console.log(error)
  }
}

  //save clickconst loginAPI = async() => 
  const saveUser = async(action) => {
    if (action === 'Save' || action === 'savecontinue' || action === 'Update') {
        
     
      if (agencyName === "" && passwordInput === "" && deviceId === "" && companyMasterInput.length === 0) {
        setErrors({...errors, agencyName:true, deviceId:true, pin:true, companyName:true}) 
      } else if (agencyName === undefined && agencyName === "") {
        setErrors({...errors, agencyName:true})
      } else if (passwordInput === undefined || passwordInput === "") {
        
        setErrors({...errors, passwordInput:true})
      } else if (deviceId === undefined || deviceId === "") {
        // alert('Please enter the user name')
        setErrors({...errors, deviceId:true})
      } else if (companyMasterInput.length === 0) {
        // alert('Please enter the user name')
        setErrors({...errors, deviceId:true})
      } else {
        setErrors({...errors, agencyName:false, passwordInput:false, deviceId: false, companyName: false})       
        await saveUserDetails()  
      }
    } else {
     }
     if (action === 'Save'  || action === 'Update') {
        setUserModal(!userModal)
     }
  }
  
  //resetpassword click
  const resetPasswordopen = () => {
    setresetPasswordModal(!resetPasswordModal)
    setuserresetButton('Save')
  }


  const getStatusList = () => {
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
        `${api.api_url}/sales-import/listoutStatusJwt`, 
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
              `${api.api_url}/sales-import/listoutStatus`,
              listRequestOptions
            )
              .then((res) => res.json())
              .then((json) => {
                let status = 0
                status = json ? (json.body ? json.body.status : 0) : 0
                if (status === 200) {
                 
                  const arrayToSend = []
                  const statusArray = json ? json.body ? json.body.StatusList : [] : []
                  statusArray.forEach((e) => {
                    const statusJson = {
                      label: e.status_text,
                      value: e.status_id
                    }
                    arrayToSend.push(statusJson)
                  })
                  setStatusMasterList(arrayToSend)
                
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
    setuserDeleteModal(!userDeleteModal)
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Authorization': 'Bearer my-token',
      },
      body: JSON.stringify({
        user_id: userId.user_id,
        agency_id: agencyData.agency_id
      })
    }
    try {
      fetch(`${api.api_url}/sales-import/deleteAgencyJwt`, requestOptions)
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
            fetch(`${api.api_url}/sales-import/deleteAgency`, listRequestOptions)
              .then((res) => res.json())
              .then((json) => {
                let status = 0
                status = json ? (json.body ? json.body.status : 0) : 0
                if (status === 200) {
                  toast.success("Deleted Sucessfully", {
                    duration: 2000,
                    style: { color: "#000", backgroundColor: "#d7d2d2" }
                  })
                  getAgencyList()
                } else {
                  toast.error("Something went to be wrong", {
                    duration: 2000,
                    style: { color: "#000", backgroundColor: "#d7d2d2" }
                  })
                }
              })
          }
        })
    } catch (error) {
      toast.error("Agency not found", {
        duration: 2000,
        style: { color: "#000", backgroundColor: "#d7d2d2" }
      })
    }
  } 
  

const togglePassword = () => {
  if (passwordType === "password") {
   setPasswordType("text")
   return
  }
  setPasswordType("password")
}
  //Edit Click
  const editUser = (data) => {
    setuserheader('Update Agency')
    console.log(data, 'data')
  
    setuserButton('Update')
    setAgencyData(data)
    setAgencyName(data.agency_name)
    setDeviceId(data.device_id)
    setPasswordInput(data.pin_number)
    setAgencyId(data.agency_id)  
    setStatusActive(data.active_status)
    let companyList = data.company_list
    const formattedCompanyList = []
    if (companyList && companyList !== null) {
      companyList = companyList.split("|")
      companyList.forEach(element => {
        const filteredCompany = companyMasterList.filter(e => e.value === parseInt(element))
        if (filteredCompany.length > 0) {
          formattedCompanyList.push(filteredCompany[0])
        }
      })   
      setCompanyMasterInput(formattedCompanyList)
  
    }
   
    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //     // 'Authorization': 'Bearer my-token',
    //   },
    //   body: JSON.stringify({ agency_id: agencyData.agency_id  })
    // }
    // try {
    //   fetch(
    //     `${api.api_url}/sales-import/getAgencyDetailsJwt`, 
    //     requestOptions)
    //     .then((res) => res.json())
    //     .then((json) => {
    //       let status = 0
    //       status = json ? (json.body ? json.body.status : 0) : 0
    //       if (status === 200) {
    //         const token = json ? (json.body ? json.body.token : "") : ""
    //         const listRequestOptions = {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json"
    //             // 'Authorization': 'Bearer my-token',
    //           },
    //           body: JSON.stringify({ jwtToken: token })
    //         }
    //         // Login API call
    //         fetch(
    //           `${api.api_url}/sales-import/getAgencyDetails`,
    //           listRequestOptions
    //         )
    //           .then((res) => res.json())
    //           .then((json) => {
    //             let status = 0
    //             status = json ? (json.body ? json.body.status : 0) : 0
    //             if (status === 200) {
    //                               const AgencyDetails = json ? json.body ? json.body.AgencyDetails[0] : [] : []
    //               // const Mappings_array = json ? json.body ? json.body.Mappings_array : [] : []                                              
    //               setAgencyName(AgencyDetails.agency_name)
    //               setDeviceId(AgencyDetails.device_id)
    //               setPasswordInput(AgencyDetails.pin_number)
    //               setCompanyMasterInput([]) 
                
    //           }  else toast.error(json.body.message, { duration: 2000, style:{color:'#000', backgroundColor:'#d7d2d2'} })
            
    //           })
    //       }
    //     })
    // } catch (error) {
    //   console.log(error)
    // }

    if (data.active_status === 1) {
      setActive(true)
      setInActive(false)
    } else {
      setActive(false)
      setInActive(true)
    }
    setTimeout(() => {
      setUserModal(!userModal)
    }, 500)
   
  }

  // Delete Click
  // const deleteUser = (data) => {
  //   setAgencyData(data)
  //   setuserDeleteModal(!userDeleteModal)
  // }

  //table cloums
  const columns = [
    {
      name: 'S.No',
      sortField: 'rownum',
      maxWidth:'10px',
      cell: (row, index) => <span>{index + 1}</span>
    },
    {
      name:'Salesman',
      minWidth: '300px',
      sortField: 'agency_name',
      sortable:true,
      selector: row => row.agency_name,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
              <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.agency_name}</h6>
          </div>

        )
      }
    },
    {
      name: 'Device ID',
      sortable: true,
      minWidth: '250px',
     
      sortable:true,
      selector: row => row.device_id,
      cell: row => {
        return (
          <div className='d-flex justify-content-left align-items-center '>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.device_id}</h6>
          </div>
        )
      }
    },
   

    {
      minWidth: '30px',
      name: 'Status',
      sortField: 'active_status',
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {(row.active_status !== "" && row.active_status !== undefined) &&
            <Badge className='text-capitalize' color={statusObj[row.active_status]} pill>
              {row.status_text}
            </Badge>}
        </div>
      )
    },
    {
      name: 'Action',
      minWidth: '30px',
      cell: row => (
        <div className='column-action d-flex align-items-center'>
          <Edit size={14} className='me-50' id={`edit-tooltip-${row.agency_id}`} onClick={() => editUser(row)} />
          <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.agency_id}`} >
            Edit
          </UncontrolledTooltip>
          <Unlock size={14} className='me-50' id={`edit-tooltip-${row.agency_id}`} onClick={() => resetPasswordopen(row)} />
          <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.agency_id}`}>
            Reset Password
          </UncontrolledTooltip>
          {/* <Trash size={14} className='me-50' id={`delete-tooltip-${row.agency_id}`} onClick={() => deleteUser(row)} />
          <UncontrolledTooltip placement='top' target={`delete-tooltip-${row.agency_id}`}>
            Delete
          </UncontrolledTooltip> */}
        </div>
      )
    }
  ]

  //list show api

  useEffect(() => {  
    setloader(false)  
    getCompanyList()
    getAgencyList()
    getStatusList()
  }, [currentPage, rowsPerPage])


  //search filter
  const handleFilter = val => {
    setValue(val)
    if (val !== "" && val !== undefined && val !== null) {
      const arraydata = allAgencyMasterList.filter((e) => e.agency_name.toLowerCase().includes(val.toLowerCase()))
        setAgencyMasterList(arraydata)
    } else {
      const arraydata = allAgencyMasterList.length <= rowsPerPage ? allAgencyMasterList : paginateArray(allAgencyMasterList, rowsPerPage, currentPage)
      if (allAgencyMasterList && allAgencyMasterList.length > 0) {
        setAgencyMasterList(arraydata)
      } else {
        setAgencyMasterList([])
      }
    }
  }
  //pagevalue
  const handlePerPage = e => {
    setRowsPerPage(parseInt(e.target.value))
  }


  //active and iinactive dropdown in list screen
  const handleStatusValue = e => {
    const val = e.value
    setStatusValue(e.value)
    setValue('')
    if (val !== "" && val !== undefined && val !== null && val !== -1) {
      const arraydata = allAgencyMasterList.filter((e) => e.active_status === val)
        setAgencyMasterList(arraydata)
    } else {
      const arraydata = allAgencyMasterList.length <= rowsPerPage ? allAgencyMasterList : paginateArray(allAgencyMasterList, rowsPerPage, currentPage)
      if (allAgencyMasterList && allAgencyMasterList.length > 0) {
        setAgencyMasterList(arraydata)
      } else {
        setAgencyMasterList([])
      }
    }
  }


  //existing pagination
  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }

  //custom pagination
  const CustomPagination = () => {
    let count = 0
    if (allAgencyMasterList.length > 0) {
      count = Number(Math.ceil(allAgencyMasterList.length / rowsPerPage))
    } 
    return (
      <ReactPaginate
        nextLabel=''
        breakLabel='...'
        previousLabel=''
        pageCount={count || 1}
        activeClassName='active'
        breakClassName='page-item'
        pageClassName={'page-item'}
        breakLinkClassName='page-link'
        nextLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousLinkClassName={'page-link'}
        previousClassName={'page-item prev'}
        onPageChange={page => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={'pagination react-paginate justify-content-end p-1'}
      />
    )
  }

    //active and inactive dropdown in list screen - changeEvent
    const statusChangeEvent = (e, action) => {
      // setselectstatus(e.target.value)
      if (action === "active") {
        setActive(true)
        setInActive(false)
        setStatusActive(1)
      } else {
        setStatusActive(0)
        setActive(false)
        setInActive(true)
      }
    }

  // getting data 
  const dataToRender = () => {
    // const filters = {
    //   q: value,
    //   status: statusValue
    // }

    // const isFiltered = Object.keys(filters).some(function (k) {
    //   return filters[k].length > 0
    // })

    // if (agencyMasterList.length > 0) {
    //   return agencyMasterList
    // } else if (agencyMasterList.length === 0 && isFiltered) {
      if (agencyMasterList.length > 0) {
      return agencyMasterList.slice(0, rowsPerPage)
      }
    // }
  }


  //react-datatable
  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='invoice-list-dataTable react-dataTable' style={{ marginBottom: '15px' }}>
          <UILoader blocking={loader}>
            <DataTable
              title='Agent Management'
              pagination
            
              noDataComponent="There are no records to display"
              subHeader={true}
              columns={columns}
              responsive={true}
            
              data={dataToRender()}
              sortIcon={<ChevronDown />}
              className='react-dataTable'
              defaultSortField='agency_name'
              paginationDefaultPage={currentPage}
              paginationComponent={CustomPagination}
              subHeaderComponent={
                <CustomHeader
                  value={value}
                  statusValue={statusValue}
                  rowsPerPage={rowsPerPage}
                  handleFilter={handleFilter}
                  handlePerPage={handlePerPage}
                  handleStatusValue={handleStatusValue}
                  showItemPopup={showItemPopup}
                  statusMasterList={statusMasterList}
                />
              }
            />
          </UILoader>
        </div>
      </Card>

      <Modal isOpen={userDeleteModal} toggle={() => setuserDeleteModal(!userDeleteModal)}
        className='vertically-centered-modal' fade={false}>
        <ModalHeader toggle={() => setuserDeleteModal(!userDeleteModal)}>Confirmation</ModalHeader>
        <ModalBody>
          <div className='mb-2'>
            <Label className='form-label' for='email'>
              Are you sure you want to delete this agency ?
            </Label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => deletedata()}>
            Yes
          </Button>{' '}
          <Button color='primary' outline onClick={() => setuserDeleteModal(!userDeleteModal)}>
            No
          </Button>{' '}
        </ModalFooter>
      </Modal>

      <Modal isOpen={userModal} toggle={() => setUserModal(!userModal)}
        className='vertically-centered-modal' fade={false}>
        <ModalHeader toggle={() => setUserModal(!userModal)}>{userheader}</ModalHeader>
        <ModalBody>

          <div className='mb-2'>
            <Label className='form-label required' for='email'>
              Name of the Salesman
                </Label>
            <Input type='text' maxLength={50} autoComplete="off" id='item'  placeholder="Name of the Salesman" value={agencyName} onChange={(e) => handleInput("agencyName", e)}/>
            {errors && errors.agencyName && <FormFeedback className='d-block'>Please enter Salesman</FormFeedback>}
          </div>  

          <div className='mb-2'>
            <Label className='form-label required' for='email'>
              Device ID
                </Label>
            <Input type='text' maxLength={50} autoComplete="off" id='item'  placeholder="Device ID" value={deviceId} onChange={(e) => handleInput("deviceId", e)}/>
            {errors && errors.deviceId &&   <FormFeedback className='d-block'>Please enter Device ID</FormFeedback>}
          </div>
         
        
          <div className='mb-2'>
            <Label className='form-label required' for='pin'>
              Pin 
            </Label>
              {/* <InputPasswordToggle className='mb-2' label='Password' htmlFor='basic-default-password' /> */}
            <Row className='invoice-spacing'>
              <Col className='p-1' xl='10'>
                <div>
                <Input type={passwordType} onChange={handlePasswordChange} value={passwordInput}  maxLength={4} autoComplete="off" id='password' placeholder="Password"  className='input-group-merge' />
                {errors && errors.pin &&   <FormFeedback className='d-block'>Please enter Password</FormFeedback>}
                </div>
            
              </Col>
              <Col className='p-1' xl='2'>
                <div>
                <button className="btn btn-outline-primary" onClick={togglePassword}>
                     { passwordType === "password" ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye></AiFillEye> }
                     </button>
                </div>
              
              </Col>
            </Row>
          </div>

          <div className='mb-2'>
            <Label className='form-label required' for='email'>
            Company
            </Label>
            <Select
              isClearable={false}
              options={companyMasterList}
              className='react-select'
              isMulti ={true}
              isSearchable ={true}
              value = {companyMasterInput}
              onChange={handleCompanyChange}
            />
            {errors && errors.companyName && <FormFeedback className='d-block'>Please enter company name</FormFeedback>}
          </div>
      
            <div className='mb-2 demo-inline-spacing'>
              <div>
                <Label className='form-label' for='name'>Status</Label>
              </div>
              <div className='form-check'>
                <Input type='radio' id='ex1-active' name='ex1' value={1} checked={active} onChange={(e) => statusChangeEvent(e, 'active')} />
                <Label className='form-check-label' for='ex1-active'>
                  Active
                </Label>
              </div>
              <div className='form-check'>
                <Input type='radio' name='ex1' id='ex1-inactive' value={2} checked={inactive} onChange={(e) => statusChangeEvent(e, 'inactive')} />
                <Label className='form-check-label' for='ex1-inactive'>
                  Inactive
                </Label>
              </div>
            </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => saveUser(userButton)}>
            {userButton}
          </Button>{' '}
          {userButton === 'Save' && <Button color='primary' onClick={() => saveUser('savecontinue')}>
            Save & Continue
          </Button>}{' '}
          <Button color='primary' outline onClick={() => setUserModal(!userModal)}>
            Close
          </Button>{' '}
        </ModalFooter>
      </Modal>

      <Modal isOpen={resetPasswordModal} toggle={() => setresetPasswordModal(!resetPasswordModal)}
        className='vertically-centered-modal' fade={false}>
        <ModalHeader toggle={() => setresetPasswordModal(!resetPasswordModal)}>Reset Password</ModalHeader>
        <ModalBody>
          <div className='mb-2'>
            <Label className='form-label' for='email'>
              New Password
            </Label>
            <Row className='invoice-spacing'>
              <Col className='p-1' xl='10'>
                <div>
                <Input type={passwordType} onChange={handlePasswordChange} value={passwordInput}  maxLength={8} autoComplete="off" id='password' placeholder="New Password"  className='input-group-merge'/>
                </div>
            
              </Col>
              <Col className='p-1' xl='2'>
                <div>
                <button className="btn btn-outline-primary" onClick={togglePassword}>
                     { passwordType === "password" ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye></AiFillEye> }
                     </button>
                </div>
              
              </Col>
            </Row>
          </div>

          <div className='mb-2'>
            <Label className='form-label' for='email'>
              Confirm Password
            </Label>
            <Row className='invoice-spacing'>
              <Col className='p-1' xl='10'>
                <div>
                <Input type={passwordType} onChange={handlePasswordChange} value={passwordInput}  maxLength={8} autoComplete="off" id='password' placeholder="Confirm Password"  className='input-group-merge'/>
                </div>
            
              </Col>
              <Col className='p-1' xl='2'>
                <div>
                <button className="btn btn-outline-primary" onClick={togglePassword}>
                     { passwordType === "password" ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye></AiFillEye> }
                     </button>
                </div>
              
              </Col>
            </Row>
          </div>

        </ModalBody>
        <ModalFooter>
          <Button color='primary' >
            {userresetButton}
          </Button>{' '}

        </ModalFooter>
      </Modal>

    </div>
  )
}

export default UserList
