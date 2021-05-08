export const ADD_USER = "Add User";
export const UPDATE_CHAT = "Update Chat";
export const ACTIVE_USER = "Active User";
export const BIND_USERS = "Bind Users";

export const addUser = (payload) => ({
    type: ADD_USER,
    payload
});

export const updateChat = (payload) => ({
    type: UPDATE_CHAT,
    payload
});

export const activeUser = (payload) => ({
    type: ACTIVE_USER,
    payload
});

export const bindUsers = (payload) => ({
    type: BIND_USERS,
    payload
});
