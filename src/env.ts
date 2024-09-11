import 'dotenv/config';

const env = {
  PORT: process.env.PORT || 3000,
  DB_CONNECTION_URL: process.env.DB_CONNECTION_URL,
};

export default env;
