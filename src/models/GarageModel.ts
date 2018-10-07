import {observable, action} from 'mobx';
import VehicleModel from './VehicleModel';

export default class GarageModel {
  @observable public vehicles: VehicleModel[] = [];

  @action public addVechicle(vehicle: VehicleModel) {
    this.vehicles.push(vehicle);
  }
}