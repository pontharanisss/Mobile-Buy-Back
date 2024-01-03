// ** React Imports
import { Link } from 'react-router-dom'
import { useState } from 'react'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Edit, Trash, Unlock } from 'react-feather'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
// ** Reactstrap Imports
import '../../../assets/style/style.css'
// ** Reactstrap Imports
import {
  Button, Label, Input, Badge,
  Row, Col, Card, CardHeader, CardTitle, CardBody, InputGroupText, InputGroup
} from 'reactstrap'
// ** Store & Actions
import { useSelector } from 'react-redux'
import { paginateArray } from '../../..//utility/commonfunc'
import UILoader from '@components/ui-loader'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const PendingJobList = () => {
  // ** Store vars
  const list = [
  {employeeid: 1, employeecode: '001', employeename:'Vetri', jobcode: 1, jobid: '22081001', noofdayspending : '5', departmentname:'Sewing Floor', machineno:'1002', designno: '234234-23843'},
  {employeeid: 2, employeecode: '002', employeename:'Suriya', jobcode: 1, jobid: '22081003', noofdayspending : '3', departmentname:'Iron Man', machineno:'1004', designno: '113200-12345' }
]
  const store = useSelector(state => state.Itemgroup)
  // ** States
  const [value, setValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemGroupName, setItemGroupName] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [PendingJobList, setPendingJobList] = useState(list)


  const itemGrouparray = [
    { label: "All", value: 1 },
    { label: "Frock", value: 2 }
  ]

  //table cloums
  const columns = [
    {
      name: 'S.No',
      sortField: 'rownum',
      maxWidth:'5px',
      cell: (row, index) => <span>{index + 1}</span>
    },
    {
      name: 'Job ID',
      sortable: true,
      sortField: 'jobid',
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
           <Link to="/production/jobcard"  className='hyperlink' state={{ flag: "pendingreport" }}>{row.jobid}</Link>
          </div>

        )
      }
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
      minWidth: '150px',
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
      name: 'Machine ID',
      sortable: true,
      minWidth: '150px',
      sortField: 'machineno',
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.machineno}</h6>
          </div>

        )
      }
    },
    {
      name: 'Design ID',
      sortable: true,
      minWidth: '150px',
      sortField: 'designno',
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.designno}</h6>
          </div>

        )
      }
    },
    {
      name: 'Age of job',
      sortable: true,
      minWidth: '150px',
      sortField: 'pendingjob',
      center:true,
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
             <Badge color='light-primary' className="badge badge-light-primary">
             {row.noofdayspending} days
             </Badge>
          </div>
        )
      }
    }
  ]

  //search filter
  const handleFilter = val => {
    setValue(val)
    if (val !== "" && val !== undefined && val !== null) {
      const arraydata = list.filter((e) => e.jobid.toLowerCase().includes(val.toLowerCase()) || e.employeename.toLowerCase().includes(val.toLowerCase()))
      setPendingJobList(arraydata)
    } else {
      const arraydata = list.length <= rowsPerPage ? list : paginateArray(list, rowsPerPage, currentPage)
      if (list && list.length > 0) {
        setPendingJobList(arraydata)
      } else {
        setPendingJobList([])
      }
    }
  }
  // for sorting
  const handleSort = (column, sortDirection) => {
    const sortable = column.sortField
    const sizeList = PendingJobList.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortable].toLowerCase() < b[sortable].toLowerCase() ? 1 : -1
      } else if (sortDirection === 'desc') {
        return a[sortable].toLowerCase() < b[sortable].toLowerCase() ? -1 : 1
      }
      setPendingJobList(sizeList)
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
    if (value !== "" && value !== undefined && value !== null && PendingJobList.length > 0) {
      count = Number(Math.ceil(PendingJobList.length / rowsPerPage))
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
  // getting data 
  const dataToRender = () => {
    const filters = {
      q: value
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (PendingJobList.length > 0) {
      return PendingJobList
    } else if (PendingJobList.length === 0 && isFiltered) {
      return PendingJobList.slice(0, rowsPerPage)
    }
  }

  //react-datatable
  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Pending Jobs</CardTitle>
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
            <Col lg='2' md='6' className='mb-1'>
              <Label className='form-label' for='email'>
                No. of days pending
              </Label>
              <InputGroup className='mb-2'>
                  <Input type='text' maxLength={5} autoComplete="off" id='days' />
                  <InputGroupText>Days</InputGroupText>
                </InputGroup>
            </Col>
            <Col lg='5' md='6' className='mb-1'>
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

export default PendingJobList
