import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [/localhost/],
    credentials: true
  });
  await app.listen(process.env.PORT || 4000);
  console.log(`🚀 API démarrée sur http://localhost:${process.env.PORT || 4000}`);
}

void bootstrap();
