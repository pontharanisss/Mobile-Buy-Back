// ** React Imports
import { Fragment, useState, useRef, useEffect } from 'react'
import { commonData} from './store' 
import { useDispatch} from 'react-redux'
// ** Icons Imports
import Flatpickr from 'react-flatpickr'
import { ArrowLeft, ArrowRight, Calendar } from 'react-feather'
// ** Reactstrap Imports
import Select from 'react-select'
import { Label, Row, Col, Input, Form, Button, InputGroup, InputGroupText  } from 'reactstrap'

const PersonalDetails = ({ stepper}) => {
  const datefp = useRef(null)
  const [date, setdate] = useState()
  const [MaritalName, SetMaritalName] =  useState('')
  const [GenderName, SetGenderName] =  useState('')
  const [BloodgroupName, SetBloodgroupName] =  useState('')
  const [maritalDisable, setmaritalDisable] = useState(false)
  const maritalarray = [{value:1, label:'Single'}, {value:2, label:'Married'}, {value:3, label:'Divorced'}]
  const genderarray = [{value:1, label:'Female'}, {value:2, label:'Male'}, {value:3, label:'Others'}]
  const bloodgrouparray = [{value:1, label:'A+'}, {value:2, label:'A-'}, {value:3, label:'B+'}, {value:4, label:'B-'}, {value:5, label:'O+'}, {value:6, label:'O-'}, {value:7, label:'AB+'}, {value:8, label:'AB-'}]

  const dispatch = useDispatch()

  const MaritalOnchange = (e) => {
    SetMaritalName(e)
    if (e.value === 2) {
      setmaritalDisable(false)
    } else {
      setmaritalDisable(true)
    }
  }
  
  
  const onBlurMarital = e => {
  if (e === "" || e === undefined) {
  } else {
  }
  }

  const GenderOnchange = (e) => {
    SetGenderName(e)
  }
  
  const onBlurGender = e => {
  if (e === "" || e === undefined) {
  } else {
  }
  }

  const BloodgroupOnchange = (e) => {
    SetBloodgroupName(e)
  }
  
  const onBlurBloodgroup = e => {
  if (e === "" || e === undefined) {
  } else {
  }
  }

  const apply_date = e => {
    setdate(e[0])
  }

  useEffect(async() => {
    dispatch(
      commonData({
        user_id: 1
        } 
     )
    ) 
  }, [dispatch])

  return (
    <Fragment>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label'>
              Employee Code
            </Label>
            <Input type='text' maxLength={10} autoComplete="off" id='employeecode' placeholder="Employee Code" />
          </Col>
          <Col md='6' className='mb-1'>
          <Label className='form-label'>
          Marital Status
            </Label>
            <Select
              onChange={(e) => MaritalOnchange(e)}
              onBlur={(e) => onBlurMarital(e.target.value)}
              value={MaritalName}
              isClearable={false}
              options={maritalarray}
              className='react-select'
            />
          </Col>
        </Row>

        <Row>
        <Col md='6' className='mb-1'>
          <Label className='form-label'>
           Employee Name
            </Label>
            <Input type='text' maxLength={25} autoComplete="off" id='employeename' placeholder="Employee Name" />
          </Col>
          <Col md='6' className='mb-1'  disabled={maritalDisable}>
            <Label className='form-label'>
            Spouse Name
            </Label>
            <Input type='text' maxLength={25} autoComplete="off" id='spousename' placeholder=" Spouse Name" />
          </Col>
        </Row>

        <Row>
        <Col md='6' className='mb-1'>
          <Label className='form-label'>
            Gender
            </Label>
            <Select
              onChange={(e) => GenderOnchange(e)}
              onBlur={(e) => onBlurGender(e.target.value)}
              value={GenderName}
              isClearable={false}
              options={genderarray}
              className='react-select'
            />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label'>
            Mother Name
            </Label>
            <Input type='text' maxLength={25} autoComplete="off" id='mothername' placeholder="Mother Name" />
          </Col>
        </Row>

        <Row>
        <Col md='6' className='mb-1'>
            <Label className='form-label'>
             Blood Group
            </Label>
            <Select
              onChange={(e) => BloodgroupOnchange(e)}
              onBlur={(e) => onBlurBloodgroup(e.target.value)}
              value={BloodgroupName}
              isClearable={false}
              options={bloodgrouparray}
              className='react-select'
            />
          </Col>
          <Col md='6' className='mb-1'>
          <Label className='form-label'>
          Father Name
            </Label>
            <Input type='text' maxLength={25} autoComplete="off" id='fathername' placeholder="Father Name" />
          </Col>
        </Row>

        <Row>
        <Col md='6' className='mb-1'>
          <Label className='form-label'>
          Date of Birth
            </Label>
            <InputGroup className='flex-nowrap'>
                      <Flatpickr
                        ref={datefp}
                        options={{ maxDate: new Date(), dateFormat: 'd-m-Y' }}
                        value={date}
                        id='date-picker'
                        className='form-control'
                        placeholder='Date of Birth'
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
          </Row>

        <div className='d-flex end' >
          <Button color='primary' className='btn-next' onClick={() => stepper.next()}>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
       </div>
  </Fragment>
  )
}

export default PersonalDetails
