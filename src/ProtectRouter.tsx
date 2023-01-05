import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {

    const auth: any = useSelector<Record<string, number>>(state => state.reducer);

    let login;

    // console.log(auth._id);
    if (auth._id === localStorage.getItem("@pinterest_token")) {
        login = true;
    } else {
        login = false;
    }

    const user = { loggedIn: login };

    return user && user.loggedIn;
}

export const ProtectRouter = () => {
    const isAuth = useAuth();

    return isAuth ? <Outlet /> : <Navigate to="/login" />;
}