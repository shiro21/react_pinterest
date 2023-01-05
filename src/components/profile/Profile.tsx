import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/profile.module.scss";
import { PinsProps } from "../items/CardWrap";
import { Header } from "../items/Header";

// ts
import { api } from "../../ts/api";
import { ReducerProps } from "../../ts/reducer";
import { MyCard } from "../items/MyCard";

export const Profile = () => {

    const auth = useSelector((state: ReducerProps) => (state.reducer));

    const [contents, setContents] = useState<string>("create");
    const listChange = (e: string) => {
        setContents(e);
    };

    // 작품 불러오기
    const [articles, setArticles] = useState<PinsProps[]>([])
    useEffect(() => {
        if (contents === "create") {
            api.post("/edit/myPin", auth)
            .then(res => {
                if (res.data.code === "y") setArticles(res.data.data);
            })
            .catch(err => console.log("myPin Err", err));
        } else if (contents === "save") {
            api.post("/edit/savePinRead", auth)
            .then(res => {
                if (res.data.code === "y") setArticles(res.data.data);
            })
            .catch(err => console.log("myPin Err", err));
        }
    }, [contents, auth]);

    // 검색 값 보내기
    const [searchValue, setSearchValue] = useState<PinsProps[]>([])
    console.log(searchValue);

    return (
        <article id={styles.profile_wrap}>
            <Header setSearchValue={setSearchValue} />

            <div className={styles.profile_wrap}>
                <div className={styles.profile}>
                    <title>{auth.email.split("@")[0]}</title>
                    <span>{auth.email.split("@")[0].charAt(0).toUpperCase()}</span>
                </div>
                <div className={styles.profile_nick}>{auth.email.split("@")[0]}</div>
                <div className={styles.profile_nick_sub}>@{auth.email.split("@")[0]}</div>
                <button className={styles.profile_share}>공유</button>
            </div>

            <div className={styles.profile_contents_wrap}>
                <ul className={styles.profile_list_wrap}>
                    <li onClick={() => listChange("create")} style={{borderBottom: contents === "create" ? "1px solid #DDD" : ""}}>생성</li>
                    <li onClick={() => listChange("save")} style={{borderBottom: contents === "save" ? "1px solid #DDD" : ""}}>저장</li>
                </ul>

                <div className={styles.profile_contents}>
                    {
                        contents === "create" && <section>
                            <ul>
                                {
                                    articles.length > 0 && articles.map(item => (
                                        <li key={item._id}>
                                            <MyCard item={item} />
                                        </li>
                                    ))
                                }
                            </ul>
                        </section>
                    }
                    {
                        contents === "save" && <section>
                            <ul>
                                {
                                    articles.length > 0 && articles.map(item => (
                                        <li key={item._id}>
                                            <MyCard item={item} />
                                        </li>
                                    ))
                                }
                            </ul>
                        </section>
                    }
                </div>
            </div>
        </article>
    );
};