import { observable, action, computed, runInAction } from "mobx";
import ServiceRecordModel from "./ServiceRecordModel";
import ReminderModel from "./ReminderModel";
import gql from "graphql-tag";
import client from "../graphql/client";

export default class VehicleModel {
  public id: string;
  @observable public make: string;
  @observable public serviceRecords: ServiceRecordModel[];
  @observable public reminders: ReminderModel[];

  constructor(
    id: string,
    make: string,
    reminders: ReminderModel[] = [],
    serviceRecords: ServiceRecordModel[] = []
  ) {
    this.id = id;
    this.make = make;
    this.reminders = reminders;
    this.serviceRecords = serviceRecords;
  }

  @computed
  get info(): string {
    return `[id: ${this.id}, make: ${this.make}]`;
  }

  @action
  public async addServiceRecord(
    date: Date,
    title: string,
    description: string = ""
  ) {
    const mutation = gql`
      mutation{
        createServiceRecord(
          vehicleId:"${this.id}",
          date: "${date.toDateString()}",
          title: "${title}",
          description: "${description}"
        ) {
          id,
          date,
          title,
          description
        }
      }
    `;

    const dto = await client()
      .mutate({ mutation: mutation })
      .then(res => {
        return res.data.createServiceRecord;
      });
    runInAction(() => {
      this.serviceRecords.push(
        new ServiceRecordModel(
          dto.id,
          new Date(parseInt(dto.date)),
          dto.title,
          dto.description
        )
      );
    });
  }

  @action
  public async addReminder(date: Date, notes: string) {
    const mutation = gql`
      mutation{
        createReminder(
          vehicleId:"${this.id}",
          date: "${date.toDateString()}",
          notes: "${notes}"
        ) {
          id,
          date,
          notes
        }
      }
    `;

    const dto = await client()
      .mutate({ mutation: mutation })
      .then(res => {
        return res.data.createReminder;
      });
    runInAction(() => {
      this.reminders.push(
        new ReminderModel(dto.id, new Date(parseInt(dto.date)), dto.notes)
      );
    });
  }

  @action
  public async deleteServiceRecord(recordId: string) {
    const mutation = gql`
      mutation{
        deleteServiceRecord(
          vehicleId:"${this.id}",
          recordId: "${recordId}"
        )
      }
    `;

    const deletedId = await client()
      .mutate({ mutation: mutation })
      .then(res => {
        return res.data.deleteServiceRecord;
      });

    if (deletedId) {
      runInAction(() => {
        this.serviceRecords = this.serviceRecords.filter(
          sr => sr.id !== deletedId
        );
      });
    }
  }

  @action
  public async deleteReminder(reminder: ReminderModel) {
    const mutation = gql`
      mutation{
        deleteReminder(
          vehicleId:"${this.id}",
          reminderId: "${reminder.id}"
        )
      }
    `;

    const deletedId = await client()
      .mutate({ mutation: mutation })
      .then(res => {
        return res.data.deleteReminder;
      });

    if (deletedId) {
      runInAction(() => {
        this.reminders = this.reminders.filter(r => r.id !== deletedId);
      });
    }
  }
}
