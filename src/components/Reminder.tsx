import * as React from 'react';
import ReminderModel from '../models/ReminderModel';

interface ReminderProps {
  reminder: ReminderModel;
}

const Reminder = (props: ReminderProps) => {
  const { reminder } = props;
  return <div>
    { `Date: ${reminder.date.toDateString()} ~ Notes: ${reminder.notes}` }
  </div>
};

export { Reminder };