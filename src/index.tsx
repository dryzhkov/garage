import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import GarageModel from './models/GarageModel';
import { Garage } from './components/Garage';

const store = new GarageModel();

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