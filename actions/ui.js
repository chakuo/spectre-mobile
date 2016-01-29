import Orientation from 'react-native-orientation'

export const QUERY_ORIENTATION = 'QUERY_ORIENTATION'
function queryOrientation() {
    return {
        type: QUERY_ORIENTATION
    }
}

export const UPDATE_ORIENTATION = 'UPDATE_ORIENTATION'
function updateOrientation(orientation) {
    return {
        type: UPDATE_ORIENTATION,
        orientation: orientation
    }
}

export function orientationChanged() {
    return dispatch => {
        dispatch(queryOrientation())
        Orientation.getOrientation((err, orientation) => dispatch(updateOrientation(orientation)))
    }
}

export const SCREEN_CONTAINERS = 'SCREEN_CONTAINERS'
export const SCREEN_APPS = 'SCREEN_APPS'

export const SET_MAIN_SCREEN = 'SET_MAIN_SCREEN'
export function setMainScreen(screen) {
    return {
        type: SET_MAIN_SCREEN,
        screen: screen
    }
}