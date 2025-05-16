import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ✅ Now you can use Express methods
  app.set('trust proxy', true);

  app.enableCors({
    origin: 'https://gqcfm0w7-3001.inc1.devtunnels.ms', // ✅ Only allow your frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  // Optional: Uncomment if you're using middleware for logging IPs
  // app.use(IpLoggerMiddleware);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
