import * as React from 'react';
import { observer, inject } from 'mobx-react';
import GarageModel from '../models/GarageModel';
import VehicleModel from '../models/VehicleModel';
import ReminderModel from '../models/ReminderModel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import styles from '../styles.css.js';

interface AddReminderProps {
  selectedVehicle: VehicleModel;
  onAdd: Function;
  onClose: Function;
  store?: GarageModel;
  visible?: boolean;
}

@inject('store')
@observer
export class AddReminder extends React.Component<AddReminderProps, {}> {
  private notes: string;
  private selectedDate: Date;

  render() {
    if (this.props.visible) {
      return (
        <div>
          <h1>Add New Reminder</h1>
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
              label="Notes" 
              multiline rows={3} 
              onChange={this.notesChanged} 
              value={this.notes}
            />
          </div>
          <div style={styles.buttonWrapper}>
            <DefaultButton 
              text="Add"
              onClick={this.addReminder}
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

  notesChanged = (_, newValue) => {
    this.notes = newValue;
  }

  dateSelected = (date: Date) => {
    this.selectedDate = date;
  }

  addReminder = () => {
    if (this.selectedDate && this.notes && this.notes.length > 0) {
      this.props.selectedVehicle!.addReminder(new ReminderModel(this.selectedDate, this.notes))
      this.clear();
      this.props.onAdd();
    }
  }

  close = () => {
    this.clear();
    this.props.onClose();
  }

  private clear() {
    this.notes = "";
    this.selectedDate = null;
  }
}
