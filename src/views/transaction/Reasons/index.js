// ** React Imports
import React, { useState, useEffect  } from 'react'
import {
  Card, CardHeader, CardTitle, CardBody, UncontrolledTooltip, Input, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Label 
} from 'reactstrap'
import { ChevronDown, Trash, Edit } from 'react-feather'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/pages/app-invoice.scss'
import Select from 'react-select'
import toast from 'react-hot-toast'

const Reasons = () => {
  // ** Store vars
  // const navigate = useNavigate()
  const [cancelledProducts, setCancelledProducts] = useState([])
  const [statusValue, setStatusValue] = useState('')
  const [productCancelModal, setProductCancelModal] = useState(false)
  const [reason, setReason] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  // const [selectedReason, setSelectedReason] = useState('')
  const [statusMasterList, setStatusMasterList] = useState([
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Cancelled', value: 'inactive' }
  ])
 
  const openModal = (editMode) => {
    setEditMode(editMode)
    setReason('')
    setProductCancelModal(!productCancelModal)
  }
  // const viewSales = () => {
  //   navigate('/transaction/sales/add')
  // }


  const closeCancelProduct = () => {
   
    setReason('')
    setProductCancelModal(!productCancelModal)
  }
  
  const handleStatusValue = (value) => {
    // Handle status value logic
    console.log('Selected Status:', value)
    setStatusValue(value)
  }

  const getCancelledProducts = () => {
    setCancelledProducts([
      { id: '1', product_name: 'iPhone 11 Pro', brand: 'Apple', purchase_amount: 'inactive', details: 'damage', reasons: 'Display not working', user:'#001', date:'01/12/2024', time:'11:24AM' },
      { id: '2', product_name: 'Nokia RT 800 ', brand: 'Nokia', purchase_amount: 'inactive', details: 'loss', reasons:  'Fault in screen', user:'#002', date:'01/12/2024',  time:'1:24PM' },
      { id: '3', product_name: 'Redmi 8A Dual', brand: 'MI', purchase_amount: 'active ', details: 'damage', reasons: 'Over hanging', user:'#003', date:'01/12/2024',  time:'5:00PM'  },
      { id: '4', product_name: 'Samsung Galaxy 2', brand: 'Samsung', purchase_amount: 'active', details: 'loss', reasons: 'Not working', user:'#004', date:'01/12/2024',  time:'1:24AM'  },
      { id: '5', product_name: 'OPPO V 8', brand: 'OPPO', purchase_amount: 'active', details: 'damage', reasons: 'Display bug', user:'#005', date:'01/12/2024',  time:'11:48PM' }
    ])
 }

 const addProduct = () => {
  if (!reason) {
    toast.error('Please fill in the Reason field.', {
      duration: 2000,
      style: { color: '#000', backgroundColor: '#d7d2d2' }
    })
    return
  }
  const newProduct = {
    id: (cancelledProducts.length + 1).toString(),
   reason
  }
  
  setCancelledProducts([...cancelledProducts, newProduct])
  closeCancelProduct()
}

const updateProduct = () => {
  if (!reason) {
    toast.error('Please fill in the Reason field.', {
      duration: 2000,
      style: { color: '#000', backgroundColor: '#d7d2d2' }
    })
    return
  }
    closeCancelProduct()
  }

  useEffect(() => {
    getCancelledProducts()
    setStatusMasterList(statusMasterList)
  }, [])

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
          <Edit size={14} className='me-50' id={`edit-tooltip-${index}`} onClick={() => openModal(true)} />
          <UncontrolledTooltip placement='top' target={`edit-tooltip-${index}`}>
            Edit
          </UncontrolledTooltip>
          <Trash size={14} className='me-50' id={`delete-tooltip-${index}`} onClick={() => setDeleteModal(true)} />
          <UncontrolledTooltip placement='top' target={`delete-tooltip-${index}`}>
            Delete
          </UncontrolledTooltip>
        </div>
      )
    }
  ]

  // add click
  const AddCancelProduct = () => {
    setReason('')
    setEditMode(false)
    setProductCancelModal(!productCancelModal)
  }

 
  const EditProduct = () => {
    setEditMode(true) 
   
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
                  <Button onClick={() => openModal(false)} color='primary'>Add</Button>
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
      <Modal isOpen={productCancelModal} toggle={() => setProductCancelModal(!productCancelModal)} className='vertically-centered-modal' fade={false}>
        {/* ... (previous modal JSX) */}
        <ModalHeader toggle={() => setProductCancelModal(!productCancelModal)} style={{ backgroundColor: '#b3003b !important' }}>
          {editMode ? 'Update Reason' : 'Add Reason'}
        </ModalHeader>
        <ModalBody>
          <div className='mb-2'>
            <Label className='form-label required' for='email'>
              Reason
            </Label>
            <Input type='text' id='reason' value={reason} onChange={(event) => setReason(event.target.value)} />
          </div>
          {editMode && (
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
          )}
        </ModalBody>
        <ModalFooter>
          {editMode ? (
            <Button color='primary' onClick={() => updateProduct()}>
              Update
            </Button>
          ) : (
            <Button color='primary' onClick={() => addProduct()}>
              Add
            </Button>
          )}
          <Button color='primary' outline onClick={() => closeCancelProduct()}>
            Cancel
          </Button>
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
