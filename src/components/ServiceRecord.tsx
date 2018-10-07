import * as React from 'react';
import ServiceRecordModel from '../models/ServiceRecordModel';

interface ServiceRecordProps {
  record: ServiceRecordModel;
}

const ServiceRecord = (props: ServiceRecordProps) => {
  const { record } = props;

  return <div>
    { `Date: ${record.date}, Title: ${record.title} , Description: ${record.description}`}
  </div>
};

export {ServiceRecord};