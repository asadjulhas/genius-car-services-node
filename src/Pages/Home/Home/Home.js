import React from 'react';
import { Carousel } from 'react-bootstrap';
import Services from '../Services/Services';
import slider1 from '../../../images/banner/banner1.jpg'
import slider2 from '../../../images/banner/banner2.jpg'
import slider3 from '../../../images/banner/banner3.jpg'
import PageTitle from '../../../hooks/PageTitle';

const Home = () => {
  return (
    <div>
      <PageTitle title='Home'></PageTitle>
      <div className="slider_area">
      <Carousel fade>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={slider1}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={slider2}
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={slider2}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
      </div>
      <Services />
    </div>
  );
};

export default Home;