// ** React Imports

import React, { useState,  useEffect } from 'react'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { ChevronDown, Calendar, Eye } from 'react-feather'
import DataTable from 'react-data-table-component'
// ** Reactstrap Imports
import '../../../assets/style/style.css'
import "./inward_css.scss"
// ** Reactstrap Imports
import {
  Row,
  Col, Label, Card, CardHeader, CardTitle, CardBody, UncontrolledTooltip, Input, Button
} from 'reactstrap'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const TotalRecordsCard = ({ totalRecords }) => {
  return (
    <div className="col-sm-6 col-lg-3 card_box_head total_record">
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bolder mb-0">{totalRecords}</h2>
            <p className="card-text">Total Products</p>
          </div>
          <div style={{ marginLeft: "20px" }} className="avatar avatar-stats p-50 bg-light-primary">
            <div className="avatar-content">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <rect x="9" y="9" width="6" height="6"></rect>
                <line x1="9" y1="1" x2="9" y2="4"></line>
                <line x1="15" y1="1" x2="15" y2="4"></line>
                <line x1="9" y1="20" x2="9" y2="23"></line>
                <line x1="15" y1="20" x2="15" y2="23"></line>
                <line x1="20" y1="9" x2="23" y2="9"></line>
                <line x1="20" y1="14" x2="23" y2="14"></line>
                <line x1="1" y1="9" x2="4" y2="9"></line>
                <line x1="1" y1="14" x2="4" y2="14"></line>
              </svg>
            </div>
          </div>
        </div>
      </CardBody>
    </div>
  )
}

const CardPurchase = ({ totalRecords }) => {
  return (
    <div className="col-sm-6 col-lg-3 card_box_head total_purchase">
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bolder mb-0">{totalRecords}</h2>
            <p className="card-text">Total Purchase</p>
          </div>
          <div style={{ marginLeft: "20px" }} className="avatar avatar-stats p-50 bg-light-primary">
            <div className="avatar-content">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <rect x="9" y="9" width="6" height="6"></rect>
                <line x1="9" y1="1" x2="9" y2="4"></line>
                <line x1="15" y1="1" x2="15" y2="4"></line>
                <line x1="9" y1="20" x2="9" y2="23"></line>
                <line x1="15" y1="20" x2="15" y2="23"></line>
                <line x1="20" y1="9" x2="23" y2="9"></line>
                <line x1="20" y1="14" x2="23" y2="14"></line>
                <line x1="1" y1="9" x2="4" y2="9"></line>
                <line x1="1" y1="14" x2="4" y2="14"></line>
              </svg>
            </div>
          </div>
        </div>
      </CardBody>
    </div>
  )
}

const CardTax = ({ totalRecords }) => {
  return (
    <div className="col-sm-6 col-lg-3 card_box_head total_tax">
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bolder mb-0">{totalRecords}</h2>
            <p className="card-text">Total Tax</p>
          </div>
          <div style={{ marginLeft: "20px" }} className="avatar avatar-stats p-50 bg-light-primary">
            <div className="avatar-content">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <rect x="9" y="9" width="6" height="6"></rect>
                <line x1="9" y1="1" x2="9" y2="4"></line>
                <line x1="15" y1="1" x2="15" y2="4"></line>
                <line x1="9" y1="20" x2="9" y2="23"></line>
                <line x1="15" y1="20" x2="15" y2="23"></line>
                <line x1="20" y1="9" x2="23" y2="9"></line>
                <line x1="20" y1="14" x2="23" y2="14"></line>
                <line x1="1" y1="9" x2="4" y2="9"></line>
                <line x1="1" y1="14" x2="4" y2="14"></line>
              </svg>
            </div>
          </div>
        </div>
      </CardBody>
    </div>
  )
}

const CardSales = ({ totalRecords }) => {
  return (
    <div className="col-sm-6 col-lg-3 card_box_head total_sales">
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bolder mb-0">{totalRecords}</h2>
            <p className="card-text">Total Sales</p>
          </div>
          <div style={{ marginLeft: "20px" }} className="avatar avatar-stats p-50 bg-light-primary">
            <div className="avatar-content">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <rect x="9" y="9" width="6" height="6"></rect>
                <line x1="9" y1="1" x2="9" y2="4"></line>
                <line x1="15" y1="1" x2="15" y2="4"></line>
                <line x1="9" y1="20" x2="9" y2="23"></line>
                <line x1="15" y1="20" x2="15" y2="23"></line>
                <line x1="20" y1="9" x2="23" y2="9"></line>
                <line x1="20" y1="14" x2="23" y2="14"></line>
                <line x1="1" y1="9" x2="4" y2="9"></line>
                <line x1="1" y1="14" x2="4" y2="14"></line>
              </svg>
            </div>
          </div>
        </div>
      </CardBody>
    </div>
  )
}

const CustomHeader = ({  totalRecords, totalPurchase, totalTax, totalSales }) => {
  return (
    <div className="invoice-list-table-header w-100">
      <Row className="mb-0">
        <Col  className="d-flex align-items-center ml-auto">
          <TotalRecordsCard totalRecords={totalRecords} />
          <CardPurchase totalRecords={totalPurchase} />
          <CardTax totalRecords={totalTax} />
          <CardSales totalRecords={totalSales} />
        </Col>

      </Row>
    </div>
  )
}

const PriceChange = () => {
  // ** Store vars

  // const user_id = JSON.parse(localStorage.getItem('userDetails'))
  const [inwardList, setInwardList] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const handleChange = (state) => {
    setSelectedData(state.selectedRows)
  }

  const onChangeSalesAmount = (text, index) => {
    if (text !== "" && index !== undefined) {
      console.log(text)
      console.log(index)
      const newData = [...inwardList] // Create a copy of the original data array
      newData[index].sales_amount = text.replace(/[^0-9]/g, '') // Update the data at the specified index
      setInwardList(newData)
    }
  }

  const onChangeCheckboxChange = (event, index) => {
    if (index !== undefined) {
      const newData = [...inwardList] // Create a copy of the original data array
      newData[index].checked = event.target.checked
      if (event.target.checked === true) {
        newData[index].read_only = false
      } else {
        newData[index].read_only = true
      }
      setInwardList(newData)
    }
  }

  const columns = [
    {
      name: 'Action',
      minWidth: '30px',
      cell: (row, index) => (
        <div style={{ cursor: 'pointer' }} className='column-action d-flex align-items-center'>
          
          <Input type='checkbox' checked={row.checked} onChange={(event) => onChangeCheckboxChange(event, index)}></Input>
        </div>
      )
    },

    {
      name: 'S.No.',
      sortable: true,
      minWidth: '10px',
      id: 'id',
      selector: row => row.id,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{'#'}{row.id}</h6>
          </div>

        )
      }
    },
    {
      name: 'IMEI No.',
      sortable: true,
      minWidth: '160px',
      id: 'imei_no',
      selector: row => row.id,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.imei_no}</h6>
          </div>

        )
      }
    },

  
    {
      name: 'Product Name',
      sortable: true,
      minWidth: '180px',
      id: 'product_name',
      selector: row => row.product_name,
      // selector: row => row.client.name,
      cell: row => {
        return (
          <div className='justify-content-left  paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.product_name}</h6>
          </div>

        )
      }
    },
    // {
    //   name: 'Brand',
    //   sortable: true,
    //   minWidth: '80px',
    //   id: 'brand',
    //   selector: row => row.brand,
    //   cell: row => {
    //     return (
    //       <div className='justify-content-left align-items-center paddingtop-1'>
    //         <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.brand}</h6>
    //       </div>

    //     )
    //   }
    // },
    {
      name: 'Pur Amt',
      sortable: true,
      minWidth: '100px',
      right: true,
      id: 'purchase_amount',
      selector: row => row.purchase_amount,
      cell: row => {
        return (
          <div className='justify-content-right align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.purchase_amount}</h6>
          </div>

        )
      }
    },
    {
      name: 'Servify Fee',
      sortable: true,
      minWidth: '100px',
      right: true,
      id: 'service',
      selector: row => row.service,
      cell: row => {
        return (
          <div className='justify-content-right align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.service}</h6>
          </div>

        )
      }
    },
    {
      name: 'VAT',
      sortable: true,
      minWidth: '100px',
      right: true,
      id: 'vat',
      selector: row => row.vat,
      cell: row => {
        return (
          <div className='justify-content-right align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.vat}</h6>
          </div>

        )
      }
    },
    {
      name: 'Old sales Amt',
      sortable: true,
      minWidth: '120px',
      right: true,
      id: 'total',
      selector: row => row.total,
      cell: row => {
        return (
          <div className='justify-content-right align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.total}</h6>
          </div>

        )
      }
    },
    {
      name: 'Sales Amt',
      sortable: true,
      minWidth: '120px',
      id: 'sales_amount',
      selector: row => row.sales_amount,
      cell: (row, index) => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <Input type='text' style={{textAlign:"right"}} readOnly={row.read_only} maxLength={50} width={100} onBlur={(event) => onChangeSalesAmount(event.target.value)} autoComplete="off" id='item' value={row.sales_amount} onChange={(event) => onChangeSalesAmount(event.target.value, index)} />
          </div>

        )
      }
    }

  ]


  const getInwardList = () => {
    setInwardList([{ id: '1', imei_no: '353906104983912', product_name: 'iPhone 11 Pro Max', brand: 'Apple', purchase_amount: '100', service: '20', vat: '10', total: '130', sales_amount: 1, checked: false, read_only: true }, { id: '2', imei_no: '353906104983913', product_name: 'iPhone 13 Pro Max', brand: 'Apple', purchase_amount: '200000', service: '20', vat: '10', total: '20030', sales_amount: 1, checked: false, read_only: true }])
  }

  const handleFilter = e => {
    const value = e.target.value
    setSearchValue(value)
  }

  useEffect(() => {
    getInwardList()
  }, [])

  return (
    <div className='invoice-list-wrapper'>


      <Card>
        <CardHeader className='border-bottom' style={{justifyContent:"flex-start"}}>
          <CardTitle tag='h4'>Price Change</CardTitle>
          <div className="row datatable-header header">
            <CustomHeader totalRecords={100} totalPurchase={'20,000'} totalTax={'1,000'} totalSales={'30,0000'} />
          </div>
        </CardHeader>
        <CardBody>
          <Row className='justify-content-end mx-0'>
            <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
              <Label className='me-1' for='search-input'>
                Search
              </Label>
              <Input style={{ maxWidth:"258px"}}
                className='mb-50'
                type='text'
                bsSize='sm'
                id='search-input'
                value={searchValue}
                onChange={handleFilter}
              />
            </Col>
          </Row>
          <div className='sc-dmctIk fuLPYh react-dataTable'>
          <DataTable
            noDataComponent="There are no records to display"
            subHeader={true}
            columns={columns}
            responsive={true}
              searchable
            data={inwardList}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='id'
            //  selectableRows
            onSelectedRowsChange={handleChange}
          />
          </div>
        </CardBody>
        <CardBody className='invoice-padding' style={{display: 'flex', justifyContent: 'flex-end',   paddingRight: '4%'}}>
          <Row>
            <Col className='d-flex' md={{ size: 9, offset: 3 }}>
              <Button className='me-1' color='primary' type='submit'>
                Submit
              </Button>              
            </Col>
            </Row>
        </CardBody>
      </Card>

    </div>
  )
}

export default PriceChange
