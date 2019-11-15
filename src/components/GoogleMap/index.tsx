import * as React from "react";

export const GoogleMap = React.forwardRef((props, ref) => (
    <div ref={ref} style={{height: '300px'}} {...props}>
        {props.children}
    </div>
));

