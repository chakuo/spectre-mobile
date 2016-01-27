import React, {PropTypes, Text, View, ListView, Dimensions, StyleSheet} from 'react-native'
import { createStyles, minWidth } from 'react-native-media-queries'
import AppTile from './apptile.js'
import AppView from './appview.js'
import { fetchAppsIfNeeded } from './../actions/apps.js'

export default class AppGrid2 extends React.Component {
    constructor(props) {
        super(props)
        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: this.dataSource.cloneWithRows([])
        }
    }

    componentWillMount() {
        const {store} = this.props.data
        store.dispatch(fetchAppsIfNeeded())
        //console.log(`width: ${Dimensions.get('window').width} height: ${Dimensions.get('window').height}`)
        this.unsub = store.subscribe(() => {
            const {ui, apps} = store.getState()
            let rows = []
            let row = null
            let appcnt = 0
            let screenWidth = Dimensions.get('window').width
            const numcols = screenWidth < 600 ? 1 : ui.orientation == 'LANDSCAPE' ? 3 : 2
            for (var app of apps.apps) {
                if (appcnt % numcols == 0) {
                    row = []
                    rows.push(row)
                }
                row.push(app)
                appcnt++
            }
            this.setState({apps: apps, dataSource: this.dataSource.cloneWithRows(rows)})
        })
    }

    componentWillUnmount() {
        const {store} = this.props.data
        store.unsubcribe(this.unsub)
    }

    render() {
        return (
            <ListView
                style={{backgroundColor: '#efefef'}}
                dataSource={this.state.dataSource}
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

AppGrid2.propTypes = {
    data: PropTypes.object.isRequired
}

AppGrid2.defaultProps = {
    style: createStyles({
            container: {flexDirection: 'column', justifyContent: 'center', padding: 0}
        }
    )
}