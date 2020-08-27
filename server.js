const express = require("express");
const connectDB = require("./config/db_config");
const swaggerDocs = require("./config/swagger_config");
const swaggerUi = require("swagger-ui-express");
const movieRoutes = require("./routes/movie");

const port = process.env.PORT || 3000;

//Connect express and DB
const app = express();
connectDB();

//Connect swagger api documentation tool
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/movie", movieRoutes);

app.listen(port, () => {
  console.log(`Server is live on port ${port}`);
});
