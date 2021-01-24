import './App.css'
import Header from './shared/header'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/home/home'
import Customer from './components/customer/customer'
import Product from './components/product/product'
import Order from './components/order/order'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/customers" exact>
            <Customer />
          </Route>
          <Route path="/products" exact>
            <Product />
          </Route>
          <Route path="/orders" exact>
            <Order />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
