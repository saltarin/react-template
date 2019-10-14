import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DatePicker } from 'antd';

function onChange(date, dateString) {
    console.log(date, dateString);
}

const App = () => {
    return <div><DatePicker onChange={onChange} />Hola Mundo</div>
};

const root = document.getElementById('root');
ReactDOM.render(<App />, root);