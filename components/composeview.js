import {Component, Text, ScrollView} from 'react-native'

export default class ComposeView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let text = this.props.data
        return (
            <ScrollView style={{backgroundColor: '#333'}}>
                <Text style={{margin: 20, color: '#00ff00'}}>{text}</Text>
            </ScrollView>
        )
    }
}