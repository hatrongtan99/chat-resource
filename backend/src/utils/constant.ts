export enum Routes {
    AUTH = 'auth',
    USERS = 'users',
    PROFILE = 'profile',
    FRIENDS = 'friends',
    CONVERSATIONS = 'conversations',
    MESSAGES = 'messages',
    GROUP = 'groups',
    GROUP_MESSAGE = 'groups/message',
}

export const SECRET_JWT_ASCCESS_TOKEN = 'SECRET_JWT_ASCCESS_TOKEN';
export const SECRET_JWT_REFRESH_TOKEN = 'SECRET_JWT_REFRESH_TOKEN';

export const CLIENT_GOOGLE_ID = 'CLIENT_GOOGLE_ID';
export const CLIENT_GOOGLE_SECRET = 'CLIENT_GOOGLE_SECRET';
export const CALBACK_URL_AUTH =
    'http://localhost:8080/api/auth/social/callback';

export const CLOUDINARY_NAME = 'CLOUDINARY_NAME';
export const CLOUDINARY_API_KEY = 'CLOUDINARY_API_KEY';
export const CLOUDINARY_API_SECRET = 'CLOUDINARY_API_SECRET';

// events
export enum EventFriends {
    CREATE_FRIEND_REQUEST = 'friend.createRequest',
    ACCEPT_FRIEND_REQUEST = 'friend.accepted',
}

export enum EventMessagePrivate {
    CREATE_NEW_MESSAGE = 'message.private.new-message',
    DELETE_MESSAGE = 'message.private.delete-message',
}

export enum EventGroup {
    CREATE_NEW_GROUP = 'group.new-group',
    ADD_FRIEND_TO_GROUP = 'group.add-friend-to-group',
    KICK_OUT_FRIEND_FROM_GROUP = 'group.kick-out-friend-from-group',
    TRANFER_OWNER = 'group.tranfer-owner',
    OUT_FROM_GROUP = 'group.out-from-group',
}

export enum EventGroupMessage {
    CREATE_NEW_GROUP_MESSAGE = 'group.message.new-group-message',
}

// websocket
export enum GatewayFriends {
    FRIEND_NEW_REQUEST = 'friend.new-request',
    FRIEND_ACCEPTED_REQUEST = 'friend.accepted-request',
    FRIEND_GET_FRIENDS_ONLINE = 'friend.get-online-friends',
}

export enum GatewayMessagePrivate {
    MESSAGE_JOIN_CONVERSATION = 'message.private.join-conversation',
    MESSAGE_LEAVE_CONVERSATION = 'message.private.leave-conversation',

    MESSAGE_IS_TYPING_START = 'message.private.is-typing-start',
    MESSAGE_IS_TYPING_STOP = 'message.private.is-typing-stop',
    MESSAGE_ON_TYPING_START = 'message.on-typing-start',
    MESSAGE_ON_TYPING_STOP = 'message.on-typing-stop',
    MESSAGE_PRIVATE_CREATE_NEW = 'message.private.crete-new',
    MESSAGE_PRIVATE_ON_MESSAGE = 'message.private.on-message',

    MESSAGE_PRIVATE_ON_DELETE = 'message.private.on-delete-message',
}

export enum GatewayGroup {
    GROUP_NEW = 'group.new-group',
    GROUP_ADD_FRIEND = 'group.add-friend',
    GROUP_FRIEND_BE_ADDED = 'group.friend-be-added',
    GROUP_KICK_FRIEND = 'group.kick-friend',
    GROUP_FRIEND_KICKED = 'group.friend-kicked',
    GROUP_ONE_FRIEND_OUT_GROUP = 'group.one-friend-out-group',
    GROUP_TRANFER_OWNER = 'group.tranfer-owner',
}

export enum GatewayGroupMessage {
    GROUP_MESSAGE_ON_NEW = 'group.message.new-group-message',
    GROUP_MESSAGE_JOIN_GROUP = 'group.message.join-group',
    GROUP_MESSAGE_LEAVE_GROUP = 'group.message.leave-group',

    // status typing
    GROUP_ON_ORTHER_TYPING_START = 'group.on-orther-typing-start',
    GROUP_ON_ORTHER_TYPING_STOP = 'group.on-orther-typing-stop',
    GROUP_IS_TYPING_START = 'group.is-typing-start',
    GROUP_IS_TYPING_STOP = 'group.is-typing-stop',
}
