const { REDIS_HOST, REDIS_PORT, REDIS_PASS } = process.env;

export default {
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASS,
  },
};
