
export const INVALIDATE_APPS = 'INVALIDATE_APPS'
function invalidateApps() {
    return {
        type: INVALIDATE_APPS
    }
}

export const REQUEST_APPS = 'REQUEST_APPS'
function requestApps() {
    return {
        type: REQUEST_APPS
    }
}

export const RECEIVE_APPS = 'RECEIVE_APPS'
function recieveApps(apps) {
    return {
        type: RECEIVE_APPS,
        apps: apps,
        receivedAt: Date.now()
    }
}

function fetchApps() {
    return dispatch => {
        dispatch(requestApps())

        fetch('http://52.70.143.76:8080/v1-catalog/templates')
            .then(response => response.json())
            .then(response => {
                dispatch(recieveApps(response.data))
            })
            .catch((error) => {
                console.error(error);
            })
    }
}

function shouldFetchApps(state) {
    const {apps} = state
    if (!apps.apps)
        return true
    else if (apps.isFetching)
        return false
    else
        return apps.didInvalidate
}

export function fetchAppsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchApps(getState()))
            return dispatch(fetchApps())
        else
            return Promise.resolve()
    }
}