// image
import React, { useEffect, useState } from "react";
import pinterest from "../../styles/images/pinterest.svg";
import styles from "../../styles/main.module.scss";

// ts
import { ReducerProps } from "../../ts/reducer";
import { useDispatch, useSelector } from "react-redux";
import { SignOut } from "../../ts/reducer";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../ts/api";
import { interests, InterestProps } from "../../ts/interests";
import { SearchContentsProps } from "../main/Main";

interface PopularInterestProps {
    interest: string,
    coun: number
}

// export const MainHeader = ({...auth}: AuthProps) => {
export const Header = ({ setSearchValue }: { setSearchValue: Function }) => {
    
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const auth = useSelector((state: ReducerProps) => (state.reducer));

    const [bgColor, setBgColor] = useState<boolean>(false);
    const [profileOpen, setProfileOpen] = useState<boolean>(false);

    const nick = auth.email.split("@");

    const onList = (list: string) => {
        if (list === "menu") {
            setBgColor(true);
            setProfileOpen(true);
        } else if (list === "close") {
            setBgColor(false);
            setProfileOpen(false);
            setFocus(false);
        }
    }

    const onMove = (list: string) => {
        switch(list) {
            case "home" :
                navigation("/");
            break;

            case "edit" :
                navigation("/edit");
            break;

            case "profile" :
                navigation("/profile");
            break;
        }
    }


    // 검색 활성화
    const [focus, setFocus] = useState<boolean>(false)
    const [popularInterest, setPopularInterest] = useState<PopularInterestProps[]>([])
    // const searchFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    //     const { type } = e;

    //     if (type === "focus") {
    //         setFocus(true);
    //         api.post("/edit/interest")
    //         .then(res => {
    //             if (res.data.code === "y") setPopularInterest(res.data.data);
    //         })
    //         .catch(err => console.log("인기있는 관심사 에러", err));
    //     }
    // }

    // 가장 관심있는 관심사 8개 가져오기
    const [popularArray, setPopularArray] = useState<InterestProps[]>([]);
    useEffect(() => {
        
        let result: InterestProps[] = [];
        for(let i = 0; i < popularInterest.length; i++) {
            for (let j = 0; j < interests.length; j++) {
                if (Number(popularInterest[i].interest) === interests[j].id) {
                    result.push(interests[j]);
                }
            }
        }
        setPopularArray(result);
    } ,[popularInterest]);
    
    // 검색
    const [search, setSearch] = useState<string>("");
    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = e;

        setSearch(value);
    }
    const onSeachEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;

        if (key === "Enter") {
            await api.post("/search/header", {search: search})
            .then(res => {
                console.log(res.data.data);
                setSearchValue(res.data.data);
                setPopularInterest([])
                setSearch("");
            })
            .catch(err => console.log("search err", err));
            setFocus(false);
        }
    }

    const [popularData, setPopularData] = useState<SearchContentsProps>({ searchBoolean: false, search: null });
    const onPopular = (num: number) => {
        setPopularData({ searchBoolean: true, search: num });
        setFocus(false);
        console.log(popularData)
    }

    const onLogout = () => {
        dispatch(SignOut(auth));
    }

    return (
        <header id={styles.header}>
            <div className={styles.items_wrap}>
                <div className={styles.items}>
                    <div className={styles.logo_image_wrap}>
                        <Link to={"/"}>
                            <img src={pinterest} alt="로고" />
                        </Link>
                    </div>
                    <div className={styles.button_wrap}>
                        <button className={styles.home_button} onClick={() => onMove("home")}>홈</button>
                        <button onClick={() => onMove("edit")}>만들기</button>
                    </div>
                </div>
                <div className={`${styles.items} ${styles.items_full}`}>
                    <div className={styles.input_wrap}>
                        <div className={styles.input_svg}>
                            <svg className={`${styles.gUZ} ${styles.ztu}`} height="16" width="16" viewBox="0 0 24 24" aria-label="검색 아이콘" role="img"><path d="M10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6m13.12 2.88-4.26-4.26A9.842 9.842 0 0 0 20 10c0-5.52-4.48-10-10-10S0 4.48 0 10s4.48 10 10 10c1.67 0 3.24-.41 4.62-1.14l4.26 4.26a3 3 0 0 0 4.24 0 3 3 0 0 0 0-4.24"></path></svg>
                        </div>
                        <input readOnly type="text" placeholder="검색" onChange={onSearch} onKeyUp={onSeachEnter} />
                    </div>
                    {
                        focus && <div className={styles.search_wrap}>
                            <h5>최근 검색 기록</h5>
                            <div>검색 기록 내용</div>

                            <h5>Pinterest에서 인기 있는 검색어</h5>
                            <ul>
                                {
                                    popularArray.map(item => (
                                        <li key={item.id} onClick={() => onPopular(item.id)}>
                                            <img src={item.image} alt={item.text} />
                                            <div>{item.text}</div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    }
                    {
                        focus && <div className="bg_color_top" onClick={() => onList("close")}></div>
                    }
                </div>
                <div className={styles.items}>
                    <div className={styles.icons_wrap}>
                        <div className={styles.icon}>
                            <svg className={`${styles.gUZ} ${styles.ztu}`} height="24" width="24" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M12 24c-1.66 0-3-1.34-3-3h6c0 1.66-1.34 3-3 3zm7-10.83c1.58 1.52 2.67 3.55 3 5.83H2c.33-2.28 1.42-4.31 3-5.83V7c0-3.87 3.13-7 7-7s7 3.13 7 7v6.17z"></path></svg>
                        </div>
                        <div className={styles.icon}>
                            <svg className={`${styles.gUZ} ${styles.ztu}`} height="24" width="24" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M18 12.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 18 12.5m-6 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 12 12.5m-6 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 6 12.5M12 0C5.925 0 1 4.925 1 11c0 2.653.94 5.086 2.504 6.986L2 24l5.336-3.049A10.93 10.93 0 0 0 12 22c6.075 0 11-4.925 11-11S18.075 0 12 0"></path></svg>
                        </div>
                        <div className={styles.profile} onClick={() => onList("menu")}>
                            <title>{nick[0]}</title>
                            <span>{nick[0].charAt(0).toUpperCase()}</span>
                        </div>

                        {
                            profileOpen ? (
                                <div className={styles.list_wrap}>
                                    <div className={styles.list_title}>현재 로그인 계정</div>
                                    <div className={styles.profile_wrap} onClick={() => onMove("profile")}>
                                        <div className={styles.profile_image}>
                                            <div className={styles.profile}>
                                                <title>{nick[0]}</title>
                                                <span>{nick[0].charAt(0).toUpperCase()}</span>
                                            </div>
                                        </div>
                                        <div className={styles.information_wrap}>
                                            <h3>{nick[0]}</h3>
                                            <h4>개인</h4>
                                            <h4>{auth.email}</h4>
                                        </div>
                                    </div>

                                    <div className={styles.list_title}>내 계정</div>
                                    <ul>
                                        <li>계정 추가</li>
                                        <li>Business 계정으로 전환</li>
                                    </ul>

                                    <div className={styles.list_title}>옵션 더보기</div>
                                    <ul>
                                        <li>설정</li>
                                        <li>홈피드 조정</li>
                                        <li>개인정보 보호권</li>
                                        <li>도움 받기</li>
                                        <li>서비스 약관 보기</li>
                                        <li>개인정보 보호정책 보기</li>
                                        <li onClick={onLogout}>로그아웃</li>
                                    </ul>

                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>

            {
                bgColor && <div className="bg_color" onClick={() => onList("close")}></div>
            }
        </header>
    );
};