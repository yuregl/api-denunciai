import "reflect-metadata"
import dotenv from "dotenv";

import { exportApp } from './routes/index';
import { startDatabase } from './database/index';

dotenv.config();

async function start() {
  await startDatabase();
  const port = process.env.PORT;
  const app = await exportApp();

  app.listen(port, () => {
    console.log(`Server is running in port http://localhost:${port}`);
  })
}

start()

