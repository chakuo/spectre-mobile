/**
 * iPhone 5:  320x568
 * iPhone 6:  375x667
 * iPhone 6+: 414x736
 * iPad:      768x1024
 */

import React, {
    AppRegistry,
    Component,
    Image,
    PropTypes,
    StyleSheet,
    Text,
    View
} from 'react-native'

import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { orientationChanged } from './actions/ui.js'
import { rootReducer } from './reducers/root.js'
import Orientation from 'react-native-orientation'

import AppBrowser from './components/appbrowser.js'
import MenuView from './components/menuview.js'
import Drawer from 'react-native-drawer'

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
)(createStore)

const store = createStoreWithMiddleware(rootReducer)

class Spectre extends Component {
    constructor(props) {
        super(props)
        this.orientationDidChangeHandler = () => this._orientationDidChange()
    }

    componentDidMount() {
        Orientation.unlockAllOrientations()
        Orientation.addOrientationListener(this.orientationDidChangeHandler)
    }

    componentWillUnmount() {
        Orientation.removeOrientationListener(this.orientationDidChangeHandler)
    }

    render() {
        const menuItems = [{
            name: 'Stacks',
            icon: 'tasks'
        }, {
            name: 'Catalog',
            icon: 'th'
        }, {
            name: 'Hosts',
            icon: 'server'
        }, {
            name: 'Containers',
            icon: 'cubes'
        }, {
            name: 'Storage Pools',
            icon: 'database'
        }, {
            name: 'Certificates',
            icon: 'user-secret'
        }, {
            name: 'Accounts',
            icon: 'users'
        }, {
            name: 'Access Control',
            icon: 'lock'
        }, {
            name: 'Processes',
            icon: 'gear'
        }
        ]
        return (
            <Drawer ref='drawer' type='overlay' tapToClose={true} openDrawerOffset={0.5}
                content={<MenuView menuItems={menuItems} selectedItemName='Catalog'></MenuView>}
                styles={{
                    drawer: {backgroundColor: '#222', shadowColor: '#black', shadowOpacity: 0.3, shadowRadius: 5},
                    main: {paddingLeft: 0}
                }}>
                <AppBrowser store={this.props.store} onOpenMenu={() => this._onOpenMenu()}/>
            </Drawer>
        )
    }

    _onOpenMenu() {
        this.refs.drawer.open()
    }

    _orientationDidChange() {
        this.props.store.dispatch(orientationChanged())
    }
}

Spectre.propTypes = {
    store: PropTypes.object.isRequired
}

Spectre.defaultProps = {store: store}

AppRegistry.registerComponent('Spectre', () => Spectre)
