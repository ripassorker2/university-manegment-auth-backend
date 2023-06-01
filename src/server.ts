import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

async function connection() {
   try {
      mongoose.connect(config.database_url as string);
      console.log("DB is connected succesfully...");

      app.listen(config.port, () => {
         console.log(`Application is listening on port ${config.port}`);
      });
   } catch (error) {
      console.error(error);
   }
}
connection();
