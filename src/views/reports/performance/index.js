// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Calendar } from 'react-feather'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
// ** Reactstrap Imports
import '../../../assets/style/style.css'
// ** Reactstrap Imports
import {
  Button, Label, Input,
  Row, Col, Card, CardHeader, CardTitle, CardBody, InputGroupText, InputGroup
} from 'reactstrap'
// ** Store & Actions
import { useSelector } from 'react-redux'
import { paginateArray } from '../../..//utility/commonfunc'
import UILoader from '@components/ui-loader'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const PerformanceList = () => {
  // ** Store vars
  const list = [
    { employeeid: 1, employeecode: '001', employeename: 'Vetri', noofdayspending: '5', departmentname: 'Sewing Floor', noofcompletedjob : '2', netamount:'5000', totalpieces:'25' },
    { employeeid: 2, employeecode: '002', employeename: 'Suriya',  noofdayspending: '3', departmentname: 'Iron Man', noofcompletedjob : '1', netamount:'6500', totalpieces:'65' }
  ]
  const store = useSelector(state => state.Itemgroup)
  // ** States
  const [value, setValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemGroupName, setItemGroupName] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [PerformanceList, setPerformanceList] = useState(list)
  const fromdatefp = useRef(null)
  const todatefp = useRef(null)
  const [fromdate, setfromdate] = useState(new Date())
  const [todate, settodate] = useState(new Date())


  const itemGrouparray = [
    { label: "All", value: 1 },
    { label: "Frock", value: 2 }
  ]

  //table cloums
  const columns = [
    {
      name: 'S.No',
      sortField: 'rownum',
      maxWidth: '5px',
      cell: (row, index) => <span>{index + 1}</span>
    },
    {
      name: 'Employee ID',
      sortable: true,
      minWidth: '100px',
      sortField: 'employeecode',
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'># {row.employeecode}</h6>
          </div>

        )
      }
    },
    {
      name: 'Employee Name',
      sortable: true,
      minWidth: '250px',
      sortField: 'employeename',
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.employeename}</h6>
            <pre className='wraptextpre mb-0'>{row.departmentname}</pre>
          </div>

        )
      }
    },
    {
      name: 'Total Pieces',
      sortable: false,
      minWidth: '150px',
      sortField: 'totalpieces',
      center: true,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.totalpieces}</h6>
          </div>
        )
      }
    },
    {
      name: 'Total Jobs',
      sortable: false,
      minWidth: '150px',
      sortField: 'pendingjob',
      center: true,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.noofcompletedjob}</h6>
          </div>
        )
      }
    },
    {
      name: 'Total earnings',
      sortable: false,
      minWidth: '150px',
      sortField: 'pendingjob',
      right: true,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'> ₹ {row.netamount}</h6>
          </div>
        )
      }
    }
  ]

  //search filter
  const handleFilter = val => {
    setValue(val)
    if (val !== "" && val !== undefined && val !== null) {
      const arraydata = list.filter((e) => e.employeename.toLowerCase().includes(val.toLowerCase()))
      setPerformanceList(arraydata)
    } else {
      const arraydata = list.length <= rowsPerPage ? list : paginateArray(list, rowsPerPage, currentPage)
      if (list && list.length > 0) {
        setPerformanceList(arraydata)
      } else {
        setPerformanceList([])
      }
    }
  }
  // for sorting
  const handleSort = (column, sortDirection) => {
    const sortable = column.sortField
    const sizeList = PerformanceList.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortable].toLowerCase() < b[sortable].toLowerCase() ? 1 : -1
      } else if (sortDirection === 'desc') {
        return a[sortable].toLowerCase() < b[sortable].toLowerCase() ? -1 : 1
      }
      setPerformanceList(sizeList)
    })
  }
  //pagevalue
  const handlePerPage = e => {
    setRowsPerPage(parseInt(e.target.value))
  }

  //existing pagination
  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }


  const itemGroupOnchange = (e) => {
    setItemGroupName(e)
  }

  //custom pagination
  const CustomPagination = () => {
    let count = 0
    if (value !== "" && value !== undefined && value !== null && PerformanceList.length > 0) {
      count = Number(Math.ceil(PerformanceList.length / rowsPerPage))
    } else {
      count = Number(Math.ceil(store.data.length / rowsPerPage))
    }
    return (
      <ReactPaginate
        nextLabel=''
        breakLabel='...'
        previousLabel=''
        pageCount={count || 1}
        activeClassName='active'
        breakClassName='page-item'
        pageClassName={'page-item'}
        breakLinkClassName='page-link'
        nextLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousLinkClassName={'page-link'}
        previousClassName={'page-item prev'}
        onPageChange={page => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={'pagination react-paginate justify-content-end p-1'}
      />
    )
  }
  const apply_fromfilterdate = e => {
    setfromdate(e[0])
  }

  const apply_tofilterdate = e => {
    settodate(e[0])
  }

  // getting data 
  const dataToRender = () => {
    const filters = {
      q: value
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (PerformanceList.length > 0) {
      return PerformanceList
    } else if (PerformanceList.length === 0 && isFiltered) {
      return PerformanceList.slice(0, rowsPerPage)
    }
  }

  //react-datatable
  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Employee Performance</CardTitle>
        </CardHeader>
        <CardBody>
          <Row className='mx-0 mt-1 mb-50'>
            <Col md='8' className='d-flex align-items-center'>
              <div className='d-flex align-items-center me-2'>
                <label htmlFor='rows-per-page'>Show</label>
                <Input
                  type='select'
                  id='rows-per-page'
                  value={rowsPerPage}
                  onChange={handlePerPage}
                  className='form-control ms-50 pe-3'
                >
                  <option value='10'>10</option>
                  <option value='25'>25</option>
                  <option value='50'>50</option>
                </Input>
              </div>
            </Col>
            <Col md='4' className='actions-right d-flex align-items-center'>
              <div className='d-flex align-items-center'>
                <label htmlFor='search-invoice'>Search</label>
                <Input
                  autoComplete="off"
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

          <Row className='mt-1 mb-50'>
            <Col lg='3' md='6' className='mb-1'>
              <Label className='form-label' for='name'>
                Item Group
              </Label>
              <Select
                isClearable={false}
                options={itemGrouparray}
                className='react-select'
                value={itemGrouparray.filter(e => e.value === itemGroupName)[0]}
                onChange={(e) => itemGroupOnchange(e)}
              />
            </Col>
            <Col lg='3' md='6' className='mb-1'>

              <Label className='form-label' for='email'>
                From Date
                    </Label>
              <InputGroup className='flex-nowrap'>
                <Flatpickr
                  ref={fromdatefp}
                  options={{ maxDate: new Date(), dateFormat: 'd-m-Y' }}
                  value={fromdate}
                  id='date-picker'
                  className='form-control'
                  onChange={e => apply_fromfilterdate(e)}
                />
                <InputGroupText
                  onClick={() => {
                    fromdatefp.current.flatpickr.open()
                  }}
                >
                  <Calendar size={14}></Calendar>
                </InputGroupText>
              </InputGroup>
            </Col>
            <Col lg='3' md='6' className='mb-1'>
              <Label className='form-label' for='email'>
                To Date
                    </Label>
              <InputGroup className='flex-nowrap'>
                <Flatpickr
                  ref={todatefp}
                  options={{ maxDate: new Date(), dateFormat: 'd-m-Y' }}
                  value={todate}
                  id='date-picker'
                  className='form-control'
                  onChange={e => apply_tofilterdate(e)}
                />
                <InputGroupText
                  onClick={() => {
                    todatefp.current.flatpickr.open()
                  }}
                >
                  <Calendar size={14}></Calendar>
                </InputGroupText>
              </InputGroup>
            </Col>
            <Col lg='1' md='6' className='mb-1'>
            </Col>
            <Col lg='2' md='6' className='mb-1 margin-top'>
              <Button color='primary'>
                View
          </Button>
            </Col>
            <div className='react-dataTable'>
              <DataTable
                pagination
                sortServer
                paginationServer
                noDataComponent="There are no records to display"
                subHeader={true}
                columns={columns}
                responsive={true}
                onSort={handleSort}
                data={dataToRender()}
                sortIcon={<ChevronDown />}
                className='react-dataTable'
                defaultSortField='invoiceId'
                paginationDefaultPage={currentPage}
                paginationComponent={CustomPagination}
              />
            </div>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}

export default PerformanceList
