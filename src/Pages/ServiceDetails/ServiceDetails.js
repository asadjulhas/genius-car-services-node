import React, { useEffect, useState } from 'react';
import './ServiceDetails.css'
import { useParams } from 'react-router-dom';
import useServices from '../../hooks/useServices';
import PageTitle from '../../hooks/PageTitle';
import { Helmet } from 'react-helmet-async';
import useSingleService from '../../hooks/useSingleService';

const ServiceDetails = () => {
  const {id} = useParams();
  const [service] = useSingleService(id);
  return (
    <div className='mt-5 single_service'>
      <PageTitle title='Service'/>
      <div className="service sservice">
      <h2>{service?.name}</h2>
      <p>${service?.price}</p>
      <p>{service?.description}</p>
      <img className='img-fluid mb-3' src={service?.img} alt="" />
      </div>
    </div>
  );
};

export default ServiceDetails;