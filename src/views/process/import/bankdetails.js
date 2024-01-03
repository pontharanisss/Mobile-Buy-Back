// ** React Imports
import { Fragment } from 'react'

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Reactstrap Imports
import InputMask from 'react-input-mask'
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'

const BankDetails = ({ stepper }) => {
  return (
    <Fragment>
      <Row>
        <Col md='6' className='mb-1'>
          <Label className='form-label'>
            PAN
            </Label>
          <InputMask className='form-control'
            mask='aaaaa9999a'
            placeholder = 'PAN'
            >
          </InputMask>
        </Col>
        <Col md='6' className='mb-1'>
        <Label className='form-label'>
           Name as per bank account
            </Label>
          <Input type='text' maxLength={25} autoComplete="off" id='accountname' placeholder="Name as per bank account" />
        </Col>
      </Row>
      <Row>
        <Col md='6' className='mb-1'>
          <Label className='form-label'>
            Aadhar No.
            </Label>
            <InputMask className='form-control'
            mask='9999 9999 9999'
            placeholder = 'Aadhar No.'
            >
          </InputMask>
        </Col>

        <Col md='6' className='mb-1'>
        <Label className='form-label'>
            Bank Name
            </Label>
          <Input type='text' maxLength={25} autoComplete="off" id='bankname' placeholder="Bank Name" />
        </Col>
      </Row>

      <Row>
      <Col md='6' className='mb-1'>
          <Label className='form-label'>
            IFSC Code
            </Label>
            <InputMask className='form-control'
            mask='aaaa9999999'
            placeholder = 'IFSC Code'
            >
          </InputMask>
        </Col>
        <Col md='6' className='mb-1'>
        <Label className='form-label'>
            Bank Branch
            </Label>
          <Input type='text' maxLength={25} autoComplete="off" id='bankbranch' placeholder="Bank Branch" />
        </Col>
      </Row>
     
      <Row>
      <Col md='6' className='mb-1'></Col>
      <Col md='6' className='mb-1'>  <Label className='form-label'>
            Account No.
            </Label>
          <Input type='text' maxLength={16} autoComplete="off" id='accountno' placeholder="Account No." /></Col>
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

export default BankDetails
