import * as React from 'react';
import { observer, inject} from 'mobx-react';
import GarageModel from '../models/GarageModel';
import VehicleModel from '../models/VehicleModel';
import { Reminder } from './Reminder';

interface RemindersListProps {
  selectedVehicle: VehicleModel;
  store?: GarageModel;
}

@inject('store')
@observer
export class RemindersList extends React.Component<RemindersListProps, {}> {

  render() {
    const { selectedVehicle } = this.props;
    return (
      <div>
        Reminders:
        { selectedVehicle.reminders.map(reminder => {
            return <Reminder key={reminder.id} reminder={reminder} />
        })}
      </div>
    );
  }
}
