import Orientation from 'react-native-orientation'

import { UPDATE_ORIENTATION, SET_MAIN_SCREEN, SCREEN_APPS, SCREEN_CONTAINERS } from './../actions/ui.js';

export function ui(state = {
    mainScreen: SCREEN_APPS,
    orientation: 'PORTRAIT'
}, action) {
    switch (action.type) {
        case UPDATE_ORIENTATION:
            return Object.assign({}, state, {
                orientation: action.orientation
            })
        case SET_MAIN_SCREEN:
            return Object.assign({}, state, {
                mainScreen: action.screen
            })
        default:
            return state
    }
}