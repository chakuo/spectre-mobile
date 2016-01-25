'use strict';

import React, {View, ScrollView, Dimensions} from 'react-native';
import AppTile from './apptile.js';
import AppView from './appview.js';

export default class AppGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apps: null
        };
    }

    componentWillMount() {
        fetch('http://52.70.143.76:8080/v1-catalog/templates')
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    apps: response.data
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        let tiles = this.state.apps ?
            this.state.apps.map(function(app) {
                return <AppTile key={app.name} app={app} onAppSelected={this._onAppSelected.bind(this)}/>
            }.bind(this)) : null;

        return (
            <ScrollView>
                <View style={{flexDirection: 'column', justifyContent: 'center', backgroundColor: '#efefef', padding: 0}}>
                    {tiles}
                </View>
            </ScrollView>
        );
    }

    _onAppSelected(app) {
        this.props.toRoute({
            name: app.name,
            component: AppView,
            data: app
        });
    }
}