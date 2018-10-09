import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import GarageModel from './models/GarageModel';
import { Garage } from './components/Garage';
import VehicleModel from './models/VehicleModel';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

const store = new GarageModel();
store.addVehicle(new VehicleModel('Mazda 3'));
store.addVehicle(new VehicleModel('Nissan Altima'));
store.addVehicle(new VehicleModel('Nissan Sentra'));
store.addVehicle(new VehicleModel('Subaru Forester'));
store.addVehicle(new VehicleModel('Triumph Tiger'));

// pull in office ui fabric icons
initializeIcons();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <DevTools />
      <Garage />
    </div>
  </Provider>,
  document.getElementById('root'));

// playing around in the console
(window as any).store = store;