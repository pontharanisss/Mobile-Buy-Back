// ** React Imports
import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect  } from 'react'
import {
  Card, CardHeader, CardTitle, CardBody, UncontrolledTooltip, Input, Button, Row, Col
} from 'reactstrap'
import { Eye, ChevronDown  } from 'react-feather'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/pages/app-invoice.scss'

const Sales = () => {
  // ** Store vars
  const navigate = useNavigate()
  const [salesList, setSalesList] = useState([])

  const viewSales = () => {
    navigate('/transaction/sales/add')
  }

  const getSalesList = () => {
    setSalesList([{ id: '1', invoice_no:'2000', date: '01-01-2024', customer_name: 'VKC Traders', total_products: 10, sales_amount: 10000 }, { id: '2', invoice_no:'2000', date: '01-01-2024', customer_name: 'Sri Balaji Super Market', total_products: 20, sales_amount: 20000 }, { id: '3', invoice_no:'3040', date: '02-01-2024', customer_name: 'Amazon Online Shop', total_products: 25, sales_amount: 25000 }, { id: '4', invoice_no:'4009', date: '02-01-2024', customer_name: 'Sakthi Note Books', total_products: 30, sales_amount: 30000 }, { id: '5', invoice_no:'5093', date: '04-01-2024', customer_name: 'Gannapathi Stores', total_products: 40, sales_amount: 40000 }])
  }

  useEffect(() => {
    getSalesList()
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
      name: 'Invoice No.',
      sortable: true,
      minWidth: '100px',
      id: 'id',
      cell: (row)  => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{'#'}{row.invoice_no}</h6>
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
      name: 'Customer Name',
      sortable: true,
      minWidth: '200px',
      id: 'customer_name',
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
      name: 'Total Sales Amount',
      sortable: true,
      minWidth: '200px',
      right: true,
      id: 'sales_amount',
      selector: row => row.sales_amount,
      cell: row => {
        return (
          <div className='justify-content-right align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.sales_amount}</h6>
          </div>

        )
      }
    },      
    
    {
      name: 'Action',
      minWidth: '110px',
      cell: (row) => (
        <div className='column-action d-flex align-items-center'>          
          <Eye size={14} className='me-50' id={`edit-tooltip-${row.rownum}`} onClick={() => viewSales(row)} />
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
          <CardTitle tag='h4'>Sales</CardTitle>
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
              <Button tag={Link} to='/transaction/sales/add' color='primary'>
                Add
              </Button>
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
            data={salesList}
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

export default Sales
