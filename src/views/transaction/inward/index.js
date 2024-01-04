// ** React Imports

import React, { useState,  useEffect } from 'react'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { ChevronDown, Calendar, Eye } from 'react-feather'
import DataTable from 'react-data-table-component'
// ** Reactstrap Imports
import '../../../assets/style/style.css'
// ** Reactstrap Imports
import {
  Row,
  Col, Label, Card, CardHeader, CardTitle, CardBody, UncontrolledTooltip, Input
} from 'reactstrap'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Inward = () => {
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
      minWidth: '200px',
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
      minWidth: '200px',
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
    {
      name: 'Brand',
      sortable: true,
      minWidth: '100px',
      id: 'brand',
      selector: row => row.brand,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.brand}</h6>
          </div>

        )
      }
    },
    {
      name: 'Purchase Amount',
      sortable: true,
      minWidth: '200px',
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
      name: 'Sales Amount',
      sortable: true,
      minWidth: '200px',
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
    setInwardList([{ id: '1', imei_no: '353906104983912', product_name: 'iPhone 11 Pro Max', brand: 'Apple', purchase_amount: '100', sales_amount: 1, checked: false, read_only: true }, { id: '2', imei_no: '353906104983913', product_name: 'iPhone 13 Pro Max', brand: 'Apple', purchase_amount: '200000', sales_amount: 1, checked: false, read_only: true }])
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
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Inward</CardTitle>
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

            pagination

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
      </Card>

    </div>
  )
}

export default Inward
