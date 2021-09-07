import Queue from "bull";
import redis from "../../config/redis";

import RegistrationMail from "../jobs/RegistrationMail";

const mailQueue = new Queue(RegistrationMail.key, redis);

export default mailQueue;
