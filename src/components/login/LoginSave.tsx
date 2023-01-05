import styles from "../../styles/login.module.scss";

export const LoginSave = () => {


    return (
        <article id={styles.save} style={{height: window.innerHeight+"px"}}>
            <div className={styles.save_left}>
                <div className={styles.save_title_wrap}>
                    <h2>좋아하는 아이디어를 저장하세요.</h2>
                    <p>나중에 다시 볼 수 있도록 좋아하는 콘텐츠를 수집하세요.</p>
                    <button>탐색</button>
                </div>
            </div>
            <div className={styles.save_right}>
                <div className={styles.save_image_wrap}>
                    <div className={styles.save_image1}>
                        <img src="https://s.pinimg.com/webapp/future-home-vibes-55a673b9.png" alt="식물" />
                        <h3>집 분위기 바꾸기: 양치식물</h3>
                        <div className={styles.small_image_wrap}>
                            <img src="https://s.pinimg.com/webapp/future-home1-f4037b6b.png" alt="가구" />
                            <img src="https://s.pinimg.com/webapp/future-home1-f4037b6b.png" alt="가구" />
                            <img src="https://s.pinimg.com/webapp/future-home1-f4037b6b.png" alt="가구" />
                        </div>
                    </div>

                    <div className={styles.save_image2}>
                        <div>
                            <img src="https://s.pinimg.com/webapp/scandinavian-bedroom-917ad89c.png" alt="가구" />
                            <h3>스칸디나비아풍 침실</h3>
                        </div>
                    </div>

                    <div className={styles.save_image3}>
                        <div>
                            <img src="https://s.pinimg.com/webapp/deck-of-dreams-fb527bf1.png" alt="데크" />
                            <h3>꿈의 데크</h3>
                        </div>
                    </div>

                    <div className={styles.save_image4}>
                        <div>
                            <img src="https://s.pinimg.com/webapp/serve-my-drinks-263547ea.png" alt="데크" />
                            <h3>멋진 음료 서빙</h3>
                        </div>
                    </div>

                    <div className={styles.save_image5}>
                        <div>
                            <img src="https://s.pinimg.com/webapp/bathroom-upgrade-48ebb8fc.png" alt="데크" />
                            <h3>화장실 업그레이드</h3>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}