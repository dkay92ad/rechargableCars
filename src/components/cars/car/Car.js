import React, { Component } from 'react';
import './Car.css';

class Car extends Component {

  // {
  //   "id": "xc90-recharge",
  //   "modelName": "XC90 Recharge", 
  //   "bodyType": "suv",
  //   "modelType": "plug-in hybrid",
  //   "imageUrl": "/images/xc90_recharge.jpg"
  // }
  render() {
    const { car } = this.props;
    return (
      <div className="Car">
        <div className="bodyType">{car.bodyType}</div>
        <div className="modelName">{car.modelName}</div>
        <div className="modelType">{car.modelType}</div>
        <img className="imageUrl"
          src={car.imageUrl} alt="car image" />

        <ul className="carLinks">
          <li><a href={"/learn/" + car.id}>LEARN <img src="icons/chevron-small.svg" alt="learn" /></a></li>
          <li><a href={"/shop/" + car.id}>SHOP <img src="icons/chevron-small.svg" alt="learn" /></a></li>
        </ul>
      </div>
    );
  }
}

export default Car;
