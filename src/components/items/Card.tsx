import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/card.module.scss";
import { PinsProps } from "./CardWrap";

// ts
import { api } from "../../ts/api";
import { ReducerDetailProps } from "../../ts/reducer";
import { baseUrl } from "../../ts/url";
import { useNavigate } from "react-router-dom";

export const Card = ({cardsAdd, setCardsAdd, searchValue}: {cardsAdd: boolean, setCardsAdd: Function, searchValue: PinsProps[]}) => {

    const navigation = useNavigate();

    const authDetail = useSelector((state: ReducerDetailProps) => (state.reducerDetail));
    
    // 나에게 맞는 핀 불러오기
    const [pins, setPins] = useState<PinsProps[]>([]);
    const [count, setCount] = useState(16);
    const [lastPin, setLastPin] = useState(true);
    useEffect(() => {
        if (searchValue.length > 0) {
            setPins(searchValue);
        }
    }, [searchValue])
    useEffect(() => {
        const interestNumber = {interest: authDetail.interest, count: count}
        if (pins.length === 0) {
            api.post("/edit/userPin", interestNumber)
            .then(res => {
                let data = res.data.data;
                if (res.data.code === "y") setPins(data);
            })
            .catch(err => console.log("유저 핀 에러", err));
        } else if (cardsAdd && lastPin) {

            const pinFetch = async () => {
                await api.post("/edit/limitPin", interestNumber)
                .then(res => {
                    let data = res.data.data;

                    if (data.length < 16) setLastPin(false);
                    if (res.data.code === "y") {
                        setPins(prev => [...prev, ...data]);
                        setCount(prev => prev + 16);
                    }
                })
                .catch(err => console.log("유저 핀 에러", err));
                setCardsAdd(false);
            }
            // 핀 추가
            pinFetch();
        }
    }, [authDetail.interest, count, lastPin, pins.length, cardsAdd, setCardsAdd])

    const moveDetail = (item: PinsProps) => {
        navigation(`/pin/${item._id}`, {state: {item}})
    }

    return (
        <div id={styles.card_wrap}>
            {
                pins.map((item, index) => (
                    <div key={index} className={styles.card_wrap}>
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
                ))
            }
        </div>
    );
}
