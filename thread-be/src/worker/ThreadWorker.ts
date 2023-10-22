// import * as amqp from "amqplib";
// // import { v2 as cloudinary } from "cloudinary";
// import { v2 as cloudinary } from "cloudinary";
// import { AppDataSource } from "../data-source";
// import { Thread } from "../entities/Thread";
// import { env } from "process";
// import { Repository } from "typeorm";

// class ThreadWorker {
//   private readonly threadRepository: Repository<Thread> =
//     AppDataSource.getRepository(Thread);

//   async create(queueName: string, connection: amqp.Connection) {
//     try {
//       const channel = await connection.createChannel();
//       console.log("Connected to RabbitMQ");

//       await channel.assertQueue(queueName);
//       await channel.consume(queueName, async (message) => {
//         if (message !== null) {
//           try {
//             const payload = JSON.parse(message.content.toString());

//             console.log("Received message : ", payload);

//             cloudinary.config({
//               cloud_name: process.env.CLOUD_NAME,
//               api_key: process.env.API_KEY,
//               api_secret: process.env.API_SECRET,
//             });

//             const cloudinaryResponse = await cloudinary.uploader.upload(
//               "../../uploads/" + payload.image
//             );

//             console.log("Cloudinary response : ", cloudinaryResponse);

//             const thread = this.threadRepository.create({
//               content: payload.content,
//               image: cloudinaryResponse.secure_url,
//               user: {
//                 id: payload.user_id,
//               },
//             });

//             console.log("Thread : ", thread);

//             const createData = await AppDataSource.getRepository(Thread).save(
//               thread
//             );

//             console.log({ Note: "Thread is created..", Data: createData });
//             channel.ack(message);
//           } catch (err) {
//             console.log("Process queue is failed : ", err);
//           }
//         }
//       });
//     } catch (err) {
//       console.log("Error prosessing queue : ", err);
//     }
//   }
// }

// export default new ThreadWorker();
