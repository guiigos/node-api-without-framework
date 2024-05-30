import { promisify } from "node:util";
import Datastore from "nedb";

const isTest = process.env.NODE_ENV === "test";

const db = new Datastore({
  filename: "./db/tasks.db",
  inMemoryOnly: isTest,
});

db.loadDatabase((err) => {
  if (err) console.error(err);
});

const findAsync = promisify(db.find).bind(db);
const findOneAsync = promisify(db.findOne).bind(db);
const insertAsync = promisify(db.insert).bind(db);
const removeAsync = promisify(db.remove).bind(db);
const updateAsync = promisify(db.update).bind(db);

export default {
  findAsync,
  findOneAsync,
  insertAsync,
  updateAsync,
  removeAsync,
};
