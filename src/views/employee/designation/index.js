// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
// ** Custom Components
import Sidebar from '@components/sidebar'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Edit, Trash, Unlock } from 'react-feather'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
// ** Reactstrap Imports
import '../../../assets/style/style.css'
import { toast } from "react-hot-toast"
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input,
  Row, Col, Card, UncontrolledTooltip, Badge
} from 'reactstrap'
// ** Store & Actions
import { handleStatusFlag } from './store'
import { useDispatch, useSelector } from 'react-redux'
import { paginateArray } from '../../..//utility/commonfunc'
import UILoader from '@components/ui-loader'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { BiFoodTag } from "react-icons/bi"

const CustomHeader = ({ handleFilter, value, handleStatusValue, statusValue, handlePerPage, rowsPerPage, showItemPopup }) => {
  const statusList =  [
    { label: "All", value: 1 },
    { label: "Active", value: 2 },
    { label: "Inactive", value: 3 }
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
        <Col md='6'>
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
      </Col>
    </Row>
  </div>
  )
}

const DesignationList = () => {
  // ** Store vars
  const list = [{ designationcode: 1, designationname: 'Tailor'}, {designationcode: 2, designationname: 'Cutter'}, { designationcode: 3, designationname: 'Designer'}, {designationcode: 4, designationname: 'Dress Maker'}, {designationcode: 5, designationname: 'Iron Man'}]

  const dispatch = useDispatch()
  const store = useSelector(state => state.Itemgroup)
  // ** States
  const [value, setValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [designationModal, setDesignationModal] = useState(false)
  const [designationDeleteModal, setDesignationDeleteModal] = useState(false)
  const [designationButton, setDesignationButton] = useState('Save')
  const [designationMasterList, setDesignationMasterList] = useState(list)
  const [loader, setloader] = useState(false)
  const [btntigger, SetBtnTrigger] = useState('')
  const [deletetigger, SetDeleteTrigger] = useState('')
  const [designationheader, setDesignationheader] = useState('Add Designation')

  // add click
  const showItemPopup = () => {
    setDesignationButton('Save')
    setDesignationheader('Add Designation')
    setDesignationModal(!designationModal)
  }

  //save click
  const saveDesignation = (action) => {
    if (action === 'Save' || action === 'savecontinue') {
    } else {
    }
  }

  //Edit Click
  const editDesignation = (data) => {
    console.log(data)
    setDesignationheader('Update Designation')
    setDesignationModal(!designationModal)
  }

  // Delete Click
  const deleteDesignation = (data) => {
    console.log(data)
    setDesignationDeleteModal(!designationDeleteModal)
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
      name: 'Designation Name',
      sortable: true,
      minWidth: '800px',
      sortField: 'designationname',
      cell: row => {
        return (
          <div className='justify-content-left align-items-center paddingtop-1'>
            <h6 className='user-name text-truncate mb-0 wraptext vertical_align'>{row.designationname}</h6>
          </div>

        )
      }
    },
    {
      name: 'Action',
      minWidth: '30px',
      center:true,
      cell: row => (
        <div className='column-action d-flex align-items-center'>
          <Edit size={14} className='me-50' id={`edit-tooltip-${row.id}`} onClick={() => editDesignation(row)} />
          <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`} >
            Edit
          </UncontrolledTooltip>
          <Trash size={14} className='me-50' id={`delete-tooltip-${row.id}`} onClick={() => deleteDesignation(row)} />
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
          setDesignationModal(false)
        }
        if (btntigger === 'savecontinue') {
          SetBtnTrigger('')
          setDesignationModal(true)
        }
      }
      if (deletetigger !== '') {
        setCurrentPage(1)
        toast.success(store.message, { duration: 2000, style: { color: '#000', backgroundColor: '#d7d2d2' } })
        setDesignationDeleteModal(false)
        if (deletetigger === 'Yes') {
          SetDeleteTrigger('')
        }
      }
      setStatusValue(1)
      setValue('')
    } else if (store.statusFlag === 2) {
      dispatch(handleStatusFlag(0))
      if (deletetigger && deletetigger !== 'Yes') {
        setDesignationModal(true)
      } else {
        setDesignationDeleteModal(false)
      }
      toast.error(store.message, { duration: 2000, style: { color: '#000', backgroundColor: '#d7d2d2' } })
    }
  }, [dispatch, store.data.length, store.statusFlag])

  useEffect(() => {
    const arraydata = designationMasterList
    const list = arraydata.length <= rowsPerPage ? arraydata : paginateArray(arraydata, rowsPerPage, currentPage)
    setloader(false)
    if (arraydata && arraydata.length > 0) {
      setDesignationMasterList(list)
    }
  }, [list, store.total, designationMasterList.whenToUpdateProp, rowsPerPage, currentPage])


  //search filter
  const handleFilter = val => {
    setValue(val)
    if (val !== "" && val !== undefined && val !== null) {
      const arraydata = list.filter((e) => e.designationname.toLowerCase().includes(val.toLowerCase()))
      setDesignationMasterList(arraydata)
    } else {
      const arraydata = list.length <= rowsPerPage ? list : paginateArray(list, rowsPerPage, currentPage)
      if (list && list.length > 0) {
        setDesignationMasterList(arraydata)
      } else {
        setDesignationMasterList([])
      }
    }
  }
  // for sorting
  const handleSort = (column, sortDirection) => {
    const sortable = column.sortField
    const designationList = designationMasterList.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortable].toLowerCase() < b[sortable].toLowerCase() ? 1 : -1
      } else if (sortDirection === 'desc') {
        return a[sortable].toLowerCase() < b[sortable].toLowerCase() ? -1 : 1
      }
      setDesignationMasterList(designationList)
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
    if (value !== "" && value !== undefined && value !== null && designationMasterList.length > 0) {
      count = Number(Math.ceil(designationMasterList.length / rowsPerPage))
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

    if (designationMasterList.length > 0) {
      return designationMasterList
    } else if (designationMasterList.length === 0 && isFiltered) {
      return designationMasterList.slice(0, rowsPerPage)
    }
  }

  //react-datatable
  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='invoice-list-dataTable react-dataTable' style={{ marginBottom: '15px' }}>
          <UILoader blocking={loader}>
            <DataTable
              title='Designation'
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
                  handleStatusValue={handleStatusValue}
                  showItemPopup={showItemPopup}
                />
              }
            />
          </UILoader>
        </div>
      </Card>

      <Modal isOpen={designationDeleteModal} toggle={() => setDesignationDeleteModal(!designationDeleteModal)}
        className='vertically-centered-modal' fade={false}>
        <ModalHeader toggle={() => setDesignationDeleteModal(!designationDeleteModal)}>Confirmation</ModalHeader>
        <ModalBody>
          <div className='mb-2'>
            <Label className='form-label' for='email'>
              Are you sure you want to delete this designation ?
            </Label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => setDesignationDeleteModal(!designationDeleteModal)}>
            Yes
          </Button>{' '}
          <Button color='primary' outline onClick={() => setDesignationDeleteModal(!designationDeleteModal)}>
            No
          </Button>{' '}
        </ModalFooter>
      </Modal>

      <Modal isOpen={designationModal} toggle={() => setDesignationModal(!designationModal)}
        className='vertically-centered-modal' fade={false}>
        <ModalHeader toggle={() => setDesignationModal(!designationModal)}>{designationheader}</ModalHeader>
        <ModalBody>

          <div className='mb-2'>
            <Label className='form-label required' for='email'>
            Designation Name
                </Label>
            <Input type='text' maxLength={50} autoComplete="off" id='designationname' placeholder="Designation Name" />
          </div>
        
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => saveDesignation(designationButton)}>
            {designationButton}
          </Button>{' '}
          {designationButton === 'Save' && <Button color='primary' onClick={() => saveDesignation('savecontinue')}>
            Save & Continue
          </Button>}{' '}
          <Button color='primary' outline onClick={() => setDesignationModal(!designationModal)}>
            Close
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default DesignationList
