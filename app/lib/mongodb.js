import { MongoClient } from "mongodb";

const url="mongodb+srv://bishtdevansh03_db_user:0AIMXuNcFWpgN3Iq@devansh.kjmo6as.mongodb.net/"

let client = new MongoClient(url)

const options = {};

let clientPromise;


if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(url, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {   
  
  client = new MongoClient(url, options);
  clientPromise = client.connect();
}

export default clientPromise;

