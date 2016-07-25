import { combineReducers } from 'redux';

import drawer from './ui/drawerDuck';
import entry from './ui/entryDuck';
import snackbar from './ui/snackbarDuck';

export default combineReducers({ drawer, entry, snackbar });
