import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as dotenv from "dotenv";

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    credentials: true,
    origin: "*",
  });
  const PORT = process.env.PORT || 3001;
  await app.listen(PORT, () => {
    console.log();
    console.log(`App is Running on http://localhost:${PORT}/`);
  });
}
bootstrap();
