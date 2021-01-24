import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Collapse
} from 'reactstrap'
import axios from 'axios'
import { SERVER_URL, HEADERS } from '../../utils/http'

const initial = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: ''
}

const AddCustomer = ({ data, updateFunc }) => {
  const [payload, setPayload] = useState(initial)
  const [isOpen, setIsOpen] = useState(true)

  useEffect(()=>{
    if(data){
      setPayload({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
      })
    }
  }, [data])

  const setData = (key, value)=>{
    setPayload({
      ...payload,
      [key]: value
    })
  }

  const resetFunc = ()=> {
    setPayload(initial)
    updateFunc('')
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    const result = data?
      await axios.put(`${ SERVER_URL }/customer/${ data.id }`, payload, { headers: HEADERS })
      .catch(err=>{ return err })
      :
      await axios.post(`${ SERVER_URL }/customer`, payload, { headers: HEADERS })
      .catch(err=>{ return err })

    if(result && result.data){
      resetFunc()
      alert(result.data.message)
    }else if(result && result.response.data) {
      alert(result.response.data.message)
    }
  }

  return (
    <Row>
      <Col>
        <Card className="mar20">
          <CardHeader onClick={ ()=>setIsOpen(!isOpen) }>
            <CardTitle tag="span">Add Customer</CardTitle>
          </CardHeader>
          <CardBody>
            <Collapse isOpen={ isOpen }>
              <Form method="POST" onSubmit={ handleSubmit }>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="first_name">First Name</Label>
                      <Input
                        type="text"
                        id="first_name"
                        onChange={ (e)=> setData('first_name', e.target.value) }
                        value={ payload.first_name }
                        required
                      />
                      <span className="text-danger"></span>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="last_name">Last Name</Label>
                      <Input
                        type="text"
                        id="last_name"
                        onChange={ (e)=> setData('last_name', e.target.value) }
                        value={ payload.last_name }
                        required
                      />
                      <span className="text-danger"></span>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        onChange={ (e)=> setData('email', e.target.value) }
                        value={ payload.email }
                        required
                      />
                      <span className="text-danger"></span>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="phone">Phone Number</Label>
                      <Input
                        type="text"
                        id="phone"
                        onChange={ (e)=> setData('phone', e.target.value) }
                        value={ payload.phone }
                        required
                      />
                      <span className="text-danger"></span>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Button color="primary" type="submit" style={{ marginRight: '10px' }}>Submit</Button>
                  <Button color="danger" type="reset" onClick={ resetFunc }>Reset</Button>
                </FormGroup>
              </Form>
            </Collapse>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default AddCustomer
