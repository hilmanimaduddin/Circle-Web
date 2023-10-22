// import { AppDataSource } from "../data-source";
// import { v2 as cloudinary } from "cloudinary";
// import * as amqp from "amqplib";
// import ThreadWorker from "./ThreadWorker";
// import "dotenv/config";

// class WorkerHub {
//   constructor() {
//     AppDataSource.initialize()
//       .then(async () => {
//         cloudinary.config({
//           cloud_name: process.env.CLOUD_NAME,
//           api_key: process.env.API_KEY,
//           api_secret: process.env.API_SECRET,
//         });

//         const connection = await amqp.connect("amqp://localhost");

//         ThreadWorker.create("threads-queue", connection);
//       })
//       .catch((error) => console.log(error));
//   }
// }

// export default new WorkerHub();
