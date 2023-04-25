const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());
app.use(express.json());
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const port = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yx3tx8n.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
function verifyJWT(req, res, next) {
  // console.log(`token inside verifyjwt `, req.headers.authorization);
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send("unauthorized access");
  }

  const token = authHeader.split(" ")[1];
  if (token === null) {
    // console.log("in token");
    res.status(401).send("unauthorized access");
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "forbidden access" });
    }
    req.decoded = decoded;

    next();
  });
}
async function run() {
  try {
    const database = client.db("img-dobby");
    const imgCollection = database.collection("img-collection");
    const userCollection = database.collection("user-collection");
    app.get("/gallery", verifyJWT, async (req, res) => {
      const email = req.decoded.email;
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
    app.get("/jwt", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };

      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      return res.send({ accessToken: token });

      res.status(403).send({ accessToken: "" });
    });
    app.post("/uploadimage", verifyJWT, async (req, res) => {
      const img = req.body;
      img.email = req.decoded.email;
      img.appliedTime = new Date(Date.now()).toISOString();
      const result = await imgCollection.insertOne(img);
      res.send(result);
    });
    app.post("/login", async (req, res) => {
      const info = req.body;
      // console.log(info);
      const user = await userCollection.findOne({ email: info.email });
      if (!user) {
        return res.status(403).send({ message: "Email not exist" });
      }
      const result = await bcrypt.compare(info.password, user.password);
      if (!result) {
        return res.status(403).send({ message: "Password incorrect" });
      }
      res.send(user);
    });
    app.get("/validate", verifyJWT, async (req, res) => {
      // req.user contains the user object associated with the JWT
      res.send({ email: req.decoded.email });
    });
    app.post("/createuser", async (req, res) => {
      const info = req.body;
      const user = await userCollection.findOne({ email: info.email });
      if (user) {
        return res.status(403).send({ message: "Provide an unique email" });
      }
      const user2 = { email: info.email };

      const salt = await bcrypt.genSaltSync(10);
      const encryptedpassword = await bcrypt.hashSync(info.password, salt);
      info.password = encryptedpassword;
      const result = await userCollection.insertOne(info);
      res.send(user2);
    });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("its working");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
