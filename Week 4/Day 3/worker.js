const { Worker } = require("bullmq");

const worker = new Worker(
  "emailQueue",
  async (job) => {
    console.log("Processing Job");
    console.log(job.data);

    return true;
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);

worker.on("completed", () => {
  console.log("Job Completed");
});