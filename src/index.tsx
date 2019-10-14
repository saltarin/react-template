import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DatePicker } from 'antd';

function onChange(date, dateString) {
    console.log(date, dateString);
}

class App extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }
    render() {
        const cadena: string = "hola mundo";
        return (
            <div>
                <h4>{cadena}</h4>
                <DatePicker onChange={onChange} />
            </div>
        );
    }
}

const root = document.getElementById('root');
ReactDOM.render(<App />, root);