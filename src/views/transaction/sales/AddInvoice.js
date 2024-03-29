// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ** Custom Components
import { ChevronDown, PlusCircle, Hash, Trash} from 'react-feather'

// ** Third Party Components
import axios from 'axios'
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'

// ** Reactstrap Imports
import { Row, Col, Card, Form, Input, Label, Button, CardBody, CardText, InputGroup, InputGroupText, UncontrolledTooltip,
  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import DataTable from 'react-data-table-component'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const AddInvoice = () => {
  // ** States
  const navigate = useNavigate()

  const [picker, setPicker] = useState(new Date())
  const [invoiceNumber, setInvoiceNumber] = useState(false)
  const [imeiNumberList, setimeiNumberList] = useState([])
  const [invoiceList, setInvoiceList] = useState([])
  const [imeiNumber, setImeiNumber] = useState('')
  const [productName, setProductName] = useState('')
  const [salesAmount, setSalesAmount] = useState('')
  const [totalAmount, setTotalAmount] = useState(0)
  const [salesDeleteModal, setSalesDeleteModal] = useState(false)
  const [deleteImeiNumber, setDeleteImeiNumber] = useState('')
  const [showImeipopup, setShowImeipopup] = useState(false)
  const [imeidetails, setImeidetails] = useState('')
  //Delete Local Array
  const ondeleteImeiNumber = index => {
    console.log(index)
    const arr_data = Object.assign([], invoiceList)    
    if (index !== -1) {
      arr_data.splice(index, 1)
      setInvoiceList(arr_data)
    }
    let amount = 0
    for (let i = 0; i < arr_data.length; i++) {  //loop through the array
      amount += arr_data[i].sales_amount  //Do the math!
    }
    setTotalAmount(amount)
    setSalesDeleteModal(false)
  }

  const deleteConfirmation = (index) => {
    setDeleteImeiNumber(index)
    setSalesDeleteModal(!salesDeleteModal)
  }

  const showImeiDetails = (row) => {
    setImeidetails(row)
    setShowImeipopup(!showImeipopup)
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
      id: 'imei_no',
      selector: row => row.id,
      cell: row => {
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
      id: 'product_name',
      selector: row => row.product_name,
      // selector: row => row.client.name,
      cell: row => {
        return (
          <div className='justify-content-left  paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.product_name}</h6>
            <p className='user-name text-truncate mb-0 wraptext vertical_align'>{row.sku_attribute}</p>
          </div>

        )
      }
    },
    {
      name: 'Purchase Amt',
      sortable: true,
      minWidth: '200px',
      id: 'purchase_amt',
      selector: row => row.product_name,
      // selector: row => row.client.name,
      cell: row => {
        return (
          <div className='justify-content-left  paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.purchase_amount}</h6>
            <p className='user-name text-truncate mb-0 wraptext vertical_align'>GST: {row.gst}</p>
          </div>

        )
      }
    },  
    {
      name: 'Selling Price',
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
      cell: (row, index) => (
        <div className='column-action d-flex align-items-center'>          
          <Trash size={14} className='me-50' id={`delete-tooltip-${index}`}  onClick={() => deleteConfirmation()}/>
          <UncontrolledTooltip placement='top' target={`delete-tooltip-${index}`}>
            Delete
        </UncontrolledTooltip>
        </div>
      )
    }
  ]

  const getInvoiceList = () => {
    setimeiNumberList([{ id: '1', label:'353906104983912', value:'353906104983912', imei_no: '353906104983912', product_name: 'iPhone 11 Pro Max', sku_attribute: 'Midnight Grey| 4GB', brand: 'Apple', purchase_amount: '10,000', gst: '150', sales_amount: '15,000', checked: false, read_only: true }, { id: '2', label: '353906104983913', value: '353906104983913', imei_no: '353906104983913', sku_attribute: 'Grey| 4GB', product_name: 'iPhone 13 Pro Max', brand: 'Apple', purchase_amount: '2,00,000', sales_amount: '2,50,000', checked: false, read_only: true, gst: '200' }])
    setInvoiceList([{ id: '1', label:'3539061049834333', value: '3539061049834333', imei_no: '3539061049834333', product_name: 'iPhone 11 Pro Max', sku_attribute: 'Midnight Grey| 4GB', brand: 'Apple', purchase_amount: '10,000', gst: '123', sales_amount: '15,000', checked: false, read_only: true }, { id: '2', label: '353906104983913', value: '353906104983913', imei_no: '353906104983913', sku_attribute: 'Grey| 4GB', product_name: 'iPhone 13 Pro Max', brand: 'Apple', purchase_amount: '2,00,000', sales_amount: '3,00,000', checked: false, read_only: true, gst: '250' }])
  }

  useEffect(() => {
    console.log(totalAmount, productName)
    getInvoiceList()
  }, [])

  useEffect(() => { 
    // ** Get Invoices & Set Invoice Number
    axios
      .get('/apps/invoice/invoices', {
        q: '',
        page: 1,
        status: '',
        sort: 'asc',
        perPage: 10,
        sortColumn: 'id'
      })
      .then(response => {
        const lastInvoiceNumber = Math.max.apply(
          Math,
          response.data.allData.map(i => i.id)
        )
        setInvoiceNumber(lastInvoiceNumber + 1)
      })
  }, []) 
 
  const handleImeiNumberChange = data => {
    setImeiNumber(data)
    setProductName(data.product_name)
    setSalesAmount(data.sales_amount)    
  }

  const addImeiNumber = () => {
    const arr_data = Object.assign([], invoiceList)
    arr_data.push(imeiNumber)
    setInvoiceList(arr_data)
    let amount = 0
    for (let i = 0; i < arr_data.length; i++) {  //loop through the array
      amount += arr_data[i].sales_amount  //Do the math!
    }
    setTotalAmount(amount)
    setImeiNumber('')
  }

  const note = ''

  return (
    <div className='invoice-add-wrapper'>
      <Row className='invoice-add'>
        <Col xl={12} md={12} sm={12}>
      <Card className='invoice-preview-card'>
        {/* Header */}
        <CardBody className='invoice-padding pb-0'>
          <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0' style={{marginBottom: '0'}}>
            <div className='logo-wrapper' style={{marginBottom: '0'}}>
            <h3 className='text-primary invoice-logo'>Add Sales</h3>
            {/* <h4 className='invoice-title'></h4> */}
              {/* <p className='card-text mb-25'>Office 149, 450 South Brand Brooklyn</p>
              <p className='card-text mb-25'>San Diego County, CA 91905, USA</p>
              <p className='card-text mb-0'>+1 (123) 456 7891, +44 (876) 543 2198</p> */}
            </div>
            <div className='invoice-number-date mt-md-0 mt-2'>
              <div className='d-flex align-items-center justify-content-md-end mb-1'>
                <h4 className='invoice-title'>Invoice No.</h4>
                <InputGroup className='input-group-merge invoice-edit-input-group disabled'>
                  <InputGroupText>
                    <Hash size={15} />
                  </InputGroupText>
                  <Input
                    type='number'
                    className='invoice-edit-input'
                    value={invoiceNumber || 3171}
                    placeholder='53634'
                    disabled
                  />
                </InputGroup>
              </div>
              <div className='d-flex align-items-center mb-1'>
                <h4 className='invoice-title'>Invoice Date</h4>
                <Flatpickr
                  value={picker}
                  onChange={date => setPicker(date)}
                  options={{ maxDate: new Date(), dateFormat: 'd-m-Y' }}
                  className='form-control invoice-edit-input date-picker'
                />
              </div>              
            </div>
          </div>
        </CardBody>
        {/* /Header */}

        <hr className='invoice-spacing' />

        {/* Address and Contact */}
        <CardBody className='invoice-padding pt-0'>
          <Row className='row-bill-to'>
            <Col xl='8'>
              <h6 className='invoice-to-title'>Customer</h6>
              <div className='invoice-customer'>
                  <Input
                    type='text'
                    // className='invoice-add-input'
                  />  
              </div>
            </Col>          
            
          </Row>
        </CardBody>
        {/* /Address and Contact */}

        <CardBody className='invoice-padding pt-0' style={{paddingBottom: '2px'}}>
          <Row className='row-bill-to invoice-spacing'>
            <Col className='col-bill-to ps-0' xl='3'>
              <h6 className='invoice-to-title'>IMEI No.</h6>
              <div className='invoice-customer'>
                  <Fragment>
                    <Select
                      className='react-select'
                      classNamePrefix='select'
                      id='label'
                      value={imeiNumber}
                      options={imeiNumberList}
                      onChange={handleImeiNumberChange}
                    />                   
                  </Fragment>
              </div>
            </Col>
            {/* <Col className='col-bill-to ps-0' xl='3'>
              <h6 className='invoice-to-title'>Product Name</h6>
              <div className='invoice-customer'>
                  <Fragment>
                  <Input
                    type='text'
                    // className='invoice-add-input'
                    value={productName}
                    readOnly
                  />            
                  </Fragment>
              </div>
            </Col> */}
            <Col className='col-bill-to ps-0' xl='2'>
              <h6 className='invoice-to-title'>Selling Price</h6>
              <div className='invoice-customer'>
                  <Fragment>
                  <Input
                    type='text'
                    // className='invoice-edit-input'
                    value={salesAmount}
                    style={{textAlign: 'right'}}
                    onChange={(e) => setSalesAmount(e.target.value)}
                  />                  
                  </Fragment>
              </div>
            </Col>
            <Col className='col-bill-to ps-0' xl='1' style= {{display: 'flex',  justifyContent: 'center', marginTop: '4.3%', marginLeft: '-2%'}}>
              {/* <Button color='primary' size='sm' className='btn-add-new'>
                <Plus size={14} className='me-25'></Plus>
              </Button> */}
              <PlusCircle size={24} onClick={() => addImeiNumber()}/>
            </Col>
            <Col className='col-bill-to ps-0' xl='6'>            
            {imeiNumber && (
              <>
              <h6 className='invoice-to-title'>Product Details</h6>
                <div className='invoice-customer'>
              <Row className='row-bill-to invoice-spacing'>
              <Col className='col-bill-to ps-0' xl='12'>
              <table>
                <tbody>
                  <tr>
                    <td className='pe-1'>Product Name:</td>
                    <td>
                      <span className='fw-bolder'>{productName}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className='pe-1'>SKU Attribute</td>
                    <td>Midnight Grey| 4GB</td>
                  </tr>
                  <tr>
                    <td className='pe-1'>Purchase Amout:</td>
                    <td>2,00,000</td>
                  </tr>
                  <tr>
                    <td className='pe-1'>GST:</td>
                    <td>150</td>
                  </tr>                  
                </tbody>
              </table>
            </Col>
            </Row></div></>)}</Col>
          </Row>
          {/* {imeiNumber && (
          <Row className='row-bill-to invoice-spacing'>
          <Col className='pe-0 mt-xl-0 mt-2' xl='4'>
              <h6 className='mb-2'>Product Details:</h6>
              <table>
                <tbody>
                  <tr>
                    <td className='pe-1'>Product Name:</td>
                    <td>
                      <span className='fw-bolder'>{productName}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className='pe-1'>SKU Attribute</td>
                    <td>Midnight Grey| 4GB</td>
                  </tr>
                  <tr>
                    <td className='pe-1'>Purchase Amout:</td>
                    <td>2,00,000</td>
                  </tr>
                  <tr>
                    <td className='pe-1'>GST:</td>
                    <td>150</td>
                  </tr>                  
                </tbody>
              </table>
            </Col>
            </Row>)} */}
        </CardBody>

        {/* Product Details */}
        <CardBody className='invoice-padding' style={{paddingTop:'0px', paddingBottom:'3%'}}>
        <div className='sc-dmctIk fuLPYh react-dataTable'>
          <DataTable
            // noDataComponent="There are no records to display"
            // subHeader={true}
            columns={columns}
            responsive={true}
            data={invoiceList}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='id'
            //  selectableRows
            // onSelectedRowsChange={handleChange}
          />
          </div>
          
        </CardBody>

        {/* /Product Details */}
        <hr className='invoice-spacing' />
        {/* Invoice Total */}
        <CardBody className='invoice-padding'>
          <Row className='invoice-sales-total-wrapper'>
            <Col className='mt-md-0 mt-3' md={{ size: '6', order: 1 }} xs={{ size: 12, order: 2 }}>
              <div className='mb-2'>              
                <Label for='note' className='form-label fw-bold'>
                  Remarks
                </Label>
                <Input type='textarea' rows='5' id='note' defaultValue={note} />
              </div>
            </Col>
            <Col className='d-flex justify-content-end' md={{ size: '6', order: 2 }} xs={{ size: 12, order: 1 }}>
              <div className='invoice-total-wrapper'>
                <Row className='invoice-total-item'>
                <Col xl='7'>
                <p className='invoice-total-title'>Exempted tax price :</p>
                </Col>
                <Col xl='5'>
                <p className='invoice-total-amount'>Rs. 20,000</p>
                </Col>
                </Row>
                <Row className='invoice-total-item'>
                <Col xl='7'>
                <p className='invoice-total-title'>Taxable :</p>
                </Col>
                <Col xl='5'>
                <p className='invoice-total-amount'>Rs. 8,474.57</p>
                </Col>
                </Row>
                <Row className='invoice-total-item'>
                <Col xl='7'>
                <p className='invoice-total-title'>Tax18% :</p>
                </Col>
                <Col xl='5'>
                <p className='invoice-total-amount'>Rs. 1,525.42</p>
                </Col>
                </Row>
                <Row className='invoice-total-item'>
                <Col xl='7'>
                <p className='invoice-total-title'>Round off :</p>
                </Col>
                <Col xl='5'>
                <p className='invoice-total-amount'>Rs. 0.01</p>
                </Col>
                </Row>
                <hr className='my-50' />
                <Row className='invoice-total-item'>
                <Col xl='7'>
                <p className='invoice-total-amount'>Total </p>
                </Col>
                <Col xl='5'>
                <p className='invoice-total-amount'>Rs. 30,000</p>
                </Col>
                </Row>                             
              </div>              
            </Col>
          </Row>
        </CardBody>
        {/* /Invoice Total */}
        <CardBody className='invoice-padding' style={{display: 'flex', justifyContent: 'flex-end',   paddingRight: '5%'}}>
          <Row>
            <Col className='d-flex' md={{ size: 9, offset: 3 }}>
              <Button className='me-1' color='primary' type='submit' onClick={() => navigate('/transaction/sales')}>
                Save
              </Button>
              <Button outline color='secondary' type='reset' onClick={() => navigate('/transaction/sales')}>
                Close
              </Button>
            </Col>
            </Row>
        </CardBody>
      </Card>      
    </Col>
      </Row>

      <Modal isOpen={salesDeleteModal} toggle={() => setSalesDeleteModal(!salesDeleteModal)} 
        className='vertically-centered-modal' fade={false}>
          <ModalHeader toggle={() => setSalesDeleteModal(!salesDeleteModal)}>Confirmation</ModalHeader>
          <ModalBody>
            <div className='mb-2'>
              <Label className='form-label' for='email'>
                Are you sure you want to delete ? 
              </Label>
            </div>            
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={() => ondeleteImeiNumber(deleteImeiNumber)}>
              Yes
            </Button>{' '}
            <Button color='primary' outline onClick={() => setSalesDeleteModal(false)}>
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
              <p className='mb-25 font-16'>1,000</p> </Col>        
            </Row>
            <Row className='mb-2'> 
            <Col sm='6'>
              <Label className='imei_details_label me-1'>
                VAT Amount :
              </Label>  </Col>
              <Col sm='6'>
              <p className='mb-25 font-16'>10</p>   </Col>      
            </Row>

            <Row className='mb-2'> 
            <Col sm='6'>
              <Label className='imei_details_label me-1'>
                Sales Amount :
              </Label>  </Col>
              <Col sm='6'>
              <p className='mb-25 font-16'>{imeidetails.sales_amount}</p></Col>         
            </Row>  
            <Row className='mb-2'> 
            <Col sm='6'>
              <Label className='imei_details_label me-1'>
                SKU Attributes :
              </Label>  </Col>
              <Col sm='6'>
              <p className='mb-25 font-16'>Midnight Grey| 4GB</p>   </Col>      
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

export default AddInvoice
