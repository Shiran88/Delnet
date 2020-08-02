
import React, { Component } from 'react';
import { display_size } from '../actions/display.js'

function PoolLayer(props) {
    return (
        <div className="row">
        <div className="col-2">
            <div className="architecture-chart-text">
                <h6 className="text text-small">Pool Layer</h6>
                <h6 className="text text-small">type: { props.type } </h6>
                <h6 className="text text-small">input: { display_size(props.input) }</h6>
                <h6 className="text text-small">output: { display_size(props.output) }</h6>
            </div>
        </div>
        <div className="col-2">
            <div className="architecture-arrow"></div>
        </div>
    </div>
    );
}

export default PoolLayer;