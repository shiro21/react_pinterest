import { useCallback, useEffect, useState } from "react";
import styles from "../../styles/card.module.scss";
import { PinsProps } from "./CardWrap";

// ts
import { api } from "../../ts/api";
import { baseUrl } from "../../ts/url";
import { SearchContentsProps } from "../main/Main";
import { useNavigate } from "react-router-dom";

export const SearchCard = ({cardsAdd, setCardsAdd, popularData}: {cardsAdd: boolean, setCardsAdd: Function, popularData: SearchContentsProps}) => {

    const navigation = useNavigate();

    // 검색한 핀 찾아오기
    const [pins, setPins] = useState<PinsProps[]>([]);
    const [count, setCount] = useState(16);
    const [lastPin, setLastPin] = useState(true);
    const [previousPin, setPreviousePin] = useState<SearchContentsProps>();

    useEffect(() => {
        if (previousPin?.search !== popularData.search) setPins([]);
    }, [cardsAdd, popularData, setPins, previousPin]);

    const searchPins = useCallback(async () => {
        const interestNumber = {interest: popularData.search, count};

        if (pins.length === 0) {
            api.post("/edit/searchPin", interestNumber)
            .then(res => {
                const data = res.data;
                setPreviousePin(popularData)
                if (data.code === "y") setPins(data.data);
            })
            .catch(err => console.log("검색 핀 에러", err));
        } else if (cardsAdd && lastPin) {
            await api.post("/edit/searchPinLimit", interestNumber)
            .then(res => {
                const data = res.data;

                if (data.data.length < 16) setLastPin(false);
                if (data.code === "y") {
                    setPins(prev => [...prev, ...data.data]);
                    setCount(prev => prev + 16);
                }
            })
            .catch(err => console.log("검색 핀 에러", err));
        }
        setCardsAdd(false);
    }, [pins, cardsAdd, lastPin, count, popularData, setCardsAdd]);

    useEffect(() => {
        searchPins();
    }, [cardsAdd, pins, searchPins])

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
                        </div>
                    </div>
                ))
            }
        </div>
    );
}