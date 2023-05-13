import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

const PORT = process.env.PORT;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    app.use(
        session({
            secret: 'test',
            name: 'session-chat',
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(PORT);
    console.log(`server running on PORT: ${PORT}`);
}
bootstrap();
