import React, {View, Text, Image, ListView, TouchableOpacity, PropTypes} from 'react-native'
import Icon from '../node_modules/react-native-vector-icons/FontAwesome'
import { createStyles, minWidth } from 'react-native-media-queries'

export default class MenuView extends React.Component {
    constructor(props) {
        super(props)
        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }

    render() {
        const {style, menuItems, selectedMenuItem} = this.props

        return (
            <ListView
                style={{paddingTop: 62}}
                dataSource={this.dataSource.cloneWithRows(menuItems)}
                renderRow={menuItem => {
                    let isSelected = menuItem.id === selectedMenuItem
                    return (
                         <TouchableOpacity onPress={() => this._onMenuItemSelected(menuItem.id)}>
                            <View style={style.menuItem}>
                                <View style={style.menuItemContent} key={menuItem.name}>
                                    <Icon style={style.menuItemIcon} name={menuItem.icon} size={20} color={isSelected ? 'orange' : 'white'}/>
                                    <Text style={[style.menuItemName, isSelected ? style.selectedMenuItemColor : style.menuItemColor]}>{menuItem.name}</Text>
                                </View>
                            </View>
                         </TouchableOpacity>
                    )
                }}
            />
        )
    }

    _onMenuItemSelected(menuItem) {
        this.props.onMenuItemSelected(menuItem)
    }
}

MenuView.propTypes = {
    style: PropTypes.object.isRequired
}

MenuView.defaultProps = {
    style: createStyles({
        container: {backgroundColor: '#efefef'},
        menuItem: {height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333', marginTop: 1},
        menuItemContent: {flexDirection: 'row', alignItems: 'center', width: 150},
        menuItemIcon: {flex: 1},
        menuItemName: {flex: 3, color: 'white'},
        menuItemColor: {color: 'white'},
        selectedMenuItemColor: {color: 'orange'}
    })
}