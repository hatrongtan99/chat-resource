import { Injectable } from '@nestjs/common';
import { AuthenticateSocket } from './types';

@Injectable()
export class SocketClientManager {
    private socketClientStore = new Map<number, AuthenticateSocket>();

    setSocketClient(userId: number, socket: AuthenticateSocket) {
        this.socketClientStore.set(userId, socket);
    }

    getSocketClient(userId: number) {
        return this.socketClientStore.get(userId);
    }

    removeSocketClient(userId: number) {
        this.socketClientStore.delete(userId);
    }

    getSockets() {
        return this.socketClientStore;
    }

    hasSocketClient(userId: number) {
        return this.socketClientStore.has(userId);
    }
}
