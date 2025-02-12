import 'dotenv/config';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let isConnected = false;

async function connectToDB() {
  try {
    if (!isConnected) {
      await client.connect();
      isConnected = true;
      console.log('Connected to MongoDB');
    }
    return client.db(process.env.DB_NAME);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

async function getRandomWord(category) {
  const db = await connectToDB();
  const collection = db.collection('words');

  const randomWord = await collection
    .aggregate([
      { $match: { category: category } },
      { $sample: { size: 1 } },
      { $project: { _id: 0, word: 1 } },
    ])
    .toArray();

  return randomWord.length > 0 ? randomWord[0].word : null;
}

async function closeConnection() {
  if (isConnected) {
    console.log('Closing MongoDB connection');
    await client.close();
  }
}

export { connectToDB, getRandomWord, closeConnection };
