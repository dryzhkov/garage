import {observable, action, computed, runInAction} from 'mobx';
import * as cuid from 'cuid';
import ServiceRecordModel from './ServiceRecordModel';
import ReminderModel from './ReminderModel';
import gql from 'graphql-tag';
import client from '../graphql/client';

export default class VehicleModel {
  public id: string;
  @observable public make: string;
  @observable public serviceRecords: ServiceRecordModel[];
  @observable public reminders: ReminderModel[];

  constructor(make: string, reminders: ReminderModel[] = [], serviceRecords: ServiceRecordModel[] = []) {
    this.id = cuid();
    this.make = make;
    this.reminders = reminders;
    this.serviceRecords = serviceRecords;
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
  public async addReminder(reminder: ReminderModel) {
      const mutation = gql`
        mutation{
          createReminder(
            vehicleId:"${this.id}",
            date: "${reminder.date.toDateString()}",
            notes: "${reminder.notes}"
          ) {
            id,
            date,
            notes
          }
        }
      `;

    await client
      .mutate({ mutation: mutation})
      .then((res) => {
        console.log("RES", res)
        return res;
      });
    runInAction(() => {
      this.reminders.push(reminder);
    })
  }
}