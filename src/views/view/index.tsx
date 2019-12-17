import React from 'react';
import logo from '@app/src/assets/img/logo-cxpress.png';
import axios from '@app/src/config/axios';
import { withGlobalStyles } from 'saltarin-ui-storybook/config';
import { Breadcrumb } from 'saltarin-ui-storybook/components/Breadcrumb';

const _App: React.FC = () => (
  <>
    <div>{JSON.stringify(React.FC)}</div>
    <button onClick={() => axios.get('http://localhost:7768/mock').then( response => console.log(response))}>REQUEST!</button>
    <pre>
      {process.env.FOO}
    </pre>
    <Breadcrumb items={[{name: 'RESERVAS'}, {name: 'BANDEJA DE SOLICITUDES DE RECOJO', href:'https://www.google.com'}]}/>
    <div>SPA BASE</div>
    <img src={logo}/>
  </>
)

export const App = () => withGlobalStyles(_App);