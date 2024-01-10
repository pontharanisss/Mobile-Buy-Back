// ** React Imports
import React, { useState, useEffect  } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card, CardHeader, CardTitle, CardBody, Row, Col, Label, Badge,  Modal, ModalHeader, ModalBody, ModalFooter, Button, CardFooter 
} from 'reactstrap'
import { ChevronDown  } from 'react-feather'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/pages/app-invoice.scss'
import '../../assets/style/style.css'
import { viewTransactionDetails, handleStatusFlag } from './store'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '@utils'
import UILoader from "@components/ui-loader"

const TransactionDetails = () => {
  // ** Store vars
  const navigate = useNavigate()
  const [cancelledProducts, setCancelledProducts] = useState([])
  const [showImeipopup, setShowImeipopup] = useState(false)
  const [transactionNo, setTransactionNo] = useState(false)
  const [totalProducts, setTotlaProducts] = useState(false)
  const [transactionDate, setTransactionDate] = useState(false)
  const [imeidetails, setImeidetails] = useState('')
  const [loading, setLoading] = useState(false)
  const user = getUserData()
  const dispatch = useDispatch()
  const store = useSelector(state => state.Process)
  

  useEffect(() => {
    console.log(store.currentTransactionDetails, 'currentTransactionDetails')
    if (store.currentTransactionDetails && store.currentTransactionDetails.transaction_no) {
      setTotlaProducts(store.currentTransactionDetails.tot_product)
      setTransactionDate(store.currentTransactionDetails.transaction_date)
      setTransactionNo(store.currentTransactionDetails.transaction_no)
      setLoading(true)
      dispatch(
        viewTransactionDetails({
          user_id: user && user.id,
          transaction_no: store.currentTransactionDetails.transaction_no
        })
      ) 
    }
  }, [store.currentTransactionDetails])

  useEffect(() => {
    if (store.transactionDetails && store.transactionDetails.length > 0) {
      setCancelledProducts(store.transactionDetails)
    }    
  }, [store.transactionDetails])

   //After api call success stop loading
   useEffect(() => {
    if (store.statusFlag === 1) {
      setLoading(false)
      dispatch(handleStatusFlag(0))
    } else if (store.statusFlag === 2) {
      setLoading(false)
      dispatch(handleStatusFlag(0)) 
    }
  }, [store.statusFlag])

  const showImeiDetails = (row) => {
    setImeidetails(row)
    setShowImeipopup(!showImeipopup)
  }

  const BacktoList = () => {
    navigate('/process')
  }

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
             <h6 className='user-name text-truncate mb-0 wraptext vertical_align imei_css' onClick={() => showImeiDetails(row)}>{row.imei_no}</h6>
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
            <span style={{ fontSize: '10px' }}>
              {row.sku_attribute}
            </span>
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
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.brand_name}</h6>
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
      name: 'GST',
      sortable: true,
      minWidth: '200px',
      right:true,
      id: 'purchase_amount',
      selector: row => row.vat_amount,
      cell: row => {
        return (
          <div className='justify-content-right align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.gst}</h6>
          </div>

        )
      }
    }
  ]

  
  return (
    <UILoader blocking={loading}>
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
                  Transaction No: <span>#{transactionNo}</span>
                </Label>
              </div>
            </Col>
            <Col className='mt-md-0 mt-3'  xl={'4'}>
              <div className='d-flex align-items-center mb-1'>
                <Label className='form-labels' style={{fontWeight: '600', fontSize: '1.3rem'}}>
                  Transaction Date: {transactionDate}
                </Label>
              </div>
            </Col>
            <Col className='mt-md-0 mt-3'  xl={'4'}>
              <div className='d-flex align-items-center mb-1'>
                <Label className='form-labels' style={{fontWeight: '600', fontSize: '1.3rem'}}>
                  Total Products: {totalProducts}
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
        <CardBody style={{textAlign: 'right'}}>          
          <Button color='primary' outline onClick={() => BacktoList()}>
            Close
          </Button>
        </CardBody>
      </Card>  
      <Modal isOpen={showImeipopup} toggle={() => setShowImeipopup(!showImeipopup)} 
        className='vertically-centered-modal' fade={false}>
          <ModalHeader toggle={() => setShowImeipopup(!showImeipopup)}>Product Details</ModalHeader>
          <ModalBody style={{padding: '4% 8%'}}>
            <Row className='mb-2'> 
              <Col sm='6'> <Label className='imei_details_label'>
                IMEI No :
              </Label>   </Col>
              <Col sm='6'>
              <p className='mb-25 font-16'>{imeidetails.imei_no}</p> </Col>        
            </Row>

            <Row className='mb-2'> 
            <Col sm='6'>
              <Label className='imei_details_label me-1'>
                Product Name :
              </Label>  </Col>
              <Col sm='6'>
              <p className='mb-25 font-16'>{imeidetails.product_name}</p>  </Col>       
            </Row>
            <Row className='mb-2'> 
            <Col sm='6'>
              <Label className='imei_details_label me-1'>
                SKU Attributes :
              </Label>  </Col>
              <Col sm='6'>
              <p className='mb-25 font-16'>{imeidetails.sku_attribute}</p>   </Col>      
            </Row>

            <Row className='mb-2'> 
            <Col sm='6'>
              <Label className='imei_details_label me-1'>
                Brand :
              </Label> </Col> 
              <Col sm='6'>
              <p className='mb-25 font-16'>{imeidetails.brand_name}</p>     </Col>    
            </Row>

            <Row className='mb-2'> 
            <Col sm='6'>
              <Label className='imei_details_label me-1'>
                Purchase Amount :
              </Label>  </Col>
              <Col sm='6'>
              <p className='mb-25 font-16'>{imeidetails.purchase_amount}</p> </Col>        
            </Row>
            <Row className='mb-2'> 
            <Col sm='6'>
              <Label className='imei_details_label me-1'>
                Servify Fee :
              </Label>  </Col>
              <Col sm='6'>
              <p className='mb-25 font-16'>{imeidetails.servify_amount}</p> </Col>        
            </Row>
            <Row className='mb-2'> 
            <Col sm='6'>
              <Label className='imei_details_label me-1'>
                VAT Amount :
              </Label>  </Col>
              <Col sm='6'>
              <p className='mb-25 font-16'>{imeidetails.gst}</p>   </Col>      
            </Row>                                      
          </ModalBody>
          <ModalFooter>            
            <Button color='primary' outline onClick={() => setShowImeipopup(false)}>
              Close
            </Button>{' '}
          </ModalFooter>
        </Modal>   
    </div>
    </UILoader>
  )
}

export default TransactionDetails
