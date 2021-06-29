import React, { Component } from 'react';
import Car from './car/Car';
import ReactSelect from 'react-select';

import './Cars.css';

class Cars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carsList: [],
      activeIndex: 0,
      navigatedIndex: 4,
      bodyTypeList: [],
      selectedObj: {}
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
        let bodyTypeArr = [];
        let bodyTypeList = [];
        response.map(item => {
          if (!bodyTypeArr.includes(item.bodyType)) {
            bodyTypeArr.push(item.bodyType);
            bodyTypeList.push({ label: item.bodyType, value: item.bodyType })
          }
        })
        this.setState({ originalCarsList: response, carsList: response, bodyTypeList: bodyTypeList })
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
  navigate(direction) {
    let carsListElement = document.querySelector(".Cars");
    let navigatedIndex = this.state.navigatedIndex;
    let carsList = this.state.carsList;
    let scrollWidth = 0;
    if (direction === "left") {
      navigatedIndex = navigatedIndex - 4 > 0 ? navigatedIndex - 4 : 0
    } else {
      navigatedIndex = navigatedIndex + 4 < carsList.length ? navigatedIndex + 4 : carsList.length - 1
    }
    scrollWidth = (260 * navigatedIndex) + (navigatedIndex ? 35 * navigatedIndex : 0);
    this.setState({ navigatedIndex: navigatedIndex }, () => {
      carsListElement.scrollTo(scrollWidth, 0)
    });
  }
  filterChangeHandler(selectedObj) {
    let carsList = [...this.state.originalCarsList];
    carsList = carsList.filter(item=> item.bodyType === selectedObj.label)
    this.setState({selectedObj: selectedObj, carsList: carsList})
  }
  render() {
    const { carsList, activeIndex, bodyTypeList, selectedObj } = this.state;
    let deviceWidth = window.outerWidth;
    return (
      <div className="Cars">
        <ReactSelect className="filter"
          options={bodyTypeList}
          value={selectedObj}
          onChange={this.filterChangeHandler.bind(this)} />
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
            <li onClick={() => this.navigate("left")}><img src="icons/chevron-circled.svg" /></li>
            <li onClick={() => this.navigate("right")}><img src="icons/chevron-circled.svg" /></li>
          </ul>
        }

      </div>
    );
  }
}

export default Cars;
