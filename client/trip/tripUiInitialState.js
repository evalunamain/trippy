import React from 'react';

import WaypointsDrawer from './drawers/WaypointsDrawer';
import EnterAuthorModal from './dialogs/EnterAuthorModal';

const tripUiInitialState = {
  drawer: WaypointsDrawer,
  dialog: EnterAuthorModal,
  snackbar: null,
};

export default tripUiInitialState;
