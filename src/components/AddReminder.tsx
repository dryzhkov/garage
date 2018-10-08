import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { action, observable } from 'mobx';
import GarageModel from '../models/GarageModel';
import VehicleModel from '../models/VehicleModel';
import ReminderModel from '../models/ReminderModel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';

interface AddReminderProps {
  selectedVehicle: VehicleModel;
  onClose: Function;
  store?: GarageModel;
  visible?: boolean;
}

@inject('store')
@observer
export class AddReminder extends React.Component<AddReminderProps, {}> {
  @observable private notes: string;

  render() {
    const { selectedVehicle } = this.props;

    if (this.props.visible) {
      return (
        <div>
          <div>
            <TextField 
              label="Notes" 
              multiline rows={4} 
              onChange={this.notesChanged} 
              value={this.notes}
            />
          </div>
          <div>
            <PrimaryButton 
              text="Add"
              onClick={this.addReminder}
              style={{width:150, height:30}}
            />
            <DefaultButton 
              text="Close"
              onClick={this.close}
              style={{width:150, height:30}}
            />
          </div>
          
        </div>
  
      );
    } else {
      return <div></div>;
    }
  }

  @action
  notesChanged = (event, newValue) => {
    this.notes = newValue;
  }


  @action
  addReminder = () => {
    if (this.notes && this.notes.length > 0) {
      this.props.selectedVehicle.addReminder(new ReminderModel(new Date(), this.notes))
      this.notes = "";
    }
  }

  @action
  close = () => {
    this.notes = "";
    this.props.onClose();
  }
}
