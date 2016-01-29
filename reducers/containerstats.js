import Stats from './../actions/containerstats.js'

export function containerStats(state = {
    containerId: null,
    gettingToken: false,
    token: null,
    connecting: false,
    socket: null,
    stats: []
}, action) {
    switch (action.type) {
        case Stats.GET_TOKEN:
            return Object.assign({}, state, {
                containerId: action.containerId,
                gettingToken: true
            })
        case Stats.GOT_TOKEN:
            return Object.assign({}, state, {
                token: action.token,
                url: action.url,
                gettingToken: false
            })
        case Stats.CONNECT_SOCKET:
            return Object.assign({}, state, {
                connecting: true
            })
        case Stats.SOCKET_CONNECTED:
            return Object.assign({}, state, {
                socket: action.socket,
                connecting: false
            })
        case Stats.GOT_STATS:
            let stats = state.stats.slice(0)
            stats.push(action.stats)
            return Object.assign({}, state, {
                stats: stats
            })
        case Stats.RESET:
            return Object.assign({}, state, {
                containerId: null,
                gettingToken: false,
                token: null,
                url: null,
                connecting: false,
                socket: null,
                stats: []
            })
        default:
            return state
    }
}