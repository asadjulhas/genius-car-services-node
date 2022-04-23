import React, { useState } from 'react';
import './Services.css'
import useServices from '../../../hooks/useServices';
import Service from './Service';
import { Button, Container, Modal, Row } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const Services = () => {
  const [user] = useAuthState(auth);
  const [services] = useServices();

  
// console.log(services)
  return (
    <div className="services_area">
<h2 className='m-5'>Our Services</h2>
      <div id='services' className='servicesaa'>
      <Container className='mx-auto'>
  <Row className='g-4' xs={1} md={2} lg={3}>
  
      {services.map(service => 
        <Service user={user} key={service._id} service={service}/>
      )}
      </Row>
      </Container>
    </div>

   

    </div>
  );
};

export default Services;