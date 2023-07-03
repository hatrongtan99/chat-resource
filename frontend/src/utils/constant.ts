export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const LIMIT_MESSAGES_PER_REQUEST = 10;
export const LIMIT_ATTACHMENTS = 5;

export enum FriendSocketEvent {
    FRIEND_NEW_REQUEST = "friend.new-request",
    FRIEND_ACCEPTED_REQUEST = "friend.accepted-request",
    FRIEND_GET_FRIENDS_ONLINE = "friend.get-online-friends",
}

export enum MessageSocket {
    MESSAGE_JOIN_CONVERSATION = "message.private.join-conversation",
    MESSAGE_LEAVE_CONVERSATION = "message.private.leave-conversation",

    MESSAGE_IS_TYPING_START = "message.private.is-typing-start",
    MESSAGE_IS_TYPING_STOP = "message.private.is-typing-stop",
    MESSAGE_ON_TYPING_START = "message.on-typing-start",
    MESSAGE_ON_TYPING_STOP = "message.on-typing-stop",
    MESSAGE_PRIVATE_CREATE_NEW = "message.private.crete-new",
    MESSAGE_PRIVATE_ON_MESSAGE = "message.private.on-message",

    MESSAGE_PRIVATE_ON_DELETE = "message.private.on-delete-message",
}

export enum GroupSocket {
    GROUP_NEW = "group.new-group",
    GROUP_ADD_FRIEND = "group.add-friend",
    GROUP_FRIEND_BE_ADDED = "group.friend-be-added",
    GROUP_KICK_FRIEND = "group.kick-friend",
    GROUP_FRIEND_KICKED = "group.friend-kicked",
    GROUP_ONE_FRIEND_OUT_GROUP = "group.one-friend-out-group",
    GROUP_TRANFER_OWNER = "group.tranfer-owner",
}

export enum GroupMessageSocket {
    GROUP_MESSAGE_ON_NEW = "group.message.new-group-message",
    GROUP_MESSAGE_JOIN_GROUP = "group.message.join-group",
    GROUP_MESSAGE_LEAVE_GROUP = "group.message.leave-group",

    // status typing
    GROUP_ON_TYPING_START = "group.on-orther-typing-start",
    GROUP_ON_TYPING_STOP = "group.on-orther-typing-stop",
    GROUP_IS_ORTHER_TYPING_START = "group.is-orther-typing-start",
    GROUP_IS_ORTHER_TYPING_STOP = "group.is-orther-typing-stop",
}
