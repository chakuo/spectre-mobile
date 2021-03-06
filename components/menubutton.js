
import React, {View, Text, TouchableOpacity} from 'react-native'
import AwesomeButton from 'react-native-awesome-button'
import Icon from '../node_modules/react-native-vector-icons/FontAwesome'

export default class MenuButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 20}}>
                <TouchableOpacity onPress={() => this._onTouchDown()}>
                    <Icon name='navicon' size={20} color='white'/>
                </TouchableOpacity>
            </View>
        )
    }

    _onTouchDown() {
        this.props.customAction('menu');
    }
}