import React, {Component, View, Text, TextInput, ScrollView, WebView} from 'react-native'
import Icon from '../node_modules/react-native-vector-icons/FontAwesome'

export default class IconTitle extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {title, icon, iconSize, color, font, fontStyle, fontWeight, fontSize} = this.props

        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                {icon ? <Icon name={icon} size={iconSize} color={color}></Icon> : null}
                {title ? <Text style={{
                    marginLeft: 10, fontFamily: font, fontStyle: fontStyle, fontWeight: fontWeight, fontSize: fontSize, color: color}}>{title}</Text> : null}
            </View>
        )
    }
}

IconTitle.defaultProps = {
    title: '',
    icon: 'navicon',
    iconSize: 20,
    color: 'white',
    font: 'HelveticaNeue',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 17
}