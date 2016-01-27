import React, {PropTypes, View, ScrollView, Dimensions, StyleSheet} from 'react-native'
import { createStyles, minWidth } from 'react-native-media-queries'
import AppTile from './apptile.js'
import AppView from './appview.js'
import { fetchAppsIfNeeded } from './../actions/apps.js'

export default class AppGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            apps: null
        }
    }

    componentWillMount() {
        const {store} = this.props.data
        store.dispatch(fetchAppsIfNeeded())
        this.unsub = store.subscribe(() => {
            const {apps} = store.getState()
            this.setState({apps: apps.apps})
        })
    }

    componentWillUnmount() {
        const {store} = this.props.data
        store.unsubcribe(this.unsub)
    }

    render() {
        const {style} = this.props
        const {apps} = this.state
        let tiles = apps ? apps.map(app => {
            return <AppTile key={app.name} app={app} onAppSelected={() => this._onAppSelected(app)}/>
        }) : null

        return (
            <ScrollView style={style.scrollView}>
                <View style={style.container}>
                    {tiles}
                </View>
            </ScrollView>
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
            scrollView: {},
            container: {flexDirection: 'column', justifyContent: 'center', padding: 0}
        },
        minWidth(600, {
            container: {
                flexDirection: 'row', flexWrap: 'wrap'
            }
        })
    )
}