const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.students = require("./students.js")(sequelize, Sequelize);
db.schools = require("./schools.js")(sequelize, Sequelize);
db.books = require("./books.js")(sequelize, Sequelize);
db.studentbookAssociation = require("./studentbookAssociation.js")(sequelize, Sequelize);
db.sequelize.sync();

module.exports = db;