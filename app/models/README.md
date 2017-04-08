# Models

A model represents a collection of structured data, usually corresponding to a single table or collection in a database. Out of the box,
koa-mvc supports waterline.js syntax for defining models. The `waterline-mongo` plugin sets up global variables for each model definition file
located in this direcctory. Each global model variable will support [built in model methods](http://sailsjs.com/documentation/reference/waterline-orm/models#?builtin-model-methods).

# Example

## User.js

```js
'use strict';

module.exports = {
  schema: true,
  autoUpdatedAt: true,
  autoCreatedAt: true,

  attributes: {

    name: {
      type: 'string',
    },

    email: {
      type: 'string',
      //email: true,
      unique: true,
    },

    lastActiveAt: {
      type: 'datetime',
    },

    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
};
```
