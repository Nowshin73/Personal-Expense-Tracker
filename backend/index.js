const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
require('dotenv').config()

const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zmagebg.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect the client to the server	(optional starting in v4.7)
//await client.connect();
const expensesCollection = client.db("expense_tracker").collection("expenses");
const userCollection = client.db("expense_tracker").collection("users");


// post expense
app.post('/expenses', async(req,res)=>{
    const expense = req.body;
    const result = await expensesCollection.insertOne(expense);
    res.status(201).send(result);
})

// get expense
app.get('/expenses', async (req,res)=>{
    const result = await expensesCollection.find().toArray();
    res.status(200).send(result)
})
app.get('/expenses/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }

  const options = {
    projection: {
      title: 1, amount: 1, category: 1, date: 1, email: 1,
    },
  };
  const result = await expensesCollection.findOne(query, options);
  res.send(result);
})
//get my products
app.get(`/expenses`, async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).send({ error: 'Could not found user expenses' });
  }
  try {
    const myExpenses = await expensesCollection.find({ email });
   
    res.status(200).json(myExpenses);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch expenses' });
  }
});


app.delete('/expenses/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await expensesCollection.deleteOne(query);
  res.send(result);
})


app.patch('/expenses/:id', async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const {expenseTitle,expenseAmount, expenseCategory,expenseDate} = req.body;
  const updateExpense = {
    $set: {
        title:expenseTitle,
       amount: expenseAmount,
       category: expenseCategory,
       date: expenseDate
    }
  }
  const result = await expensesCollection.updateOne(filter, updateExpense);
  res.send(result);
})

app.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }

  const options = {
    // Include only the `title` and `imdb` fields in the returned document
    projection: {
      _id: 1, email: 1, name: 1, photo: 1, createdAt: 1,
    },
  };
  const result = await userCollection.findOne(query, options);
  res.send(result);
})


app.post('/users', async (req, res) => {
  const user = req.body;
  const query = { email: user.email }
  const existingUser = await userCollection.findOne(query);

  if (existingUser) {
    return res.send({ message: 'user already exists' })
  }

  const result = await userCollection.insertOne(user);
  res.send(result);
});


// Send a ping to confirm a successful connection
//await client.db("admin").command({ ping: 1 });
console.log("Pinged your deployment. You successfully connected to MongoDB!");

//run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Personal Expenses Server is running')
})

app.listen(port, () => {
  console.log(`Personal Expenses Server is running on port ${port}`);
})