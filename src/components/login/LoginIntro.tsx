// image
import { Link } from "react-router-dom";
import pinterest from "../../styles/images/pinterest.svg";

import styles from "../../styles/login.module.scss";

export const LoginIntro = () => {
    return (
        <article id={styles.login_intro} style={{height: window.innerHeight + "px"}}>
            <header>
                <div className={styles.logo}>
                    <img src={pinterest} alt="로고" />
                    <h2><em>Pinterest</em>란 무엇인가요?</h2>
                </div>
                <div className={styles.items}>
                    <div><Link to="/login">Pinterest에 가입</Link></div>
                    <div>브라우저 버튼</div>
                    <div>언론</div>
                </div>
            </header>
            <div className={styles.intro_bg_wrap}>
                <div className={styles.intro_bg} style={{
                    background: "url(https://about.pinterest.com/sites/about/files/homepage_template_lrg_bkgd.jpg)",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
                >
                </div>
            </div>

            <div className={styles.intro_footer}>
                <div className={styles.intro_left}>
                    <h2><img src="https://about.pinterest.com/sites/all/themes/custom/pinterest/images/pinterest-footer-logo.png?e60023" alt="Pinterest" /></h2>
                    <p>© Pinterest 2022</p>
                </div>
                <div className={styles.intro_right}>
                    <div>
                        <ul>
                            <li><strong>소개</strong></li>
                            <li>Pinterest란 무엇인가요?</li>
                            <li>Pinterest 페이지</li>
                            <li>엔지니어링 블로그</li>
                            <li>브랜드 가이드라인</li>
                            <li>채용 공고</li>
                            <li>도움말 센터</li>
                            <li>Pinterest Labs</li>
                        </ul>
                        <ul>
                            <li><strong>Pinterest 정책</strong></li>
                            <li>저작권 & 상표</li>
                            <li>개인 설정 광고</li>
                            <li>서비스 약관</li>
                            <li>개인 정보 보호 & 쿠키</li>
                            <li><strong>추가 정보</strong></li>
                            <li>사업채용</li>
                            <li>개발자용</li>
                            <li>보도자료</li>
                            <li>투자자용</li>
                        </ul>
                    </div>
                </div>
            </div>
        </article>
    );
};