import { combineReducers } from 'redux'

import {apps} from './apps.js'
import {ui} from './ui.js'

export const rootReducer = combineReducers({
    apps,
    ui
})