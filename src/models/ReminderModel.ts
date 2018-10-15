import {observable} from 'mobx';

export default class ReminderModel {
  public id: string;
  @observable public date: Date;
  @observable public notes: string;

  constructor(id: string, date: Date, notes: string) {
    this.id = id;
    this.date = date;
    this.notes = notes;
  }
}