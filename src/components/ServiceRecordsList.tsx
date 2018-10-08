import * as React from 'react';
import { observer, inject} from 'mobx-react';
import GarageModel from '../models/GarageModel';
import VehicleModel from '../models/VehicleModel';
import { ServiceRecord } from './ServiceRecord';

interface ServiceRecordsListProps {
  selectedVehicle: VehicleModel,
  store?: GarageModel
}

@inject('store')
@observer
export class ServiceRecordsList extends React.Component<ServiceRecordsListProps, {}> {

  render() {
    const { selectedVehicle } = this.props;
    return (
      <div>
        Service Records:
        { selectedVehicle.serviceRecords.map(record => {
            return <ServiceRecord key={record.id} record={record} />
        })}
      </div>
    );
  }
}