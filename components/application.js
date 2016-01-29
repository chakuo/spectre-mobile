/**
 * iPhone 5:  320x568
 * iPhone 6:  375x667
 * iPhone 6+: 414x736
 * iPad:      768x1024
 */

import React, {Component, Image, PropTypes, StyleSheet, Text, View, Dimensions} from 'react-native'

import { createStore, applyMiddleware } from 'redux'

import AppBrowser from './appbrowser.js'
import ContainerBrowser from './containerbrowser.js'
import MenuView from './menuview.js'
import Drawer from 'react-native-drawer'
import Orientation from 'react-native-orientation'

import {SCREEN_APPS, SCREEN_CONTAINERS, setMainScreen} from '../actions/ui.js'
import { orientationChanged } from '../actions/ui.js'

const menuItems = [
    {
        name: 'Stacks',
        icon: 'tasks'
    },
    {
        id: SCREEN_APPS,
        name: 'Catalog',
        icon: 'map'
    },
    {
        name: 'Hosts',
        icon: 'server'
    },
    {
        id: SCREEN_CONTAINERS,
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
]

export default class Application extends Component {
    constructor(props) {
        super(props)
        this.orientationDidChangeHandler = () => this._orientationDidChange()
        const {store} = this.props
        const {ui} = store.getState()
        this.state = {
            screenOrientation: ui.orientation,
            currentScreen: ui.mainScreen
        }
    }

    componentDidMount() {
        const {store} = this.props

        Orientation.unlockAllOrientations()
        Orientation.addOrientationListener(this.orientationDidChangeHandler)

        this.unsubscribeStoreListener = store.subscribe(() => {
            const {ui} = store.getState()
            if (this.state.screenOrientation != ui.orientation)
                this.setState({screenOrientation: ui.orientation})
            if (this.state.currentScreen != ui.mainScreen)
                this.setState({currentScreen: ui.mainScreen})
        })
    }

    componentWillUnmount() {
        Orientation.removeOrientationListener(this.orientationDidChangeHandler)
        this.unsubscribeStoreListener()
    }

    render() {
        const {store} = this.props
        const {ui} = store.getState()

        const createScreen = (screen) => {
            switch (screen) {
                case SCREEN_APPS:
                    return <AppBrowser store={store} onOpenMenu={() => this._onOpenMenu()}/>
                case SCREEN_CONTAINERS:
                    return <ContainerBrowser store={store} onOpenMenu={() => this._onOpenMenu()}/>
            }
        }

        let menuView = <MenuView
            menuItems={menuItems}
            selectedMenuItem={ui.mainScreen}
            onMenuItemSelected={menuItem => this._onMenuItemSelected(menuItem)}/>

        const deviceWidth = Dimensions.get('window').width
        const deviceHeight = Dimensions.get('window').height

        let screenWidth = 0, screenHeight = 0

        if (ui.orientation == 'LANDSCAPE') {
            screenWidth = deviceHeight
            screenHeight = deviceWidth
        }
        else {
            screenWidth = deviceWidth
            screenHeight = deviceHeight
        }

        let drawerOffset = 1 - 220/screenWidth

        return (
            <Drawer ref='drawer' type='overlay' tapToClose={true} openDrawerOffset={drawerOffset}
                onClose={() => {
                    if (this._menuCloseHandler) this._menuCloseHandler()}
                }
                content={menuView}
                styles={{
                    drawer: {backgroundColor: '#222', shadowColor: '#black', shadowOpacity: 0.3, shadowRadius: 5},
                    main: {paddingLeft: 0}}}>
                {createScreen(this.state.currentScreen)}
            </Drawer>
        )
    }

    _onOpenMenu() {
        this.refs.drawer.open()
    }

    _onMenuItemSelected(menuItem) {
        const {store} = this.props
        this._menuCloseHandler = () => {
            this._menuCloseHandler = null
            store.dispatch(setMainScreen(menuItem))
        }
        this.refs.drawer.close()
    }

    _orientationDidChange() {
        this.props.store.dispatch(orientationChanged())
    }
}

Application.propTypes = {
    store: PropTypes.object.isRequired
}
