export const Auth = "SignIn";
export const SUpdate = "SignUpdate";
export const UDetail = "UserDetail";
export const Logout = "Logout";
export const SignIn = (state: Object) => ({ type: Auth, state });
export const SignUpdate = (state: Object) => ({ type: SUpdate, state });
export const UserDetail = (state: Object) => ({ type: UDetail, state });
export const SignOut = (state: Object) => ({ type: Logout, state });

export interface AuthProps {
    state: {
        _id: string,
        createdAt: string,
        _detail: string,
        email: string,
        age: number,
        profile: string
    },
    type: string
}

export interface DetailProps {
    state: {
        _id: string,
        _uid: string,
        gender: string,
        interest: string[]
    },
    type: string
}

export interface UserProps {
    _id: string,
    createdAt: string,
    _detail: string,
    email: string,
    age: number,
    profile: string
}

export interface ReducerProps {
    reducer: {
        _id: string,
        createdAt: string,
        _detail: string,
        email: string,
        age: number,
        profile: string
    }
}

export interface ReducerDetailProps {
    reducerDetail: {
        _id: string,
        _uid: string,
        gender: string,
        interest: string[]
    }
}

export interface UserDetailProps {
    _id: string,
    _uid: string,
    gender: string,
    interest: string
}

const initalState = {
    _id: "",
    createdAt: "",
    _detail: "",
    email: "",
    age: 0,
    profile: ""
};

const initalDetailState = {
    _id: "",
    _uid: "",
    gender: "",
    interest: ""
}

export const reducer = (state = initalState, action: AuthProps) => {

    switch(action.type) {
        case Auth :
            return {
                ...state,
                _id: action.state._id,
                createdAt: action.state.createdAt,
                _detail: action.state._detail,
                email: action.state.email,
                age: action.state.age,
                profile: action.state.profile
            }

        case SUpdate :
            return {
                ...state,
                _id: action.state._id,
                createdAt: action.state.createdAt,
                _detail: action.state._detail,
                email: action.state.email,
                age: action.state.age,
                profile: action.state.profile
            }
        
        case Logout :
            console.log('로그아웃');
            // let { _id, createdAt, email, age, profile } = action.state

            // storage.removeItem(action.state._id);

            return {
                ...state,
                _id: "",
                createdAt: "",
                _detail: "",
                email: "",
                age: 0,
                profile: null,
            }
        
        default :
            return state;
    }
}

export const reducerDetail = (state = initalDetailState, action: DetailProps) => {
    switch(action.type) {
        case UDetail :
            return {
                ...state,
                _id: action.state._id,
                _uid: action.state._uid,
                gender: action.state.gender,
                interest: action.state.interest
            }
        
        default :
            return state;
    }
}