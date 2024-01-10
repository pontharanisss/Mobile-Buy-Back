// ** React Imports
import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect  } from 'react'
import {
  Card, CardHeader, CardTitle, CardBody, UncontrolledTooltip, Input, Button, Row, Col
} from 'reactstrap'
import { Eye, ChevronDown  } from 'react-feather'
import DataTable from 'react-data-table-component'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/pages/app-invoice.scss'
import { handleStatusFlag, gettransitList, currentTransactionDetails } from './store'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '@utils'
import UILoader from "@components/ui-loader"
import moment from 'moment'


const ImportList = () => {
  // ** Store vars
  const navigate = useNavigate()
  const [transactionList, setTransactionList] = useState([])
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const user = getUserData()
  const dispatch = useDispatch()
  const store = useSelector(state => state.Process)
  const [value, setValue] = useState('')
  //Initial gettransitlist when page load
  useEffect(() => {
    setLoading(true)
    dispatch(
      gettransitList({
        user_id: user && user.id,
        fromdate: toDate ? moment(new Date(fromDate)).format("YYYY-MM-DD") : '',
        todate: toDate ? moment(new Date(toDate)).format("YYYY-MM-DD") : ''
      })
    ) 
  }, [])

  //After api call success stop loading
  useEffect(() => {
    if (store.statusFlag === 1) {
      setValue('')
      setLoading(false)
      dispatch(handleStatusFlag(0))
    } else if (store.statusFlag === 2) {
      setValue('')
      setLoading(false)
      dispatch(handleStatusFlag(0)) 
    }
  }, [store.statusFlag])

  //set store values to state values
  useEffect(() => {
  if (store.transitList && store.transitList.length > 0) {
    setTransactionList(store.transitList)
  }
  }, [store.transitList])

  //view transaction details
  const viewtransaction_details = (row) => {
    dispatch(currentTransactionDetails(row)) 
    navigate('/process/viewTransactiondetails')
  }
  
  //Define tables columns
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
      name: 'Transaction No.',
      sortable: true,
      minWidth: '10px',
      id: 'id',
      cell: (row)  => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{'#'}{row.transaction_no}</h6>
          </div>

        )
      }
    },
    {
      name: 'Transaction Date',
      sortable: true,
      minWidth: '150px',
      id: 'date',
      selector: row => row.id,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.created_at}</h6>
          </div>

        )
      }
    },  
    {
      name: 'User ID',
      sortable: true,
      minWidth: '50px',
      id: 'date',
      selector: row => row.id,
      cell: (row) => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext'>{row.user_name}</h6>
            <span style={{ fontSize: '10px' }}>
            {'#'}{row.user_id}
            </span>
          </div>

        )
      }
    },  
    {
      name: 'Total Products',
      sortable: true,
      minWidth: '100px',
      id: 'total_products',
      selector: row => row.total_products,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.tot_product}</h6>
          </div>          
        )
      }
    },     
    
    {
      name: 'Action',
      minWidth: '110px',
      cell: (row) => (
        <div className='column-action d-flex align-items-center'>          
          <Eye size={14} className='me-50' id={`edit-tooltip-${row.rownum}`} onClick={() => viewtransaction_details(row)}/>
          <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.rownum}`}>
            View  
        </UncontrolledTooltip>
        </div>
      )
    }
  ]
  
  //gettransitList for particular date
  const gettransitListData = () => {
    setLoading(true)
    dispatch(
      gettransitList({
        user_id: user && user.id,
        fromdate: toDate ? moment(new Date(fromDate)).format("YYYY-MM-DD") : '',
        todate: toDate ? moment(new Date(toDate)).format("YYYY-MM-DD") : ''
      })
    )
  }

  const handleFilter = val => {
    setValue(val)
    if (val !== "" && val !== undefined && val !== null) {
      const array = Object.assign([], store.transitList)
      const arraydata = array.filter((e) => e.user_name.toLowerCase().includes(val.toLowerCase()) ||
        e.user_id.toLowerCase().includes(val.toLowerCase()))
      setTransactionList(arraydata)
    } else {
      const array = Object.assign([], store.transitList)     
      setTransactionList(array)
    }
  }

  return (
    <UILoader blocking={loading}>
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>In-Transit Import</CardTitle>
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
                  // value={rowsPerPage}
                  // onChange={handlePerPage}
                  className='form-control ms-50 pe-3'
                >
                  <option value='10'>10</option>
                  <option value='25'>25</option>
                  <option value='50'>50</option>
                </Input>
              </div>
              <Button tag={Link} to='/process/import' color='primary'>
                Import
              </Button>
            </Col>   
            <Col lg='5' className='d-flex align-items-center px-0 px-lg-1'>
            <div className='mb-1' style={{marginRight: '1%'}}>
              <h6 className='invoice-to-title'>From Date</h6>
                <Flatpickr
                  value={fromDate}
                  onChange={date => setFromDate(date)}
                  options={{ maxDate: new Date(), dateFormat: 'd-m-Y' }}
                  className='form-control invoice-edit-input date-picker'
                />
              </div> 
              <div className='mb-1' style={{marginRight: '2%'}}>
              <h6 className='invoice-to-title'>To Date</h6>
                <Flatpickr
                  value={toDate}
                  onChange={date => setToDate(date)}
                  options={{ maxDate: new Date(), dateFormat: 'd-m-Y' }}
                  className='form-control invoice-edit-input date-picker'
                />
              </div> 
              <div style={{marginRight: '2%', marginTop: '1.5%'}}>
              <Button color='primary' onClick={() => gettransitListData()}>
                Show
              </Button></div>
              </Col>
            <Col lg='4'className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'>
              <div className='d-flex align-items-center'>
                <label htmlFor='search-invoice'>Search</label>
                <Input
                  id='search-invoice'
                  className='ms-50 me-2 w-100'
                  type='text'
                  value={value}
                  onChange={e => handleFilter(e.target.value)}
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
            data={transactionList}
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
    </UILoader>
  )
}

export default ImportList
