import {observable, action, computed} from 'mobx';
import * as cuid from 'cuid';
import ServiceRecordModel from './ServiceRecordModel';
import ReminderModel from './ReminderModel';

export default class VehicleModel {
  public id: string;
  @observable public make: string;
  @observable public serviceRecords: ServiceRecordModel[] = [];
  @observable public reminders: ReminderModel[] = [];

  constructor(make: string) {
    this.id = cuid();
    this.make = make;
  }

  @computed
  get info(): string {
    return `[id: ${this.id}, make: ${this.make}]`;
  }

  @action 
  public addServiceRecord(record: ServiceRecordModel) {
    this.serviceRecords.push(record);
  }

  @action 
  public addReminder(reminder: ReminderModel) {
    this.reminders.push(reminder);
  }
}