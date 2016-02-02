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
            <View style={style.container}>
                {this._renderInfoBox(container)}
            </View>
        )
    }

    _renderInfoBox(container) {
        const {style} = this.props
        return (
            <View style={style.infoBox}>
                <View style={style.infoRow}>
                    <View style={this._getStateBoxStyle(container.state)}>
                        <Text style={[style.infoLabel, style.stateLabel]}>State: </Text>
                        <Text style={[style.infoText, style.stateText]}>{container.state}</Text>
                    </View>
                </View>
                <View style={style.infoRow}>
                    <View style={style.infoCell}>
                        <Text style={style.infoLabel}>Host Name: </Text>
                        <Text style={style.infoText}>{container.data.fields.dockerHostIp}</Text>
                    </View>
                    <View style={style.infoCell}>
                        <Text style={style.infoLabel}>Host IP: </Text>
                        <Text style={style.infoText}>{container.data.fields.dockerHostIp}</Text>
                    </View>
                    <View style={style.infoCell}>
                        <Text style={style.infoLabel}>Container IP: </Text>
                        <Text style={style.infoText}>{container.data.fields.primaryIpAddress}</Text>
                    </View>
                </View>
                <View style={style.infoRow}>
                    <View style={style.infoCell}>
                        <Text style={style.infoLabel}>Image: </Text>
                        <Text style={style.infoText}>{container.data.dockerContainer.Image}</Text>
                    </View>
                    <View style={style.infoCell}>
                        <Text style={style.infoLabel}>Command: </Text>
                        <Text style={style.infoText}>{container.data.dockerContainer.Command}</Text>
                    </View>
                    <View style={style.infoCell}>
                        <Text style={style.infoLabel}>Entrypoint: </Text>
                        <Text style={style.infoText}>{container.entryPoint}</Text>
                    </View>
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

        return [style.infoCell, calcStyle]
    }
}

ContainerView.propTypes = {
    style: PropTypes.object.isRequired
}

ContainerView.defaultProps = {
    style: createStyles({
        container: {
            padding: 20,
            backgroundColor: 'white'
        },
        header: {},
        infoBox: {
            borderColor: '#eee',
            borderRightWidth: 1,
            borderBottomWidth: 1
        },
        infoRow: {
            flexDirection: 'row',
            borderColor: '#eee',
            borderTopWidth: 1
        },
        infoCell: {
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            paddingLeft: 20,
            height: 40,
            borderColor: '#eee',
            borderLeftWidth: 1
        },
        infoLabel: {
            fontWeight: 'bold'
        },
        infoText: {},
        stateBoxRunning: {
            backgroundColor: 'green'
        },
        stateBoxStopped: {
            backgroundColor: 'red'
        },
        stateLabel: {
            color: 'white',
            fontWeight: 'bold'
        },
        stateText: {
            color: 'white',
            fontWeight: 'bold'
        }
    })
}
