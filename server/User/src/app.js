const express = require("express");
const ApiError = require("./utils/ApiError");
const routes = require("./routes/user.route");
const httpStatus = require("http-status");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());


app.use(cors());
app.use(bodyParser.json());
app.use("/", routes);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

module.exports = app;
