import React, {View, Text, TextInput, ScrollView, WebView} from 'react-native'

import AwesomeButton from 'react-native-awesome-button'
import gs from '../styles/global.js'

export default class ContainerView extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {

    }

    render() {
        const container = this.props.data
        return <Text>Hello</Text>
    }
}