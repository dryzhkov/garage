import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import GarageModel from './models/GarageModel';
import { Garage } from './components/Garage';
import VehicleModel from './models/VehicleModel';

const store = new GarageModel();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <DevTools />
      <Garage />
    </div>
  </Provider>,
  document.getElementById('root'));

store.addVehicle(new VehicleModel('Mazda 3'));
store.addVehicle(new VehicleModel('Nissan Altima'));
store.addVehicle(new VehicleModel('Nissan Sentra'));
store.addVehicle(new VehicleModel('Subaru Forecter'));
store.addVehicle(new VehicleModel('Triumph Tiger'));
// playing around in the console
(window as any).store = store;