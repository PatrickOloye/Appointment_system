

import React from 'react';
import first from './first.jpeg'
import second from './second.jpeg'
import third from './third.jpg'
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <>
     <MDBCarousel showControls showIndicators  interval={2500} >
      <MDBCarouselItem
      style={{ height: '500px', width: "full" }}
        className='w-100 d-block'
        itemId={1}
        src={first}
        alt='...'
      >
        <h5>First slide label</h5>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </MDBCarouselItem>
      <MDBCarouselItem
       style={{ height: '500px' }}
        className='w-100 d-block'
        itemId={2}
        src={second}
        alt='...'
      >
        <h5>Second slide label</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </MDBCarouselItem>
      <MDBCarouselItem
       style={{ height: '500px' }}
        className='w-100 d-block'
        itemId={3}
        src={third}
        alt='...'
      >
        <h5>Third slide label</h5>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </MDBCarouselItem>
    </MDBCarousel>
    </>
   
  );
}