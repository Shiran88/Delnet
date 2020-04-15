import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../store.js';
import RegisterPage from './page.js'

class Index extends Component {

    render() {
        return (
            <Provider store={store}>
                <RegisterPage/ >
            </Provider>
        );
    }
}



ReactDOM.render(<Index/>, document.getElementById('index'));