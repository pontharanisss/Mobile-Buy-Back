// ** React Imports

import React, { useState,  useEffect } from 'react'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { ChevronDown, Calendar, Eye } from 'react-feather'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
// ** Reactstrap Imports
import '../../../assets/style/style.css'
import "./inward_css.scss"
// ** Reactstrap Imports
import {
  Row,
  Col, Label, Card, CardHeader, CardTitle, CardBody, UncontrolledTooltip, Input, Button,  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const TotalRecordsCard = ({ totalRecords }) => {
  return (
    <div className="card_box_head total_record">
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

const CardPurchase = ({ totalRecords }) => {
  return (
    <div className="card_box_head total_purchase">
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bolder mb-0">{totalRecords}</h2>
            <p className="card-text">Total Purchase</p>
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

const CardTax = ({ totalRecords }) => {
  return (
    <div className="card_box_head total_tax">
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bolder mb-0">{totalRecords}</h2>
            <p className="card-text">Total Tax</p>
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
const showItemPopup = () => {
  // Handle show item popup logic
}

const CustomHeader = ({  totalRecords, totalPurchase, totalTax }) => {
  return (
    <div className="invoice-list-table-header w-100">
      <Row className="mb-0">
        <Col  className="d-flex align-items-center ml-auto">
          <TotalRecordsCard totalRecords={totalRecords} />
          <CardPurchase totalRecords={totalPurchase} />
          <CardTax totalRecords={totalTax} />
        </Col>

      </Row>
    </div>
  )
}

const FilterHeader = ({ brandValue, productValue,  searchValue,  handleBrandValue,  showItemPopup, brandMasterList, productMasterList, handleFilter }) => {
  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row className='pb-2 align-items-center'>
        <Col md='2'>
          <div className='d-flex flex-column align-items-start'>
            <label htmlFor='rows-per-page'>Brand</label>
            <Select
              isClearable={false}
              options={brandMasterList}
              className='react-select ms-50 me-2 '
              value={brandMasterList.find((e) => e.value === brandValue)}
              onChange={(e) => handleBrandValue(e.value)}
            />
          </div>
        </Col>
        <Col md='2'>
          <div className='d-flex flex-column align-items-start'>
            <label htmlFor='search-location'>Product</label>
            <Select
              isClearable={false}
              options={productMasterList}
              className='react-select ms-50 me-2 '
              value={productMasterList.find((e) => e.value === productValue)}
              onChange={(e) => handleProductValue(e.value)}
            />
          </div>
        </Col>

        <Col md='2'>
          <div className='d-flex flex-column align-items-start'>
            <label>&nbsp;</label>
            <Button color='primary' onClick={showItemPopup}>
              Show
            </Button>
          </div>
        </Col>
        <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
          <Label className='me-1' for='search-input'>
            Search
          </Label>
          <Input style={{ maxWidth: "258px" }}
            className='mb-50'
            type='text'
            bsSize='sm'
            id='search-input'
            value={searchValue}
            onChange={(e) => handleFilter(e)}
          />
        </Col>
      </Row>
    </div>
  )
}

const Inward = () => {
  // ** Store vars

  // const user_id = JSON.parse(localStorage.getItem('userDetails'))
  const [inwardList, setInwardList] = useState([])
  const [brandValue, setBrandValue] = useState('')
  const [productValue, setProductValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [imeidetails, setImeidetails] = useState('')
  const [showImeipopup, setShowImeipopup] = useState(false)

  // const [loader, setLoader] = useState(false)
  const [brandMasterList, setBrandMasterList] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'One plus', value: 'One plus' },
    { label: 'Samsung', value: 'samsung' }
  ])
  const [productMasterList, setProductMasterList] = useState([
    { label: 'Galaxy 120', value: 'Galaxy 120' },
    { label: 'iphone S12', value: 'iphone S12' },
    { label: 'One plus 7', value: 'One plus 7' }
  ])

  const handleChange = (state) => {
    setSelectedData(state.selectedRows)
  }

  const handleBrandValue = (e) => {
    // Handle brand value logic
    console.log('Selected Brand:', e.value)
    setBrandValue(e.value)
  }


  const handleProductValue = (value) => {
    // Handle location value logic
    console.log('Selected Location:', value)
    setProductValue(value)
  }

  // const onChangeSalesAmount = (text, index) => {
  //   if (text !== "" && index !== undefined) {
  //     console.log(text)
  //     console.log(index)
  //     const newData = [...inwardList] // Create a copy of the original data array
  //     newData[index].sales_amount = text.replace(/[^0-9]/g, '') // Update the data at the specified index
  //     setInwardList(newData)
  //   }
  // }

  const onChangeCheckboxChange = (event, index) => {
    if (index !== undefined) {
      const newData = [...inwardList] // Create a copy of the original data array
      newData[index].checked = event.target.checked
      setInwardList(newData)
    }
  }

  const showImeiDetails = (row) => {
    setImeidetails(row)
    setShowImeipopup(!showImeipopup)
  }

  const columns = [
    {
      name: 'Action',
      minWidth: '10px',
      cell: (row, index) => (
        <div style={{ cursor: 'pointer' }} className='column-action d-flex align-items-center'>
          
          <Input type='checkbox' checked={row.checked} onChange={(event) => onChangeCheckboxChange(event, index)}></Input>
        </div>
      )
    },

    {
      name: 'S.No.',
      sortable: true,
      minWidth: '10px',
      id: 'id',
      selector: row => row.id,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{'#'}{row.id}</h6>
          </div>

        )
      }
    },
    {
      name: 'IMEI No.',
      sortable: true,
      minWidth: '160px',
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
      minWidth: '180px',
      id: 'product_name',
      selector: row => row.product_name,
      // selector: row => row.client.name,
      cell: row => {
        return (
          <div className='justify-content-left  paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.product_name}</h6>
          </div>

        )
      }
    },
    {
      name: 'SKU',
      sortable: true,
      minWidth: '80px',
      id: 'sku',
      selector: row => row.sku,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.sku}</h6>
          </div>

        )
      }
    },
    {
      name: 'Pur Amt',
      sortable: true,
      minWidth: '100px',
      right: true,
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
      minWidth: '80px',
      right: true,
      id: 'service',
      selector: row => row.service,
      cell: row => {
        return (
          <div className='justify-content-right align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.service}</h6>
          </div>

        )
      }
    },
    {
      name: 'GST',
      sortable: true,
      minWidth: '100px',
      right: true,
      id: 'gst',
      selector: row => row.gst,
      cell: row => {
        return (
          <div className='justify-content-right align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.gst}</h6>
          </div>

        )
      }
    },
    {
      name: 'Tot. Pur',
      sortable: true,
      minWidth: '100px',
      right: true,
      id: 'total',
      selector: row => row.total,
      cell: row => {
        return (
          <div className='justify-content-right align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.total}</h6>
          </div>

        )
      }
    }
    // {
    //   name: 'Sales Amt',
    //   sortable: true,
    //   minWidth: '120px',
    //   id: 'sales_amount',
    //   selector: row => row.sales_amount,
    //   cell: (row, index) => {
    //     return (
    //       <div className='justify-content-left align-items-center paddingtop-1'>
    //         <Input type='text' style={{textAlign:"right"}} readOnly={row.read_only} maxLength={50} width={100} onBlur={(event) => onChangeSalesAmount(event.target.value)} autoComplete="off" id='item' value={row.sales_amount} onChange={(event) => onChangeSalesAmount(event.target.value, index)} />
    //       </div>

    //     )
    //   }
    // }

  ]


  const getInwardList = () => {
    setInwardList([{ id: '1', imei_no: '353906104983912', product_name: 'iPhone 11 Pro Max', brand: 'Apple', purchase_amount: '100', service: '20', gst: '10', total: '130', sku: 'Midnight Grey| 4GB', checked: false, read_only: true }, { id: '2', imei_no: '353906104983913', product_name: 'iPhone 13 Pro Max', brand: 'Apple', purchase_amount: '200000', service: '20', gst: '10', total: '20030', sku: 'Glacier Blue| 8GB', checked: false, read_only: true }])
  }

  const handleFilter = e => {
    const value = e.target.value
    setSearchValue(value)
  }

  useEffect(async () => {
    await setBrandMasterList(brandMasterList)
    await setProductMasterList(productMasterList)
    getInwardList()
  }, [])

  return (
    <div className='invoice-list-wrapper'>


      <Card>
        <CardHeader className='border-bottom' style={{justifyContent:"flex-start"}}>
          <CardTitle tag='h4'>Inward</CardTitle>
          <div className="row datatable-header header">
            <CustomHeader totalRecords={100} totalPurchase={'20,000'} totalTax={'1,000'} />
          </div>
        </CardHeader>
        <CardBody>
          <Row className='justify-content-end mx-0'>
            <FilterHeader
                  brandValue={brandValue}
                  productValue={productValue}
                  searchValue= {searchValue}
                  handleFilter={(e) => handleFilter(e)}
                  handlePerPage={(e) => handlePerPage(e)}
                  handleBrandValue={(e) => handleBrandValue(e)}
                  handleProductValue={(e) => handleProductValue(e)}
                  showItemPopup={showItemPopup}
                  brandMasterList={brandMasterList}
                  productMasterList={productMasterList}
                />
          </Row>
          <div className='sc-dmctIk fuLPYh react-dataTable'>
          <DataTable
            noDataComponent="There are no records to display"
            subHeader={true}
            columns={columns}
            responsive={true}
              searchable
            data={inwardList}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='id'
            //  selectableRows
            onSelectedRowsChange={handleChange}
          />
          </div>
        </CardBody>
        <CardBody className='invoice-padding' style={{display: 'flex', justifyContent: 'flex-end',   paddingRight: '4%'}}>
          <Row>
            <Col className='d-flex' md={{ size: 9, offset: 3 }}>
              <Button className='me-1' color='primary' type='submit'>
                Submit
              </Button>              
            </Col>
            </Row>
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
                Brand :
              </Label> </Col> 
              <Col sm='6'>
              <p className='mb-25 font-16'>{imeidetails.brand}</p>     </Col>    
            </Row>
            <Row className='mb-2'> 
            <Col sm='6'>
              <Label className='imei_details_label me-1'>
                SKU Attributes :
              </Label>  </Col>
              <Col sm='6'>
              <p className='mb-25 font-16'>Midnight Grey| 4GB</p>   </Col>      
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
              <p className='mb-25 font-16'>{imeidetails.service}</p> </Col>        
            </Row>
            <Row className='mb-2'> 
            <Col sm='6'>
              <Label className='imei_details_label me-1'>
                GST :
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
  )
}

export default Inward
