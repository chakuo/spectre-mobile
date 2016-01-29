export const INVALIDATE_CONTAINERS = 'INVALIDATE_CONTAINERS'
function invalidateContainers() {
    return {
        type: INVALIDATE_CONTAINERS
    }
}

export const REQUEST_CONTAINERS = 'REQUEST_CONTAINERS'
function requestContainers() {
    return {
        type: REQUEST_CONTAINERS
    }
}

export const RECEIVE_CONTAINERS = 'RECEIVE_CONTAINERS'
function recieveContainers(containers) {
    return {
        type: RECEIVE_CONTAINERS,
        containers: containers,
        receivedAt: Date.now()
    }
}

function fetchContainers() {
    return dispatch => {
        dispatch(requestContainers())

        fetch('http://52.70.143.76:8080/v1/containers')
            .then(response => response.json())
            .then(response => {
                dispatch(recieveContainers(response.data))
            })
            .catch((error) => {
                console.error(error);
            })
    }
}

function shouldFetchContainers(state) {
    const {containers} = state
    if (!containers.containers)
        return true
    else if (containers.isFetching)
        return false
    else
        return containers.didInvalidate
}

export function fetchContainersIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchContainers(getState()))
            return dispatch(fetchContainers())
        else
            return Promise.resolve()
    }
}