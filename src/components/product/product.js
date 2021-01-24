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
import AddProduct from './add-product'
import axios from 'axios'
import { SERVER_URL, HEADERS } from '../../utils/http'

const Product = () => {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [skip, setSkip] = useState(0)
  const [updateproduct, setUpdateProduct] = useState('')

  const columns = [
    { name: 'Product', key: 'product', type: 'string' },
    { name: 'Price', key: 'price', type: 'string', cell: (e)=> <span>{ e.price }/-</span> },
    { name: 'Quantity', key: 'quantity', type: 'string' },
    { name: 'Active', key: 'is_active', type: 'boolean' },
    { name: 'Created At', key: 'created_at', type: 'date' },
    { name: 'Updated At', key: 'updated_at', type: 'date' }
  ]

  useEffect(()=>{
    getProducts(0)
  }, [])

  const getProducts = (skip)=>{
    axios.get(`${ SERVER_URL }/product?skip=${ skip }`, { headers: HEADERS })
    .then(res=>{
      if(res && res.data && res.data.data){
        setProducts(res.data.data)
        setTotal(res.data.total)
      }
    })
    .catch(err=>{})
  }

  const updateFunc = async (data)=>{
    setUpdateProduct(data)
  }

  const deleteFunc = async (id)=>{
    const res = await axios.delete(`${ SERVER_URL }/product/${ id }`, { headers: HEADERS })
    .catch(err=>{})

    if(res && res.data){
      alert(res.data.message)
      getProducts(skip)
    }
  }

  return (
    <Container>
      <AddProduct
        data={ updateproduct }
        updateFunc={ (e)=>{
          updateFunc(e)
          getProducts(skip)
        }}
      />
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="span">Products</CardTitle>
            </CardHeader>
            <CardBody>
              <Datatable
                columns={ columns }
                rows={ products }
                total={ total }
                getFunc={ getProducts }
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

export default Product
