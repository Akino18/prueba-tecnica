import pg from 'pg';

export const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'livewire',
  password: 'postgres',
  port: 5432,
});

