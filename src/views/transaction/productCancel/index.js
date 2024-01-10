// ** React Imports
import React, { useState, useEffect  } from 'react'
import {
  Card, CardHeader, CardTitle, CardBody, UncontrolledTooltip, Input, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Label 
} from 'reactstrap'
import { ChevronDown, Trash  } from 'react-feather'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/pages/app-invoice.scss'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '../../../assets/style/style.css'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { fetchIMEIData, getmaster, Productcancelled, List, deletelist } from './store'
import { getUserData } from '@utils'

const ProductCancel = () => {
 const [cancelledProducts, setCancelledProducts] = useState([])
 const [imei_number, setIMEI_NUMBER] = useState({})
  const [productCancelModal, setProductCancelModal] = useState(false)
  const [reason, setReason] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [transactionNo, setTransactionNo] = useState('')
  const [selectedReason, setSelectedReason] = useState('')
  const [picker, setPicker] = useState(new Date())
  const [showImeipopup, setShowImeipopup] = useState(false)
  const [imeidetails, setImeidetails] = useState('')
  const [imeiNumbers, setImeiNumbers] = useState([])
  const [selectedIMEINumber, setSelectedIMEINumber] = useState(null)
  const [reasonList, setReasonList] = useState([])
  const [imeiList, setimeiList] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [deleteMessage, setdeleteMessage] = useState('')
  const dispatch = useDispatch()
  const user = getUserData()
 
   useEffect(() => {
   if (user && user.accessToken) {
      dispatch(fetchIMEIData(user && user.id))
        .then((response) => {
          if (response.payload && response.payload.imeiList) {
            const imeiList = response.payload.imeiList
            setImeiNumbers(imeiList)
           }
        })
        .catch((error) => {
          console.error('Error fetching IMEI data:', error)
        })
    }
  }, [dispatch])

  useEffect(() => {
    
    if (user && user.accessToken) {
      const requestData = {
        role_id: 1,
        user_id: user && user.id
      }
      dispatch(getmaster(requestData))
        .then((response) => {
          if (response.payload && response.payload.reasonList) {
            const reasonList = response.payload.reasonList
            setReasonList(reasonList)
            }
        })
        .catch((error) => {
          console.error('Error fetching userroleList:', error)
        })
    }
  }, [dispatch])

  const deletelisttable = async () => {
   try {
      const requestData = {
        user_id: user && user.id,
        transaction_no: transactionNo
       }
        const response = await dispatch(deletelist(requestData))
      if (response.payload && response.payload.message) {
       const deletemessage = response.payload.message
        setdeleteMessage(deletemessage)
        setTransactionNo('')
        setDeleteModal(false)
         }
      const listResponse = await dispatch(List(1))
      if (listResponse.payload && listResponse.payload.imeiList) {
        const imeiList = listResponse.payload.imeiList
         setimeiList(imeiList)
        }
    } catch (error) {
      console.error('Error canceling product:', error)
    } finally {
     
    }
  }
    if (deleteMessage) {
    toast.success(deleteMessage, {
      duration: 2000,
      style: { color: '#000', backgroundColor: '#d7d2d2' }
    })
      setdeleteMessage('')
  }

  useEffect(() => {
  if (user && user.accessToken) {
     dispatch(List(user && user.id))
      .then((response) => {
          if (response.payload && response.payload.imeiList) {
            const imeiList = response.payload.imeiList
              setimeiList(imeiList)
             }
        })
        .catch((error) => {
          console.error('Error fetching userroleList:', error)
        })
    }
  }, [dispatch])

  const showImeiDetails = (row) => {
    setImeidetails(row)
    setShowImeipopup(!showImeipopup)
  }

  const Product = async () => {
    try {
      if (!selectedReason) {
        toast.error('Please select a reason.', {
          duration: 2000,
          style: { color: '#000', backgroundColor: '#d7d2d2' }
        })
        return
      }
  
      const newProduct = {
        id: (cancelledProducts.length + 1).toString(),
        reason: selectedReason.label,
        imei_number: selectedIMEINumber
      }
  
      const updatedProducts = [...cancelledProducts, newProduct]
      setCancelledProducts(updatedProducts)
      setProductCancelModal(!productCancelModal)
    } catch (error) {
      console.error('Error canceling product:', error)
    }
  
    try {
      const totalAmount =
        imei_number.purchase_amount +
        imei_number.servify +
        imei_number.gst
    
      const requestData = {
        user_id: user && user.id,
        imei_no: selectedIMEINumber.value,
        reason_code: selectedReason && Number(selectedReason.value),
        remarks: reason,
        total_amount: totalAmount.toString()
      }
  
      const response = await dispatch(Productcancelled(requestData))
      if (response.payload && response.payload.message) {
        const message = response.payload.message
        setSuccessMessage(message)
      }
      const listResponse = await dispatch(List(user && user.id))
      if (listResponse.payload && listResponse.payload.imeiList) {
        const imeiList = listResponse.payload.imeiList
         setimeiList(imeiList)
       }
    } catch (error) {
      console.error('Error canceling product:', error)
    } finally {
      setProductCancelModal(!productCancelModal)
    }
  }
  
  if (successMessage) {
    toast.success(successMessage, {
      duration: 2000,
      style: { color: '#000', backgroundColor: '#d7d2d2' }
    })
       setSuccessMessage('')
  } 
  const showDeletePopup = (transaction_no) => {
    setTransactionNo(transaction_no)
    setDeleteModal(true)
  }

  const columns = [ 
    {
      name: 'S No.',
      sortable: true,
      minWidth: '2px',
      id: 'S no',
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
      id: 'imei_no',
      cell: (row)  => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align imei_css' onClick={() => showImeiDetails(row)}>{row.imei_no}</h6>
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
          <div className='d-flex flex-column align-items-start paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>
              {row.product_name}
            </h6>
            <span className='brand-name' style={{ fontSize: '10px' }}>
              {row.brand}
            </span>
          </div>
        )
      }
    },
    {
      name: 'Reasons',
      sortable: true,
      minWidth: '200px',
      id: 'reason',
      selector: (row) => row.reason,
      cell: (row) => {
        return (
          <div className='d-flex flex-column align-items-start paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>
              <span>{row.reason}</span>
              {row.remarks && (
                <>
                  <br />
                  <small style={{ fontSize: '10px', textAlign: 'left' }}>{row.remarks}</small>
                </>
              )}
            </h6>
          </div>
        )
      }
    },
    {
      name: 'User id',
      sortable: true,
      minWidth: '150px',
      id: 'user_id',
      selector: (row) => row.user,
      cell: (row) => {
        return (
          <div className='d-flex flex-column align-items-start paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.user_id}</h6>
            <div className='d-flex justify-content-center align-items-start w-100'>
              <span className='brand-name' style={{ fontSize: '10px', textAlign: 'left' }}>
                {row.created_at} &nbsp; {row.time}
              </span>
            </div>
          </div>
        )
      }
    },
    {
      name: 'Total Amount',
      sortable: true,
      right:true,
      minWidth: '90px',
      id: 'total_amount',
      selector: row => row.total_amount,
      cell: row => {
        return (
          <div className='d-flex flex-column align-items-start paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.total_amount}</h6>
          </div>
 )
      }
    },   
    {
      name: 'Action',
      minWidth: '110px',
      cell: (row, index) => (
        <div className='column-action d-flex align-items-center'>          
          <Trash size={14} className='me-50' id={`delete-tooltip-${index}`} onClick={() => showDeletePopup(row.transaction_no)}/>
          <UncontrolledTooltip placement='top' target={`delete-tooltip-${index}`}>
            Delete
        </UncontrolledTooltip>
        </div>
      )
    }
  ]

  // add click
  const AddCancelProduct = () => {
    setIMEI_NUMBER('')
    setReason('')
    setProductCancelModal(!productCancelModal)
  }

  const closeCancelProduct = () => {
    setIMEI_NUMBER('')
    setReason('')
    setProductCancelModal(!productCancelModal)
  }

  const onChangeIMEI_Number = (data) => {
    setSelectedIMEINumber(data)
    setIMEI_NUMBER(data)
    const selectedIMEIDetails = imeiNumbers.find((imei) => imei.imei_no === data.value)
    setIMEI_NUMBER(selectedIMEIDetails)
  }

  const onChangereasons = (data) => {
    setSelectedReason(data)
  }
  
 return (
    <div className="cancelled-products-list-wrapper">
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Cancelled Products</CardTitle>
        </CardHeader>
        <CardBody>
          <div className='invoice-list-table-header w-100 py-2'>
            <Row>
              <Col lg='3' className='d-flex align-items-center px-0 px-lg-1'>
                <div className='d-flex align-items-center me-2'>
                  <label htmlFor='rows-per-page'>Show</label>
                  <Input
                    type='select'
                    id='rows-per-page'
                    className='form-control ms-50 pe-3'
                  >
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                  </Input>
                </div>
              </Col>
              <Col lg='5' className='d-flex align-items-center px-0 px-lg-1'>
                <div className='mb-1' style={{ marginRight: '1%' }}>
                  <h6 className='invoice-to-title'>From Date</h6>
                  <Flatpickr
                    value={picker}
                    onChange={(date) => setPicker(date)}
                    options={{ maxDate: new Date(), dateFormat: 'd-m-Y' }}
                    className='form-control invoice-edit-input date-picker'
                  />
                </div>
                <div className='mb-1' style={{ marginRight: '2%' }}>
                  <h6 className='invoice-to-title'>To Date</h6>
                  <Flatpickr
                    value={picker}
                    onChange={(date) => setPicker(date)}
                    options={{ maxDate: new Date(), dateFormat: 'd-m-Y' }}
                    className='form-control invoice-edit-input date-picker'
                  />
                </div>
                <div style={{ marginRight: '2%', marginTop: '1.5%' }}>
                  <Button onClick={() => AddCancelProduct()} color='primary'>Add</Button>
                </div>
              </Col>
              <Col lg='4'
                className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'
              >
                <div className='d-flex align-items-center'>
                  <label htmlFor='search-invoice'>Search</label>
                  <Input
                    id='search-invoice'
                    className='ms-50 me-2 w-100'
                    type='text'
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
            pagination
            columns={columns}
            responsive={true}
            data={imeiList}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='id'
           
          />
          </div>
         </CardBody>
      </Card>
      <Modal isOpen={productCancelModal} toggle={() => setProductCancelModal(!productCancelModal)}
        className='vertically-centered-modal' fade={false}>
        <ModalHeader toggle={() => setProductCancelModal(!productCancelModal)} style={{backgroundColor: '#b3003b !important'}}>Cancel Product</ModalHeader>
        <ModalBody>
        <div className='mb-2'>
            <Label className='form-label required' for='imei_number'>
              IMEI Number
            </Label>
            <Select
              isClearable={false}
              options={imeiNumbers.map((imei) => ({ value: imei.imei_no, label: imei.imei_no }))}
              className='react-select'
              onChange={(e) => onChangeIMEI_Number(e)}
            />
          </div>
  <Row className='mb-2'>
    <Col md='4'>
      <Label className='form-label' for='email'>
        Product Name :
      </Label>
    </Col>
    <Col>
      <span>{imei_number && imei_number.product_name}</span>
    </Col>
  </Row>
  <Row className='mb-2'>
    <Col md='4'>
      <Label className='form-label' for='email'>
        Brand :
      </Label>
    </Col>
    <Col>
      <span>{imei_number && imei_number.brand}</span>
    </Col>
  </Row>
  <Row className='mb-2'>
    <Col md='4'>
      <Label className='form-label' for='email'>
        SKU Attributes:
      </Label>
    </Col>
    <Col>
      <span>{imei_number && imei_number.sku}</span>
    </Col>
  </Row>
  <Row className='mb-2'>
  <Col md='4'>
    <Label className='form-label' for='email'>
      Total Amount:
    </Label>
  </Col>
  <Col>
    <span>
      {imei_number &&
        (imei_number.purchase_amount +
          imei_number.servify +
          imei_number.gst)}
    </span>
  </Col>
</Row>
  <div className='mb-2'>
            <Label className='form-label required' for='email'>
               Reasons
            </Label>
            <Select
              isClearable={false}
              options={reasonList.map((reason) => ({ value: reason.value.toString(), label: reason.label }))}
              className='react-select'
              value={selectedReason}
              onChange={(e) => onChangereasons(e)}
            />
          </div>
            <div className='mb-2'>
            <Label className='form-label' for='email'>
              Remarks 
            </Label>  
            <Input type='textarea' rows='3' id='reason' value={reason}  onChange={event => setReason(event.target.value)}/>          
             </div>         
         </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={Product} >           
            Cancel
          </Button>{' '}
          <Button color='primary' outline onClick={() => closeCancelProduct()}>
            Close
          </Button>{' '}
        </ModalFooter>
      </Modal>
      <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} 
        className='vertically-centered-modal' fade={false}>
          <ModalHeader toggle={() => setDeleteModal(!deleteModal)}>Confirmation</ModalHeader>
          <ModalBody>
            <div className='mb-2'>
              <Label className='form-label' for='email'>
                Are you sure you want to delete ? 
              </Label>
            </div>            
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={deletelisttable}>
              Yes
            </Button>{' '}
            <Button color='primary' outline onClick={() => setDeleteModal(false)}>
              No
            </Button>{' '}
          </ModalFooter>
        </Modal>

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
                Brand :
              </Label> </Col> 
              <Col sm='6'>
              <p className='mb-25 font-16'>{imeidetails.brand}</p>     </Col>    
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
              <p className='mb-25 font-16'>{imeidetails.servify}</p> </Col>        
            </Row>
            <Row className='mb-2'> 
            <Col sm='6'>
              <Label className='imei_details_label me-1'>
                VAT Amount :
              </Label>  </Col>
              <Col sm='6'>
              <p className='mb-25 font-16'>{imeidetails.gst}</p>   </Col>      
            </Row>

            <Row className='mb-2'> 
            <Col sm='6'>
              <Label className='imei_details_label me-1'>
                Sales Amount :
              </Label>  </Col>
              <Col sm='6'>
              <p className='mb-25 font-16'></p></Col>         
            </Row>  
            <Row className='mb-2'> 
            <Col sm='6'>
              <Label className='imei_details_label me-1'>
                SKU Attributes :
              </Label>  </Col>
              <Col sm='6'>
              <p className='mb-25 font-16'>{imeidetails.sku}</p>   </Col>      
            </Row>                          
          </ModalBody>
          <ModalFooter>            
            <Button color='primary' outline onClick={() => setShowImeipopup(false)}>
              Close
            </Button>{' '}
          </ModalFooter>
        </Modal>
    </div>
  )
}

export default ProductCancel