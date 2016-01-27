import { combineReducers } from 'redux'

import { INVALIDATE_APPS, REQUEST_APPS, RECEIVE_APPS } from './../actions/apps.js';

const initialState = {}

export function apps(state = {
    isFetching: false,
    didInvalidate: false,
    apps: null
}, action) {
    switch (action.type) {
        case INVALIDATE_APPS:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_APPS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_APPS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                apps: action.apps,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}