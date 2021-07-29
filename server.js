const dotenv = require("dotenv");
const app = require("./app");
require('./mysql')

dotenv.config({ path: "./config.env" });

console.log(process.env.NODE_ENV)

process.on("uncaughtException", err => {
  console.log(err);
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("Server Running on port " + port);
});

process.on('exit', () => {
  console.log("Exiting Server");
  process.exit(1);
})

process.on("unhandledRejection", err => {
  console.log(err, err.name, err.message);
  app.close(() => {
    process.exit(1);
  });
});
