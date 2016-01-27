
export const INVALIDATE_APP_DETAILS = 'INVALIDATE_APP_DETAILS'
function invalidateAppDetails(app) {
    return {
        type: INVALIDATE_APP_DETAILS,
        app: app
    }
}

export const REQUEST_APP_DETAILS = 'REQUEST_APP_DETAILS'
function requestAppDetails(app) {
    console.log('requestAppDetails')
    return {
        type: REQUEST_APP_DETAILS,
        app: app
    }
}

export const RECEIVE_APP_DETAILS = 'RECEIVE_APP_DETAILS'
function recieveAppDetails(app, details) {
    console.log('recieveApp')
    return {
        type: RECEIVE_APP_DETAILS,
        app: app,
        details: details,
        receivedAt: Date.now()
    }
}

function fetchAppDetails(app) {
    console.log('fetchAppDetails')
    return dispatch => {
        dispatch(requestAppDetails(app))

        const verLink = app.versionLinks[app.version];
        fetch(verLink)
            .then(response => response.json())
            .then(response => {
                dispatch(recieveAppDetails(app, response.data))
            })
            .catch(error => {
                console.error(error)
            })
    }
}

function shouldFetchAppDetails(app) {
    console.log('shouldFetchAppDetails')
    if (!app.details)
        return true
    else if (app.isFetchingDetails)
        return false
    else
        return app.didInvalidateDetails
}

export function fetchAppDetailsIfNeeded(app) {
    console.log('fetchAppDetailsIfNeeded')
    return (dispatch, getState) => {
        if (shouldFetchApp(getState()))
            return dispatch(fetchAppDetails())
        else
            return Promise.resolve()
    }
}