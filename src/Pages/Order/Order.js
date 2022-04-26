import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import PageTitle from '../../hooks/PageTitle';
import './Order.css';

const Order = () => {
  const [user] = useAuthState(auth);
const [orders, setOrders] = useState([])
useEffect(() => {
  fetch(`http://localhost:5000/order?email=${user.email}`)
  .then(res => res.json())
  .then(orders => setOrders(orders))
},[])

let keys = []
for(const key of orders) {
  keys.push(key.productId)
}
// console.log(keys)
  return (
    <div>
      <p className='pt-3'>Total order: {orders.length}</p>
      <PageTitle title='Orders'/>
      {orders.map(order => 
        
        <Card key={order._id} className='w-50 mx-auto mb-4'>
  <Card.Header as="h5">Order Id: {order._id}</Card.Header>
  <Card.Body>
    <Card.Title>Product Id: {order?.productId}</Card.Title>
    <Card.Text>
    ${order?.price}
    </Card.Text>
  </Card.Body>
</Card>

        )}
    </div>
  );
};

export default Order;