'use client'

import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

const Slide = () =>{
    return(
        <Carousel>
            <Carousel.Item>
                <img src='/image/slide1.png' className='slideItemImg'/>
                <Carousel.Caption>
                    <h1>
                        Slide 1
                    </h1>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src='/image/slide2.jpg' className='slideItemImg'/>
                <Carousel.Caption>
                    <h1>
                        Slide 2
                    </h1>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src='/image/slide3.jpg' className='slideItemImg'/>
                <Carousel.Caption>
                    <h1>
                        Slide 3
                    </h1>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )


}

export default Slide