const { json } = require("body-parser");
const express = require("express");
const app = express();
const dbConnection = require("./config/database");

app.use(json());
dbConnection();

// class App {
//   async initControllers() {
//     const router = express.Router();
//     try {
//       let list = fs.readdirSync(join(this.appBaseDir, "controllers"));
//       list.forEach((item) => {
//         if (item.search(/.js$/) !== -1) {
//           let name = item.toString().replace(/\.js$/, "");
//           console.log(
//             "[FRAMEWORK]".bold.yellow,
//             `Loading Controller Module: '${name.bold}'`.magenta
//           );
//           new (require(join(this.appBaseDir, "controllers", item)))(router);
//         }
//       });
//       this.app.use("/", router);
//     } catch (err) {
//       log.error(err);
//     }
//   }
// }

app.use("/", require("./routes/index"));

app.listen(3003, console.log("Server is running"));
