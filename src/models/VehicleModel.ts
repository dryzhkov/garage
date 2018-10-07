import {observable, action} from 'mobx';
import ServiceRecordModel from './ServiceRecordModel';
import ReminderModel from './ReminderModel';

export default class VehicleModel {
  @observable public serviceRecords: ServiceRecordModel[] = [];
  @observable public reminders: ReminderModel[] = [];

  @action public addServiceRecord(record: ServiceRecordModel) {
    this.serviceRecords.push(record);
  }

  @action public addReminder(reminder: ReminderModel) {
    this.reminders.push(reminder);
  }
}