// ** React Imports
import React, { useState, useEffect } from 'react'
// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
// ** Reactstrap Imports
import { Button, Row, Col, Card, Label, Input, CardBody } from 'reactstrap'
import UILoader from '@components/ui-loader'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const CustomHeader = ({ brandValue, locationValue, statusValue, totalRecords, searchValue, handleStatusValue, handleBrandValue, handleLocationValue,  showItemPopup, brandMasterList, locationMasterList, statusMasterList, handleFilter }) => {
  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row className='pb-2 align-items-center'>
        <Col md='2'>
          <div className='d-flex flex-column align-items-start'>
            <label htmlFor='rows-per-page'>Brand</label>
            <Select
              isClearable={false}
              options={brandMasterList}
              className='react-select ms-50 me-2 '
              value={brandMasterList.find((e) => e.value === brandValue)}
              onChange={(e) => handleBrandValue(e.value)}
            />
          </div>
        </Col>
        <Col md='2'>
          <div className='d-flex flex-column align-items-start'>
            <label htmlFor='search-location'>Product</label>
            <Select
              isClearable={false}
              options={locationMasterList}
              className='react-select ms-50 me-2 '
              value={locationMasterList.find((e) => e.value === locationValue)}
              onChange={(e) => handleLocationValue(e.value)}
            />
          </div>
        </Col>
        <Col md='2'>
          <div className='d-flex flex-column align-items-start'>
            <label htmlFor='search-invoice'>Status</label>
            <Select
              isClearable={false}
              options={statusMasterList}
              className='react-select ms-50 me-2 '
              value={statusMasterList.find((e) => e.value === statusValue)}
              onChange={(e) => handleStatusValue(e.value)}
            />
          </div>
        </Col>
        
        <Col md='2'>
          <div className='d-flex flex-column align-items-start'>
            <label>&nbsp;</label>
            <Button color='primary' onClick={showItemPopup}>
              Show
            </Button>
          </div>
        </Col>
      </Row>
      
      <Row className='justify-content-end mx-0'>
      <Col md="4" className="d-flex align-items-center ml-auto">
          <TotalRecordsCard totalRecords={totalRecords} />
        </Col>
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
            onChange={(e) => handleFilter(e)}
          />
        </Col>
      </Row>
    </div>
  )
}

const TotalRecordsCard = ({ totalRecords }) => {
  return (
    <div className="card_box">
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

const Stock = () => {
  const [brandValue, setBrandValue] = useState('')
  const [locationValue, setLocationValue] = useState('')
  const [statusValue, setStatusValue] = useState('')
  const [result, setResult] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [loader, setLoader] = useState(false)
  const [brandMasterList, setBrandMasterList] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'One plus', value: 'One plus' },
    { label: 'Samsung', value: 'samsung' }
  ])
  const [locationMasterList, setLocationMasterList] = useState([
    { label: 'Galaxy 120', value:'Galaxy 120' },
    { label: 'iphone S12', value: 'iphone S12' },
    { label: 'One plus 7', value: 'One plus 7' }
  ])
  const [statusMasterList, setStatusMasterList] = useState([
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Cancelled', value: 'inactive' }
  ])
  const [currentPage] = useState(1)

  const handleFilter = (e) => {
    const value = e.target.value
    setSearchValue(value)
  }


  const handlePerPage = (e) => {
    // Handle per page logic
    console.log('Rows Per Page:', e.value)
  }

  const handleStatusValue = (value) => {
    // Handle status value logic
    console.log('Selected Status:', value)
    setStatusValue(value)
  }

  const handleBrandValue = (e) => {
    // Handle brand value logic
    console.log('Selected Brand:', e.value)
    setBrandValue(e.value)
  }

  
  const handleLocationValue = (value) => {
    // Handle location value logic
    console.log('Selected Location:', value)
    setLocationValue(value)
  }

  const showItemPopup = () => {
    // Handle show item popup logic
  }

  useEffect(async () => {
    setLoader(false)
    await setBrandMasterList(brandMasterList)
    await setLocationMasterList(locationMasterList)
    await setStatusMasterList(statusMasterList)
    await setResult([
      { id: '1', customer_name: '12267556542', payment_type: 'samsung', receipt_amount: '15000', Service_no:'673647832', VAT_type:'637.3', Sales_type:'Trade-in', Stock_type:'45'},
      { id: '2', customer_name: '83926821345', payment_type: 'iphone', receipt_amount: '67000', Service_no:'9898922', VAT_type:'3462.1', Sales_type:'Trade-in', Stock_type:'12' },
      { id: '3', customer_name: '87927762343', payment_type: 'one plus', receipt_amount: '72000', Service_no:'93786291', VAT_type:'578', Sales_type:'Trade-in', Stock_type:'72' },
      { id: '4', customer_name: '34519034511', payment_type: 'Redmi', receipt_amount: '9000', Service_no:'753527638', VAT_type:'462', Sales_type:'Trade-in', Stock_type:'29' },
      { id: '5', customer_name: '975263402490', payment_type: 'Xioami', receipt_amount: '10000', Service_no:'67263786274', VAT_type:'873.5', Sales_type:'Trade-in', Stock_type:'31'},
      { id: '6', customer_name: '378786829793', payment_type: 'techno', receipt_amount: '6000', Service_no:'4652373678', VAT_type:'4662', Sales_type:'Trade-in', Stock_type:'53'}
    ])
  }, [])

  const columns = [
    {
      name: 'S.no',
      sortable: true,
      minWidth: '100px',
      selector: 'id',
      cell: (row) => (
        <div className='justify-content-left align-items-center paddingtop-1'>
          <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{'#'}{row.id}</h6>
        </div>
      )
    },

    {
      name: 'IMEI No',
      sortable: true,
      minWidth: '300px',
      selector: 'customer_name',
      cell: (row) => (
        <div className='justify-content-left paddingtop-1'>
          <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.customer_name}</h6>
        </div>
      )
    },
    {
      name: 'Product name',
      sortable: true,
      minWidth: '100px',
      selector: 'payment_type',
      cell: (row) => (
        <div className='justify-content-left align-items-center paddingtop-1'>
          <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.payment_type}</h6>
        </div>
      )
    },
    {
      name: 'Purchase Amount',
      sortable: true,
      minWidth: '100px',
      selector: 'receipt_amount',
      cell: (row) => (
        <div className='justify-content-left align-items-center paddingtop-1'>
          <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.receipt_amount}</h6>
        </div>
      )
    },
    {
      name: 'Service No',
      sortable: true,
      minWidth: '100px',
      selector: 'Service_no',
      cell: (row) => (
        <div className='justify-content-left align-items-center paddingtop-1'>
          <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.Service_no}</h6>
        </div>
      )
    },
    {
      name: 'VAT',
      sortable: true,
      minWidth: '100px',
      selector: 'VAT_type',
      cell: (row) => (
        <div className='justify-content-left align-items-center paddingtop-1'>
          <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.VAT_type}</h6>
        </div>
      )
    },
    {
      name: 'Sales Amount',
      sortable: true,
      minWidth: '100px',
      selector: 'Sales_type',
      cell: (row) => (
        <div className='justify-content-left align-items-center paddingtop-1'>
          <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.Sales_type}</h6>
        </div>
      )
    },
    {
      name: 'Stock',
      sortable: true,
      minWidth: '100px',
      selector: 'Stock_type',
      cell: (row) => (
        <div className='justify-content-left align-items-center paddingtop-1'>
          <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.Stock_type}</h6>
        </div>
      )
    }
  ]

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='invoice-list-dataTable react-dataTable' style={{ marginBottom: '15px' }}>
          <UILoader blocking={loader}>
            <DataTable
              title='Stock'
              pagination
              noDataComponent='No records found'
              subHeader={true}
              columns={columns}
              responsive={true}
              data={result}
              sortIcon={<ChevronDown />}
              className='react-dataTable'
              defaultSortField='id'
              paginationDefaultPage={currentPage}
              subHeaderComponent={
                <CustomHeader
                  brandValue={brandValue}
                  locationValue={locationValue}
                  statusValue={statusValue}
                  searchValue= {searchValue}
                  handleFilter={(e) => handleFilter(e)}
                  handlePerPage={(e) => handlePerPage(e)}
                  handleStatusValue={(e) => handleStatusValue(e)}
                  handleBrandValue={(e) => handleBrandValue(e)}
                  handleLocationValue={(e) => handleLocationValue(e)}
                  showItemPopup={showItemPopup}
                  brandMasterList={brandMasterList}
                  locationMasterList={locationMasterList}
                  statusMasterList={statusMasterList}
                />
              }
            />
          </UILoader>
        </div>
      </Card>
    </div>
  )
}

export default Stock