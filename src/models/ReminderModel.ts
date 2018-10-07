import {observable} from 'mobx';
import * as cuid from 'cuid';

export default class ReminderModel {
  public id: string;
  @observable public date: Date;
  @observable public notes: string;

  constructor(date: Date, notes: string) {
    this.id = cuid();
    this.date = date;
    this.notes = notes;
  }
}