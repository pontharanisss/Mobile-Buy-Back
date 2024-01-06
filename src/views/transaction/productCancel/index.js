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
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const ProductCancel = () => {
  // ** Store vars
  // const navigate = useNavigate()
  const [cancelledProducts, setCancelledProducts] = useState([])
  const [productList, setProductList] = useState([])
  const [imei_number, setIMEI_NUMBER] = useState({})
  const [productCancelModal, setProductCancelModal] = useState(false)
  const [reason, setReason] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedReason, setSelectedReason] = useState('')
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  // const viewSales = () => {
  //   navigate('/transaction/sales/add')
  // }

  const getCancelledProducts = () => {
    setCancelledProducts([
      { id: '1', imei_no: '3539061123213123', product_name: 'iPhone 11 Pro', brand: 'Apple', reason: 'Loss', purchase_amount: '100000', servify_amount: '5000', vat_amount: '200', details: 'damage', reasons: 'Display not working', user:'#001', date:'01/12/2024', time:'11:24AM' },
      { id: '2', imei_no: '3539061123213145', product_name: 'Nokia RT 800 ', brand: 'Nokia', reason: 'Loss', purchase_amount: '50000', servify_amount: '2000 ', vat_amount: '100', details: 'loss', reasons:  'Fault in screen', user:'#002', date:'01/12/2024',  time:'1:24PM' },
      { id: '3', imei_no: '4984061123213123', product_name: 'Redmi 8A Dual', brand: 'MI', reason: 'Loss', purchase_amount: '20000 ', servify_amount: '1000', vat_amount: '200', details: 'damage', reasons: 'Over hanging', user:'#003', date:'01/12/2024',  time:'5:00PM'  },
      { id: '4', imei_no: '8722161123213123', product_name: 'Samsung Galaxy 2', brand: 'Samsung', reason: 'Loss', purchase_amount: '10000', servify_amount: '3000', vat_amount: '300', details: 'loss', reasons: 'Not working', user:'#004', date:'01/12/2024',  time:'1:24AM'  },
      { id: '5', imei_no: '351906112321343', product_name: 'OPPO V 8', brand: 'OPPO', reason: 'Loss', purchase_amount: '40000', servify_amount: '4000', vat_amount: '503', details: 'damage', reasons: 'Display bug', user:'#005', date:'01/12/2024',  time:'11:48PM' }
    ])

    setProductList([
      { id: '1', imei_no: '4532612121212121', product_name: 'APPLE 11 Pro', brand: 'Apple', purchase_amount: '100000', servify_amount: '5000', vat_amount: '200' },
      { id: '2', imei_no: '6534343434343421', product_name: 'Nokia RT 800 ', brand: 'Nokia', purchase_amount: '50000', servify_amount: '2000 ', vat_amount: '100' },
      { id: '3', imei_no: '554323213213121', product_name: 'Redmi 8A Dual', brand: 'MI', purchase_amount: '20000 ', servify_amount: '1000', vat_amount: '200' },
      { id: '4', imei_no: '453222311212121', product_name: 'Samsung Galaxy 2', brand: 'Samsung', purchase_amount: '10000', servify_amount: '3000', vat_amount: '300' },
      { id: '5', imei_no: '65756756756756', product_name: 'OPPO V 8', brand: 'OPPO', purchase_amount: '40000', servify_amount: '4000', vat_amount: '503' }
    ])
  }

  useEffect(() => {
    getCancelledProducts()
  }, [])

  const imei_numbers = [{label: '4532612121212121', value: '4532612121212121'}, {label: '6534343434343421', value: '6534343434343421'}, {label: '554323213213121', value: '554323213213121'}, {label: '453222311212121', value: '453222311212121'}, {label: '65756756756756', value: '65756756756756'}]
  const Reasons = [{label: 'Lost', value: 'lost'}, {label: 'damage', value: 'damage'}]
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
              <span>{row.reasons}</span>
              {row.details && (
                <>
                  <br />
                  <small style={{ fontSize: '10px', textAlign: 'left' }}>{row.details}</small>
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
      minWidth: '200px',
      id: 'purchase_amount',
      selector: (row) => row.user,
      cell: (row) => {
        return (
          <div className='d-flex flex-column align-items-start paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.user}</h6>
            <div className='d-flex justify-content-center align-items-center w-100'>
              <span className='brand-name' style={{ fontSize: '10px', textAlign: 'center' }}>
                {row.date} &nbsp; {row.time}
              </span>
            </div>
          </div>
        )
      }
    },
    {
      name: 'Total Amount',
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
      name: 'Action',
      minWidth: '110px',
      cell: (row, index) => (
        <div className='column-action d-flex align-items-center'>          
          <Trash size={14} className='me-50' id={`delete-tooltip-${index}`} onClick={() => setDeleteModal(true)}/>
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

  const cancelProduct = () => { 
    const arr_data = Object.assign([], cancelledProducts)
    arr_data.push(imei_number)
    setCancelledProducts(arr_data) 
    setProductCancelModal(!productCancelModal)
  }

  const onChangeIMEI_Number = (data) => {
    const findimei = productList.filter(e => e.imei_no === data.value)[0]
    const selImei_no = {...findimei, value:findimei.imei_no, label:findimei.imei_no}
    setIMEI_NUMBER(selImei_no)
  }

  const onChangereasons = (data) => {
    setSelectedReason(data)
  }

  
  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Cancelled Products</CardTitle>
        </CardHeader>
        <CardBody>
          <div className='invoice-list-table-header w-100 py-2'>
            <Row className='align-items-center'>
              <Col lg='2'>
                <div className='d-flex align-items-center me-2'>
                  <label htmlFor='rows-per-page'>Show</label>
                  <Input
                    type='select'
                    id='rows-per-page'
                    className='form-control ms-2 pe-3'
                    style={{ width: '80px' }} // Adjusted width
                  >
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                  </Input>
                </div>
              </Col>
              <Col lg='3'>
                <div className='d-flex align-items-center me-2'>
                  <Label className='form-label'>From</Label>
                  <DatePicker
                    selected={fromDate}
                    onChange={(date) => setFromDate(date)}
                    className='form-control'
                  />
                </div>
              </Col>
              <Col lg='2'>
                <div className='d-flex align-items-center me-2'>
                  <Label className='form-label'>To</Label>
                  <DatePicker
                    selected={toDate}
                    onChange={(date) => setToDate(date)}
                    className='form-control'
                  />
                </div>
              </Col>
              <Col lg='3'>
                <div className='d-flex align-items-center me-2 justify-content-end'> {/* Adjusted alignment */}
                  <label htmlFor='search-invoice'>Search</label>
                  <Input
                    id='search-invoice'
                    className='ms-2 me-2 w-100'
                    type='text'
                    placeholder='Search'
                    style={{ width: '150px' }} 
                  />
                </div>
              </Col>
              <Col lg='2' className='text-end'> {/* Adjusted alignment */}
                <Button onClick={() => AddCancelProduct()} color='primary'>
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
      <Modal isOpen={productCancelModal} toggle={() => setProductCancelModal(!productCancelModal)}
        className='vertically-centered-modal' fade={false}>
        <ModalHeader toggle={() => setProductCancelModal(!productCancelModal)} style={{backgroundColor: '#b3003b !important'}}>Cancel Product</ModalHeader>
        <ModalBody>
          <div className='mb-2'>
            <Label className='form-label required' for='email'>
              IMEI Number
            </Label>
            <Select
              isClearable={false}
              options={imei_numbers}
              className='react-select'
              value={imei_number}
              onChange={(e) => onChangeIMEI_Number(e)}
            />
          </div>
          <div className='mb-2'>
            <Label className='form-label' for='email'>
              Product Name
            </Label>            
            <Input type='text' readOnly maxLength={50}  autoComplete="off" value={imei_number && imei_number.product_name ? imei_number.product_name : ''}
             />
          </div>   
          <div className='mb-2'>
            <Label className='form-label' for='email'>
              Brand
            </Label>            
            <Input type='text'  readOnly maxLength={50}  autoComplete="off"  value={imei_number && imei_number.brand ? imei_number.brand : ''}
             />
          </div>   
          <div className='mb-2'>
            <Label className='form-label' for='email'>
            SKU Attributes
            </Label>            
            <Input type='text' readOnly maxLength={50}  autoComplete="off"  value={imei_number && imei_number.purchase_amount ? imei_number.purchase_amount : ''}
             />
          </div>  
          <div className='mb-2'>
            <Label className='form-label' for='email'>
              Total Amount
            </Label>            
            <Input type='text' readOnly  maxLength={50}  autoComplete="off"  value={imei_number && imei_number.servify_amount ? imei_number.servify_amount : ''}
             />
          </div>  
          <div className='mb-2'>
            <Label className='form-label required' for='email'>
             Remarks
            </Label>
            <Select
              isClearable={false}
              options={Reasons}
              className='react-select'
              value={selectedReason}
              onChange={(e) => onChangereasons(e)}
            />
          </div>
            <div className='mb-2'>
            <Label className='form-label required' for='email'>
              Reason
            </Label>  
            <Input type='textarea' rows='3' id='reason' value={reason}  onChange={event => setReason(event.target.value)}/>          
             </div>         
  </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => cancelProduct()} >           
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
            <Button color='primary' onClick={() => setDeleteModal(false)}>
              Yes
            </Button>{' '}
            <Button color='primary' outline onClick={() => setDeleteModal(false)}>
              No
            </Button>{' '}
          </ModalFooter>
        </Modal>
    </div>
  )
}

export default ProductCancel
