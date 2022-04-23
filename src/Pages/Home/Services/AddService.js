import React, { useState } from 'react';
import './AddService.css'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const AddService = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data, e) => {
    fetch('http://localhost:5000/service', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(data)

    })
   .then(res => res.json())
   .then(result => {
     if(result?.acknowledged) {
       e.target.reset();
      handleShow();
     }
   })
  };

 return (
    <div>
      <h2 className='p-4'>Add service</h2>
      <div className="service_form w-50 mx-auto bg-info p-4 rounded mb-5">

      <form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
    <Form.Label>Service Name</Form.Label>
      <input className='form-control' {...register("name", { required: true })} placeholder='Enter service Name' />
      </Form.Group>
      <Form.Group className="mb-3">
    <Form.Label>Service details</Form.Label>
      <textarea rows='3' className='form-control' {...register("description", { required: true })} placeholder='Service details' />
      </Form.Group>
      
      <Form.Group className="mb-3">
    <Form.Label>Service image</Form.Label>
      <input className='form-control' {...register("img", { required: true })} placeholder='Enter Service image url' />
      </Form.Group>

      <Form.Group className="mb-3">
    <Form.Label>Service price</Form.Label>
      <input type='number' className='form-control'  {...register("price", { required: true })} placeholder='Enter service price' />
      </Form.Group>

      {(errors.name || errors.description || errors.img || errors.price) && <span>This field is required</span>}
      
      <input className='w-50 btn btn-primary' type="submit" value='Add service' />
    </form>
      </div>

      <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Action Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Service successfully added..!!!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>

    </div>
  );
};

export default AddService;