const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.get('/', (req, res) => {
    res.send('Hello World')
  })

app.listen(3005 ,() => {
    console.log(`Example app listening on port 3003`)
  });

// /api/v1/user/signup
// /api/v1/user/signin
// /api/v1/user/changepassword..

// /api/v1/account/transfermoney
// /api/v1/account/balance
