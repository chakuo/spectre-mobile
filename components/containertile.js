import React, {View, Text, Image, WebView, TouchableOpacity, Dimensions} from 'react-native'
import Icon from '../node_modules/react-native-vector-icons/FontAwesome'
import { createStyles, maxHeight, minWidth } from 'react-native-media-queries'

export default class ContainerTile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {container, style} = this.props

        const screenWidth = Dimensions.get('window').width

        let children = []
        children.push(
            <View style={style.stateCell}>
                <Text style={[style.stateText, this._stateColor(container.state)]}>{container.state}</Text>
            </View>
        )
        children.push(
            <View style={style.nameCell}>
                <Text style={style.nameText}>{container.name}</Text>
            </View>
        )
        if (screenWidth >= 600) {
            children.push(
                <View style={style.imageCell}>
                    <Text style={style.imageText}>{container.data.dockerContainer ? container.data.dockerContainer.Image : ''}</Text>
                </View>
            )

            children.push(
                <View style={style.commandCell}>
                    <Text style={style.commandText}>{container.data.dockerContainer.Command}</Text>
                </View>
            )
        }

        return (
            <TouchableOpacity style={{flex: 1}} onPress={() => this._onTouchDown()}>
                <View style={style.container}>
                    {children}
                </View>
            </TouchableOpacity>
        )
    }

    _onTouchDown() {
        this.props.onContainerSelected(this.props.container)
    }

    _stateColor(state) {
        const {style} = this.props
        switch (state) {
            case 'running':
                return style.stateRunningColor
            case 'stopped':
            default:
                return style.stateStoppedColor
        }
    }

    _stateIcon(state) {
        switch (state) {
            case 'running':
                return 'gears'
            case 'stopped':
            default:
                return 'times'
        }
    }
}

ContainerTile.defaultProps = {
    style: createStyles({
        scrollView: {},
        container: {
            height: 60,
            backgroundColor: 'white',
            paddingLeft: 20,
            paddingRight: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#efefef',
            marginTop: 1,
            marginLeft: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        stateCell: {
            width: 100
        },
        stateText: {
            fontWeight: 'bold'
        },
        stateRunningColor: {
            color: 'green'
        },
        stateStoppedColor: {
            color: 'red'
        },
        nameCell: {
            flex: 1,
        },
        nameText: {
            fontSize: 15
        },
        imageCell: {
            flex: 1,
            paddingLeft: 20
        },
        imageText: {
            fontSize: 15,
        },
        commandCell: {
            flex: 1,
            paddingLeft: 20
        },
        commandText: {
            fontSize: 15,
        }
    })
}