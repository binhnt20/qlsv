import { SwaggerCustomOptions } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

interface ISwaggerConfig {
  title: string;
  description: string;
  version: string;
  apiKey: SecuritySchemeObject;
  apiKeyName: string;
}

export const SWAGGER_CONFIG: ISwaggerConfig = {
  title: 'NestJS Demo Quan Ly Sinh Vien',
  description: 'Demo Quan Ly Sinh Vien',
  version: 'neutral',
  apiKey: {
    type: 'apiKey',
    name: 'header-auth-key',
    description: 'enter token or by-passs',
  },
  apiKeyName: 'token',
};

export const swaggerOptions: SwaggerCustomOptions = {
  customSiteTitle: 'Demo Quan Ly Sinh Vien',
  customfavIcon: '',
};
