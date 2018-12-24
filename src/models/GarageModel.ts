import { observable, action, runInAction } from "mobx";
import VehicleModel from "./VehicleModel";
import gql from "graphql-tag";
import client from "../graphql/client";
import ReminderModel from "./ReminderModel";
import ServiceRecordModel from "./ServiceRecordModel";

export default class GarageModel {
  @observable public vehicles: VehicleModel[] = [];
  @action
  public addVehicle(vehicle: VehicleModel) {
    this.vehicles.push(vehicle);
  }

  @action
  async fetchVehicles() {
    const getVehiclesQuery = gql`
      query {
        vehicles {
          id
          make
          serviceRecords {
            id
            date
            title
            description
          }
          reminders {
            id
            date
            notes
          }
        }
      }
    `;
    try {
      const vehiclesDto = await client()
        .query({ query: getVehiclesQuery })
        .then(res => {
          return res.data["vehicles"];
        });
      // after await, modifying state again, needs an actions:
      runInAction(() => {
        this.vehicles = vehiclesDto.map(dto => {
          const reminders = dto.reminders.map(r => {
            return new ReminderModel(r.id, new Date(parseInt(r.date)), r.notes);
          });

          const serviceRecords = dto.serviceRecords.map(sr => {
            return new ServiceRecordModel(
              sr.id,
              new Date(parseInt(sr.date)),
              sr.title,
              sr.description
            );
          });

          return new VehicleModel(dto.id, dto.make, reminders, serviceRecords);
        });
      });
    } catch (error) {
      runInAction(() => {
        console.log(error);
      });
    }
  }
}
