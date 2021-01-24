import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Badge
} from 'reactstrap'
import Datatable from '../../shared/datatable'
import axios from 'axios'
import { SERVER_URL, HEADERS } from '../../utils/http'
import AddOrder from './add-order'

const Order = () => {
  const [orders, setOrders] = useState([])
  const [total, setTotal] = useState(0)
  const [skip, setSkip] = useState(0)
  const [updateproduct, setUpdateProduct] = useState('')

  const columns = [
    { name: 'Order Id', key: 'id', type: 'string' },
    { name: 'Product', key: 'product', type: 'string', cell: (e)=> <span>{ e.product.product }</span> },
    { name: 'Customer', key: 'customer', type: 'string', cell: (e)=> <span className="text-primary">{ e.customer.first_name } { e.customer.last_name }</span> },
    { name: 'Total Amount', key: 'total_amount', type: 'string', cell: (e)=> <span>{ e.total_amount }/-</span> },
    { name: 'Quantity', key: 'quantity', type: 'string' },
    { name: 'Order Status', key: 'order_status', type: 'string' },
    { name: 'Delivered', key: 'is_delivered', type: 'boolean', cell: (e)=> <Badge color="info">{ e.is_delivered? 'Yes': 'No' }</Badge> },
    { name: 'Created At', key: 'created_at', type: 'date' },
    { name: 'Delivered At', key: 'delivery_date', type: 'date' }
  ]

  useEffect(()=>{
    getOrders(0)
  }, [])

  const getOrders = (skip)=>{
    axios.get(`${ SERVER_URL }/order?skip=${ skip }`, { headers: HEADERS })
    .then(res=>{
      if(res && res.data && res.data.data){
        setOrders(res.data.data)
        setTotal(res.data.total)
      }
    })
    .catch(err=>{})
  }

  const updateFunc = async (data)=>{
    setUpdateProduct(data)
  }

  const deleteFunc = async (id)=>{
    const res = await axios.delete(`${ SERVER_URL }/order/${ id }`, { headers: HEADERS })
    .catch(err=>{})

    if(res && res.data){
      alert(res.data.message)
      getOrders(skip)
    }
  }

  return (
    <Container>
      <AddOrder
        data={ updateproduct }
        updateFunc={ (e)=>{
          updateFunc(e)
          getOrders(skip)
        }}
      />
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="span">Orders</CardTitle>
            </CardHeader>
            <CardBody>
              <Datatable
                columns={ columns }
                rows={ orders }
                total={ total }
                getFunc={ getOrders }
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

export default Order
