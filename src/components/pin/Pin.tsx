import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Header } from "../items/Header";
import styles from "../../styles/pin.module.scss";
import { ReducerProps } from "../../ts/reducer";
import { CardWrap } from "../items/CardWrap";
import { SearchContentsProps } from "../main/Main";
import { PinContents } from "./PinContents";

import { PinsProps } from "../items/CardWrap";
import { api } from "../../ts/api";

export const Pin = () => {

    // Location
    const params = useParams();

    // auth 정보
    const auth = useSelector((state: ReducerProps) => (state.reducer));
    
    // pin 정보들
    const [pin, setPin] = useState<PinsProps>();
    const [popularData, setPopularData] = useState<SearchContentsProps>({ searchBoolean: false, search: null });
    
    useEffect(() => {
        api.post("/edit/detail", params)
        .then(res => {
            if (res.data.code === "y") {
                setPin(res.data.data);
                setPopularData({ searchBoolean: true, search: Number(res.data.data.interest) })
                window.scroll(0, 0);
            }
        })
        .catch(err => console.log("Pin Err", err));
    }, [params]);

    // 검색 값 보내기
    const [searchValue, setSearchValue] = useState<PinsProps[]>([]);

    return (
        <article id={styles.pin_wrap}>
            <Header setSearchValue={setSearchValue} />

            <div className={styles.pin_contents_wrap}>
                {
                    pin && <PinContents pin={pin} auth={auth} />
                }
            </div>

            <div className={styles.pin_bottom_wrap}>
                <CardWrap popularData={popularData} searchValue={searchValue} />
            </div>
        </article>
    );
}