import React, {PropTypes, Text, View, ListView, Dimensions, StyleSheet} from 'react-native'

import ContainerTile from './containertile.js'
import ContainerHeader from './containerheader.js'
import ContainerView from './containerview.js'

import { createStyles, minWidth } from 'react-native-media-queries'
import { fetchContainersIfNeeded } from './../actions/containers.js'

export default class ContainerGrid extends React.Component {
    constructor(props) {
        super(props)
        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.dataSourceWithHeader = new ListView.DataSource({
            getSectionHeaderData: (data, sectionId) => {
                return data[sectionId]
            },
            getRowData: (data, sectionId, rowId) => {
                return data[sectionId][rowId]
            },
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        })
        const {store} = this.props.data
        const {containers} = store.getState()
        this.state = {
            containers: containers ? containers.containers : null
        }
    }

    componentWillMount() {
        const {store} = this.props.data
        store.dispatch(fetchContainersIfNeeded())
        this.unsubscribeStoreListener = store.subscribe(() => {
            const {containers} = store.getState()
            this.setState({containers: containers ? containers.containers : null})
        })
    }

    componentWillUnmount() {
        this.unsubscribeStoreListener()
    }

    render() {
        const {style} = this.props
        const {containers} = this.state

        if (!containers)
            return <View/>

        const screenWidth = Dimensions.get('window').width

        let dataSource

        if (screenWidth < 600) {
            dataSource = this.dataSource.cloneWithRows(containers)
        }
        else {
            let rows = {}
            containers.forEach(container => {
                rows[container.id] = container
            })
            let rowIds = containers.map(container => container.id)
            dataSource = this.dataSourceWithHeader.cloneWithRowsAndSections(
                {containers: rows, others: []},
                ['containers', 'others'],
                [rowIds, []]
            )
        }

        return (
            <ListView
                style={style.listView}
                dataSource={dataSource}
                renderSectionHeader={screenWidth < 600 ? null : section => <ContainerHeader/>}
                renderRow={container => {
                    return <ContainerTile
                        key={container.name}
                        container={container}
                        onContainerSelected={() => this._onContainerSelected(container)}/>
                }}
                rowShouldUpdate={(section, row) => true}
            />
        )
    }

    _onContainerSelected(container) {
        this.props.toRoute({
            name: container.name,
            component: ContainerView,
            data: container
        })
    }
}

ContainerGrid.propTypes = {
    data: PropTypes.object.isRequired
}

ContainerGrid.defaultProps = {
    style: createStyles({
            listView: {backgroundColor: 'white'}
        }
    )
}