require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    dialect: 'postgres',
    // migrationsStorage is use to store migration files
    migrationStorage: 'sequelize',
    // migrationStorageTableName is use a different table name
    migrationStorageTableName: 'SequelizeMigrations',
    // seederStorage is use to store seeder files
    seederStorage: 'sequelize',
    // seederStorageTableName is use a different table name
    seederStorageTableName: 'SequelizeSeeders',
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    dialect: 'postgres',
    migrationStorage: 'sequelize',
    migrationStorageTableName: 'SequelizeMigrations',
    seederStorage: 'sequelize',
    seederStorageTableName: 'SequelizeSeeders',
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    dialect: 'postgres',
    migrationStorage: 'sequelize',
    migrationStorageTableName: 'SequelizeMigrations',
    seederStorage: 'sequelize',
    seederStorageTableName: 'SequelizeSeeders',
  },
};
