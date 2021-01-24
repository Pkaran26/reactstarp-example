import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle
} from 'reactstrap'
import Datatable from '../../shared/datatable'
import axios from 'axios'
import { SERVER_URL, HEADERS } from '../../utils/http'
import AddCustomer from './add-customer'

const Customer = () => {
  const [customers, setCustomers] = useState([])
  const [total, setTotal] = useState(0)
  const [skip, setSkip] = useState(0)
  const [updateproduct, setUpdateProduct] = useState('')

  const columns = [
    { name: 'First Name', key: 'first_name', type: 'string' },
    { name: 'Last Name', key: 'last_name', type: 'string' },
    { name: 'Email', key: 'email', type: 'string' },
    { name: 'Phone Number', key: 'phone', type: 'string' },
    { name: 'Active', key: 'is_active', type: 'boolean' },
    { name: 'Created At', key: 'created_at', type: 'date' },
    { name: 'Updated At', key: 'updated_at', type: 'date' }
  ]

  useEffect(()=>{
    getCustomers(0)
  }, [])

  const getCustomers = (skip)=>{
    axios.get(`${ SERVER_URL }/customer?skip=${ skip }`, { headers: HEADERS })
    .then(res=>{
      if(res && res.data && res.data.data){
        setCustomers(res.data.data)
        setTotal(res.data.total)
      }
    })
    .catch(err=>{})
  }

  const updateFunc = async (data)=>{
    setUpdateProduct(data)
  }

  const deleteFunc = async (id)=>{
    const res = await axios.delete(`${ SERVER_URL }/customer/${ id }`, { headers: HEADERS })
    .catch(err=>{})

    if(res && res.data){
      alert(res.data.message)
      getCustomers(skip)
    }
  }

  return (
    <Container>
      <AddCustomer
        data={ updateproduct }
        updateFunc={ (e)=>{
          updateFunc(e)
          getCustomers(skip)
        }}
      />
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="span">Customers</CardTitle>
            </CardHeader>
            <CardBody>
              <Datatable
                columns={ columns }
                rows={ customers }
                total={ total }
                getFunc={ getCustomers }
                updateFunc={ updateFunc }
                deleteFunc={ deleteFunc }
                pageFunc={ (e)=> setSkip(e) }
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Customer
