import styles from "../../styles/login.module.scss";

export const LoginShop = () => {
    return (
        <article id={styles.shop} style={{height: window.innerHeight+"px"}}>
            <div className={styles.shop_left}>
                <div className={styles.shop_image_wrap}>
                    <img src="https://s.pinimg.com/webapp/shop-bd0c8a04.png" alt="이미지" />
                    <div className={styles.shop_small_image_wrap}>
                        <img src="https://s.pinimg.com/webapp/creator-pin-img-491ebb56.png" alt="이미지" />
                        <div className={styles.small_image_wrap}>
                            <div className={styles.image_wrap}>
                                <img src="https://s.pinimg.com/webapp/creator-avatar-d7a05622.png" alt="이미지" />
                            </div>
                        </div>
                        <div className={styles.imaeg_title_wrap}>
                            <h4>Scout the City</h4>
                            <h5>팔로워 56,700명</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.shop_right}>
                <div className={styles.shop_title_wrap}>
                    <div className={styles.shop_title_flex}>
                        <div className={styles.shop_title}>
                            <h2>구매하고, 만들고, 시도하고, 실행하세요.</h2>
                            <p>무엇보다도 Pinterest에서는 전 세계 사람들의 아이디어와 새로운 것을 발견할 수 있습니다.</p>
                        </div>
                        <div className={styles.shop_button}>
                            <button>탐색</button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};