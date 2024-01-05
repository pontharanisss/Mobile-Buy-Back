// ** React Imports
import React, { useState, useEffect  } from 'react'
import {
  Card, CardHeader, CardTitle, CardBody, Row, Col, Label, Badge
} from 'reactstrap'
import { ChevronDown, Trash  } from 'react-feather'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/pages/app-invoice.scss'
import Select from 'react-select'

const TransactionDetails = () => {
  // ** Store vars
  // const navigate = useNavigate()
  const [cancelledProducts, setCancelledProducts] = useState([])

  // const viewSales = () => {
  //   navigate('/transaction/sales/add')
  // }

  const getCancelledProducts = () => {
    setCancelledProducts([{ id: '1', imei_no: '3539061123213123', product_name: 'iPhone 11 Pro', brand: 'Apple', reason: 'Speak Damage', purchase_amount: '100000', status: 'Pending', servify_amount: '5000', vat_amount: '200' }, { id: '1', imei_no: '3539061123213145', product_name: 'Nokia RT 800 ', brand: 'Nokia', reason: 'Old Model', purchase_amount: '50000', servify_amount: '2000 ', vat_amount: '100', status: 'Sold' }, { id: '1', imei_no: '4984061123213123', product_name: 'Redmi 8A Dual', brand: 'MI', reason: 'Over Heating', purchase_amount: '20000 ', servify_amount: '1000', vat_amount: '200', status: 'Sold' }, { id: '1', imei_no: '8722161123213123', product_name: 'Samsung Galaxy 2', brand: 'Samsung', reason: 'Display not good', purchase_amount: '10000', servify_amount: '3000', vat_amount: '300', status: 'Cancelled' }, { id: '1', imei_no: '351906112321343', product_name: 'OPPO V 8', brand: 'OPPO', reason: 'Headset damage', purchase_amount: '40000', servify_amount: '4000', vat_amount: '503', status: 'Pending' }])
  }

  useEffect(() => {
    getCancelledProducts()
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
      name: 'IMEI No.',
      sortable: true,
      minWidth: '200px',
      id: 'id',
      cell: (row)  => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{'#'}{row.imei_no}</h6>
            {row.status === 'Sold' && 
              <Label><Badge color='success' className='user-name text-truncate mb-0'>{row.status}</Badge></Label>
            }
            {row.status === 'Cancelled' && 
              <Label><Badge color='danger' className='user-name text-truncate mb-0'>{row.status}</Badge></Label>
            }                       
          </div>

        )
      }
    },
    {
      name: 'Product Name',
      sortable: true,
      minWidth: '200px',
      id: 'date',
      selector: row => row.id,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
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
      // selector: row => row.client.name,
      cell: row => {
        return (
          <div className='justify-content-left  paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.brand}</h6>
          </div>

        )
      }
    }, 
    {
      name: 'Reason',
      sortable: true,
      minWidth: '200px',
      center: true.valueOf,
      id: 'reason',
      selector: row => row.reason,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.reason}</h6>
          </div>          
        )
      }
    }, 
    {
      name: 'Purchase Amount',
      sortable: true,
      minWidth: '200px',
      right:true,
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
      right:true,
      minWidth: '200px',
      id: 'servify_fee',
      selector: row => row.servify_amount,
      cell: row => {
        return (
          <div className='justify-content-right align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.servify_amount}</h6>
          </div>

        )
      }
    },   
    {
      name: 'VAT',
      sortable: true,
      minWidth: '200px',
      right:true,
      id: 'purchase_amount',
      selector: row => row.vat_amount,
      cell: row => {
        return (
          <div className='justify-content-right align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.vat_amount}</h6>
          </div>

        )
      }
    }
  ]

  
  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Transaction Details</CardTitle>
        </CardHeader>
        <CardBody className='invoice-padding' style={{paddingTop:'2%'}}>
          <Row className='invoice-sales-total-wrapper'>
            <Col className='mt-md-0 mt-3' xl={'4'}>
              <div className='d-flex align-items-center mb-1'>
                <Label className='form-labels' style={{fontWeight: '600', fontSize: '1.3rem'}}>
                  Transaction No: <span>#20001</span>
                </Label>
              </div>
            </Col>
            <Col className='mt-md-0 mt-3'  xl={'4'}>
              <div className='d-flex align-items-center mb-1'>
                <Label className='form-labels' style={{fontWeight: '600', fontSize: '1.3rem'}}>
                  Transaction Date: 01-01-2024
                </Label>
              </div>
            </Col>
            <Col className='mt-md-0 mt-3'  xl={'4'}>
              <div className='d-flex align-items-center mb-1'>
                <Label className='form-labels' style={{fontWeight: '600', fontSize: '1.3rem'}}>
                  Total Products: 30
                </Label>
              </div>
            </Col>
          </Row>
        </CardBody>
        <CardBody className='invoice-padding' style={{paddingTop:'0px', paddingBottom:'3%'}}>
        <div className='sc-dmctIk fuLPYh react-dataTable'>
          <DataTable
            // noDataComponent="There are no records to display"
            // subHeader={true}
            pagination
            columns={columns}
            responsive={true}
            data={cancelledProducts}
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

export default TransactionDetails
