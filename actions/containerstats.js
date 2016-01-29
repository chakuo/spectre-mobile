import React, {WebSocket} from 'react-native'

export const GET_TOKEN = 'GET_TOKEN'
function getToken(containerId) {
    return {
        type: GET_TOKEN,
        containerId: containerId
    }
}

export const GOT_TOKEN = 'GOT_TOKEN'
function gotToken(token, url) {
    return {
        type: GOT_TOKEN,
        token: token,
        url: url
    }
}

export const CONNECT_SOCKET = 'CONNECT_SOCKET'
function connectSocket() {
    return {
        type: CONNECT_SOCKET
    }
}

export const SOCKET_CONNECTED = 'SOCKET_CONNECTED'
function socketConnected() {
    return {
        type: SOCKET_CONNECTED
    }
}

export const GOT_STATS = 'GOT_STATS'
function gotStats(stats) {
    return {
        type: GOT_STATS,
        stats: stats,
    }
}

export const RESET = 'RESET'
function reset() {
    return {
        type: RESET
    }
}

function connect(containerId) {
    return (dispatch, getState) => {
        dispatch(getToken(containerId))

        fetch(`http://52.70.143.76:8080/v1/containers/${containerId}/containerstats`)
            .then(response => response.json())
            .then(response => {
                dispatch(gotToken(response.token, response.url))
                dispatch(connectSocket())
                let socket = new WebSocket(response.url)
                socket.onopen = () => dispatch(socketConnected(socket))
                socket.onerror = () => dispatch(reset())
                socket.onclose = () => dispatch(reset())
                socket.onmessage = msg => dispatch(gotStats(msg.data))
            })
            .catch((error) => {
                dispatch(reset())
            })
    }
}