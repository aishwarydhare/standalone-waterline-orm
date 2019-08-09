let {
  DB_TYPES_ENUM,
  getDatabase
} = require('./orm');


async function test(){
  let mysqlOrm = await getDatabase(DB_TYPES_ENUM.MYSQL);
  console.log("Cities model loaded in DB: \t", (mysqlOrm.Cities ? "true" : "false"));
  console.log("Initial state", await mysqlOrm.Cities.count());
  await mysqlOrm.Cities.create({
    name: "NewYork"
  });
  console.log("After creating one", await mysqlOrm.Cities.count());
  console.log("All data inside DB", await mysqlOrm.Cities.find({
    name: "NewYork"
  }));
  await mysqlOrm.Cities.destroy({
    name: "NewYork"
  });
  console.log("After deleting all", await mysqlOrm.Cities.count());
}

test();
