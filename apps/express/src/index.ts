import express from "express";
import auth_routes from "./routes/auth/auth_routes";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import api from "./routes/api";
import superAdmin from "./routes/superAdmin/superAdminRoutes";

dotenv.config();

const app = express();
// const port = 3000;
// const port = process.env.PORT || "3000";
const port = process.env.PORT;
if (!port) {
  throw new Error("PORT environment variable is not set.");
}

app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        origin === process.env.FRONTEND_URL ||
        origin === process.env.FRONTEND_URL_WWW
        //   ||
        // !origin
      ) {
        callback(null, true);
      } else {
        callback(new Error("CORS error"));
      }
    },

    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", auth_routes);
api.forEach((route) => app.use("/api", route));

app.use("/superAdmin", superAdmin);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.use("/auth", auth_routes);
// api.forEach((route) => app.use("/api", route));

// app.use("/superAdmin", superAdmin);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
