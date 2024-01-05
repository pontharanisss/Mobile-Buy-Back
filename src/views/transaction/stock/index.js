// ** React Imports
import React, { useState, useEffect } from 'react'
// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
// ** Reactstrap Imports
import { Button, Row, Col, Card } from 'reactstrap'
import UILoader from '@components/ui-loader'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const CustomHeader = ({ brandValue, locationValue, statusValue, handleStatusValue, handleBrandValue, handleLocationValue, handleSearch, showItemPopup, brandMasterList, locationMasterList, statusMasterList }) => {
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
            <label htmlFor='search'>Search</label>
            <input
              type='text'
              className='form-control'
              placeholder='Enter your search term...'
              onChange={(e) => handleSearch(e.target.value)}
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
    </div>
  )
}

const Stock = () => {
  const [brandValue, setBrandValue] = useState('')
  const [locationValue, setLocationValue] = useState('')
  const [statusValue, setStatusValue] = useState('')
  const [result, setResult] = useState([])
  const [loader, setLoader] = useState(false)
  const [brandMasterList, setBrandMasterList] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Nokia', value: 'nokia' },
    { label: 'Samsung', value: 'samsung' }
  ])
  const [locationMasterList, setLocationMasterList] = useState([
    { label: 'Kadalur', value: 'kadalur' },
    { label: 'Madurai', value: 'madurai' },
    { label: 'Chennai', value: 'chennai' }
  ])
  const [statusMasterList, setStatusMasterList] = useState([
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Cancelled', value: 'inactive' }
  ])
  const [currentPage] = useState(1)

  const handleFilter = (val) => {
    // Handle filter logic
    console.log('Search Value:', val)
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
      { id: '1', customer_name: 'uma', payment_type: 'cash', receipt_amount: '1000' },
      { id: '2', customer_name: 'gopi', payment_type: 'cash', receipt_amount: '1000' },
      { id: '3', customer_name: 'harjith', payment_type: 'cash', receipt_amount: '1000' },
      { id: '4', customer_name: 'jk', payment_type: 'cash', receipt_amount: '1000' },
      { id: '5', customer_name: 'kumar', payment_type: 'cash', receipt_amount: '1000' },
      { id: '6', customer_name: 'ajay', payment_type: 'cash', receipt_amount: '1000' }
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
      selector: 'payment_type',
      cell: (row) => (
        <div className='justify-content-left align-items-center paddingtop-1'>
          <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.payment_type}</h6>
        </div>
      )
    },
    {
      name: 'VAT',
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
      name: 'Sales Amount',
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
      name: 'Stock',
      sortable: true,
      minWidth: '100px',
      selector: 'payment_type',
      cell: (row) => (
        <div className='justify-content-left align-items-center paddingtop-1'>
          <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.payment_type}</h6>
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
                  handleFilter={(val) => handleFilter(val)}
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