import { MainHeader } from "./MainHeader";

import styles from "../../styles/main.module.scss";
import { MainContents } from "./MainContents";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";

// ts
import { interests } from "../../ts/interests";
import { UserDetailProps, ReducerProps, SignUpdate, UserDetail } from "../../ts/reducer";
import { api } from "../../ts/api";
import { PinsProps } from "../items/CardWrap";

export interface SearchContentsProps {
    searchBoolean: boolean,
    search: number | null
}

export const Main = () => {

    const auth = useSelector((state: ReducerProps) => (state.reducer));
    // const authDetail = useSelector((state: ReducerDetailProps) => (state.reducerDetail));

    const dispatch = useDispatch();

    // 만약 유저 디테일이 없을 경우 ( 최초 로그인 ) ---------------------------------------------
    const [userDetailOpen, setUserDetailOpen] = useState(false);
    const [detailCallback, setDetailCallback] = useState(false);
    const [detailAdd, setDetailAdd] = useState({ _id: "", _uid: "", gender: "", interest: ""} as UserDetailProps);
    const detailUpdateCallback = useCallback(() => {
        // console.log("디테일 생성 시작 !");
        setUserDetailOpen(true);
        setDetailAdd({...detailAdd, "_uid": auth._id});
    }, [detailAdd, auth._id])
    useEffect(() => {
        if (auth._detail === null && detailCallback === false) {
            detailUpdateCallback();
            setDetailCallback(true)
        } else if (auth._detail !== null) {
            // console.log("디테일 생성완료");
            setUserDetailOpen(false);
        }
    }, [auth._detail, detailCallback, detailUpdateCallback]);
    

    // 위치 이동
    const dotArray = [0, 1, 2, 3];
    const [dot, setDot] = useState(0);

    const dotChange = (dot: number) => { setDot(dot); };
    const onNext = () => { setDot(next => next + 1); };

    // 성별 변경
    const onGender = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = e;
        setDetailAdd({...detailAdd, "gender": value});
    }

    // 관심사 선택하기
    const [interestArray, setInterestArray] = useState<string[]>([]);
    const [interOpen, setInterOpen] = useState(false);
    const onInterest = (interest: number) => {
        setInterOpen(true);
        let interestString = interest.toString();

        for (let i = 0; i < interestArray.length; i++) {
            if (interestArray[i] === interestString) {
                const interestResult = interestArray.filter(inter => inter !== interestString);

                return setInterestArray(interestResult);
            }
        }

        if (interestArray.length >= 5) return;

        setInterestArray(prev => [...prev, interestString]);
    }

    const interDetails = useCallback((detailAdd: UserDetailProps, interestArray: string[]) => {
        setDetailAdd({...detailAdd, "interest": JSON.stringify(interestArray)});
    }, [])
    useEffect(() => {
        if (interOpen) {
            interDetails(detailAdd, interestArray);
            setInterOpen(false);
        }
    }, [interestArray, detailAdd, interDetails, interOpen])
    // 디테일 생성
    const onSubmit = async () => {
        // console.log("Submit");
        // console.log(JSON.stringify(interestArray));

        await api.post("/user/detail", detailAdd)
        .then(detail => {
            dispatch(SignUpdate({...auth, "_detail": detail.data.data[0]._id}));
            dispatch(UserDetail({...detail.data.data[0], "interest": detail.data.data[0].interest}));
            setUserDetailOpen(false);
        })
        .catch(err => console.log("detail err", err));
    }

    // 메인 헤더에서 받아오기
    const [popularData, setPopularData] = useState<SearchContentsProps>({ searchBoolean: false, search: null });

    // 검색 값 보내기
    const [searchValue, setSearchValue] = useState<PinsProps[]>([])
    
    return (
        <article>
            <MainHeader auth={auth} setPopularData={setPopularData} setSearchValue={setSearchValue} />

            <div className={styles.main_contents}>
                <MainContents popularData={popularData} searchValue={searchValue} />
            </div>
            
            {
                userDetailOpen && <div className="bg_color">
                    <div className={styles.main_detail_wrap}>
                        <div className={styles.button_wrap}>
                            <ul>
                                {
                                    dotArray.map(dots => (
                                        <li key={dots}>
                                            <button onClick={() => dotChange(dots)} className={dot === dots ? styles.button_color : ''}></button>
                                        </li>
                                    ))
                                }
                            </ul>

                            {
                                dot === 0 && <section>
                                    <div className={styles.profile_wrap}>
                                        <div className={styles.profile}>
                                            <title>{auth.email.split("@")[0]}</title>
                                            <span>{auth.email.split("@")[0].charAt(0).toUpperCase()}</span>
                                        </div>

                                        <div className={styles.profile_nick}>
                                            {auth.email}
                                        </div>

                                        <h2>Pinterest에 오신 것을 환영합니다<br /><em>{auth.email.split("@")[0]}</em></h2>

                                        <p>다음 몇 가지 질문에 대한 답변은 회원님에게 꼭 맞는 아이디어를 찾는 데 도움이 됩니다</p>

                                        <button className={styles.button_wrap} onClick={onNext}>다음</button>
                                    </div>
                                </section>
                            }

                            {
                                dot === 1 && <section>
                                    <h2>성별이 어떻게 되세요?</h2>

                                    <div className={styles.gender_selector_wrap}>
                                        <ul>
                                            <li>
                                                <input type="radio" name="gender" id="woman" value={"여자"} onChange={onGender} />
                                                <label htmlFor="woman">여성</label>
                                            </li>

                                            <li>
                                                <input type="radio" name="gender" id="man" value={"남자"} onChange={onGender} />
                                                <label htmlFor="man">남성</label>
                                            </li>
                                        </ul>

                                        <button className={styles.button_wrap} onClick={onNext}>다음</button>
                                    </div>
                                </section>
                            }

                            {
                                dot === 2 && <section>
                                    <h2>관심사를 알려주세요</h2>

                                    <div className={styles.interest_wrap}>
                                        <ul>
                                            {
                                                interests.map((item) => (
                                                    <li key={item.id}>
                                                        {/* <div className={`${styles.interest_image_wrap}`} style={{borderRadius: userDetail.interest.find(el => el === String(item.id)) ? '16px' : '', border: userDetail.interest.find(el => el === String(item.id)) ? '3px solid #000' : ''}} onClick={() => onInterest(item.id)}> */}
                                                        <div className={`${styles.interest_image_wrap}`} onClick={() => onInterest(item.id)}>
                                                            <div className={styles.interest_image} style={{background: `url(${item.image})`, borderRadius: "16px", backgroundSize: "cover"}}>
                                                                <span>
                                                                    {item.text}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>

                                        <button className={styles.button_wrap} onClick={onNext}>다음</button>
                                    </div>
                                </section>
                            }

                            {
                                dot === 3 && <section>
                                    <div className={styles.profile_wrap}>
                                        <div className={styles.profile}>
                                            <title>{auth.email.split("@")[0]}</title>
                                            <span>{auth.email.split("@")[0].charAt(0).toUpperCase()}</span>
                                        </div>

                                        <div className={styles.profile_nick}>
                                            {auth.email}
                                        </div>

                                        <h2>진짜 Pinterest에 오신 것을 환영합니다<br /><em>{auth.email.split("@")[0]}</em></h2>

                                        <p>앞으로 잘 부탁드립니다 !!</p>

                                        <button className={styles.button_wrap} onClick={onSubmit}>완료</button>
                                    </div>
                                </section>
                            }
                        </div>
                    </div>
                </div>
            }
        </article>
    );
};