
export const INVALIDATE_APPS = 'INVALIDATE_APPS'
function invalidateApps() {
    return {
        type: INVALIDATE_APPS
    }
}

export const REQUEST_APPS = 'REQUEST_APPS'
function requestApps() {
    console.log('requestApps')
    return {
        type: REQUEST_APPS
    }
}

export const RECEIVE_APPS = 'RECEIVE_APPS'
function recieveApps(apps) {
    console.log('recieveApps')
    return {
        type: RECEIVE_APPS,
        apps: apps,
        receivedAt: Date.now()
    }
}

function fetchApps() {
    console.log('fetchApps')
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
    console.log('shouldFetchApps')
    const {apps} = state
    if (!apps.apps)
        return true
    else if (apps.isFetching)
        return false
    else
        return apps.didInvalidate
}

export function fetchAppsIfNeeded() {
    console.log('fetchAppsIfNeeded')
    return (dispatch, getState) => {
        if (shouldFetchApps(getState()))
            return dispatch(fetchApps())
        else
            return Promise.resolve()
    }
}