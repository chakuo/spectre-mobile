/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    AppRegistry,
    Component,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';

import AppBrowser from './appbrowser.js';
import MenuView from './menuview.js';
import Drawer from 'react-native-drawer';

class ex1 extends Component {
    menuItems = [
        {
            name: 'Stacks',
            icon: 'tasks'
        },
        {
            name: 'Catalog',
            icon: 'th'
        },
        {
            name: 'Hosts',
            icon: 'server'
        },
        {
            name: 'Containers',
            icon: 'cubes'
        },
        {
            name: 'Storage Pools',
            icon: 'database'
        },
        {
            name: 'Certificates',
            icon: 'user-secret'
        },
        {
            name: 'Accounts',
            icon: 'users'
        },
        {
            name: 'Access Control',
            icon: 'lock'
        },
        {
            name: 'Processes',
            icon: 'gear'
        }
    ];

    render() {
        return (
            <Drawer ref='drawer' type='overlay' tapToClose={true} openDrawerOffset={0.3}
                content={<MenuView menuItems={this.menuItems} selectedItemName='Catalog'></MenuView>}
                styles={{
                    drawer: {backgroundColor: '#222', shadowColor: '#black', shadowOpacity: 0.3, shadowRadius: 5},
                    main: {paddingLeft: 0}
                }}
            >
                <AppBrowser onOpenMenu={() => {this._onOpenMenu();}}/>
            </Drawer>
        );
    }

    _onOpenMenu() {
        this.refs.drawer.open();
    }
}

AppRegistry.registerComponent('ex1', () => ex1);
