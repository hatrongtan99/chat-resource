import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { WebSocketAdapter } from './gateway/gateway.adapter';

const PORT = process.env.PORT;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        credentials: true,
        origin: ['http://localhost:3000'],
    });
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
    app.use(cookieParser('secret'));

    app.useWebSocketAdapter(new WebSocketAdapter(app));
    app.use(
        session({
            secret: 'secret',
            name: 'session-chat',
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    await app.listen(PORT);
    console.log(`server running on PORT: ${PORT}`);
}
bootstrap();
