// ** React Imports
import { Link } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import * as FileSaver from 'file-saver'
import { Workbook } from 'exceljs'
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
import { paginateArray } from '../../../utility/commonfunc'
import UILoader from '@components/ui-loader'
import moment from 'moment'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { toast } from "react-hot-toast"
const ReceiptList = () => {
  // ** Store vars
 
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

 
   const handleChange = (state) => {
    setSelectedData(state.selectedRows)
  }

  const export_file = () => {

   const company = selectCompanyDetail.label && selectCompanyDetail.label !== "" ? selectCompanyDetail.label : "All"
   const customer = selectCustomerDetail.label && selectCustomerDetail.label !== "" ? selectCustomerDetail.label : "All"
   const paymentType = selectPaymenttypeDetail.label && selectPaymenttypeDetail.label !== "" ? selectPaymenttypeDetail.label : "All"
   const agency = selectAgencyDetail.label && selectAgencyDetail.label !== "" ? selectAgencyDetail.label : "All"


    let receipt_report = []
    if (receiptList && receiptList.length > 0) {
      receipt_report = receiptList.map((e) => {
     

        return {
          "Receipt ID": e['id'], "Receipt Date": e['receipt_date'], "Customer Name": e['customer_name'], "Voucher Type": e['voucher_type_name'], "Payment Type": e['payment_type'], "Receipt Amount": e['receipt_amount']
        }
      })
    } else {
      receipt_report.push({
        "Receipt ID":"", "Receipt Date": "", "Customer Name": "", "Voucher Type":"", "Payment Type": "", "Receipt Amount": ""
      })
    }
    const data_array = []
    receipt_report.forEach((row) => {
      data_array.push(Object.values(row))
    })
    const title = 'Receipt Report from '
    const frontside = '('
    const backside = ')'
    const tofrontside = '  to ('
    const reportData = {
      title: title + frontside + moment(new Date(fromdate)).format("DD-MM-YYYY") + backside + tofrontside + moment(new Date(todate)).format("DD-MM-YYYY") + backside,
      data: data_array,
      headers: Object.keys(receipt_report[0])
    }
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet('Receipt Report')
    worksheet.mergeCells('A1', 'H1')
    const titleRow = worksheet.getCell('A1')
    titleRow.value = reportData['title']
    titleRow.font = {
      name: 'Calibri',
      size: 16,
      bold: true,
      color: { argb: '000000' }
    }
    const companyLabel = 'Company : '
    const agencyLabel = 'Sales Man :'
    const customerLabel = 'Customer :'
    const paymentTypeLabel = 'Payment Type :'

    const filterColumn1 = worksheet.getCell('A2')
    filterColumn1.value =  companyLabel + company
    filterColumn1.font = {
      name: 'Calibri',
      size: 12,
      color: { argb: '000000' }
    }
    const filterColumn2 = worksheet.getCell('B2')
    filterColumn2.value =  agencyLabel + agency
    filterColumn2.font = {
      name: 'Calibri',
      size: 12,
      color: { argb: '000000' }
    }
  
  const filterColumn3 = worksheet.getCell('C2')
  filterColumn3.value =  customerLabel + customer
  filterColumn3.font = {
    name: 'Calibri',
    size: 12,
    color: { argb: '000000' }
  }

const filterColumn4 = worksheet.getCell('D2')
filterColumn4.value =  paymentTypeLabel + paymentType
filterColumn4.font = {
  name: 'Calibri',
  size: 12,
  color: { argb: '000000' }
}
    //Adding Header Row
    const headerRow = worksheet.addRow(reportData['headers'])
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'f73554' },
        bgColor: { argb: '' }
      }
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12
      }
    })

    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }
    data_array.forEach(d => {
      worksheet.addRow(d)
    }
    )


    worksheet.getColumn(1).width = 20
    worksheet.getColumn(2).width = 20
    worksheet.getColumn(3).width = 20
    worksheet.getColumn(4).width = 20
    worksheet.getColumn(5).width = 20
    worksheet.getColumn(6).width = 20
    worksheet.getColumn(7).width = 20
    worksheet.getColumn(8).width = 20
    worksheet.getColumn(9).width = 20
    worksheet.getColumn(10).width = 20
    worksheet.getColumn(11).width = 20
    worksheet.getColumn(12).width = 20
    worksheet.getColumn(4).alignment = { vertical: 'middle', horizontal: 'right', wrapText: true }
    worksheet.getColumn(5).alignment = { vertical: 'middle', horizontal: 'right', wrapText: true }
    worksheet.getColumn(6).alignment = { vertical: 'middle', horizontal: 'right', wrapText: true }
    worksheet.getColumn(7).alignment = { vertical: 'middle', horizontal: 'right', wrapText: true }
    worksheet.getColumn(9).alignment = { vertical: 'middle', horizontal: 'right', wrapText: true }
    worksheet.getColumn(10).alignment = { vertical: 'middle', horizontal: 'right', wrapText: true }
    worksheet.getColumn(11).alignment = { vertical: 'middle', horizontal: 'right', wrapText: true }

    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: EXCEL_TYPE })
      FileSaver.saveAs(blob, 'Receipt Report.xlsx')
    })
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
      id:'id', 
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
      minWidth: '300px', 
        id:'customer_name',    
        selector: row => row.customer_name,
      // selector: row => row.client.name,
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
      id:'payment_type',
      selector: row => row.payment_type,
      // selector: row => row.client.name,
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
      id:'receipt_amount',  
      selector: row => row.receipt_amount,  
      // selector: row => row.client.name,
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
                ReportType:'ReceiptReport'
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
                  setReceiptList(receiptArray)
                } else {
                  setReceiptList([])
                }
              })
       
    } catch (error) {
      console.log(error)
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

  useEffect(() => {
    getCompanyList()
    getAgencyList()
    getPaymenttypeList()
  }, []) 

  return (
    <div className='invoice-list-wrapper'>
      
           
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Receipt Report</CardTitle>
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
            <Col lg='1' md='6' className='mb-1 margin-top'>
              <Button color='primary' onClick={() => {
                    export_file()
                  }}>
                Export
          </Button>
            </Col>
            <div className='react-dataTable'>
          
            </div>
          </Row>

          <DataTable
             
              pagination
      
              noDataComponent="There are no records to display"
              subHeader={true}
              columns={columns}
              responsive={true}
      
              data={receiptList}
              sortIcon={<ChevronDown />}
              className='react-dataTable'
              defaultSortField='id'
            //  selectableRows
              onSelectedRowsChange={handleChange}

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
          <div style={{color:'#000000', borderBottom:'0.1px solid #efefef', padding:'5px', borderStyle:'solid', borderTop:0, borderRight:0, borderLeft:0}}>
               <Row className='invoice-spacing'>
        <div className='col-md-6'>Bill Number</div>
        <div className='col-md-6'>{': '}{item.bill_number}</div>
      </Row>
      <Row className='invoice-spacing'>
      <div className='col-md-6'>Bill date</div>
        <div className='col-md-6'>{': '}{item.bill_date}</div>
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
          <div className='col-md-6'>Settled</div>
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

export default ReceiptList
