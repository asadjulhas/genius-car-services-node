import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import PageTitle from '../../hooks/PageTitle';
import './Order.css';

const Order = () => {
  const [user] = useAuthState(auth);
const [orders, setOrders] = useState([])
const [orderItems, setOrderItems] = useState([]);
const toLogin = useNavigate();
useEffect(() => {
  
  const getOrders = async () => {
    try {
      const {data} = await axios.get(`https://salty-ravine-90360.herokuapp.com/order?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      setOrders(data);
    } catch (error) {
  console.log(error.response.status);
  if(error.response.status === 401 || error.response.status === 403) {
    localStorage.removeItem('accessToken')
    toast('Sorry, you dont have access');
    signOut(auth);
    toLogin('/login')
  }
    }
  }
  getOrders();
},[])

let keys = [];

useEffect(() => {
const orderKeys = async () => {
   for(const key of orders) {
    await keys.push(key.productId)
  }
  
  
    const getorderItem = async () => {
        await axios.post('https://salty-ravine-90360.herokuapp.com/orderitem', keys)
        .then((response) => {
          setOrderItems(response?.data)
        })
    }
 

  getorderItem();
}
orderKeys();
},[orders])

  return (
    <div>
      <p className='pt-3'>Total order: {orders.length}</p>
      <PageTitle title='Orders'/>
      {orderItems.map(order => 
        
        <Card key={order._id} className='w-50 mx-auto mb-4'>
  <Card.Header as="h5">{order.name}</Card.Header>
  <Card.Body>
    <Card.Title>
      <img src={order.img} alt="" />
    </Card.Title>
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