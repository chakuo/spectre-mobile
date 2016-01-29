import React, {Component, View, Navigator, Text, PropTypes} from 'react-native'

import Router from 'react-native-router'
import ContainerGrid from './containergrid.js'
import MenuButton from './menubutton.js'
import IconTitle from './icontitle'

class ContainerTitleIcon extends IconTitle {

}

ContainerTitleIcon.defaultProps = Object.assign({}, IconTitle.defaultProps, {
    title: 'Containers',
    icon: 'cubes'
})

export default class ContainerBrowser extends Component {
    constructor(props) {
        super(props)
        this.firstRoute = {
            name: 'Containers',
            component: ContainerGrid,
            titleComponent: ContainerTitleIcon,
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

ContainerBrowser.propTypes = {
    store: PropTypes.object.isRequired
}