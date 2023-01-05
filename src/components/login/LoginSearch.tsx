// image
import search from "../../styles/images/search-solid.svg";
import styles from "../../styles/login.module.scss";

export const LoginSearch = () => {
    return (
        <article id={styles.search}>
            <div className={styles.search_left}>
                <div className={styles.search_image_wrap}>
                    <div className={styles.search_image1}>
                        <img src="https://s.pinimg.com/webapp/topRight-d0230035.png" alt="음식" />
                    </div>
                    <div className={styles.search_image2}>
                        <img src="https://s.pinimg.com/webapp/left-511a9304.png" alt="음식" />
                    </div>
                    <div className={styles.search_image3}>
                        <img src="https://s.pinimg.com/webapp/right-88044782.png" alt="음식" />
                    </div>
                    <div className={styles.search_image4}>
                        <img src="https://s.pinimg.com/webapp/center-77497603.png" alt="음식" />
                    </div>
                    <div className={styles.search_title_wrap}>
                        <div className={styles.search_title_image}><img src={search} alt="검색" /></div>
                        <div className={styles.search_title}>닭고기로 만드는 손쉬운 저녁 메뉴</div>
                    </div>
                </div>
            </div>
            <div className={styles.search_right}>
                <div className={styles.search_title_wrap}>
                    <h2>아이디어 검색</h2>
                    <p>어떤 것을 시도해 보고 싶으세요? '닭고기로 만드는 간단한 저녁 메뉴'와 같이 관심 있는 내용을 검색하고 결과를 확인해 보세요.</p>
                </div>
            </div>
        </article>
    );
};