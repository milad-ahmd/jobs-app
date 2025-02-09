import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('database.host') || process.env.DB_HOST,
  port:
    configService.get<number>('database.port') ||
    parseInt(process.env.DB_PORT || '5432', 10),
  username:
    configService.get<string>('database.username') || process.env.DB_USERNAME,
  password:
    configService.get<string>('database.password') || process.env.DB_PASSWORD,
  database:
    configService.get<string>('database.name') || process.env.DB_DATABASE,
  entities: [`${__dirname}/**/*.entity.{js,ts}`],
  synchronize: true, // Do NOT use synchronize in production
});
