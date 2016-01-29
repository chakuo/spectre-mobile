
import React, {Component, View, Text, TextInput, ScrollView, WebView} from 'react-native'
import AwesomeButton from 'react-native-awesome-button'
import ComposeView from './composeview.js'
import gs from '../styles/global.js'

export default class AppView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            template: null
        }
    }

    componentWillMount() {
        let app = this.props.data
        let verLink = app.versionLinks[app.version]
        fetch(verLink)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    template: response
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }

    render() {
        let app = this.props.data
        let template = this.state.template

        let fields = template ? template.questions.map(field => {
            return (
                <View key={field.variable} style={{flexDirection: 'column', marginLeft: 20, marginRight: 20, marginTop: 10}}>
                    <Text style={{}}>{field.label}</Text>
                    <TextInput
                        style={{height: 40, borderColor: '#dddddd', backgroundColor: 'white', borderWidth: 1, marginTop: 10, padding: 10}}
                        onChangeText={text => this.setState({text})}
                        value={field.default}
                    />
                    <Text style={{fontSize:10, fontStyle: 'italic', color: 'gray', marginTop: 10}}>{field.description}</Text>
                </View>
            )
        }) : null

        let compose = template ? (
            <View>
                <Text style={{fontSize: 15, color: '#444', marginLeft: 20, marginRight: 20, marginTop: 10}}>Preview</Text>
                <View style={{flexDirection: 'column', backgroundColor: '#f5f5f5', marginTop: 10, paddingBottom: 20, alignItems: 'center'}}>
                    <AwesomeButton
                        backgroundStyle={{backgroundColor: '#aaaaaa', height: 40, borderRadius: 20, marginLeft: 20, marginTop: 20, width: 200}}
                        states={{
                            default: {
                                text: 'Docker Compose',
                                backgroundColor: '#aaaaaa',
                                onPress: () => this._showDockerCompose(template.dockerCompose)
                            }
                        }}/>
                    <AwesomeButton
                        backgroundStyle={{backgroundColor: '#aaaaaa', height: 40, borderRadius: 20, marginLeft: 20, marginTop: 20, width: 200}}
                        states={{
                            default: {
                                text: 'Rancher Compose',
                                backgroundColor: '#aaaaaa',
                                onPress: () => this._showRancherCompose(template.rancherCompose)
                            }
                        }}/>
                </View>
            </View>) : null

        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <View style={{paddingBottom: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 20, marginRight: 20, marginTop: 20}}>
                        <View style={{width: 75, height: 75}}>
                            <WebView html={`<html><body style='margin:0'><div style='width: 100%; height: 100%; background: url(${app.iconLink}); background-repeat: no-repeat; background-size: contain; background-position: center;'/></body></html>`}/>
                        </View>
                        <View style={{marginLeft: 10, flex:1, flexDirection: 'column'}}>
                            <Text style={{fontSize: 20}}>{app.name}</Text>
                            <Text style={{fontSize: 10, fontStyle: 'italic'}} numberOfLines={3}>{app.description}</Text>
                        </View>
                    </View>
                    <Text style={{fontSize: 15, color: '#444', marginLeft: 20, marginRight: 20, marginTop: 10}}>New Stack</Text>
                    <View style={{flexDirection: 'column', backgroundColor: '#f5f5f5', marginTop: 10, paddingBottom: 20}}>
                        <View style={{flexDirection: 'column', marginLeft: 20, marginRight: 20, marginTop: 10}}>
                            <Text>Name</Text>
                            <TextInput
                                style={{height: 40, borderColor: '#dddddd', backgroundColor: 'white', borderWidth: 1, marginTop: 10, padding: 10}}
                                onChangeText={text => this.setState({text})}
                                value=''
                            />
                        </View>
                        <View style={{flexDirection: 'column', marginLeft: 20, marginRight: 20, marginTop: 10}}>
                            <Text>Description</Text>
                            <TextInput
                                style={{height: 80, borderColor: '#dddddd', backgroundColor: 'white', borderWidth: 1, marginTop: 10, padding: 10}}
                                onChangeText={text => this.setState({text})}
                                value=''
                            />
                        </View>
                    </View>
                    <Text style={{fontSize: 15, color: '#444', marginLeft: 20, marginRight: 20, marginTop: 10}}>Configuration Options</Text>
                    <View style={{flexDirection: 'column', backgroundColor: '#f5f5f5', marginTop: 10, paddingBottom: 20}}>
                        {fields}
                    </View>
                    {compose}
                    <AwesomeButton
                        backgroundStyle={{backgroundColor: '#228b22', height: 40, borderRadius: 20, marginLeft: 20, marginTop: 20, width: 200, alignSelf: 'center'}}
                        states={{
                            default: {
                                text: 'Launch',
                                backgroundColor: '#228b22',
                                onPress: () => this._launchApp()
                            }
                        }}/>
                </View>
            </ScrollView>)
    }

    _showDockerCompose(composeText) {
        this.props.toRoute({
            name: 'Docker Compose',
            component: ComposeView,
            data: composeText
        })
    }

    _showRancherCompose(composeText) {
        this.props.toRoute({
            name: 'Rancher Compose',
            component: ComposeView,
            data: composeText
        })
    }

    _launchApp() {

    }
}