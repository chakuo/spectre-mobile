import React, {PropTypes, Text, View, ListView, Dimensions, StyleSheet} from 'react-native'

import AppTile from './apptile.js'
import AppView from './appview.js'

import { createStyles, minWidth } from 'react-native-media-queries'
import { fetchAppsIfNeeded } from './../actions/apps.js'

export default class AppGrid extends React.Component {
    constructor(props) {
        super(props)
        const {store} = this.props.data
        const {apps} = store.getState()
        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            apps: apps ? apps.apps : null
        }
    }

    componentWillMount() {
        const {store} = this.props.data
        store.dispatch(fetchAppsIfNeeded())
        //console.log(`width: ${Dimensions.get('window').width} height: ${Dimensions.get('window').height}`)
        this.unsubscribeStoreListener = store.subscribe(() => {
            const {apps} = store.getState()
            this.setState({apps: apps ? apps.apps : null})
        })
    }

    componentWillUnmount() {
        this.unsubscribeStoreListener()
    }

    render() {
        const {style} = this.props
        const {store} = this.props.data
        const {ui} = store.getState()
        const {apps} = this.state

        if (!apps)
            return <View/>

        let rows = []
        let row = null
        let appcnt = 0
        let screenWidth = Dimensions.get('window').width
        const numcols = screenWidth < 600 ? 1 : ui.orientation == 'LANDSCAPE' ? 3 : 2
        for (var app of apps) {
            if (appcnt % numcols == 0) {
                row = []
                rows.push(row)
            }
            row.push(app)
            appcnt++
        }

        return (
            <ListView
                style={style.listView}
                dataSource={this.dataSource.cloneWithRows(rows)}
                renderRow={row => {
                    let tiles = row.map(
                        app => <AppTile key={app.name} app={app} onAppSelected={() => this._onAppSelected(app)}/>
                    )
                    return <View style={{flexDirection: 'row'}}>{tiles}</View>
                }}
            />
        )
    }

    _onAppSelected(app) {
        this.props.toRoute({
            name: app.name,
            component: AppView,
            data: app
        })
    }
}

AppGrid.propTypes = {
    data: PropTypes.object.isRequired
}

AppGrid.defaultProps = {
    style: createStyles({
            listView: {backgroundColor: '#efefef'}
        }
    )
}