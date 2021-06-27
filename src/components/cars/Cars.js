import React, { Component } from 'react';
import Car from './car/Car';
// import {
//   BrowserView,
//   MobileView,
//   isBrowser,
//   isMobile,
//   isDesktop
// } from "react-device-detect";

import './Cars.css';

class Cars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carsList: [],
      activeIndex: 0
    }
  }
  componentDidMount() {
    this.fetchCars()
  }
  fetchCars() {
    fetch('api/cars.json')
      .then(res => res.json())
      .then(response => {
        // console.log(response);
        this.setState({ carsList: response })
      })
  }
  scrollLeftBy(index, event) {
    event.preventDefault()
    
    let scrollWidth = (window.outerWidth / this.state.carsList.length) * index;
    scrollWidth = index != 0? scrollWidth + 130 : 0;
    this.setState({ activeIndex: index }, ()=>{
      window.scrollTo(scrollWidth, 0)
    });
  }
  render() {
    const { carsList, activeIndex } = this.state;
    return (
      <div className="Cars">
        {
          carsList.map(car =>
            <Car key={car.id} car={car} id={"#" + car.id} />
          )
        }
        <ul className="carousel-dots">
          {
            carsList.map((car, index) =>
              <li key={car.id} className={activeIndex === index ? "activeIndex" : ""}>
                <a href={car.id} onClick={this.scrollLeftBy.bind(this, index)}></a>
              </li>
            )
          }
        </ul>

      </div>
    );
  }
}

export default Cars;
