import { INVALIDATE_CONTAINERS, REQUEST_CONTAINERS, RECEIVE_CONTAINERS } from './../actions/containers.js';

export function containers(state = {
    isFetching: false,
    didInvalidate: false,
    containers: null
}, action) {
    switch (action.type) {
        case INVALIDATE_CONTAINERS:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_CONTAINERS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_CONTAINERS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                containers: action.containers,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}