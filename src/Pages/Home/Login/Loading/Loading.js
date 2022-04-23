import React from 'react';
import './Loading.css'
import Spinner from 'react-bootstrap/Spinner'

const Loading = () => {
  return (
    <div className='loading_spinner'>
      <Spinner animation="grow"  variant="success" />
    </div>
  );
};

export default Loading;