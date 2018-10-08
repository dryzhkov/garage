import * as React from 'react';
import { action, observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { DefaultButton, IconButton, CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import GarageModel from '../models/GarageModel';
import VehicleModel from '../models/VehicleModel';
import { RemindersList } from './RemindersList';
import { ServiceRecordsList } from './ServiceRecordsList';
import { AddReminder } from './AddReminder';
import ReminderModel from '../models/ReminderModel';
import ServiceRecordModel from '../models/ServiceRecordModel';

@inject('store')
@observer
export class Garage extends React.Component<{ store?: GarageModel }, {}> {
  @observable private selectedVehicle: VehicleModel;
  @observable private addReminderVisibility: boolean;

  render() {
    const { store } = this.props;
    const dropdownOptions = store.vehicles.map(vehicle => {
      return {
        key: vehicle.id,
        text: vehicle.make
      };
    });

    const reminders = 
      this.selectedVehicle ? 
        <RemindersList selectedVehicle={this.selectedVehicle}/> : null;

    const serviceRecords = 
      this.selectedVehicle ? 
        <ServiceRecordsList selectedVehicle={this.selectedVehicle}/> : null;

    return (
      <div>
        <DefaultButton
          text="Add Vehicle"
          onClick={this.addVehicle}
          style={{width:150, height:30}}
        />

        <CommandBarButton
            disabled={!this.selectedVehicle}
            onClick={this.addReminder}
            iconProps={{ iconName: 'AlarmClock' }}
            text="Add Reminder"
            style={{width:150, height:30}}
          />

        <CommandBarButton
            disabled={!this.selectedVehicle}
            onClick={this.addServiceRecord}
            iconProps={{ iconName: 'Add' }}
            text="Add Service Record"
            style={{width:150, height:30}}
          />

        <Dropdown
          label="Garage:"
          selectedKey={this.selectedVehicle ? this.selectedVehicle.id : undefined}
          onChanged={this.vehicleChanged}
          placeHolder="Select a Vehicle"
          options={dropdownOptions}
        />

        {reminders}
        {serviceRecords}

        <AddReminder 
          selectedVehicle={this.selectedVehicle} 
          visible={this.addReminderVisibility} 
          onClose={this.closeAddReminder}
        />
      </div>
    );
  }

  @action
  addVehicle = () => {
    // const { store } = this.props;
    // const vehicle: VehicleModel = new VehicleModel('Mazda 3');
    // store.addVehicle(vehicle);
  }

  @action
  addReminder = () => {
    if (this.selectedVehicle) {
      this.addReminderVisibility = true;
    }
  }

  @action
  closeAddReminder = () => {
    this.addReminderVisibility = false;
  }

  @action
  addServiceRecord = () => {
    if (this.selectedVehicle) {
      this.selectedVehicle.addServiceRecord(new ServiceRecordModel(new Date(), 'Changed Oil', '0w30'));
    }
  }

  @action
  vehicleChanged = (item: IDropdownOption, index?: number): void => {
    this.selectedVehicle = this.props.store!.vehicles[index];
  }
};