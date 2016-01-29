import React, {View, Text, Image, WebView, TouchableOpacity, Dimensions} from 'react-native'
import { createStyles, maxHeight, minWidth } from 'react-native-media-queries'

export default class ContainerHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {style} = this.props

        const screenWidth = Dimensions.get('window').width

        if (screenWidth < 600)
            return (
                <TouchableOpacity style={{flex: 1}} onPress={() => this._onTouchDown()}>
                    <View style={style.container}>
                        <View style={style.stateCell}>
                            <Text style={style.stateText}>State</Text>
                        </View>
                        <View style={style.nameCell}>
                            <Text style={style.nameText}>Name</Text>
                        </View>
                    </View>
                </TouchableOpacity>)
        else return (
            <TouchableOpacity style={{flex: 1}} onPress={() => this._onTouchDown()}>
                <View style={style.container}>
                    <View style={style.stateCell}>
                        <Text style={style.stateText}>State</Text>
                    </View>
                    <View style={style.nameCell}>
                        <Text style={style.nameText}>Name</Text>
                    </View>
                    <View style={style.imageCell}>
                        <Text style={style.imageText}>Image</Text>
                    </View>
                    <View style={style.commandCell}>
                        <Text style={style.commandText}>Command</Text>
                    </View>
                </View>
            </TouchableOpacity>)
    }

    _onTouchDown() {
        this.props.onContainerSelected(this.props.container)
    }
}

ContainerHeader.defaultProps = {
    style: createStyles({
        scrollView: {},
        container: {
            height: 50,
            backgroundColor: '#efefef',
            paddingLeft: 20,
            paddingRight: 20,
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
            fontSize: 15,
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