import React, { useEffect, useState } from 'react';
import './ServiceDetails.css'
import { useParams } from 'react-router-dom';
import useServices from '../../hooks/useServices';
import PageTitle from '../../hooks/PageTitle';
import { Helmet } from 'react-helmet-async';

const ServiceDetails = () => {
  const {id} = useParams();
  
  const [services] = useServices();
  const findService = services.find(service => service._id === id);
  return (
    <div className='mt-5 single_service'>
      <PageTitle title='Service'/>
      <div className="service sservice">
      <h2>{findService?.name}</h2>
      <p>${findService?.price}</p>
      <p>{findService?.description}</p>
      <img className='img-fluid mb-3' src={findService?.img} alt="" />
      </div>
    </div>
  );
};

export default ServiceDetails;