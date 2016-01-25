'use strict';

import React, {View, Navigator, Text} from 'react-native';
import Router from 'react-native-router';
import AppGrid from './appgrid.js';
import MenuButton from './menubutton.js';

export default class AppBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.firstRoute = {
            name: 'Catalog',
            component: AppGrid,
            leftCorner: MenuButton
        };
    }

    componentWillMount() {

    }

    render() {
        return <Router
            firstRoute={this.firstRoute}
            headerStyle={{backgroundColor: '#444'}}
            customAction={(opts) => {this._routerCustomAction(opts);}}/>;
    }

    _routerCustomAction(opts) {
        this.props.onOpenMenu(opts);
    }
}