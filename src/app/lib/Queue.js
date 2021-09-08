import Queue from "bull";
import redis from "../../config/redis";

import * as jobs from "../jobs";

// { RegistrationMail: { key: "", handle: () =? } }

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, redis),
  name: job.key,
  handle: job.handle,
}));

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find((queue) => queue.name === name);

    return queue.bull.add(data);
  },
  process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);

      queue.bull.on("failed", (job, err) => {
        console.error(err);
        console.log("Job failed", job.name, job.data);
      });
    });
  },
};

// import RegistrationMail from "../jobs/RegistrationMail";

// const mailQueue = new Queue(RegistrationMail.key, redis);

// mailQueue.on("failed", (job, err) => {
//   console.error(err);
//   console.log("Job failed", job.name, job.data);
// });

// export default mailQueue;
