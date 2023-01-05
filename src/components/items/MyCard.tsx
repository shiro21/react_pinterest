import { useNavigate } from "react-router-dom";
import styles from "../../styles/card.module.scss";
import { baseUrl } from "../../ts/url";
import { PinsProps } from "./CardWrap";

export const MyCard = ({item}: {item: PinsProps}) => {

    const navigation = useNavigate();
    
    const moveDetail = (item: PinsProps) => {
        navigation(`/pin/${item._id}`)
    }

    return (
        <article id={styles.card_wrap}>
            <div className={styles.card_wrap}>
                <div className={styles.card_items}>
                    <div className={styles.card_image_wrap} onClick={() => moveDetail(item)}>
                        <img src={baseUrl + item["image"]} alt="이미지" />
                    </div>
                    {/* <div className={styles.profile_wrap}>
                        <div className={styles.profile}>
                            <img src="https://i.pinimg.com/236x/4a/2e/66/4a2e66daa1c7203fbb412a9893fc1ef9.jpg" alt="프로필" />
                        </div>
                        <div className={styles.nickname}>닉네임</div>
                    </div> */}
                </div>
            </div>
        </article>
    );
}