module.exports = {
  defaultAttr: {
    id: { type: 'number', autoMigrations: { autoIncrement: true }},
    createdAt: { type: 'string', autoMigrations: { columnType:'DATETIME' }, autoCreatedAt: true},
    updatedAt: { type: 'string', autoMigrations: { columnType:'DATETIME' }, autoUpdatedAt: true},
  },

  defaultConfig: {
    primaryKey: 'id',
    datastore: 'default',
    schema: true,
    autocreatedAt : true,
    autoupdatedAt : true,
  },
};