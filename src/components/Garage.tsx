import * as React from 'react';
import { observer, inject } from 'mobx-react';
import GarageModel from '../models/GarageModel';
import VehicleModel from '../models/VehicleModel';

@inject('store')
@observer
export class Garage extends React.Component<{ store?: GarageModel }, {}> {
  render() {
    return (
      <div>
        <button onClick={this.addVechicle}>
          Add Vehicle
        </button>
        <div>
          # of vehicles in the garage: {this.props.store.vehicles.length}
        </div>

        <div>
          {this.props.store.vehicles.map(vehicle => {
            return <div>{vehicle.info}</div>
          })}
        </div>
      </div>
    );
  }

  addVechicle = () => {
    const { store } = this.props;
    const vehicle: VehicleModel = new VehicleModel('Mazda 3');
    store.addVechicle(vehicle);
  }
};