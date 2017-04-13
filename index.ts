'use strict';

import 'source-map-support/register';
import * as app from './app.js';
import * as logService from './app/services/logService.js';

app.load().catch((ex) => {
  logService.error(ex);
  throw ex;
});
