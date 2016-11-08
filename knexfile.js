module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'color_encoder',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      // user: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      database: 'color_encoder',
      ssl: true
    },
  },
};
