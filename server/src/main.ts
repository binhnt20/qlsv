import { useContainer } from 'class-validator';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  VersioningType,
  VERSION_NEUTRAL,
  ValidationPipe,
} from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import { AppModule } from './modules/app.module';
import { swaggerOptions } from './swagger/swagger.config';
import { createDocument } from './swagger/swagger';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import * as colors from 'colors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new transports.DailyRotateFile({
          filename: `logs/error/%DATE%-error.log`,
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          format: format.combine(format.timestamp(), format.json()),
          zippedArchive: false,
          maxFiles: '2d',
          maxSize: '20m',
        }),
        new transports.DailyRotateFile({
          filename: `logs/debug/%DATE%-debug.log`,
          level: 'debug',
          datePattern: 'YYYY-MM-DD',
          format: format.combine(format.timestamp(), format.json()),
          zippedArchive: false,
          maxFiles: '2d',
          maxSize: '20m',
        }),
        new transports.Console({
          format: format.combine(
            format.ms(),
            format.timestamp(),
            format.colorize({ all: true }),
            format.printf(
              ({ context, level, timestamp, message, ms, stack }) => {
                const time = new Date(timestamp).toLocaleString();
                let log = `[${level}] - ${time}\t [${colors.yellow(
                  context,
                )}] ${message} ${colors.yellow(ms)}`;
                if (stack) log += ` \n ${colors.red(stack.toString())}`;
                return log;
              },
            ),
          ),
        }),
      ],
    }),
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });
  app.setGlobalPrefix(process.env.API_ENDPOINT_PREFIX || 'api');
  app.use(
    json({
      limit: '120mb',
    }),
  );
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  SwaggerModule.setup(
    `${process.env.API_ENDPOINT_PREFIX || 'api'}/docs`,
    app,
    createDocument(app),
    swaggerOptions,
  );

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.PORT || 3000);
  console.log(`API listen at port: ${process.env.PORT || 3000}`);
}

bootstrap();
