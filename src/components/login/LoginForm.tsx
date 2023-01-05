// image
import pinterest from "../../styles/images/pinterest.svg";

import styles from "../../styles/login.module.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// TS
import { api } from "../../ts/api";
import { useDispatch } from "react-redux";
import { SignIn, UserDetail } from "../../ts/reducer";

// Google Login
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

interface SignProps {
    email: string,
    password: string,
    age: number
}

interface LoginProps {
    loginOrJoin: string
}

interface GoogleDecodedProps {
    aud: string,
    azp: string,
    email: string,
    email_varified: boolean,
    exp: number,
    family_name: string,
    given_name: string,
    iat: number,
    iss: string,
    jti: string,
    name: string,
    nbf: number,
    picture: string,
    sub: string
}

export const LoginForm = ({ loginOrJoin }: LoginProps) => {

    // 구글 클라이언트 아이디 정보
    const configValue = (process.env.REACT_APP_CLIENT_ID as string);

    const navigation = useNavigate();
    const dispatch = useDispatch();

    const [signForm, setSignForm] = useState<SignProps>({ email: "", password: "", age: 0 } as SignProps);

    const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value }} = e;
        
        switch(name) {
            case "email" : setSignForm({...signForm, [name]: value}); break;

            case "password" : setSignForm({...signForm, [name]: value}); break;

            case "age" : setSignForm({...signForm, [name]: Number(value)}); break;

            default : return;
        }
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loginOrJoin === "login") {
            api.post("/user/login", signForm)
            .then(async res => {
                if (res.data.code === "n") return alert(res.data.message);
                else {
                    alert(res.data.message);
                    localStorage.setItem("@pinterest_email", res.data.data[0].email);
                    localStorage.setItem("@pinterest_token", res.data.data[0]._id);
                    if (res.data.detail) dispatch(UserDetail(res.data.detail[0]));
                    dispatch(SignIn(res.data.data[0]));
                    navigation("/");
                }


            })
            .catch(err => console.log("Login Err", err));

        } else if (loginOrJoin === "join") {

            if (signForm.password.length < 8) return alert("비밀번호는 8자 이상입니다.");
            else if (signForm.age === 0) return alert("나이를 입력해주세요.");

            api.post("/user/create", signForm)
            .then(res => {
                if (res.data.code === "y") {
                    localStorage.setItem("@pinterest_email", res.data.data[0].email);
                    localStorage.setItem("@pinterest_token", res.data.data[0]._id);
                    dispatch(SignIn(res.data.data[0]));
                    navigation("/");
                }
            })
            .catch(err => console.log("Join Err", err));
        }
    }

    // 구글 로그인
    const onGoogleLogin = async (res: CredentialResponse) => {
        if (res.clientId === undefined) return alert("구글정보가 맞는지 확인해주세요.");
        const decoded: GoogleDecodedProps = jwtDecode(JSON.stringify(res));
        // jti : JWT ID JWT토큰의 고유 ID
        const googleData = {
            jti: decoded.jti,
            email: decoded.email,
            gender: "비공개",
            age: 1
        }

        api.post("/user/social", googleData)
        .then(res => {
            console.log(res.data.data);
            localStorage.setItem("@pinterest_email", decoded.email);
            localStorage.setItem("@pinterest_token", res.data.data[0]._id);
            if (res.data.detail) dispatch(UserDetail(res.data.detail[0]));
            dispatch(SignIn(res.data.data[0]));
            navigation("/");
        })


    }

    return (
        <article id={styles.login_form}>
            <div className={styles.login_form_wrap}>
                <form onSubmit={onSubmit}>
                    <div className={styles.form_logo_wrap}>
                        <img src={pinterest} alt="pinterest" />
                    </div>
                    <h2>Pinterest에 오신 것을 환영합니다.</h2>
                    <p>시도해 볼 만한 새로운 아이디어 찾기</p>

                    <div className={styles.form_contents}>
                        <div className={styles.input_wrap}>
                            <h5>이메일</h5>
                            <input type="email" name="email" value={signForm.email} onChange={formChange} placeholder="이메일" />
                        </div>

                        <div className={styles.input_wrap}>
                            <h5>비밀번호</h5>
                            <input type="password" name="password" value={signForm.password} onChange={formChange} placeholder="비밀번호" />
                        </div>

                        <div className={styles.input_wrap}>
                            <h5>나이</h5>
                            <input type="number" name="age" value={signForm.age} onChange={formChange} placeholder="나이" />
                        </div>

                        <div className={styles.button_wrap}>
                            <button className={styles.button_color_pin}>계속하기</button>
                        </div>
                    </div>
                </form>
                <div className={styles.button_wrap}>
                    <div className={styles.button_line}>또는</div>
                    <button className={styles.button_color_facebook}><img src="https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/U7MAWJlE6hZ.png" alt="facebook" />Facebook으로 계속하기</button>
                    <button className={styles.button_color_google}>
                        <GoogleOAuthProvider clientId={configValue}>
                            <GoogleLogin onSuccess={credentialResponse => { onGoogleLogin(credentialResponse) }} onError={() => console.log("ERR")}></GoogleLogin>
                        </GoogleOAuthProvider>
                    </button>
                </div>

                <div className={styles.text_wrap}>
                    계속 진행하면 Pinterest <strong>서비스 약관</strong>에 동의하고<br />
                    <strong>개인정보 보호정책</strong>을 읽었음을 인정하는 것으로 간주됩니다.<br />
                    <strong>컬렉션 알림.</strong>

                    <div>이미 회원이신가요? <em>로그인하기</em></div>
                </div>
            </div>
        </article>
    );
}