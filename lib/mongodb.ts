import { MongoClient, Db } from "mongodb";

const { MONGODB_URI: uri, MONGODB_DB: dbName } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


let cachedClient: MongoClient;
let cachedDb: Db;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}
if (!dbName) {
  throw new Error(
    "Please add your MONGODB_DB environment variable inside .env.local"
  );
}

export async function connectDb() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri!, {});
  const db = await client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
