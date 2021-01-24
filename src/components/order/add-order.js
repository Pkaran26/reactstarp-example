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
  customer_id: '',
  product_id: '',
  quantity: ''
}

const AddOrder = ({ data, updateFunc }) => {
  const [payload, setPayload] = useState(initial)
  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])
  const [isOpen, setIsOpen] = useState(true)

  useEffect(()=>{
    if(data){
      setPayload({
        customer_id: data.customer_id,
        product_id: data.product_id,
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

  const getCustomers = (skip)=>{
    axios.get(`${ SERVER_URL }/customer?skip=${ skip }`, { headers: HEADERS })
    .then(res=>{
      if(res && res.data && res.data.data){
        setCustomers(res.data.data)
      }
    })
    .catch(err=>{})
  }

  const getProducts = (skip)=>{
    axios.get(`${ SERVER_URL }/product?skip=${ skip }`, { headers: HEADERS })
    .then(res=>{
      if(res && res.data && res.data.data){
        setProducts(res.data.data)
      }
    })
    .catch(err=>{})
  }

  useEffect(()=>{
    getCustomers(0)
    getProducts(0)
  }, [])

  const resetFunc = ()=> {
    setPayload(initial)
    updateFunc('')
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    const result = data?
      await axios.put(`${ SERVER_URL }/order/${ data.id }`, payload, { headers: HEADERS })
      .catch(err=>{ return err })
      :
      await axios.post(`${ SERVER_URL }/order`, payload, { headers: HEADERS })
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
            <CardTitle tag="span">Add Order</CardTitle>
          </CardHeader>
          <CardBody>
            <Collapse isOpen={ isOpen }>
              <Form method="POST" onSubmit={ handleSubmit }>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="product">Product</Label>
                      <select
                        className="form-control"
                        id="product"
                        onChange={ (e)=> setData('product_id', parseInt(e.target.value)) }
                        value={ payload.product_id }
                        required
                      >
                        <option value="">select</option>
                        { products && products.length>0?
                          products.map((e, i)=>(
                            <option value={ e.id } key={ i }>{ e.product }</option>
                          ))
                        :null }
                      </select>
                      <span className="text-danger"></span>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="customer">Customer</Label>
                      <select
                        className="form-control"
                        id="customer"
                        onChange={ (e)=> setData('customer_id', parseInt(e.target.value)) }
                        value={ payload.customer_id }
                        required
                      >
                        <option value="">select</option>
                        { customers && customers.length>0?
                          customers.map((e, i)=>(
                            <option value={ e.id } key={ i }>{ e.first_name } { e.last_name }</option>
                          ))
                        :null }
                      </select>
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

export default AddOrder
