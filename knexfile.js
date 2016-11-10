module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'color_encoder',
    },
  },
  test: {
    client: 'postgresql',
    connection: {
      database: 'color_encoder',
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: true
    },
  },
};
