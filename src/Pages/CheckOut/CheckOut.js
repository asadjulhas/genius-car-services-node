import React, { useState } from 'react';
import './CheckOut.css';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from '../../hooks/PageTitle';
import useSingleService from '../../hooks/useSingleService';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const CheckOut = () => {
  const {id} = useParams();
  const [service] = useSingleService(id);
  const nagivate = useNavigate();

  // Logget user
  const [user] = useAuthState(auth);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (order, e) => {
    order.productId = id;
    order.price = service?.price;
    axios.post('https://salty-ravine-90360.herokuapp.com/order', order)
    .then(response => {
      if(response.data.insertedId) {
        toast('Order successfully place..!!!');
        e.target.reset();
        nagivate('/order');
      }
      console.log(response)
    })
  };

  return (
    <div className='checkout_form w-50 mx-auto bg-info p-4 rounded m-5'>
      <PageTitle title='Checkout'/>
      <h5>{service?.name} (<small className='text-danger fw-bold'>${service?.price}</small>)</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
    <Form.Label>Your Name</Form.Label>
      <input readOnly value={user?.displayName} className='form-control' {...register("name", { required: true })} placeholder='Enter your Name' />
      </Form.Group>
      
      <Form.Group className="mb-3">
    <Form.Label>Your email</Form.Label>
      <input readOnly value={user?.email}  type='email' className='form-control' {...register("email", { required: true })} placeholder='Enter your email' />
      </Form.Group>

      <Form.Group className="mb-3">
    <Form.Label>Service name</Form.Label>
      <input type='text' value={service?.name} readOnly className='form-control'  {...register("productId", { required: false })} placeholder='Enter service name' />
      </Form.Group>

      <Form.Group className="mb-3">
    <Form.Label>Your address</Form.Label>
      <input type='text' className='form-control' {...register("address", { required: true })} placeholder='Enter your address' />
      </Form.Group>

      <Form.Group className="mb-3">
    <Form.Label>Your phone</Form.Label>
      <input type='text' className='form-control' {...register("phone", { required: true })} placeholder='Enter your Phone' />
      </Form.Group>

      {(errors.name || errors.email || errors.address || errors.phone) && <span>This field is required</span>}
      
      <input className='w-50 btn btn-primary' type="submit" value='Add service' />
    </form>
    </div>
  );
};

export default CheckOut;