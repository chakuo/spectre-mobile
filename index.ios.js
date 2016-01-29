import React, {AppRegistry, Component, PropTypes, View} from 'react-native'

import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import Application from './components/application.js'
import { rootReducer } from './reducers/root.js'

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
)(createStore)

const store = createStoreWithMiddleware(rootReducer)

class Spectre extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        const {store} = this.props
        return <Application store={store}/>
    }
}

Spectre.propTypes = {
    store: PropTypes.object.isRequired
}

Spectre.defaultProps = {store: store}

AppRegistry.registerComponent('Spectre', () => Spectre)
