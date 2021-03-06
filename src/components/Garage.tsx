import * as React from 'react';
import { action, observable, runInAction } from 'mobx';
import { observer, inject } from 'mobx-react';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import GarageModel from '../models/GarageModel';
import VehicleModel from '../models/VehicleModel';
import { RemindersList } from './RemindersList';
import { ServiceRecordsList } from './ServiceRecordsList';
import { AddReminder } from './AddReminder';
import { Provider } from 'mobx-react';
import {
  Pivot,
  PivotItem,
  PivotLinkSize,
} from 'office-ui-fabric-react/lib/Pivot';
import { AddServiceRecord } from './AddServiceRecord';
import styles from '../styles.css.js';
import * as H from 'history';
import Auth from '../auth/Auth';
import { Redirect } from 'react-router';

interface GarageProps {
  auth: Auth;
  history: H.History;
  location?: any;
}

@observer
export class Garage extends React.Component<GarageProps, {}> {
  @observable private selectedVehicle: VehicleModel;
  @observable private addReminderVisible: boolean;
  @observable private addServiceRecordVisible: boolean;

  private store: GarageModel;
  constructor(props) {
    super(props);
    this.store = new GarageModel();

    // playing around in the console
    (window as any).store = this.store;
  }

  componentWillMount() {
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
    }
    if (this.props.auth.isAuthenticated()) {
      this.store.fetchVehicles();
    }
  }

  render() {
    if (!this.selectedVehicle && this.store && this.store.vehicles.length) {
      runInAction(() => {
        this.selectedVehicle = this.store.vehicles[0];
      });
    }

    const vehicleLinks = this.store.vehicles.map((vehicle) => {
      return (
        <PivotItem
          key={vehicle.id}
          itemKey={vehicle.id}
          linkText={vehicle.make}
        />
      );
    });

    const reminders = this.selectedVehicle ? (
      <RemindersList selectedVehicle={this.selectedVehicle} />
    ) : null;
    const serviceRecords = this.selectedVehicle ? (
      <ServiceRecordsList selectedVehicle={this.selectedVehicle} />
    ) : null;
    const { isAuthenticated } = this.props.auth;

    if (!isAuthenticated()) {
      return <Redirect to="/login" />;
    }

    return (
      <Provider store={this.store}>
        <div style={styles.container}>
          <div style={styles.left}>
            <Pivot
              linkSize={PivotLinkSize.large}
              onLinkClick={this.vehicleChanged}
            >
              {vehicleLinks}
            </Pivot>
            {reminders}
            {serviceRecords}
          </div>
          <div style={styles.right}>
            <CommandBarButton
              disabled={!this.selectedVehicle}
              onClick={this.addReminder}
              iconProps={{ iconName: 'Clock' }}
              text="New Reminder"
              style={styles.actionButton}
            />

            <CommandBarButton
              disabled={!this.selectedVehicle}
              onClick={this.addServiceRecord}
              iconProps={{ iconName: 'Add' }}
              text="New Service Record"
              style={styles.actionButton}
            />

            {/* <CommandBarButton
              text="Add Vehicle"
              onClick={this.addVehicle}
              iconProps={{ iconName: 'Car' }}
              style={styles.actionButton}
            /> */}

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
          </div>
        </div>
      </Provider>
    );
  }

  @action
  addVehicle = () => {
    // const { store } = this.props;
    // const vehicle: VehicleModel = new VehicleModel('Mazda 3');
    // store.addVehicle(vehicle);
  };

  @action
  addReminder = () => {
    this.addReminderVisible = true;
    this.addServiceRecordVisible = false;
  };

  @action
  closeAddReminder = () => {
    this.addReminderVisible = false;
  };

  @action
  addServiceRecord = () => {
    this.addServiceRecordVisible = true;
    this.addReminderVisible = false;
  };

  @action
  closeAddServiceRecord = () => {
    this.addServiceRecordVisible = false;
  };

  @action
  vehicleChanged = (item: PivotItem): void => {
    this.selectedVehicle = this.store.vehicles.find((vehicle) => {
      return vehicle.id === item.props.itemKey;
    });
  };
}
