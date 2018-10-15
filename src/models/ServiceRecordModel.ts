import {observable} from 'mobx';

export default class ServiceRecordModel {
  public id: string;
  @observable public date: Date;
  @observable public title: string;
  @observable public description: string;

  constructor(id: string, date: Date, title: string, description: string = '') {
    this.id = id;
    this.date = date;
    this.title = title;
    this.description = description;
  }
}