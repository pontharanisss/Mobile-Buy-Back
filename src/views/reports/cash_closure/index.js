// ** React Imports
import { Link } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Calendar, Eye } from 'react-feather'
import DataTable from 'react-data-table-component'
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import Autocomplete from "@material-ui/lab/Autocomplete"
// ** Reactstrap Imports
import '../../../assets/style/style.css'
// ** Reactstrap Imports
import {
  Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter,
  Row, Col, Card, CardHeader, CardTitle, CardBody, InputGroupText, InputGroup, UncontrolledTooltip
} from 'reactstrap'
import { api } from '../../../utility/constants'
import { paginateArray } from '../../..//utility/commonfunc'
import UILoader from '@components/ui-loader'
import moment from 'moment'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { toast } from "react-hot-toast"
const PayoutList = () => {
  // ** Store vars
  const list = [
    { employeeid: 1, employeecode: '001', employeename: 'Vetri', departmentname: 'Sewing Floor', noofcompletedjob : '2', netamount:'5000', totalpieces:'25', cash_amount:'1500', bank_amount:'3000', carry_forward:'500' },
    { employeeid: 2, employeecode: '002', employeename: 'Suriya', departmentname: 'Iron Man', noofcompletedjob : '1', netamount:'6500', totalpieces:'65', cash_amount:'2000', bank_amount:'3000', carry_forward:'1500' }
  ]
  const user_id = JSON.parse(localStorage.getItem('userDetails'))
  const [userDetails] = useState(user_id)
 
  // ** States
  const [value, setValue] = useState('')
  // const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  // const [PerformanceList, setPerformanceList] = useState(list)
  const fromdatefp = useRef(null)
  const todatefp = useRef(null)
  const [fromdate, setfromdate] = useState(new Date())
  const [todate, settodate] = useState(new Date())  
  const [receiptList, setReceiptList] = useState([])

  const [companyMasterList, setCompanyMasterList] = useState([])
  const [companyinputValue, setcompanyinputValue] = useState('')
  const [selectCompanyDetail, setselectCompanyDetail] = useState('')
  const [companyDetail, setcompanyDetail] = useState([])

  const [customerMasterList, setCustomerMasterList] = useState([])
  const [customerinputValue, setcustomerinputValue] = useState('')
  const [selectCustomerDetail, setselectCustomerDetail] = useState('')
  const [customerDetail, setcustomerDetail] = useState([])

  const [agencyMasterList, setAgencyMasterList] = useState([])
  const [agencyinputValue, setagencyinputValue] = useState('')
  const [selectAgencyDetail, setselectAgencyDetail] = useState('')
  const [agencyDetail, setagencyDetail] = useState([])

  const [paymenttypeMasterList, setPaymenttypeMasterList] = useState([])
  const [paymenttypeinputValue, setpaymenttypeinputValue] = useState('')
  const [selectPaymenttypeDetail, setselectPaymenttypeDetail] = useState('')
  const [paymenttypeDetail, setPaymenttypeDetail] = useState([])


  const [detailsModal, setDetailsModal] = useState(false)
  const [receiptNumber, setReceiptNumber] = useState('')
  const [billList, setBillList] =  useState([])
  const [selectedData, setSelectedData] = useState([])

  const [totalCash, setTotalCash] = useState(0)
  const Checkbox = React.forwardRef(({ onClick, ...rest }, ref) => {
    return (
        <>
            <div className="form-check" style={{ backgroundColor: '' }}>
                <input 
                    type="checkbox"
                    className="form-check-input"
                    style={{ height: '20px' }}
                    ref={ref}
                    onClick={ onClick }
                    {...rest}
                />
                <label className="form-check-label" id="booty-check" />
            </div>
        </>
    )
   })
   const handleChange = (state) => {
    setSelectedData(state.selectedRows)
  }
   const bindBillDetails = (id) => {
    if (id !== null) {
      try {
  
          const listRequestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
              // 'Authorization': 'Bearer my-token',
            },
            body: JSON.stringify({ ReceiptId: id.toString() })
          }
          // Login API call
          fetch(
            `${api.api_url}/collection-app/CollectionReceiptDetails`,
            listRequestOptions
          )
            .then((res) => res.json())
            .then((json) => {
              let status = 0
              status = json ? (json.body ? json.body.status : 0) : 0
              if (status === 200) {
             
                const billArray = json ? json.body ? json.body.collection_bill_list : [] : []
                setBillList(billArray)
              } else {
               
              }
            })
      
  } catch (error) {
    console.log(error)
  }
  }

   
   }
  const showDetails = (row) => {
   setDetailsModal(!detailsModal)
   setReceiptNumber(row.id)
   bindBillDetails(row.id)
  }
  const columns = [

    {
      name: 'Receipt No.',
      sortable: true,
      minWidth: '100px',    
      selector: row => row.id,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{'#'}{row.id}</h6>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align' style={{opacity:"0.8", fontSize:"12px"}}>{row.receipt_date}</h6>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align' style={{opacity:"0.8", fontSize:"12px"}}>{'Collected By'}{row.agency_name}</h6>
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
          <Eye size={14} className='me-50' id={`delete-tooltip-${row.id}`} onClick={() => showDetails(row)} />
          <UncontrolledTooltip placement='top' target={`delete-tooltip-${row.id}`}>
            View Details
          </UncontrolledTooltip>
        </div>
      )
    },
    {
      name: 'Customer',
      sortable: true,
      minWidth: '100px',    
      selector: row => row.customer_name,
      cell: row => {
        return (
          <div className='justify-content-left  paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.customer_name}</h6>
          </div>

        )
      }
    },
    {
      name: 'Payment Type',
      sortable: true,
      minWidth: '100px',    
      selector: row => row.payment_type,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.payment_type}</h6>
          </div>

        )
      }
    },
    {
      name: 'Amount',
      sortable: true,
      minWidth: '100px',    
      selector: row => row.receipt_amount,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.receipt_amount}</h6>
          </div>

        )
      }
    }
    
  ]

  //search filter
  const handleFilter = val => {
    setValue(val)
    if (val !== "" && val !== undefined && val !== null) {
      const arraydata = list.filter((e) => e.employeename.toLowerCase().includes(val.toLowerCase()))
      setPerformanceList(arraydata)
    } else {
      const arraydata = list.length <= rowsPerPage ? list : paginateArray(list, rowsPerPage, currentPage)
      if (list && list.length > 0) {
        setPerformanceList(arraydata)
      } else {
        setPerformanceList([])
      }
    }
  }

  //pagevalue
  const handlePerPage = e => {
    setRowsPerPage(parseInt(e.target.value))
  }

  // //existing pagination
  // const handlePagination = page => {
  //   setCurrentPage(page.selected + 1)
  // }
 
  const apply_customer = (e) => {
    setselectCustomerDetail(e.target.value)
    if (e.target.value.length === 0) {
      setcustomerDetail([])
    }
    if (e.target.value && e.target.value.length === 3) {
      setcustomerDetail(customerMasterList)
    }
  }
  const customerinputchange = (e, newValue) => {

    setcustomerinputValue(newValue)
  }

  const apply_company = (e) => {
    setselectCompanyDetail(e.target.value)
    if (e.target.value.length === 0) {
      setcompanyDetail([])
    }
    if (e.target.value && e.target.value.length === 3) {
      setcompanyDetail(companyMasterList)
    }
  }
  const companyinputchange = (e, newValue) => {

    setcompanyinputValue(newValue)
  }
  const apply_fromfilterdate = e => {
    setfromdate(e[0])
  }

  const apply_tofilterdate = e => {
    settodate(e[0])
  }
  // const handleSort = (column, sortDirection) => {
  //   const sortable = column.sortField
  //   const ReceiptList = receiptList.sort((a, b) => {
  //     if (sortDirection === 'asc') {
  //       return a[sortable].toLowerCase() < b[sortable].toLowerCase() ? 1 : -1
  //     } else if (sortDirection === 'desc') {
  //       return a[sortable].toLowerCase() < b[sortable].toLowerCase() ? -1 : 1
  //     }
  //     setReceiptList(ReceiptList)
  //   })
  // }

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
                      value: e.voucher_type_name
                    }
                    arrayToSend.push(companyJson)
                  })
                  setcompanyDetail(arrayToSend)
                  setCompanyMasterList(arrayToSend)
                }
              })
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  const getCustomerList = (companyValue) => {
    console.log(companyValue, 'companyValue')
    if (companyValue !== null) {
        try {
    
            const listRequestOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
                // 'Authorization': 'Bearer my-token',
              },
              body: JSON.stringify({ VoucherType: companyValue.value, AgencyId:0 })
            }
            // Login API call
            fetch(
              `${api.api_url}/collection-app/CustomerOutstandingList`,
              listRequestOptions
            )
              .then((res) => res.json())
              .then((json) => {
                let status = 0
                status = json ? (json.body ? json.body.status : 0) : 0
                if (status === 200) {
                  const arrayToSend = []
                  const customerArray = json ? json.body ? json.body.receipt_list : [] : []
                  customerArray.forEach((e) => {
                    const customerJson = {
                      label: e.customer_name,
                      value: e.customer_name
                    }
                    arrayToSend.push(customerJson)
                  })
                  setcustomerDetail(arrayToSend)
                  setCustomerMasterList(arrayToSend)
                } else {
                  setcustomerDetail([])
                  setCustomerMasterList([])

                }
              })
        
    } catch (error) {
      console.log(error)
    }
    }
  
  }
  const getReceiptList = () => {
    if (selectCompanyDetail[0] === "" || selectCompanyDetail === "" || selectCompanyDetail === null || selectCompanyDetail.value === "" || selectCompanyDetail.value === null) {
      toast.error("Please select the company", {
        duration: 2000,
        style: { color: "#000", backgroundColor: "#d7d2d2" }
      })
      return false
    }
    const formatted_from_date = moment(new Date(fromdate)).format("DD/MM/YYYY")
    const formatted_to_date = moment(new Date(todate)).format("DD/MM/YYYY")
   
    try { 
          
            const listRequestOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
                // 'Authorization': 'Bearer my-token',
              },
              body: JSON.stringify({
                VoucherType:selectCompanyDetail.value,
                CustomerName:selectCustomerDetail.value,
                FromDate:formatted_from_date,
                ToDate:formatted_to_date,
                AgencyId:selectAgencyDetail.value,
                PaymentTypeCode:selectPaymenttypeDetail.value,
                ReportType:'CashClosure'
            })
            }
           
            fetch(
              `${api.api_url}/collection-app/CashClosureReceiptList`,
              listRequestOptions
            )
              .then((res) => res.json())
              .then((json) => {
                let status = 0
                status = json ? (json.body ? json.body.status : 0) : 0
                if (status === 200) {              
                  const receiptArray = json ? json.body ? json.body.closure_receipt_list : [] : []  
                  console.log(receiptArray, 'receiptArray')         
                  setReceiptList(receiptArray)
                  let total_cash = 0
                  receiptArray.map(e => {
                      total_cash =  parseFloat(total_cash) + parseFloat(e['receipt_amount'])
                  })
                  setTotalCash(total_cash)
                } else {
                  setReceiptList([])
                  setTotalCash(0)
                }
              })
       
    } catch (error) {
      console.log(error)
    }
  }
  const closeCash = () => {
    if (selectedData.length === 0) {
      toast.error("Please select atleast one receipt", {
        duration: 2000,
        style: { color: "#000", backgroundColor: "#d7d2d2" }
      })
      return false
    } else {
      const receipt_ids = []
      selectedData.forEach((receiptData) => {
        receipt_ids.push(receiptData.id)
      })
      try { 
          
        const listRequestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
            // 'Authorization': 'Bearer my-token',
          },
          body: JSON.stringify({
            ReceiptList:receipt_ids
            
        })
        }
       
        fetch(
          `${api.api_url}/collection-app/CashClosure`,
          listRequestOptions
        )
          .then((res) => res.json())
          .then((json) => {
            let status = 0
            status = json ? json.status : 0
            if (status === 200) {              
              toast.success("Updated Sucessfully", {
                duration: 2000,
                style: { color: "#000", backgroundColor: "#d7d2d2" }
              })
              getReceiptList()
            }
          })
   
} catch (error) {
  console.log(error)
}
    }

    
  }
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
    
       
            // Login API call
            fetch(
              `${api.api_url}/sales-import/listoutAgencyJwt`, 
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
                        const arrayToSend = []
                        const agencyArray = json ? json.body ? json.body.AgencyList : [] : []
                        agencyArray.forEach((e) => {
                          const agencyJson = {
                            label: e.agency_name,
                            value: e.agency_id
                          }
                          arrayToSend.push(agencyJson)
                        })
                        setagencyDetail(arrayToSend)
                        setAgencyMasterList(arrayToSend)
                      
                      } else {
                        setagencyDetail([])
                        setAgencyMasterList([])
      
                      }
                    })
                } else {
                  setagencyDetail([])
                  setAgencyMasterList([])

                }
              })
        
    } catch (error) {
      console.log(error)
    }
  
  
  }
  const getPaymenttypeList = () => {
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Authorization': 'Bearer my-token',
      }   
    }
        try {
    
       
            // Login API call
            fetch(
              `${api.api_url}/collection-app/PaymentTypeList`, 
              requestOptions
            )
              .then((res) => res.json())
              .then((json) => {
                let status = 0
                status = json ? (json.body ? json.body.status : 0) : 0
                if (status === 200) {
                  const arrayToSend = []
                  const paymentTypeArray = json ? json.body ? json.body.payment_type_list : [] : []
                  paymentTypeArray.forEach((e) => {
                    const paymentTypeJson = {
                      label: e.payment_type,
                      value: e.id.toString()
                    }
                    arrayToSend.push(paymentTypeJson)
                  })
                  setPaymenttypeDetail(arrayToSend)
                  setPaymenttypeMasterList(arrayToSend)
                } else {
                  setPaymenttypeDetail([])
                  setPaymenttypeMasterList([])

                }
              })
        
    } catch (error) {
      console.log(error)
    }
  
  
  }
  const apply_agency = (e) => {
    setselectAgencyDetail(e.target.value)
    if (e.target.value.length === 0) {
      setagencyDetail([])
    }
    if (e.target.value && e.target.value.length === 3) {
      setagencyDetail(agencyMasterList)
    }
  }
  const agencyinputchange = (e, newValue) => {

    setagencyinputValue(newValue)
  }

  const apply_paymenttype = (e) => {
    setselectPaymenttypeDetail(e.target.value)
    if (e.target.value.length === 0) {
      setpaymenttypeDetail([])
    }
    if (e.target.value && e.target.value.length === 3) {
      setpaymenttypeDetail(paymenttypeMasterList)
    }
  }
  const paymenttypeinputchange = (e, newValue) => {

    setpaymenttypeinputValue(newValue)
  }

  const conditionalRowStyles = [
    {
      when: row => row.id === 164,
      style: {
        backgroundColor: 'lightgrey',
        color: 'white',
        '&:hover': {
          cursor: 'pointer'
        }
      }
    }   // You can also pass a callback to style for additional customization
    
  ]

  useEffect(() => {
    getCompanyList()
    getAgencyList()
    getPaymenttypeList()
  }, []) 

  return (
    <div className='invoice-list-wrapper'>
        <Row style={{justifyContent:'end', marginBottom:'10px'}}>
        <Col lg='2'>
        <Button color='primary' style={{cursor:'pointer'}} onClick={() => {
                    closeCash()
                  }}>
                Sync to Tally
          </Button></Col> 
     
        </Row>
           
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Cash Closure</CardTitle>
        </CardHeader>
        <CardBody>
          <Row className='mx-0 mt-1 mb-50'>
            <Col md='8' className='d-flex align-items-center'>
              <div className='d-flex align-items-center me-2'>
                <label htmlFor='rows-per-page'>Show</label>
                <Input
                  type='select'
                  id='rows-per-page'
                  value={rowsPerPage}
                  onChange={handlePerPage}
                  className='form-control ms-50 pe-3'
                >
                  <option value='10'>10</option>
                  <option value='25'>25</option>
                  <option value='50'>50</option>
                </Input>
              </div>
            </Col>
            <Col md='4' className='actions-right d-flex align-items-center'>
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
          </Row>

          <Row className='mt-1 mb-50'>
            <Col lg='3' md='6' className='mb-1'>
            <Label className='form-label'>
                Company
                    </Label>
              <Autocomplete
                options={companyDetail}
                fullWidth
                PaperComponent={({ children }) => (
                  <Paper className="autooption" >{children}</Paper>
                )}
                getOptionLabel={(option) => (option ? option.label : "")}

                getOptionSelected={(option, value) => (
                  Number(option.value) === Number(value)
                )}
                inputValue={companyinputValue}
                onInputChange={(event, newInputValue) => {
                  companyinputchange(event, newInputValue)
                }}
                value={selectCompanyDetail.value}
                onChange={(e, newValue, reason) => {
                  setselectCompanyDetail(newValue)
                  getCustomerList(newValue)
                  if (reason === 'clear') {
                    
                    setselectCompanyDetail('')
                    setselectCustomerDetail('')
                    setcustomerinputValue('')
                    setcustomerDetail([])
                    setCustomerMasterList([])
  
                  }
                }}
                renderOption={(option) => (
                  <div className="autooption">
                    {option.label}
                  </div>
                )}
                renderInput={(params) => {
                  const inputProps = params.inputProps
                  inputProps.autoComplete = 'off'
                  return (
                    <TextField
                      {...params}
                      inputProps={inputProps}
                      onChange={(e, newValue) => {
                        apply_company(e, newValue)
                      }}
                      placeholder='Company Name '
                      variant='outlined'
                      className="auto_item"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  )
                }}
              />
            </Col>
            <Col lg='3' md='6' className='mb-1'>
            <Label className='form-label'>
                Customer
                    </Label>
              <Autocomplete
                options={customerDetail}
                fullWidth
                PaperComponent={({ children }) => (
                  <Paper className="autooption" >{children}</Paper>
                )}
                getOptionLabel={(option) => (option ? option.label : "")}

                getOptionSelected={(option, value) => (
                  Number(option.value) === Number(value)
                )}
                inputValue={customerinputValue}
                onInputChange={(event, newInputValue) => {
                  customerinputchange(event, newInputValue)
                }}
                value={selectCustomerDetail.value}
                onChange={(e, newValue, reason) => {
                  setselectCustomerDetail(newValue)
                  if (reason === 'clear') {
                    setselectCustomerDetail('')
                 
                  }
                }}
                renderOption={(option) => (
                  <div className="autooption">
                    {option.label}
                  </div>
                )}
                renderInput={(params) => {
                  const inputProps = params.inputProps
                  inputProps.autoComplete = 'off'
                  return (
                    <TextField
                      {...params}
                      inputProps={inputProps}
                      onChange={(e, newValue) => {
                        apply_customer(e, newValue)
                      }}
                      placeholder='Customer '
                      variant='outlined'
                      className="auto_item"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  )
                }}
              />
            </Col>
            <Col lg='3' md='6' className='mb-1'>
            <Label className='form-label'>
                Agency
                    </Label>
              <Autocomplete
                options={agencyDetail}
                fullWidth
                PaperComponent={({ children }) => (
                  <Paper className="autooption" >{children}</Paper>
                )}
                getOptionLabel={(option) => (option ? option.label : "")}

                getOptionSelected={(option, value) => (
                  Number(option.value) === Number(value)
                )}
                inputValue={agencyinputValue}
                onInputChange={(event, newInputValue) => {
                  agencyinputchange(event, newInputValue)
                }}
                value={selectAgencyDetail.value}
                onChange={(e, newValue, reason) => {
                  setselectAgencyDetail(newValue)
                  if (reason === 'clear') {
                    setselectAgencyDetail('')
                 
                  }
                }}
                renderOption={(option) => (
                  <div className="autooption">
                    {option.label}
                  </div>
                )}
                renderInput={(params) => {
                  const inputProps = params.inputProps
                  inputProps.autoComplete = 'off'
                  return (
                    <TextField
                      {...params}
                      inputProps={inputProps}
                      onChange={(e, newValue) => {
                        apply_agency(e, newValue)
                      }}
                      placeholder='Agency'
                      variant='outlined'
                      className="auto_item"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  )
                }}
              />
            </Col>
            <Col lg='3' md='6' className='mb-1'>
            <Label className='form-label'>
                Payment Type
                    </Label>
              <Autocomplete
                options={paymenttypeDetail}
                fullWidth
                PaperComponent={({ children }) => (
                  <Paper className="autooption" >{children}</Paper>
                )}
                getOptionLabel={(option) => (option ? option.label : "")}

                getOptionSelected={(option, value) => (
                  Number(option.value) === Number(value)
                )}
                inputValue={paymenttypeinputValue}
                onInputChange={(event, newInputValue) => {
                  paymenttypeinputchange(event, newInputValue)
                }}
                value={selectPaymenttypeDetail.value}
                onChange={(e, newValue, reason) => {
                  setselectPaymenttypeDetail(newValue)
                  if (reason === 'clear') {
                    setselectPaymenttypeDetail('')
                 
                  }
                }}
                renderOption={(option) => (
                  <div className="autooption">
                    {option.label}
                  </div>
                )}
                renderInput={(params) => {
                  const inputProps = params.inputProps
                  inputProps.autoComplete = 'off'
                  return (
                    <TextField
                      {...params}
                      inputProps={inputProps}
                      onChange={(e, newValue) => {
                        apply_paymenttype(e, newValue)
                      }}
                      placeholder='Payment Type'
                      variant='outlined'
                      className="auto_item"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  )
                }}
              />
            </Col>
           <Col lg='3' md='6' className='mb-1'>

              <Label className='form-label' for='email'>
                From Date
                    </Label>
              <InputGroup className='flex-nowrap'>
                <Flatpickr
                  ref={fromdatefp}
                  options={{  dateFormat: 'd-m-Y' }}
                  value={fromdate}
                  id='date-picker'
                  className='form-control'
                  onChange={e => apply_fromfilterdate(e)}
                />
                <InputGroupText
                  onClick={() => {
                    fromdatefp.current.flatpickr.open()
                  }}
                >
                  <Calendar size={14}></Calendar>
                </InputGroupText>
              </InputGroup>
            </Col>
            <Col lg='3' md='6' className='mb-1'>
              <Label className='form-label' for='email'>
                To Date
                    </Label>
              <InputGroup className='flex-nowrap'>
                <Flatpickr
                  ref={todatefp}
                  options={{  dateFormat: 'd-m-Y' }}
                  value={todate}
                  id='date-picker'
                  className='form-control'
                  onChange={e => apply_tofilterdate(e)}
                />
                <InputGroupText
                  onClick={() => {
                    todatefp.current.flatpickr.open()
                  }}
                >
                  <Calendar size={14}></Calendar>
                </InputGroupText>
              </InputGroup>
            </Col>
           
            <Col lg='1' md='6' className='mb-1 margin-top'>
              <Button color='primary' onClick={() => {
                    getReceiptList()
                  }}>
                View
          </Button>
            </Col>
            <div className='react-dataTable'>
          
            </div>
          </Row>
                <div style={{textAlign:'end', fontSize:16}}><span style={{color:'#000'}}>Total Collection : </span><span style={{color:'#b3003b', fontWeight:700}}>{'₹'}{totalCash}</span></div>
          <DataTable
             
              pagination
              // sortServer
              // paginationServer
              noDataComponent="There are no records to display"
              subHeader={true}
              columns={columns}
              responsive={true}
              
              data={receiptList}
              sortIcon={<ChevronDown />}
              className='react-dataTable'
              defaultSortField='id'
              selectableRows
              selectableRowsComponent={Checkbox} 
              onSelectedRowsChange={handleChange}
              conditionalRowStyles={conditionalRowStyles}

              // subHeaderComponent={
              //   <CustomHeader
              //     // value={value}
              //     // statusValue={statusValue}
              //     // rowsPerPage={rowsPerPage}
              //     // // handleFilter={handleFilter}
              //     // handlePerPage={handlePerPage}
              //     // handleStatusValue={handleStatusValue}
              //     showItemPopup={showItemPopup}
              //   />
              // }
            />
        </CardBody>
      </Card>

      <Modal isOpen={detailsModal} toggle={() => {

        setDetailsModal(!detailsModal)
      }}
        className='vertically-centered-modal' fade={false}>
        <ModalHeader toggle={() => setDetailsModal(!detailsModal)}>{'#'}{receiptNumber}</ModalHeader>
        <ModalBody>
        {billList.length > 0 ?   <div style={{ borderBottom:'0.1px solid #efefef', padding:'5px', borderStyle:'solid', borderTop:0, borderRight:0, borderLeft:0}}><Row className='invoice-spacing'>
        <div className='col-md-6'>Payment Type</div>
        <div className='col-md-6'>{': '}{billList[0]['payment_type']}</div>
      </Row>
      <Row className='invoice-spacing'>
      <div className='col-md-6'>Remarks</div>
      <div className='col-md-6'>{': '}{billList[0]['narration']}</div>
    </Row></div> : null}
        {billList.map(item => (
          <div style={{ borderBottom:'0.2px solid #efefef', padding:'5px', borderStyle:'solid', borderTop:0, borderRight:0, borderLeft:0}}>
               <Row className='invoice-spacing'>
        <div className='col-md-6'>Bill Number</div>
        <div className='col-md-6'>{': '}{item.bill_number}</div>
      </Row>
      <Row className='invoice-spacing'>
      <div className='col-md-6'>Bill date</div>
        <div className='col-md-6'>{': '}{item.bill_date}</div>
          </Row>
          <Row className='invoice-spacing'>
          <div className='col-md-6'>Bill Amount</div>
          {item.calculated_bill_amount === "0" || item.calculated_bill_amount === 0 ?  <div className='col-md-6'>{': -'}</div> :  <div className='col-md-6'>{': Rs.'}{item.calculated_bill_amount}</div>}
      
          </Row>
          <Row className='invoice-spacing'>
          <div className='col-md-6'>Paid Amount</div>
          {item.paid_amount === "0" || item.paid_amount === 0 ?  <div className='col-md-6'>{': -'}</div> :  <div className='col-md-6'>{': Rs.'}{item.paid_amount}</div>}
      
          </Row>
          <Row className='invoice-spacing'>
          <div className='col-md-6'>Discount Amount</div>
          {item.discount === "0" || item.discount === 0 ?  <div className='col-md-6'>{': -'}</div> :  <div className='col-md-6'>{': Rs.'}{item.discount}</div>}
      
          </Row>
          <Row className='invoice-spacing'>
          <div style={{borderStyle:'solid', borderColor:'#ededed', borderBottomWidth:'0.1px !important', borderWidth:0, paddingBottom:'2px'}} className='col-md-6'>Settled</div>
         {item.settlement === "Yes" ?  <div className='col-md-6' style={{color:'green'}}>{': '}{item.settlement}</div> :  <div className='col-md-6' style={{color:'red'}}>{': '}{item.settlement}</div>}
      
          </Row>
          </div>
     
    ))}
 
  
        </ModalBody>
        <ModalFooter>
      
          <Button color='primary' outline onClick={() =>  setDetailsModal(!detailsModal)}>
            Close
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default PayoutList
