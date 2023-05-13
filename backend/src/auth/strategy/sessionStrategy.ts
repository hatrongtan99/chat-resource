import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionStrategy extends PassportSerializer {
    constructor() {
        super();
    }

    serializeUser(user: any, done: Function) {
        console.log('serializerUser:::: ', user);
        done(null, user);
    }

    deserializeUser(payload: any, done: Function) {
        console.log('deserializerUser::::', payload);
        done(null, payload);
    }
}
