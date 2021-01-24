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
  product: '',
  price: '',
  quantity: ''
}

const AddProduct = ({ data, updateFunc }) => {
  const [payload, setPayload] = useState(initial)
  const [isOpen, setIsOpen] = useState(true)

  useEffect(()=>{
    if(data){
      setPayload({
        product: data.product,
        price: data.price,
        quantity: data.quantity
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
      await axios.put(`${ SERVER_URL }/product/${ data.id }`, payload, { headers: HEADERS })
      .catch(err=>{ return err })
      :
      await axios.post(`${ SERVER_URL }/product`, payload, { headers: HEADERS })
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
                      <Label for="product">Name of Product</Label>
                      <Input
                        type="text"
                        id="product"
                        onChange={ (e)=> setData('product', e.target.value) }
                        value={ payload.product }
                        required
                      />
                      <span className="text-danger"></span>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="price">Price</Label>
                      <Input
                        type="number"
                        id="price"
                        onChange={ (e)=> setData('price', parseInt(e.target.value)) }
                        value={ payload.price }
                        required
                      />
                      <span className="text-danger"></span>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="quantity">Quantity</Label>
                      <Input
                        type="number"
                        id="quantity"
                        onChange={ (e)=> setData('quantity', parseInt(e.target.value)) }
                        value={ payload.quantity }
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

export default AddProduct
