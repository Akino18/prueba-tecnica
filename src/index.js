import express from 'express';
import userRoutes from './routes/users.routes.js';
import morgan from 'morgan';
const app = express();

app.listen(3000)
app.use(morgan('dev'));
app.use(express.json());
app.use(userRoutes)

console.log('Server started on port 3000');