import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  const port = Number(process.env.PORT ?? 3000);

  await app.listen(port, '0.0.0.0');

  console.log(`Server running on port ${port}`);
}

bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});