import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from 'nestjs-redoc';
import * as helmet from 'helmet';
import * as hood from 'hood';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder().setTitle('Bless Wheels').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, options);
  const redocOptions: RedocOptions = {
    title: 'Bless Wheels API Docs',
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
  };
  await RedocModule.setup('/api', app, document, redocOptions);

  app.use(helmet());
  app.use(hood());
  app.use(hood.header({}));
  app.enableCors();

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, '0.0.0.0');
}

bootstrap();
