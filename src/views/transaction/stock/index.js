// ** React Imports
import React, { useState, useEffect } from 'react'
// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
// ** Reactstrap Imports
import { Button, Row, Col, Card, Label, Input, CardBody, Badge, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import UILoader from '@components/ui-loader'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import "./stock_css.scss"
import '../../../assets/style/style.css'


const CustomHeader = ({ brandValue, locationValue, statusValue, totalRecords, totalStockValue, searchValue, handleStatusValue, handleBrandValue, handleLocationValue,  showItemPopup, brandMasterList, locationMasterList, statusMasterList, handleFilter }) => {
  return (
    <div className='invoice-list-table-header w-100'>
      <Row className='pb-2 align-items-center' style={{marginBottom: '2rem'}}>       
        <Col md='3'>
        <TotalRecordsCard totalRecords={totalRecords} />
        </Col>
        <Col md='3'>
        <StockValue totalStockValue={totalStockValue} />
        </Col>     
      </Row>
      
      <Row className='pb-2 align-items-center'>   
          <Col md='2'>
            <Label  className='react-select ms-50 me-2 '>Brand</Label>
            <Select
              isClearable={false}
              options={brandMasterList}
              className='react-select ms-50 me-2 '
              value={brandMasterList.find((e) => e.value === brandValue)}
              onChange={(e) => handleBrandValue(e.value)}
            />
          </Col>
          <Col md='2'>
            <Label  className='react-select ms-50 me-2 '>Product</Label>
            <Select
              isClearable={false}
              options={locationMasterList}
              className='react-select ms-50 me-2 '
              value={locationMasterList.find((e) => e.value === locationValue)}
              onChange={(e) => handleLocationValue(e.value)}
            />
          </Col>
          <Col md='2'>
            <Label  className='react-select ms-50 me-2 '>Status</Label>
            <Select
              isClearable={false}
              options={statusMasterList}
              className='react-select ms-50 me-2 '
              value={statusMasterList.find((e) => e.value === statusValue)}
              onChange={(e) => handleStatusValue(e.value)}
            />
          </Col>
          
          <Col md='2'>
          <div className='d-flex flex-column align-items-start'>
            <Label>&nbsp;</Label>
            <Button color='primary' onClick={showItemPopup}>
              Show
            </Button>
            </div>
          </Col>   
          <Col md='1'></Col>
          <Col md='3' sm='12'>
          <div className='d-flex flex-column align-items-start'>
          <Label className='me-1' for='search-input'>
              Search
            </Label>
            <Input style={{ maxWidth:"258px"}}
              className='mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={(e) => handleFilter(e)}
            />
            </div>
          </Col>
      </Row>
    </div>
  )
}

const StockValue = ({ totalStockValue }) => {
  return (
    <div className="col-sm-12 col-lg-12 card_box_head total_purchase" style={{marginLeft: '0%'}}>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bolder mb-0">{totalStockValue}</h2>
            <p className="card-text">Stock Value</p>
          </div>
          <div style={{ marginLeft: "20px" }} className="avatar avatar-stats p-50 bg-light-primary">
            <div className="avatar-content">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <rect x="9" y="9" width="6" height="6"></rect>
                <line x1="9" y1="1" x2="9" y2="4"></line>
                <line x1="15" y1="1" x2="15" y2="4"></line>
                <line x1="9" y1="20" x2="9" y2="23"></line>
                <line x1="15" y1="20" x2="15" y2="23"></line>
                <line x1="20" y1="9" x2="23" y2="9"></line>
                <line x1="20" y1="14" x2="23" y2="14"></line>
                <line x1="1" y1="9" x2="4" y2="9"></line>
                <line x1="1" y1="14" x2="4" y2="14"></line>
              </svg>
            </div>
          </div>
        </div>
      </CardBody>
    </div>
  )
}


const TotalRecordsCard = ({ totalRecords }) => {
  return (
    <div className="col-sm-12 col-lg-12 card_box_head total_record" style={{marginLeft: '0%'}}>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bolder mb-0">{totalRecords}</h2>
            <p className="card-text">Total Products</p>
          </div>
          <div style={{ marginLeft: "20px" }} className="avatar avatar-stats p-50 bg-light-primary">
            <div className="avatar-content">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <rect x="9" y="9" width="6" height="6"></rect>
                <line x1="9" y1="1" x2="9" y2="4"></line>
                <line x1="15" y1="1" x2="15" y2="4"></line>
                <line x1="9" y1="20" x2="9" y2="23"></line>
                <line x1="15" y1="20" x2="15" y2="23"></line>
                <line x1="20" y1="9" x2="23" y2="9"></line>
                <line x1="20" y1="14" x2="23" y2="14"></line>
                <line x1="1" y1="9" x2="4" y2="9"></line>
                <line x1="1" y1="14" x2="4" y2="14"></line>
              </svg>
            </div>
          </div>
        </div>
      </CardBody>
    </div>
  )
}

const Stock = () => {
  const [brandValue, setBrandValue] = useState('')
  const [locationValue, setLocationValue] = useState('')
  const [statusValue, setStatusValue] = useState('')
  const [result, setResult] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [loader, setLoader] = useState(false)
  const [brandMasterList, setBrandMasterList] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'One plus', value: 'One plus' },
    { label: 'Samsung', value: 'samsung' }
  ])
  const [locationMasterList, setLocationMasterList] = useState([
    { label: 'Galaxy 120', value:'Galaxy 120' },
    { label: 'iphone S12', value: 'iphone S12' },
    { label: 'One plus 7', value: 'One plus 7' }
  ])
  const [statusMasterList, setStatusMasterList] = useState([
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Cancelled', value: 'inactive' }
  ])
  const [currentPage] = useState(1)
  const [showImeipopup, setShowImeipopup] = useState(false)
  const [imeidetails, setImeidetails] = useState('')

  const handleFilter = (e) => {
    const value = e.target.value
    setSearchValue(value)
  }

  const showImeiDetails = (row) => {
    setImeidetails(row)
    setShowImeipopup(!showImeipopup)
  }


  const handlePerPage = (e) => {
    // Handle per page logic
    console.log('Rows Per Page:', e.value)
  }

  const handleStatusValue = (value) => {
    // Handle status value logic
    console.log('Selected Status:', value)
    setStatusValue(value)
  }

  const handleBrandValue = (e) => {
    // Handle brand value logic
    console.log('Selected Brand:', e.value)
    setBrandValue(e.value)
  }

  
  const handleLocationValue = (value) => {
    // Handle location value logic
    console.log('Selected Location:', value)
    setLocationValue(value)
  }

  const showItemPopup = () => {
    // Handle show item popup logic
  }

  useEffect(async () => {
    setLoader(false)
    await setBrandMasterList(brandMasterList)
    await setLocationMasterList(locationMasterList)
    await setStatusMasterList(statusMasterList)
    await setResult([
      { id: '1', imei_no: '12267556542', product: 'samsung', purchase_amount: '15000', servify:'200', gst:'637.3', sales:'20,000', stock:'45', status: ''},
      { id: '2', imei_no: '83926821345', product: 'iphone', purchase_amount: '67000', servify: '100', gst: '3462.1', sales: '30,000', stock:'12', status: 'Cancelled' },
      { id: '3', imei_no: '87927762343', product: 'one plus', purchase_amount: '72000', servify: '90', gst: '578', sales: '10,000', stock:'72', status: '' },
      { id: '4', imei_no: '34519034511', product: 'Redmi', purchase_amount: '9000', servify: '300', gst: '462', sales: '5,000', stock:'29', status: 'Cancelled' },
      { id: '5', imei_no: '975263402490', product: 'Xioami', purchase_amount: '10000', servify: '100', gst: '873.5', sales: '20,000', stock:'31', status: ''},
      { id: '6', imei_no: '378786829793', product: 'techno', purchase_amount: '6000', servify: '200', gst: '4662', sales: '30,000', stock:'53', status: ''}
    ])
  }, [])

  const columns = [
    {
      name: 'S.no',
      sortable: true,
      minWidth: '10px',
      selector: 'id',
      cell: (row) => (
        <div className='justify-content-left align-items-center paddingtop-1'>
          <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{'#'}{row.id}</h6>
        </div>
      )
    },

    {
      name: 'IMEI No',
      sortable: true,
      minWidth: '100px',
      selector: 'imei_no',
      cell: (row) => (
        <div className='justify-content-left' style={{paddingTop: '1%'}}>
          <h6 className='user-name text-truncate mb-0 wraptext vertical_align imei_css' onClick={() => showImeiDetails(row)}>{row.imei_no}</h6>
            {row.status === 'Sold' && 
              <Label><Badge color='success' className='user-name text-truncate'>{row.status}</Badge></Label>
            }
            {row.status === 'Cancelled' && 
              <Label><Badge color='danger' className='user-name text-truncate'>{row.status}</Badge></Label>
            }  
        </div>
      )
    },
    {
      name: 'Product name',
      sortable: true,
      minWidth: '100px',
      selector: 'product',
      cell: (row) => (
        <div className='justify-content-left align-items-center paddingtop-1'>
          <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.product}</h6>
        </div>
      )
    },
    {
      name: 'Purchase Amount',
      sortable: true,
      minWidth: '130px',
      selector: 'purchase_amount',
      right: true,
      cell: (row) => (
        <div className='justify-content-left align-items-center paddingtop-1'>
          <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.purchase_amount}</h6>
        </div>
      )
    },
    {
      name: 'Servify Fee',
      sortable: true,
      minWidth: '50px',
      right:true,
      selector: 'servify',
      cell: (row) => (
        <div className='justify-content-left align-items-center paddingtop-1'>
          <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.servify}</h6>
        </div>
      )
    },
    {
      name: 'GST',
      sortable: true,
      minWidth: '100px',
      selector: 'gst',
      right: true,
      cell: (row) => (
        <div className='justify-content-left align-items-center paddingtop-1'>
          <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.gst}</h6>
        </div>
      )
    },
    {
      name: 'Sales',
      sortable: true,
      right: true,
      minWidth: '100px',
      selector: 'sales',
      cell: (row) => (
        <div className='justify-content-left align-items-center paddingtop-1'>
          <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.sales}</h6>
        </div>
      )
    },
    {
      name: 'Stock',
      sortable: true,
      minWidth: '100px',
      selector: 'stock',
      cell: (row) => (
        <div className='justify-content-left align-items-center paddingtop-1'>
          <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.stock}</h6>
        </div>
      )
    }
  ]

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='invoice-list-dataTable react-dataTable' style={{ marginBottom: '15px' }}>
          <UILoader blocking={loader}>
            <DataTable
              title='Stock'
              pagination
              noDataComponent='No records found'
              subHeader={true}
              columns={columns}
              responsive={true}
              data={result}
              sortIcon={<ChevronDown />}
              className='react-dataTable'
              defaultSortField='id'
              paginationDefaultPage={currentPage}
              subHeaderComponent={
                <CustomHeader
                  brandValue={brandValue}
                  locationValue={locationValue}
                  statusValue={statusValue}
                  searchValue= {searchValue}
                  totalRecords={100}
                  totalStockValue={1000}
                  handleFilter={(e) => handleFilter(e)}
                  handlePerPage={(e) => handlePerPage(e)}
                  handleStatusValue={(e) => handleStatusValue(e)}
                  handleBrandValue={(e) => handleBrandValue(e)}
                  handleLocationValue={(e) => handleLocationValue(e)}
                  showItemPopup={showItemPopup}
                  brandMasterList={brandMasterList}
                  locationMasterList={locationMasterList}
                  statusMasterList={statusMasterList}
                />
              }
            />
          </UILoader>
        </div>
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
              <p className='mb-25 font-16'>Redmi 8A</p>  </Col>       
            </Row>

            <Row className='mb-2'> 
            <Col sm='6'>
              <Label className='imei_details_label me-1'>
                Brand :
              </Label> </Col> 
              <Col sm='6'>
              <p className='mb-25 font-16'>Redmi</p>     </Col>    
            </Row>

            <Row className='mb-2'> 
            <Col sm='6'>
              <Label className='imei_details_label me-1'>
                Purchase Amount :
              </Label>  </Col>
              <Col sm='6'>
              <p className='mb-25 font-16'>20,000</p> </Col>        
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
              <p className='mb-25 font-16'>25,000</p></Col>         
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

export default Stock