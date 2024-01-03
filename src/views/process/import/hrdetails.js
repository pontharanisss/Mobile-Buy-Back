// ** React Imports
import { Fragment, useState, useRef } from 'react'

// ** Icons Imports
import { ArrowLeft, ArrowRight, Calendar } from 'react-feather'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button, InputGroup, InputGroupText } from 'reactstrap'

const HRDetails = ({ stepper}) => {
  const datefp = useRef(null)
  const [date, setdate] = useState(new Date())
  const [active, setActive] = useState(false)
  const [inactive, setInActive] = useState(false)
  const [designationName, SetdesignationName] =  useState('')
  const [departmentName, SetdepartmentName] =  useState('')
  const [employeeCategoryName, SetemployeeCategoryName] =  useState('')
  const designationarray = [{ value: 1, label: 'Tailor'}, {value: 2, label: 'Cutter'}, { value: 3, label: 'Designer'}, {value: 4, label: 'Dress Maker'}, {value: 5, label: 'Iron Man'}]
  const departmentarray = [{ value: 1, label: 'Fabric Store'}, {value: 2, label: 'Cutting Section'}, {value: 3, label: 'Sewing Floor'}, { value: 4, label: 'Quality Checking Section'}, {value: 5, label: 'Packing Section'}, {value: 6, label: 'Office'}]
  const employeeCategoryarray = [{ value: 1, label: 'Day-scholar'}, {value: 2, label: 'Hosteller'}]

  const employeeCategoryOnchange = (e) => {
    SetemployeeCategoryName(e)
  }
  
  
  const onBluremployeeCategory = e => {
  if (e === "" || e === undefined) {
  } else {
  }
  }

  const designationOnchange = (e) => {
    SetdesignationName(e)
  }
  
  
  const onBlurdesignation = e => {
  if (e === "" || e === undefined) {
  } else {
  }
  }

  const departmentOnchange = (e) => {
    SetdepartmentName(e)
  }
  
  const onBlurdepartment = e => {
  if (e === "" || e === undefined) {
  } else {
  }
  }
 //active and inactive dropdown in list screen - changeEvent
 const statusChangeEvent = (e, action) => {

  if (action === "active") {
    setActive(true)
    setInActive(false)
  } else {
    setActive(false)
    setInActive(true)
  }
}
const apply_date = e => {
  setdate(e[0])
}

  return (
    <Fragment>
        <Row>
          <Col md='6' className='mb-1'>
          <Label className='form-label'>
          Date of Joining
            </Label>
            <InputGroup className='flex-nowrap'>
                      <Flatpickr
                        ref={datefp}
                        options={{ maxDate: new Date(), dateFormat: 'd-m-Y' }}
                        value={date}
                        id='date-picker'
                        className='form-control'
                        onChange={e => apply_date(e)}
                      />
                      <InputGroupText
                        style={{ padding: '1%' }}
                        onClick={() => {
                          datefp.current.flatpickr.open()
                        }}
                      >
                        <Calendar size={14}></Calendar>
                      </InputGroupText>
                    </InputGroup>
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label'>
            Employee Category 
            </Label>
            <Select
              onChange={(e) => employeeCategoryOnchange(e)}
              onBlur={(e) => onBluremployeeCategory(e.target.value)}
              value={employeeCategoryName}
              isClearable={false}
              options={employeeCategoryarray}
              className='react-select'
            />
          </Col>
        </Row>
        <Row>
        <Col md='6' className='mb-1'>
            <Label className='form-label'>
            Department
            </Label>
            <Select
              onChange={(e) => departmentOnchange(e)}
              onBlur={(e) => onBlurdepartment(e.target.value)}
              value={departmentName}
              isClearable={false}
              options={departmentarray}
              className='react-select'
            />
          </Col>
          <Col md='6' className='mb-1'>
          <Label className='form-label'>
          Designation
            </Label>
            <Select
              onChange={(e) => designationOnchange(e)}
              onBlur={(e) => onBlurdesignation(e.target.value)}
              value={designationName}
              isClearable={false}
              options={designationarray}
              className='react-select'
            />
          </Col>
        </Row>

        <Row>
            <Label className='form-label'>
             Status
            </Label>
            <Col md='3' className='mb-1 padding'>
            <div className='form-check'>
                <Input type='radio' id='ex1-active' name='ex1' value={1} checked={active} onChange={(e) => statusChangeEvent(e, 'active')} />
                <Label className='form-check-label' for='ex1-active'>
                  Active
                </Label>
              </div>
              </Col>
              <Col md='3' className='mb-1 pb-2 padding'>
              <div className='form-check'>
                <Input type='radio' name='ex1' id='ex1-inactive' value={2} checked={inactive} onChange={(e) => statusChangeEvent(e, 'inactive')} />
                <Label className='form-check-label' for='ex1-inactive'>
                  Inactive
                </Label>
              </div>
              </Col>
        </Row>
       
        <div className='d-flex justify-content-between btn-top'>
          <Button color='secondary' className='btn-prev' onClick={() => stepper.previous()} >
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
  </Fragment>
  )
}

export default HRDetails
