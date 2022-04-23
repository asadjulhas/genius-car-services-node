import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Service = ({service}) => {
  const {_id, name, price, description, img} = service;

  const nagivate = useNavigate();
  const serviceDetails = (id) => {
    nagivate(`/service/${id}`)
  }
  return (
    <Col>
      <div className="service">
      <h2>{name}</h2>
      <p>${price}</p>
      <p>{description}</p>
      <img className='img-fluid mb-3' src={img} alt="" />
      <Button onClick={()=>serviceDetails(_id)} className='w-50' variant="info">More info</Button>
      </div>
    </Col>
  );
};

export default Service;