import { Header } from "../items/Header";

import styles from "../../styles/edit.module.scss";

import { useSelector } from "react-redux";
import { ReducerProps } from "../../ts/reducer";
import { EditContents } from "./EditContents";
import { PinsProps } from "../items/CardWrap";
import { useState } from "react";
// import { useState } from "react";
// import { SearchContentsProps } from "../main/Main";

export const Edit = () => {

    const auth = useSelector((state: ReducerProps) => (state.reducer));
    // const [popularData, setPopularData] = useState<SearchContentsProps>({ searchBoolean: false, search: null });
    // console.log(popularData);

    // 검색 값 보내기
    const [searchValue, setSearchValue] = useState<PinsProps[]>([])
    console.log(searchValue);

    return (
        <article id={styles.edit_wrap}>
            <Header setSearchValue={setSearchValue} />

            <div className={styles.edit_contents_wrap}>
                <EditContents auth={auth} />
            </div>
        </article>
    );
};