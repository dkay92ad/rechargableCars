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
      activeIndex: 0,
      navigatedIndex: 4
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
    let carsListElement = document.querySelector(".Cars");
    let scrollWidth = (260 * index) + (index ? 35 * index : 0);
    this.setState({ activeIndex: index }, () => {
      carsListElement.scrollTo(scrollWidth, 0)
    });
  }
  navigate(direction){
    let carsListElement = document.querySelector(".Cars");
    let navigatedIndex = this.state.navigatedIndex;
    let carsList = this.state.carsList;
    let scrollWidth = 0;
    let multiplyBy = 0
    if(direction === "left"){
      navigatedIndex = navigatedIndex - 4 > 0 ? navigatedIndex - 4 : 0
    }else{
      navigatedIndex = navigatedIndex + 4 < carsList.length ?  navigatedIndex + 4 :  carsList.length - 1
    }
    // multiplyBy = Math.floor(navigatedIndex/4);
    scrollWidth = (260 * navigatedIndex) + (navigatedIndex ? 35 * navigatedIndex : 0);
    this.setState({ navigatedIndex: navigatedIndex }, () => {
      carsListElement.scrollTo(scrollWidth, 0)
    });
  }
  render() {
    const { carsList, activeIndex } = this.state;
    let deviceWidth = window.outerWidth;
    return (
      <div className="Cars">
        {
          carsList.map(car =>
            <Car key={car.id} car={car} id={"#" + car.id} />
          )
        }
        {deviceWidth <= 420 ?
          <ul className="carousel-dots">
            {
              carsList.map((car, index) =>
                <li key={car.id} className={activeIndex === index ? "activeIndex" : ""}>
                  <a href={car.id} onClick={this.scrollLeftBy.bind(this, index)}></a>
                </li>
              )
            }
          </ul> : 
          <ul className="navigationIcons">
            <li onClick={()=>this.navigate("left")}><img src="icons/chevron-circled.svg" /></li>
            <li onClick={()=>this.navigate("right")}><img src="icons/chevron-circled.svg" /></li>
          </ul>
          }

      </div>
    );
  }
}

export default Cars;
