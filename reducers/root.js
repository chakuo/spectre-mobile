import { combineReducers } from 'redux'

import {apps} from './apps.js'
import {containers} from './containers.js'
import {ui} from './ui.js'

export const rootReducer = combineReducers({
    apps,
    containers,
    ui
})