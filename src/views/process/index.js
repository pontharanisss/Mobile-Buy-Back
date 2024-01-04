// ** React Imports
import { Link } from 'react-router-dom'
import React, { useState, useEffect  } from 'react'
import {
  Card, CardHeader, CardTitle, CardBody, UncontrolledTooltip, Input, Button, Row, Col
} from 'reactstrap'
import { Eye, ChevronDown  } from 'react-feather'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/pages/app-invoice.scss'

const ImportList = () => {
  // ** Store vars
  const [transactionList, setTransactionList] = useState([])

  const getTransactionList = () => {
    setTransactionList([{ id: '1', transaction_no:'2000', date: '01-01-2024', total_products: 10}, { id: '2', transaction_no:'2001', date: '01-01-2024', total_products: 20 }, { id: '3', transaction_no:'3040', date: '02-01-2024', total_products: 25 }, { id: '4', transaction_no:'4009', date: '02-01-2024', total_products: 30}, { id: '5', transaction_no:'5093', date: '04-01-2024', total_products: 40 }])
  }

  useEffect(() => {
    getTransactionList()
  }, [])

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
      name: 'Transaction No.',
      sortable: true,
      minWidth: '100px',
      id: 'id',
      cell: (row)  => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{'#'}{row.transaction_no}</h6>
          </div>

        )
      }
    },
    {
      name: 'Date',
      sortable: true,
      minWidth: '100px',
      id: 'date',
      selector: row => row.id,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.date}</h6>
          </div>

        )
      }
    },  
    {
      name: 'Total Products',
      sortable: true,
      minWidth: '200px',
      center: true.valueOf,
      id: 'total_products',
      selector: row => row.total_products,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.total_products}</h6>
          </div>          
        )
      }
    },     
    
    {
      name: 'Action',
      minWidth: '110px',
      cell: (row) => (
        <div className='column-action d-flex align-items-center'>          
          <Eye size={14} className='me-50' id={`edit-tooltip-${row.rownum}`} />
          <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.rownum}`}>
            View  
        </UncontrolledTooltip>
        </div>
      )
    }
  ]
  

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>In-Transit Import</CardTitle>
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
              <Button tag={Link} to='/process/import' color='primary'>
                Import
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
            data={transactionList}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='id'
            //  selectableRows
            // onSelectedRowsChange={handleChange}
          />
          </div>
          
        </CardBody>
      </Card>
    </div>
  )
}

export default ImportList
