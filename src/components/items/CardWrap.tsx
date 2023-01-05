import { Card } from "./Card";
import { SearchCard } from "./SearchCard";
import styles from "../../styles/card.module.scss";
import { useEffect, useRef, useState } from "react";
import { SearchContentsProps } from "../main/Main";

export interface PinsProps {
    createdAt: string,
    updatedAt: string,
    interest: string,
    text: string,
    title: string,
    _id: string,
    _uid: string,
    image: string
}

export const CardWrap = ({ popularData, searchValue }: { popularData: SearchContentsProps, searchValue: PinsProps[] }) => {

    const [cardsAdd, setCardsAdd] = useState<boolean>(false);
    const cardsRef = useRef<HTMLDivElement>(null);
    let windowInnerHeight = window.innerHeight;
    useEffect(() => {

        const handleScroll = async () => {
            if (cardsRef.current?.scrollHeight === undefined) return;
    
            let position = window.scrollY + windowInnerHeight - 80;
            if (position > cardsRef.current.scrollHeight - 100) {
                setCardsAdd(true);
            }
        }

        window.addEventListener("scroll", handleScroll, { capture: true });
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [windowInnerHeight, cardsAdd])

    return (
        <article id={styles.cards_wrap} ref={cardsRef}>
            {
                popularData.searchBoolean ? (
                    <SearchCard cardsAdd={cardsAdd} setCardsAdd={setCardsAdd} popularData={popularData} />
                    ) : (
                    <Card cardsAdd={cardsAdd} setCardsAdd={setCardsAdd} searchValue={searchValue} />
                )
            }
            
        </article>
    );
};