import * as React from 'react';
import { observer, inject} from 'mobx-react';
import GarageModel from '../models/GarageModel';
import VehicleModel from '../models/VehicleModel';
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

interface ServiceRecordsListProps {
  selectedVehicle: VehicleModel,
  store?: GarageModel
}

const columns: IColumn[] = [
  {
    key: 'column1',
    name: 'Date',
    fieldName: 'date',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: 'column2',
    name: 'Title',
    fieldName: 'title',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  },
  {
    key: 'column3',
    name: 'Description',
    fieldName: 'description',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  }
];

@inject('store')
@observer
export class ServiceRecordsList extends React.Component<ServiceRecordsListProps, {}> {
  
  render() {
    const { selectedVehicle } = this.props;
    const listItems = selectedVehicle.serviceRecords.map(record => {
      return {
        key: record.id,
        date: record.date.toDateString(),
        title: record.title,
        description: record.description
      }
    });

    return (
      <div>
        <h2>Service Records:</h2>
        <DetailsList
            items={listItems}
            selectionMode={SelectionMode.none}
            columns={columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            onItemInvoked={this._onItemInvoked}
          />
      </div>
    );
  }

  private _onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.name}`);
  }
}