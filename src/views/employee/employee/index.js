// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
// ** Custom Components
import Sidebar from '@components/sidebar'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Edit, Trash, Calendar, Filter } from 'react-feather'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
// ** Reactstrap Imports
import '../../../assets/style/style.css'
import { toast } from "react-hot-toast"
import Wizard from '@components/wizard'

// ** Reactstrap Imports
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input,
  Row, Col, Card, UncontrolledTooltip, Badge,  InputGroup, InputGroupText
} from 'reactstrap'
// ** Store & Actions
import { handleStatusFlag } from './store'
import { useDispatch, useSelector } from 'react-redux'
import { paginateArray } from '../../..//utility/commonfunc'
import UILoader from '@components/ui-loader'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import PersonalDetails from './personaldetails'
import ContactDetails from './contactdetails'
import BankDetails from './bankdetails'
import HRDetails from './hrdetails'
import { BiMobile } from "react-icons/bi"
import { MdEmail } from "react-icons/md"

const CustomHeader = ({ handleFilter, value, handleStatusValue, statusValue, handlePerPage, rowsPerPage, showItemPopup, apply_sidebar }) => {
  const statusList = [
    { label: "Active", value: 1 },
    { label: "Inactive", value: 2 }
  ]
  return (
    <div className='invoice-list-table-header w-100 py-2'>
    <Row className='pb-2'>
      <Col md='5' className='d-flex align-items-center'>
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
      <Col md='6' className='actions-right d-flex align-items-center'>
        <Col md='5'>
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

        <Col md='6' className='me-1'>
          <div className='d-flex align-items-center'>
            <label htmlFor='search-invoice'>Status</label>
            <Select
              isClearable={false}
              options={statusList}
              className='react-select ms-50 me-2 '
              value={statusList.filter(e => e.value === statusValue)[0]}
              onChange={(e) => handleStatusValue(e)}
            />
          </div>
        </Col>

        <Col md='2'>
          <Button color='primary' onClick={() => showItemPopup()}>
            Add
        </Button>
        </Col>

        <Col md='1' className='me-2'>
          <Filter style={{ color: "green" }} onClick={() => apply_sidebar()} />
        </Col>
      </Col>
    </Row>
  </div>
  )
}

const EmployeeList = () => {
  // ** Store vars
  const list = [{ employeeid: 1, employeecode: '001', employeename:'Vetri', emailid:'vetri@gmail.com', mobileno:'9876543456', designationname:'Designer', departmentname:'Sewing Floor', status:'Active'}, { employeeid: 2, employeecode: '002', employeename:'Suriya', emailid:'suriya@gmail.com', mobileno:'87654321234', designationname:'Iron Man', departmentname:'Sewing Floor', status:'Active'}]

  const dispatch = useDispatch()
  const store = useSelector(state => state.Itemgroup)
  // ** States
  const [value, setValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [EmployeeModal, setEmployeeModal] = useState(false)
  const [EmployeeDeleteModal, setEmployeeDeleteModal] = useState(false)
  const [EmployeeMasterList, setEmployeeMasterList] = useState(list)
  const [loader, setloader] = useState(false)
  const [btntigger, SetBtnTrigger] = useState('')
  const [deletetigger, SetDeleteTrigger] = useState('')
  const [Employeeheader, setEmployeeheader] = useState('Add Employee')
   const [stepper, setStepper] = useState(null)
   const ref = useRef(null)
  const fromdatefp = useRef(null)
  const todatefp = useRef(null)
  const [fromdate, setfromdate] = useState(new Date())
  const [todate, settodate] = useState(new Date())
  const [categoryName, setcategoryName] = useState(1)
  const [designationName, setdesignationName] = useState(1)
  const [departmentName, setdepartmentName] = useState(1)
  const [FilterModal, setFilterModal] = useState(false)

  const employeeCategoryarray = [ 
  { label: "All", value: 1 },
  { label: "Day-scholar", value: 2 },
  { label: "Hosteller", value: 3 }
]

  const designationarray = [{ value: 1, label: 'All'}, { value: 2, label: 'Tailor'}, {value: 3, label: 'Cutter'}, { value: 4, label: 'Designer'}, {value: 5, label: 'Dress Maker'}, {value: 6, label: 'Iron Man'}]

    const departmentarray = [{ value: 1, label: 'All'}, { value: 2, label: 'Fabric Store'}, {value: 3, label: 'Cutting Section'}, {value: 4, label: 'Sewing Floor'}, { value: 5, label: 'Quality Checking Section'}, {value: 6, label: 'Packing Section'}, {value: 7, label: 'Office'}]

   const statusObj = {
    pending: 'light-warning',
    Active: 'light-success',
    Inactive: 'light-danger'
  }

   const steps = [
    {
      id: 'personal-info',
       title: 'Personal Details',
       content: <PersonalDetails stepper={stepper} type='modern-vertical' />
      },
     {
       id: 'contact-info',
       title: 'Contact Details',
       content: <ContactDetails stepper={stepper} type='modern-vertical' />
     },
     {
      id: 'bank-info',
      title: 'Bank & ID Details',
      content: <BankDetails stepper={stepper} type='modern-vertical' />
     },
     {
       id: 'hr-info',
       title: 'HR Details',
       content: <HRDetails stepper={stepper} type='modern-vertical' />
     }
   ]


   //applyfilter
  const apply_sidebar = () => {
    setFilterModal(!FilterModal)
  }

  // add click
  const showItemPopup = () => {
    setEmployeeheader('Add Employee')
    setEmployeeModal(!EmployeeModal)
  }


  //Edit Click
  const editEmployee = (data) => {
    console.log(data)
    setEmployeeheader('Update Employee')
    setEmployeeModal(!EmployeeModal)
  }

  // Delete Click
  const deleteEmployee = (data) => {
    console.log(data)
    setEmployeeDeleteModal(!EmployeeDeleteModal)
  }

  //table cloums
  const columns = [
    {
      name: 'S.No',
      sortField: 'rownum',
      maxWidth:'10px',
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
      name: 'Contact Details',
      sortable: true,
      minWidth: '250px',
      sortField: 'sizename',
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <span className='user-name text-truncate mb-0 wraptext vertical_align'><BiMobile size={12}/> {row.mobileno}</span>
            {row.emailid ?  <pre className='wraptextpre vertical_align mb-0'><MdEmail size={12}/> {row.emailid}</pre> : ""}
          </div>
          
        )
      }
    },
    {
      name: 'Department',
      sortable: true,
      minWidth: '200px',
      sortField: 'hrinfo',
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
             <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.designationname}</h6>
          </div>
        )
      }
    },
    {
      minWidth: '30px',
      sortable: true,
      name: 'Status',
      sortField: 'status',
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {(row.status !== "" && row.status !== undefined) &&
            <Badge className='text-capitalize' color={statusObj[row.status]} pill>
              {row.status}
            </Badge>}
        </div>
      )
    },
    {
      name: 'Action',
      minWidth: '30px',
      sortable: true,
      cell: row => (
        <div className='column-action d-flex align-items-center'>
          <Edit size={14} className='me-50' id={`edit-tooltip-${row.id}`} onClick={() => editEmployee(row)} />
          <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`} >
            Edit
          </UncontrolledTooltip>
          <Trash size={14} className='me-50' id={`delete-tooltip-${row.id}`} onClick={() => deleteEmployee(row)} />
          <UncontrolledTooltip placement='top' target={`delete-tooltip-${row.id}`}>
            Delete
          </UncontrolledTooltip>
        </div>
      )
    }
  ]

  //list show api
  useEffect(() => {

    setloader(false)
    if (store.statusFlag === 1) {
      setloader(false)
      dispatch(handleStatusFlag(0))

      if (btntigger !== '') {
        setCurrentPage(1)
        toast.success(store.message, { duration: 2000, style: { color: '#000', backgroundColor: '#d7d2d2' } })
        if (btntigger === 'Save' || btntigger === 'Update') {
          SetBtnTrigger('')
          setEmployeeModal(false)
        }
        if (btntigger === 'savecontinue') {
          SetBtnTrigger('')
          setEmployeeModal(true)
        }
      }
      if (deletetigger !== '') {
        setCurrentPage(1)
        toast.success(store.message, { duration: 2000, style: { color: '#000', backgroundColor: '#d7d2d2' } })
        setEmployeeDeleteModal(false)
        if (deletetigger === 'Yes') {
          SetDeleteTrigger('')
        }
      }
      setStatusValue(1)
      setValue('')
    } else if (store.statusFlag === 2) {
      dispatch(handleStatusFlag(0))
      if (deletetigger && deletetigger !== 'Yes') {
        setEmployeeModal(true)
      } else {
        setEmployeeDeleteModal(false)
      }
      toast.error(store.message, { duration: 2000, style: { color: '#000', backgroundColor: '#d7d2d2' } })
    }
  }, [dispatch, store.data.length, store.statusFlag])

  useEffect(() => {
    const arraydata = EmployeeMasterList
    const list = arraydata.length <= rowsPerPage ? arraydata : paginateArray(arraydata, rowsPerPage, currentPage)
    setloader(false)
    if (arraydata && arraydata.length > 0) {
      setEmployeeMasterList(list)
    }
  }, [list, store.total, EmployeeMasterList.whenToUpdateProp, rowsPerPage, currentPage])


  //search filter
  const handleFilter = val => {
    setValue(val)
    if (val !== "" && val !== undefined && val !== null) {
      const arraydata = list.filter((e) => e.employeename.toLowerCase().includes(val.toLowerCase()))
      setEmployeeMasterList(arraydata)
    } else {
      const arraydata = list.length <= rowsPerPage ? list : paginateArray(list, rowsPerPage, currentPage)
      if (list && list.length > 0) {
        setEmployeeMasterList(arraydata)
      } else {
        setEmployeeMasterList([])
      }
    }
  }
  // for sorting
  const handleSort = (column, sortDirection) => {
    const sortable = column.sortField
    const employeeList = EmployeeMasterList.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortable].toLowerCase() < b[sortable].toLowerCase() ? 1 : -1
      } else if (sortDirection === 'desc') {
        return a[sortable].toLowerCase() < b[sortable].toLowerCase() ? -1 : 1
      }
      setEmployeeMasterList(employeeList)
    })
  }
  //pagevalue
  const handlePerPage = e => {
    setRowsPerPage(parseInt(e.target.value))
  }


  //active and iinactive dropdown in list screen
  const handleStatusValue = e => {
    setStatusValue(e.value)
    setValue('')
  }


  //existing pagination
  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }

  //custom pagination
  const CustomPagination = () => {
    let count = 0
    if (value !== "" && value !== undefined && value !== null && EmployeeMasterList.length > 0) {
      count = Number(Math.ceil(EmployeeMasterList.length / rowsPerPage))
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
      q: value,
      status: statusValue
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (EmployeeMasterList.length > 0) {
      return EmployeeMasterList
    } else if (EmployeeMasterList.length === 0 && isFiltered) {
      return EmployeeMasterList.slice(0, rowsPerPage)
    }
  }

  
  const apply_fromfilterdate = e => {
    setfromdate(e[0])
  }

  const apply_tofilterdate = e => {
    settodate(e[0])
  }

  const categoryOnchange = (e) => {
    setcategoryName(e)
  }

  const departmentOnchange = (e) => {
    setdepartmentName(e)
  }
  const designationOnchange = (e) => {
    setdesignationName(e)
  }

  //react-datatable
  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='invoice-list-dataTable react-dataTable' style={{ marginBottom: '15px' }}>
          <UILoader blocking={loader}>
            <DataTable
              title='Employee'
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
              subHeaderComponent={
                <CustomHeader
                  value={value}
                  statusValue={statusValue}
                  rowsPerPage={rowsPerPage}
                  handleFilter={handleFilter}
                  handlePerPage={handlePerPage}
                  apply_sidebar={apply_sidebar}
                  handleStatusValue={handleStatusValue}
                  showItemPopup={showItemPopup}
                />
              }
            />
          </UILoader>
        </div>
      </Card>

      <Modal isOpen={EmployeeDeleteModal} toggle={() => setEmployeeDeleteModal(!EmployeeDeleteModal)}
        className='vertically-centered-modal' fade={false}>
        <ModalHeader toggle={() => setEmployeeDeleteModal(!EmployeeDeleteModal)}>Confirmation</ModalHeader>
        <ModalBody>
          <div className='mb-2'>
            <Label className='form-label' for='email'>
              Are you sure you want to delete this employee ?
            </Label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => setEmployeeDeleteModal(!EmployeeDeleteModal)}>
            Yes
          </Button>{' '}
          <Button color='primary' outline onClick={() => setEmployeeDeleteModal(!EmployeeDeleteModal)}>
            No
          </Button>{' '}
        </ModalFooter>
      </Modal>

      <Modal isOpen={EmployeeModal} toggle={() => setEmployeeModal(!EmployeeModal)}
        className='vertically-centered-modal modal-lg' fade={false}>
        <ModalHeader toggle={() => setEmployeeModal(!EmployeeModal)}>{Employeeheader}</ModalHeader>
        <ModalBody >

        <Wizard
       type='vertical'
        ref={ref}
        steps={steps}
        options={{
          linear: false
        }}
        instance={el => setStepper(el)}
      />
        </ModalBody>
      </Modal>

      <Sidebar className="vertically-centered-modal"
        size='lg'
        fade={false}
        open={FilterModal}
        title='Apply Filter'
        headerClassName='mb-1'
        contentClassName='pt-0'
        toggleSidebar={() => setFilterModal(!FilterModal)}
      >
        <div className='mb-1'>
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
        </div>

        <div className='mb-1'>
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
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='email'>
           Employee Category
            </Label>
          <Select
            isClearable={false}
            options={employeeCategoryarray}
            className='react-select'
            value={employeeCategoryarray.filter(e => e.value === categoryName)[0]}
            onChange={(e) => categoryOnchange(e)}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='email'>
           Designation
            </Label>
          <Select
            isClearable={false}
            options={designationarray}
            className='react-select'
            value={designationarray.filter(e => e.value === designationName)[0]}
            onChange={(e) => designationOnchange(e)}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='email'>
            Department
            </Label>
          <Select
            isClearable={false}
            options={departmentarray}
            className='react-select'
            value={departmentarray.filter(e => e.value === departmentName)[0]}
            onChange={(e) => departmentOnchange(e)}
          />
        </div>

        <Row className='bottombtn'>
          <Col md='4' className='mb-1'>
            <Button color='primary' outline onClick={() => setFilterModal(!FilterModal)}>
              Clear
          </Button>
          </Col>

          <Col md='8' className='mb-1'>
            <Button type='submit' className='me-1' color='primary' onClick={() => setFilterModal(!FilterModal)}>
              Apply
          </Button>
          </Col>
        </Row>
      </Sidebar>
  
    </div>
  )
}

export default EmployeeList
