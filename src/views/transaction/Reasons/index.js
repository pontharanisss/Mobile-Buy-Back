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

const Reasons = () => {
  // ** Store vars
  // const navigate = useNavigate()
  const [cancelledProducts, setCancelledProducts] = useState([])
  const [statusValue, setStatusValue] = useState('')
  const [imei_number, setIMEI_NUMBER] = useState({})
  const [productCancelModal, setProductCancelModal] = useState(false)
  const [reason, setReason] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  // const [selectedReason, setSelectedReason] = useState('')
  const [statusMasterList, setStatusMasterList] = useState([
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Cancelled', value: 'inactive' }
  ])
 
  // const viewSales = () => {
  //   navigate('/transaction/sales/add')
  // }

  const handleStatusValue = (value) => {
    // Handle status value logic
    console.log('Selected Status:', value)
    setStatusValue(value)
  }

  const getCancelledProducts = () => {
    setCancelledProducts([
      { id: '1', imei_no: '3539061123213123', product_name: 'iPhone 11 Pro', brand: 'Apple', reason: 'Loss', purchase_amount: 'inactive', servify_amount: '5000', vat_amount: '200', details: 'damage', reasons: 'Display not working', user:'#001', date:'01/12/2024', time:'11:24AM' },
      { id: '2', imei_no: '3539061123213145', product_name: 'Nokia RT 800 ', brand: 'Nokia', reason: 'Loss', purchase_amount: 'inactive', servify_amount: '2000 ', vat_amount: '100', details: 'loss', reasons:  'Fault in screen', user:'#002', date:'01/12/2024',  time:'1:24PM' },
      { id: '3', imei_no: '4984061123213123', product_name: 'Redmi 8A Dual', brand: 'MI', reason: 'Loss', purchase_amount: 'active ', servify_amount: '1000', vat_amount: '200', details: 'damage', reasons: 'Over hanging', user:'#003', date:'01/12/2024',  time:'5:00PM'  },
      { id: '4', imei_no: '8722161123213123', product_name: 'Samsung Galaxy 2', brand: 'Samsung', reason: 'Loss', purchase_amount: 'active', servify_amount: '3000', vat_amount: '300', details: 'loss', reasons: 'Not working', user:'#004', date:'01/12/2024',  time:'1:24AM'  },
      { id: '5', imei_no: '351906112321343', product_name: 'OPPO V 8', brand: 'OPPO', reason: 'Loss', purchase_amount: 'active', servify_amount: '4000', vat_amount: '503', details: 'damage', reasons: 'Display bug', user:'#005', date:'01/12/2024',  time:'11:48PM' }
    ])

  }

  useEffect(() => {
    getCancelledProducts()
    setStatusMasterList(statusMasterList)
  }, [])

 const Reasons = [{label: 'Lost', value: 'lost'}, {label: 'damage', value: 'damage'}]
  const columns = [ 
    {
      name: 'S.No.',
      sortable: true,
      minWidth: '2px',
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
      name: 'Reasons',
      sortable: true,
      minWidth: '100px',
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
      name: 'Status',
      sortable: true,
      minWidth: '90px',
      id: 'purchase_amount',
      selector: row => row.purchase_amount,
      cell: row => {
        return (
          <div className='d-flex flex-column align-items-start paddingtop-1'>
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
// const onChangereasons = (data) => {
//     setSelectedReason(data)
//   }

return (
    <div className="cancelled-products-list-wrapper">
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Reason</CardTitle>
        </CardHeader>
        <CardBody>
          <div className='invoice-list-table-header w-100 py-2'>
            <Row className='align-items-center'>
              <Col lg='2'>
                <div className='d-flex align-items-center'>
                  <label htmlFor='rows-per-page' className='me-2'>Show</label>
                  <Input
                    type='select'
                    id='rows-per-page'
                    className='form-control'
                    style={{ width: '60px' }}
                  >
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                  </Input>
                </div>
              </Col>
              <Col lg='3'>
              <div className='d-flex align-items-center'>
                  <label htmlFor='rows-per-page' className='me-2'>Status</label>
                <Select
                  isClearable={false}
                  options={statusMasterList}
                  className='d-flex align-items-center'
                  value={statusMasterList.find((e) => e.value === statusValue)}
                  onChange={(e) => handleStatusValue(e.value)}
                />
                 </div>
              </Col>
              <Col lg='2'>
                <div className='d-flex align-items-center'>
                  <Button onClick={() => AddCancelProduct()} color='primary'>Add</Button>
                </div>
              </Col>
              <Col lg='5'>
                <div className='d-flex align-items-center'>
                  <label htmlFor='search-invoice' className='me-2'>Search</label>
                  <Input
                    id='search-invoice'
                    className='form-control w-100'
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
             {/* <div className='mb-2'>
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
          </div> */}
            <div className='mb-2'>
            <Label className='form-label required' for='email'>
              Reason
            </Label>  
            <Input type='textarea' rows='3' id='reason' value={reason}  onChange={event => setReason(event.target.value)}/>          
             </div>     
             <div className='mb-2'>
      <Label className='form-label required'>Status</Label>
      <div>
        <Label check className='me-2'>
          <Input type='radio' name='status' value='active' />{' '}
          Active
        </Label>
        <Label check>
          <Input type='radio' name='status' value='inactive' />{' '}
          Inactive
        </Label>
      </div>
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

export default Reasons
