const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

const routes = require("./routes");

require("./db");

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use("/api", routes);
app.listen(8000, () =>
{
    console.log("Server running at http://localhost:8000");
});