// image
import pinterest from "../../styles/images/pinterest.svg";
import google from "../../styles/images/google.svg";

import styles from "../../styles/login.module.scss";

// interface LoginBottomProps {
//     innerHeight: number
// }

export const LoginBottom = () => {

    const imageArray = [
        "https://i.pinimg.com/236x/c4/57/bd/c457bd9496170bfa3845b7cee775df65.jpg",
        "https://i.pinimg.com/236x/05/65/20/05652045e57af33599557db9f23188c0.jpg",
        "https://i.pinimg.com/236x/c5/83/53/c58353e15f32f3cbfc7cdcbcf0dc2f34--mango-coulis-m-sorry.jpg",
        "https://i.pinimg.com/564x/94/43/b9/9443b93bd8773fec91bc1837e8424e8e.jpg",
        "https://i.pinimg.com/564x/e6/8a/42/e68a42c2e530fbdf6b3ab2f379dcd384.jpg",
    ]

    return (
        <article id={styles.login_bottom} style={{height: window.innerHeight+"px"}}>
            <div className={styles.bottom_background_wrap}>
                <div className={styles.bottom_background_items}>
                    <div className={styles.botton_background_item}>
                        {
                            imageArray.map((item, index) => (
                                <div key={index}>
                                    <img src={item} alt="이미지" />
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.botton_background_item}>
                        {
                            imageArray.map((item, index) => (
                                <div key={index}>
                                    <img src={item} alt="이미지" />
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.botton_background_item}>
                        {
                            imageArray.map((item, index) => (
                                <div key={index}>
                                    <img src={item} alt="이미지" />
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.botton_background_item}>
                        {
                            imageArray.map((item, index) => (
                                <div key={index}>
                                    <img src={item} alt="이미지" />
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.botton_background_item}>
                        {
                            imageArray.map((item, index) => (
                                <div key={index}>
                                    <img src={item} alt="이미지" />
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.botton_background_item}>
                        {
                            imageArray.map((item, index) => (
                                <div key={index}>
                                    <img src={item} alt="이미지" />
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.botton_background_item}>
                        {
                            imageArray.map((item, index) => (
                                <div key={index}>
                                    <img src={item} alt="이미지" />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className={styles.bottom_bg_color} style={{height: window.innerHeight}}>
                
                <div className={styles.bottom_wrap}>
                    <div className={styles.bottom_left}>
                        <div className={styles.center_wrap}>
                            <h2>가입하여 더 많은 아이디어를 만나보세요.</h2>
                        </div>
                    </div>
                    <div className={styles.bottom_right}>
                        <div className={styles.bottom_form_wrap}>
                            <form>
                                <div className={styles.form_logo_wrap}>
                                    <img src={pinterest} alt="pinterest" />
                                </div>
                                <h2>Pinterest에 오신 것을 환영합니다.</h2>
                                <p>시도해 볼 만한 새로운 아이디어 찾기</p>

                                <div className={styles.form_contents}>
                                    <div className={styles.input_wrap}>
                                        <h5>이메일</h5>
                                        <input type="text" placeholder="이메일" />
                                    </div>

                                    <div className={styles.input_wrap}>
                                        <h5>비밀번호</h5>
                                        <input type="password" placeholder="비밀번호" />
                                    </div>

                                    <div className={styles.input_wrap}>
                                        <h5>나이</h5>
                                        <input type="number" placeholder="나이" />
                                    </div>

                                    <div className={styles.button_wrap}>
                                        <button className={styles.button_color_pin}>계속하기</button>
                                        <div className={styles.button_line}>또는</div>
                                        <button className={styles.button_color_facebook}><img src="https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/U7MAWJlE6hZ.png" alt="facebook" />Facebook으로 계속하기</button>
                                        <button className={styles.button_color_google}><img src={google} alt="구글" />Google로 계속하기</button>
                                    </div>

                                    <div className={styles.text_wrap}>
                                        계속 진행하면 Pinterest <strong>서비스 약관</strong>에 동의하고<br />
                                        <strong>개인정보 보호정책</strong>을 읽었음을 인정하는 것으로 간주됩니다.<br />
                                        <strong>컬렉션 알림.</strong>

                                        <div>이미 회원이신가요? <em>로그인하기</em></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <footer>
                    <div>서비스 약관</div>
                    <div>개인정보 보호정책</div>
                    <div>도움말</div>
                    <div>iPhone 앱</div>
                    <div>Android 앱</div>
                    <div>사용자</div>
                    <div>컬렉션</div>
                    <div>오늘</div>
                    <div>탐색</div>
                </footer>
            </div>

        </article>
    );
};