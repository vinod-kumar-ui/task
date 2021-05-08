import { ADD_USER, UPDATE_CHAT, ACTIVE_USER, BIND_USERS, bindUsers } from './actions';

const initialState = {
    users: [],
    activeUser: null
};

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, payload]
            } 
            break;
            case UPDATE_CHAT:
            return {
                ...state,
                users: state.users.map(user => ({...user, chat: (() => {
                    if(payload.id === user.id) {
                        return user.chat ? [...user.chat,{
                            ...payload
                        }] : [{
                            ...payload
                        }]
                    }else {
                        return user.chat ? user.chat : []
                    }
                })()}))
            } 
            break;
            case ACTIVE_USER:
                return {
                    ...state,
                    activeUser: payload.id
                }
                break;
            case BIND_USERS: 
            return {
                ...state,
                users: payload.data
            }
    
        default:
            break;
    }
}

export function getUsers() {
    return async (dispatch) => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const json = await res.json();
            dispatch(bindUsers({
                data: json
            }))
        } catch (error) {
            console.log(error);
        }
    }
  }