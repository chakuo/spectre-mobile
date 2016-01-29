import React, {Component, View, Text, Image, WebView, TouchableOpacity} from 'react-native'
import { createStyles, maxHeight, minWidth } from 'react-native-media-queries'

export default class AppTile extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {app, style} = this.props

        return (
            <TouchableOpacity style={{flex: 1}} onPress={() => this._onTouchDown()}>
                <View style={style.container}>
                    <View style={style.icon}>
                        <WebView html={`<html><body style='margin:0'><div style='width: 100%; height: 100%; background: url(${app.iconLink}); background-repeat: no-repeat; background-size: contain; background-position: center;'/></body></html>`}/>
                    </View>
                    <View style={style.details}>
                        <Text style={style.name}>{app.name}</Text>
                        <Text style={style.description} numberOfLines={3}>{app.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _onTouchDown() {
        this.props.onAppSelected(this.props.app)
    }
}

AppTile.defaultProps = {
    style: createStyles({
        scrollView: {},
        container: {
            height: 100,
            backgroundColor: 'white',
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 1,
            marginLeft: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        icon: {
            width: 75, height: 75, margin: 10
        },
        details: {
            margin: 10, flex: 1, flexDirection: 'column'
        },
        name: {
            fontSize: 20
        },
        description: {
            fontSize: 10, fontStyle: 'italic'
        }
    })
}