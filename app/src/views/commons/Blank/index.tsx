import * as React from 'react';
import { DatePicker } from 'antd';

function onChange(date, dateString) {
    console.log(date, dateString);
}

class Login extends React.Component<any, any>{
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

export {
    Login
}