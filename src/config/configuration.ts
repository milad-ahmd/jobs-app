export default () => ({
  port: process.env.PORT || 3000,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    name: process.env.DB_DATABASE || 'jobsdb',
  },
  cronSchedule: process.env.CRON_SCHEDULE || '0 * * * *', // Default: once per hour
});
