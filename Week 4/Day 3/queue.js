const { Queue } = require("bullmq");

const queue = new Queue("emailQueue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

async function addJob() {
  await queue.add("sendEmail", {
    email: "test@gmail.com",
  });

  console.log("Job Added");
}

addJob();