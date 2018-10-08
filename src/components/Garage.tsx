import * as React from 'react';
import { action, observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import GarageModel from '../models/GarageModel';
import VehicleModel from '../models/VehicleModel';
import { RemindersList } from './RemindersList';
import { ServiceRecordsList } from './ServiceRecordsList';
import { AddReminder } from './AddReminder';
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import { AddServiceRecord } from './AddServiceRecord';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

interface GarageProps { 
  store?: GarageModel;
}

@inject('store')
@observer
export class Garage extends React.Component<GarageProps, {}> {
  @observable private selectedVehicle: VehicleModel;
  @observable private addReminderVisible: boolean;
  @observable private addServiceRecordVisible: boolean;

  render() {
    const { store } = this.props;

    if (!this.selectedVehicle && store && store.vehicles.length) {
      this.selectedVehicle = store.vehicles[0];
    } 

    const vehicleLinks = store.vehicles.map(vehicle => {
      return <PivotItem key={vehicle.id} itemKey={vehicle.id} linkText={vehicle.make} />;
    });

    const reminders = this.selectedVehicle ? <RemindersList selectedVehicle={this.selectedVehicle} /> : null;

    const serviceRecords = this.selectedVehicle ? <ServiceRecordsList selectedVehicle={this.selectedVehicle} /> : null;

    return (
      <Fabric>
        <CommandBarButton
          disabled={!this.selectedVehicle}
          onClick={this.addReminder}
          iconProps={{ iconName: 'Clock' }}
          text="Add Reminder"
          style={{ width: 150, height: 30 }}
        />

        <CommandBarButton
          disabled={!this.selectedVehicle}
          onClick={this.addServiceRecord}
          iconProps={{ iconName: 'Add' }}
          text="Add Service Record"
          style={{ width: 150, height: 30 }}
        />

        <CommandBarButton
          text="Add Vehicle"
          onClick={this.addVehicle}
          iconProps={{ iconName: 'Car' }}
          style={{ width: 150, height: 30 }}
        />

        <div>
          <h2>Garage:</h2>
          <Pivot linkSize={PivotLinkSize.large} onLinkClick={this.vehicleChanged}>
            {vehicleLinks}
          </Pivot>
        </div>

        {reminders}
        {serviceRecords}

        <AddReminder
          selectedVehicle={this.selectedVehicle}
          visible={this.addReminderVisible}
          onAdd={this.closeAddReminder}
          onClose={this.closeAddReminder}
        />

        <AddServiceRecord
          selectedVehicle={this.selectedVehicle}
          visible={this.addServiceRecordVisible}
          onAdd={this.closeAddServiceRecord}
          onClose={this.closeAddServiceRecord}
        />

        <div>Selected: {this.selectedVehicle ? this.selectedVehicle.make : 'none'}</div>
      </Fabric>
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
    this.addReminderVisible = true;
  }

  @action
  closeAddReminder = () => {
    this.addReminderVisible = false;
  }

  @action
  addServiceRecord = () => {
    this.addServiceRecordVisible = true;
  }

  @action
  closeAddServiceRecord = () => {
    this.addServiceRecordVisible = false;
  }

  @action
  vehicleChanged = (item: PivotItem): void => {
    this.selectedVehicle = this.props.store!.vehicles.find((vehicle) => {
      return vehicle.id === item.props.itemKey;
    });
  }
};