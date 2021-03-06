import React, {View, Navigator, Text, PropTypes} from 'react-native'

import Router from 'react-native-router'
import AppGrid from './appgrid.js'
import MenuButton from './menubutton.js'
import IconTitle from './icontitle.js'

class AppTitleIcon extends IconTitle {

}

AppTitleIcon.defaultProps = Object.assign({}, IconTitle.defaultProps, {
    title: 'Catalog',
    icon: 'map'
})

export default class AppBrowser extends React.Component {
    constructor(props) {
        super(props)
        this.firstRoute = {
            name: 'Catalog',
            component: AppGrid,
            titleComponent: AppTitleIcon,
            leftCorner: MenuButton,
            data: {store: this.props.store}
        }
    }

    render() {
        return <Router
            firstRoute={this.firstRoute}
            headerStyle={{backgroundColor: '#444'}}
            customAction={opts => this._routerCustomAction(opts)}/>
    }

    _routerCustomAction(opts) {
        this.props.onOpenMenu(opts)
    }
}

AppBrowser.propTypes = {
    store: PropTypes.object.isRequired
}