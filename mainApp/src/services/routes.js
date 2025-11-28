export const routes = {
    // Usuario
    REGISTER_USER: "/users/register",
    LOGIN_USER: "/users/login",
    FIND_USER: "/users/findUser",
    LOGOUT_USER: "/users/logout",
    GET_USER: "/users/authme",

    // Consultor
    REGISTER_CONSULTANT: "/consultor/register",
    LOGIN_CONSULTANT: "/consultor/login",
    FIND_CONSULTANT: "/consultor/findConsultor",
    LOGOUT_CONSULTANT: "/consultor/logout",
    GET_CONSULTANT: "/consultor/authme",

    // Donacion
    REGISTER_DONATION: "/payment/mp-preference",

    // Diario
    UPLOAD_DIARY: "/diary/create",

    // Emocional
    CHANGE_EMOTION: "/emotional/state",
    GET_EXERCISES: "/emotional/exercises",
    UPLOAD_IMAGE: "/image/upload",
    GET_DASHBOARD: "/follow",

    // Salas
    GET_WAITINGROOM_USERS: "waiting-room/users",
    GET_WAITINGROOM_LIST_USERS: "waiting-room/list-users",
    CREATE_ROOM: "/room/chat",
    JOIN_ROOM: (roomId) => `/room/chat/${roomId}`,

}