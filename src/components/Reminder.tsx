import * as React from 'react';
import ReminderModel from '../models/ReminderModel';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

interface ReminderProps {
  reminder: ReminderModel;
  onRemove: Function;
}

const Reminder = (props: ReminderProps) => {
  const { reminder } = props;
  const onRemoveClicked = () => {
    props.onRemove(reminder);
  };
  return <div>
    {`Date: ${reminder.date.toDateString()} ~ Notes: ${reminder.notes}`}

    <IconButton
      iconProps={{ iconName: 'RemoveEvent' }}
      onClick={onRemoveClicked}
    />
  </div>
};

export { Reminder };