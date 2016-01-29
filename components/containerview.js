import React, {Component, PropTypes, StyleSheet, View, Text, TextInput, ScrollView, WebView} from 'react-native'

import AwesomeButton from 'react-native-awesome-button'

import { createStyles, minWidth } from 'react-native-media-queries'
import gs from '../styles/global.js'

export default class ContainerView extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {

    }

    render() {
        const container = this.props.data
        const {style} = this.props
        return (
            <View key='container' style={style.container}>
                {this._renderHeader(container)}
                <Text>{container.name}</Text>
            </View>
        )
    }

    _renderHeader(container) {
        const {style} = this.props
        return (
            <View key='header' style={style.header}>
                <View key='stateBox' style={this._getStateBoxStyle(container.state)}>
                    <Text key='stateText' style={style.stateText}>{`State: ${container.state}`}</Text>
                </View>
            </View>
        )
    }

    _getStateBoxStyle(state) {
        const {style} = this.props

        let calcStyle = style.stateBoxStopped
        switch (state) {
            case 'running':
                calcStyle = style.stateBoxRunning
                break
            case 'stopped':
                calcStyle = style.stateBoxStopped
                break
        }

        return [style.stateBox, calcStyle]
    }
}

ContainerView.propTypes = {
    style: PropTypes.object.isRequired
}

ContainerView.defaultProps = {
    style: createStyles({
        container: {

        },
        header: {

        },
        stateBox: {
            height: 50
        },
        stateBoxRunning: {
            backgroundColor: 'green'
        },
        stateBoxStopped: {
            backgroundColor: 'red'
        },
        stateText: {
            color: 'white'
        }
    })
}
