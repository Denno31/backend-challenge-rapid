import express, { Application } from 'express';
import cors from 'cors';
import tripRoutes from './routes/tripRoutes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use('/api/trips', tripRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
