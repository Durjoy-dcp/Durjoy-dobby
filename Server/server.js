const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yx3tx8n.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    const database = client.db("img-dobby");
    const imgCollection = database.collection("img-collection");
    app.get("/gallery", async (req, res) => {
      const email = req.query.email;
      const serachText = req.query.serachText;
      const regex = new RegExp(serachText, "i");
      const imgs = await imgCollection
        .find({
          $and: [
            { email: email }, // filter by email
            {
              $or: [{ name: regex }],
            },
          ],
        })
        .sort({ appliedTime: -1 })
        .toArray();
      res.send(imgs);
    });
    app.post("/uploadimage", async (req, res) => {
      const img = req.body;
      img.appliedTime = new Date(Date.now()).toISOString();
      const result = await imgCollection.insertOne(img);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
