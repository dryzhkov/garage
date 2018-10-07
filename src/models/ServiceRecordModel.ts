import {observable} from 'mobx';
import * as cuid from 'cuid';

export default class ServiceRecordModel {
  public id: string;
  @observable public date: Date;
  @observable public title: string;
  @observable public description: string;

  constructor(date: Date, title: string, description: string = '') {
    this.id = cuid();
    this.date = date;
    this.title = title;
    this.description = description;
  }
}