'use strict';

import React, {View, Text, Image, WebView, ScrollView, TouchableOpacity} from 'react-native';
import Icon from '../node_modules/react-native-vector-icons/FontAwesome';

export default class MenuView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        let itemViews = this.props.menuItems.map((item) => {
            let color = item.name == this.props.selectedItemName ? 'orange' : 'white';
            return (
                <View key={item.name} style={{height: 50, backgroundColor: '#333', marginTop: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: 150, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Icon name={item.icon} size={20} style={{width: 25}} color={color}/>
                        <Text style={{color: color, marginLeft: 10}}>{item.name}</Text>
                    </View>
                </View>
            );
        });

        return (
            <ScrollView>
                <View style={{flexDirection: 'column', flex: 1, paddingTop: 60}}>
                    {itemViews}
                </View>
            </ScrollView>
        );
    }

    _onTouchDown() {

    }
}