import * as React from 'react';
import logo from '@app/src/assets/img/logo-cxpress.png';
import axios from '@app/src/config/axios';

export const App: React.FC = () => (
  <>
    <button onClick={() => axios.get('http://localhost:7768/mock').then( response => console.log(response))}>REQUEST!</button>
    <pre>
      {process.env.FOO}
    </pre>
    <div>SPA BASE</div>
    <img src={logo}/>
  </>
)