import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.DB_URI) {
  throw new Error("DB_URI is not set");
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getDB(dbname: string) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db(dbname);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getCollection(collectionName: string) {
  const db = await getDB("next_blog_db");
  if (db) return db.collection(collectionName);
  console.log("No collection found");
  return null;
}
