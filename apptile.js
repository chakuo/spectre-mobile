
import React, {View, Text, Image, WebView, TouchableOpacity} from 'react-native';

export default class AppTile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        let app = this.props.app;

        return (
            <TouchableOpacity onPress={this._onTouchDown.bind(this)}>
                <View style={{height: 100, backgroundColor: 'white', paddingLeft: 20, paddingRight: 20, marginTop: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <View style={{width: 75, height: 75, margin: 10, backgroundColor: 'red'}}>
                        <WebView html={`<html><body style='margin:0'><div style='width: 100%; height: 100%; background: url(${app.iconLink}); background-repeat: no-repeat; background-size: contain; background-position: center;'/></body></html>`}/>
                    </View>
                    <View style={{margin: 10, flex:1, flexDirection: 'column'}}>
                        <Text style={{fontSize: 20}}>{app.name}</Text>
                        <Text style={{fontSize: 10, fontStyle: 'italic'}} numberOfLines={3}>{app.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    _onTouchDown() {
        this.props.onAppSelected(this.props.app);
    }
}