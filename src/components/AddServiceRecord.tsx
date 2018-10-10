import * as React from 'react';
import { observer, inject } from 'mobx-react';
import GarageModel from '../models/GarageModel';
import VehicleModel from '../models/VehicleModel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import ServiceRecordModel from '../models/ServiceRecordModel';
import styles from '../styles.css.js';

interface AddServiceRecordProps {
  selectedVehicle: VehicleModel;
  onAdd: Function;
  onClose: Function;
  store?: GarageModel;
  visible?: boolean;
}

@inject('store')
@observer
export class AddServiceRecord extends React.Component<AddServiceRecordProps, {}> {
  private selectedDate: Date;
  private title: string;
  private description: string;

  render() {
    if (this.props.visible) {
      return (
        <div>
          <h1>Add New Service Record</h1>
          <div>
          <DatePicker
            label="Date"
            isRequired={true}
            onSelectDate={this.dateSelected}
            value={this.selectedDate}
            placeholder="Select a date..."
          />
          </div>
          <div>
            <TextField 
              label="Title" 
              onChange={this.titleChanged} 
              value={this.title}
            />
          </div>
          <div>
            <TextField 
              label="Description"
              placeholder="This is optional"
              onChange={this.descriptionChanged} 
              value={this.description}
            />
          </div>
          <div style={styles.buttonWrapper}>
            <DefaultButton 
              text="Add"
              onClick={this.addServiceRecord}
              style={styles.button}
            />
            <DefaultButton 
              text="Close"
              onClick={this.close}
              style={styles.button}
            />
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  titleChanged = (_, newValue: string) => {
    this.title = newValue;
  }

  dateSelected = (date: Date) => {
    this.selectedDate = date;
  }

  descriptionChanged = (_, newValue: string) => {
    this.description = newValue;
  }

  addServiceRecord = () => {
    if (this.selectedDate 
      && this.title 
      && this.title.length > 0) {

      this.props
        .selectedVehicle!
        .addServiceRecord(new ServiceRecordModel(this.selectedDate, this.title, this.description))
      this.clear();
      this.props.onAdd();
    }
  }

  close = () => {
    this.clear();
    this.props.onClose();
  }

  private clear() {
    this.title = "";
    this.description = "";
    this.selectedDate = null;
  }
}
