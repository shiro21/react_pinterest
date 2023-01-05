// image
import pinterest from "../../styles/images/pinterest.svg";
import downSolid from "../../styles/images/down-solid.svg";

import styles from "../../styles/login.module.scss";
import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

const useInterval = (callback: any, delay: number) => {

    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay])
};

interface loginFormProps {
    setLoginFormOpen: Dispatch<SetStateAction<boolean>>
    setLoginOrJoin: Dispatch<SetStateAction<string>>
}

export const LoginHeader: React.FunctionComponent<loginFormProps> = ({setLoginFormOpen, setLoginOrJoin}) => {

    const [dot, setDot] = useState(0);
    const textArray = [
        "집안 꾸미기 아이디어를 찾아보세요.",
        "새로운 패션을 찾아보세요.",
        "정원 가꾸기 아이디어를 찾아보세요.",
        "저녁 식사 메뉴 아이디어를 찾아보세요."
    ];
    // const [dotText, setDotText] = useState(textArray[0]);
    const dotArray = [0, 1, 2, 3];

    const loginForm = (list: string) => {
        setLoginFormOpen(true);
        setLoginOrJoin(list);
    }

    useInterval(() => {
        // setDotText(textArray[dot]);
        setDot(dot => dot + 1);

        if (dot >= 3) setDot(0);
    }, 5000 )

    const dotChange = (dot: number) => {
        setDot(dot);
    }

    return (
        <article id={styles.header}>
            <header className={styles.header}>
                <div className={styles.item_left}>
                    <h1>
                        <img src={pinterest} alt="Pinterest" />
                        <em>Pinterest</em>
                    </h1>
                </div>

                <div className={styles.item_right}>
                    <ul>
                        <li><Link to="/login/intro" target="_blank">소개</Link></li>
                        <li>비즈니스</li>
                        <li>언론</li>
                    </ul>

                    <div className={styles.item_button}>
                        <button onClick={() => loginForm("login")}>로그인</button>
                        <button onClick={() => loginForm("join")}>가입하기</button>
                    </div>
                </div>
            </header>

            <div className={styles.main_title_wrap}>
                <div className={styles.main_title}>
                    다음
                </div>
                {/* 백그라운드 */}
                <div className={styles.main_background}>
                    <ul>
                        {
                            dotArray.map(item => (
                                <li key={item}>
                                    {
                                        (function() {
                                            if (item === dot) return (
                                                <div className={styles.image_wrap}>
                                                    <div className={styles.image_item}>
                                                        <div><img src="https://i.pinimg.com/550x/a7/87/20/a78720c39a39ac50a2856420d636d113.jpg" alt="tata" /></div>
                                                        <div><img src="https://i.pinimg.com/550x/a7/87/20/a78720c39a39ac50a2856420d636d113.jpg" alt="tata" /></div>
                                                        <div><img src="https://i.pinimg.com/550x/a7/87/20/a78720c39a39ac50a2856420d636d113.jpg" alt="tata" /></div>
                                                        <div><img src="https://i.pinimg.com/550x/a7/87/20/a78720c39a39ac50a2856420d636d113.jpg" alt="tata" /></div>
                                                        <div><img src="https://i.pinimg.com/550x/a7/87/20/a78720c39a39ac50a2856420d636d113.jpg" alt="tata" /></div>
                                                        <div><img src="https://i.pinimg.com/550x/a7/87/20/a78720c39a39ac50a2856420d636d113.jpg" alt="tata" /></div>
                                                        <div><img src="https://i.pinimg.com/550x/a7/87/20/a78720c39a39ac50a2856420d636d113.jpg" alt="tata" /></div>
                                                    </div>
                                                </div>
                                                
                                            )
                                        })()
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {/* 바뀌는 타이틀 */}
                <div className={styles.main_sub_title}>
                    <ul>
                        {
                            dotArray.map(item => (
                                <li key={item}>
                                    {
                                        (function() {
                                            if (item === dot) return (
                                                <div>{textArray[item]}</div>
                                            )
                                        })()
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {/* 클릭시 바뀌는 버튼 */}
                <div className={styles.main_sub_button}>
                    <ul>
                        {
                            dotArray.map(dots => (
                                <li key={dots}>
                                    <button onClick={() => dotChange(dots)} className={dot === dots ? styles.button_color : ''}></button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            <div className={styles.next_page_wrap}>
                <span><img src={downSolid} alt="다음페이지" /></span>
                <div>방식은 다음과 같습니다 <img src={downSolid} alt="다음페이지" /></div>
            </div>
        </article>
    );
};