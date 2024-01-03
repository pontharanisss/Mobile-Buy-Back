// ** React Imports
import { Fragment, useState } from 'react'

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather'
import Select from 'react-select'
// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'

const ContactDetails = ({ stepper }) => {
  const [State, setState] = useState(1)
  const Statearray = [
    { label: "Tamil Nadu", value: 1 },
    { label: "Bihar", value: 2 },
    { label: "West Bengal", value: 3 },
    { label: "Uttar Pradesh", value: 4 },
    { label: "Andhra Pradesh", value: 5 }
  ]

  const StateOnchange = (e) => {
    setState(e)
  }


  const onBlurstate = e => {
    if (e === "" || e === undefined) {
    } else {
    }
  }
  return (
    <Fragment>
      <Row>
        <Col md='6' className='mb-1'>
          <Label className='form-label'>
            Emergency Contact Person Name
            </Label>
          <Input type='text' maxLength={50} autoComplete="off" id='contactname' placeholder="Contact Person Name" />
        </Col>

        <Col md='6' className='mb-1'>
          <Label className='form-label'>
            Address Line 1
            </Label>
          <Input type='text' maxLength={50} autoComplete="off" id='addressline1' placeholder="Address Line 1" />
        </Col>

      </Row>

      <Row>
        <Col md='6' className='mb-1'>
          <Label className='form-label'>
            Emergency Contact No.
            </Label>
          <Input type='text' maxLength={10} autoComplete="off" id='contactno' placeholder="Contact No." />
        </Col>

        <Col md='6' className='mb-1'>
          <Label className='form-label'>
            Address Line 2
            </Label>
          <Input type='text' maxLength={50} autoComplete="off" id='addressline2' placeholder="Address Line 2" />
        </Col>
      </Row>

      <Row>
        <Col md='6' className='mb-1'>
        <Label className='form-label'>
            Email ID
            </Label>
          <Input type='text' maxLength={25} autoComplete="off" id='emailid' placeholder="Email ID" />
        </Col>
        <Col md='6' className='mb-1'>
        <Label className='form-label'>
            State
            </Label>
            <Select
                  isClearable={false}
                  options={Statearray}
                  className='react-select'
                  value={Statearray.filter(e => e.value === State)[0]}
                  onChange={(e) => StateOnchange(e)}
                  onBlur={(e) => onBlurstate(e.target.value)}
                />
        </Col>
      </Row>


      <Row>
        <Col md='6' className='mb-1'>
        <Label className='form-label'>
            Mobile No.
            </Label>
          <Input type='text' maxLength={10} autoComplete="off" id='mobileno' placeholder="Mobile No." />
        </Col>
        <Col md='6' className='mb-1'>
        <Label className='form-label'>
            City
            </Label>
          <Input type='text' maxLength={25} autoComplete="off" id='city' placeholder="City" />
        </Col>
      </Row>

      <Row>
      <Col md='6' className='mb-1'>  </Col>
        <Col md='6' className='mb-1'>
        <Label className='form-label'>
            Pincode
            </Label>
          <Input type='text' maxLength={6} autoComplete="off" id='pincode' placeholder="Pincode" />
        </Col>
      </Row>

      <div className='d-flex justify-content-between'>
        <Button color='secondary' className='btn-prev' onClick={() => stepper.previous()} >
          <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
          <span className='align-middle d-sm-inline-block d-none'>Previous</span>
        </Button>
        <Button color='primary' className='btn-next' onClick={() => stepper.next()}>
          <span className='align-middle d-sm-inline-block d-none'>Next</span>
          <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
        </Button>
      </div>
    </Fragment>
  )
}

export default ContactDetails
