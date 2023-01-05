// 실패했던 코드


// import { MainHeader } from "./MainHeader";

// import styles from "../../styles/main.module.scss";
// import { MainContents } from "./MainContents";
// import { useDispatch, useSelector } from "react-redux";
// import { useCallback, useEffect, useState } from "react";

// // ts
// import { interests } from "../../ts/interests";
// import { UserDetailProps, ReducerProps, SignUpdate, UserDetail, ReducerDetailProps } from "../../ts/reducer";
// import { api } from "../../ts/api";

// export const Main = () => {
//     console.log(interests);
//     console.log("Main");
// // { _id: "", createdAt: "", _detail: "", email: "", age: 0, profile: "" }
//     const auth = useSelector((state: ReducerProps) => (state.reducer));
//     const authDetail = useSelector((state: ReducerDetailProps) => (state.reducerDetail));
//     const dispatch = useDispatch();
//     const [userDetailOpen, setUserDetailOpen] = useState(false);
//     const [userAuth, setUserAuth] = useState(auth);
//     const [authAdd, setAuthAdd] = useState(false);
//     const [userDetail, setUserDetail] = useState({ _id: "", _uid: "", gender: "", interest: []} as UserDetailProps)
//     const [dot, setDot] = useState(0);
//     const dotArray = [0, 1, 2, 3];
//     useEffect(() => {
//         console.log(userDetail.interest);
//         if (userAuth._detail === null) {
//             setUserDetailOpen(true);
//         } else {
//             setUserDetail(authDetail);
//             setUserDetailOpen(false);
//         }
//     }, []);

//     const authIdAdd = useCallback(() => {
//         if (userDetail._uid === null) {
//             console.log("userDetail === ", userDetail._uid);
//             setUserDetail({...userDetail, "_uid": auth._id});
//         } else {
//             console.log("authDetail === ", authDetail);
//             setUserDetail(authDetail);
//         }
//     }, [userDetail, auth._id, authDetail]);
    
//     useEffect(() => {
//         if (authAdd === false) {
//             authIdAdd();
//             setAuthAdd(true);
//         }
//     }, [authAdd, authIdAdd])


//     // 디테일 추가 부분
//     const dotChange = (dot: number) => {
//         setDot(dot);
//     };

//     const onNext = () => {

//         if (dot === 1 && userDetail.gender === '') return alert("성별을 선택해주세요.");
//         if (dot === 2 && userDetail.interest.length !== 5) return alert("5개를 선택해주세요.");

//         setDot(next => next + 1);
//     }

//     const onGender = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { target: { value } } = e;

//         setUserDetail({...userDetail, "gender": value});
//     }

//     const onInterest = (e: number) => {
//         let interestString = e.toString();
        
//         for (let i = 0; i < userDetail.interest.length; i++) {
//             if (userDetail.interest[i] === interestString) {
//                 const result = userDetail.interest.filter(inter => inter !== interestString);

//                 return setUserDetail({...userDetail, "interest": [...result]})
//             }
//         }

//         if (userDetail.interest.length >= 5) return;

//         setUserDetail({...userDetail, "interest": [...userDetail.interest, interestString]});
//     }

//     const onSubmit = async () => {
//         await api.post("/user/detail", userDetail)
//         .then(detail => {
//             if (detail.data.code === "y") {
//                 let _id = detail.data.data[0]._id;
//                 console.log(detail);
//                 test(_id)
//             }
//         })
//         .catch(err => console.log("detail err", err));
//     }
//     const test = useCallback((_id: string) => {
//         console.log("test");
//         dispatch(SignUpdate(userAuth));
//         dispatch(UserDetail(userDetail));
//         setUserAuth({...userAuth, "_detail": _id});
//         setUserDetail({...userDetail, "_id": _id});
//         setUserDetailOpen(false);
//     }, [])

//     return (
//         <article>
//             <MainHeader auth={auth} />

//             <div className={styles.main_contents}>
//                 <MainContents />
//             </div>
            
//             {
//                 userDetailOpen && <div className="bg_color">
//                     <div className={styles.main_detail_wrap}>
//                         <div className={styles.button_wrap}>
//                             <ul>
//                                 {
//                                     dotArray.map(dots => (
//                                         <li key={dots}>
//                                             <button onClick={() => dotChange(dots)} className={dot === dots ? styles.button_color : ''}></button>
//                                         </li>
//                                     ))
//                                 }
//                             </ul>

//                             {
//                                 dot === 0 && <section>
//                                     <div className={styles.profile_wrap}>
//                                         <div className={styles.profile}>
//                                             <title>{auth.email.split("@")[0]}</title>
//                                             <span>{auth.email.split("@")[0].charAt(0).toUpperCase()}</span>
//                                         </div>

//                                         <div className={styles.profile_nick}>
//                                             {auth.email}
//                                         </div>

//                                         <h2>Pinterest에 오신 것을 환영합니다<br /><em>{auth.email.split("@")[0]}</em></h2>

//                                         <p>다음 몇 가지 질문에 대한 답변은 회원님에게 꼭 맞는 아이디어를 찾는 데 도움이 됩니다</p>

//                                         <button className={styles.button_wrap} onClick={onNext}>다음</button>
//                                     </div>
//                                 </section>
//                             }

//                             {
//                                 dot === 1 && <section>
//                                     <h2>성별이 어떻게 되세요?</h2>

//                                     <div className={styles.gender_selector_wrap}>
//                                         <ul>
//                                             <li>
//                                                 <input type="radio" name="gender" id="woman" value={"여자"} onChange={onGender} />
//                                                 <label htmlFor="woman">여성</label>
//                                             </li>

//                                             <li>
//                                                 <input type="radio" name="gender" id="man" value={"남자"} onChange={onGender} />
//                                                 <label htmlFor="man">남성</label>
//                                             </li>
//                                         </ul>

//                                         <button className={styles.button_wrap} onClick={onNext}>다음</button>
//                                     </div>
//                                 </section>
//                             }

//                             {
//                                 dot === 2 && <section>
//                                     <h2>관심사를 알려주세요</h2>

//                                     <div className={styles.interest_wrap}>
//                                         <ul>
//                                             {
//                                                 interests.map((item) => (
//                                                     <li key={item.id}>
//                                                         <div className={`${styles.interest_image_wrap}`} style={{borderRadius: userDetail.interest.find(el => el === String(item.id)) ? '16px' : '', border: userDetail.interest.find(el => el === String(item.id)) ? '3px solid #000' : ''}} onClick={() => onInterest(item.id)}>
//                                                         {/* <div className={`${styles.interest_image_wrap}`} onClick={() => onInterest(item.id)}> */}
//                                                             <div className={styles.interest_image} style={{background: `url(${item.image})`, borderRadius: "16px", backgroundSize: "cover"}}>
//                                                                 <span>
//                                                                     {item.text}
//                                                                 </span>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                 ))
//                                             }
//                                         </ul>

//                                         <button className={styles.button_wrap} onClick={onNext}>다음</button>
//                                     </div>
//                                 </section>
//                             }

//                             {
//                                 dot === 3 && <section>
//                                     <div className={styles.profile_wrap}>
//                                         <div className={styles.profile}>
//                                             <title>{auth.email.split("@")[0]}</title>
//                                             <span>{auth.email.split("@")[0].charAt(0).toUpperCase()}</span>
//                                         </div>

//                                         <div className={styles.profile_nick}>
//                                             {auth.email}
//                                         </div>

//                                         <h2>진짜 Pinterest에 오신 것을 환영합니다<br /><em>{auth.email.split("@")[0]}</em></h2>

//                                         <p>앞으로 잘 부탁드립니다 !!</p>

//                                         <button className={styles.button_wrap} onClick={onSubmit}>완료</button>
//                                     </div>
//                                 </section>
//                             }
//                         </div>
//                     </div>
//                 </div>
//             }
//         </article>
//     );
// };

export const MainTest = () => {
    return (
        <article>asd</article>
    );
}