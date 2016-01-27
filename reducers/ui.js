import Orientation from 'react-native-orientation'

import { UPDATE_ORIENTATION } from './../actions/ui.js';

export function ui(state = {orientation: 'PORTRAIT'}, action) {
    switch (action.type) {
        case UPDATE_ORIENTATION:
            return Object.assign({}, state, {
                orientation: action.orientation
            })
        default:
            return state
    }
}