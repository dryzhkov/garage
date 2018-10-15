import * as React from 'react';
import { observer, inject } from 'mobx-react';
import GarageModel from '../models/GarageModel';
import VehicleModel from '../models/VehicleModel';
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import ServiceRecordModel from '../models/ServiceRecordModel';

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
  },
  {
    key: 'column4',
    name: '',
    fieldName: 'delete',
    minWidth: 50,
    maxWidth: 50,
    isResizable: false
  }
];

@inject('store')
@observer
export class ServiceRecordsList extends React.Component<ServiceRecordsListProps, {}> {
  private selectedRecordId: string;

  constructor(props) {
    super(props);
    this.renderItemColumn = this.renderItemColumn.bind(this);
  }
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
          onRenderItemColumn={this.renderItemColumn}
        />
      </div>
    );
  }

  private renderItemColumn(item: any, index: number, column: IColumn) {
    const fieldContent = item[column.fieldName || ''];
    
    switch (column.fieldName) {
      case 'delete':
        return <IconButton
          disabled={false}
          iconProps={{ iconName: 'LogRemove' }}
          label="Remove"
          onClick={() => { 
            this.props.selectedVehicle.deleteServiceRecord(item.key) 
          }}
        />

      default:
        return <span>{fieldContent}</span>;
    }
  }
}