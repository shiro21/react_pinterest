import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

// component
import { Login } from './Login';
import { LoginIntro } from './LoginIntro';

export const LoginRouter = () => {

    const auth: any = useSelector<Record<string, number>>(state => state.reducer);
    const navigation = useNavigate();

    useEffect(() => {
        if (auth._id === localStorage.getItem("@pinterest_token")) {
            navigation("/");
        }
    }, [auth, navigation])
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/intro" element={<LoginIntro />} />
        </Routes>
    );
}