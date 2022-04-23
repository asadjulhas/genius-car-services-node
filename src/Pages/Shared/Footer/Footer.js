import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className='bg-info py-5 mt-4'>
      <p className='mt-3 text-white font-bold'>&copy; {year}</p>
    </footer>
  );
};

export default Footer;