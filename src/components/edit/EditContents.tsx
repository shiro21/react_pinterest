import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/edit.module.scss";
import { formApi } from "../../ts/api";

// ts
import { interests } from "../../ts/interests";
import { UserProps } from "../../ts/reducer";

interface EditProps {
    _id: string,
    _uid: string,
    interest: string,
    title: string,
    text: string,
    image: File | null
}

export const EditContents = ({ auth }: { auth: UserProps }) => {

    const navigation = useNavigate();

    // 유저 불러오기
    // const auth = useSelector((state: ReducerProps) => (state.reducer));

    // 삭제 리스트 오픈
    const [listMore, setListMore] = useState(false);
    const onMore = () => {
        setListMore(prev => !prev);
    }

    // 제목, 내용, 관심사, 유저, 이미지, 관심사 번호
    const [edits, setEdits] = useState({_id: "", _uid: auth._id, interest: String(interests[0].id), title: "", text: "", image: null} as EditProps);

    // 관심사 선택하기
    const onInterest = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { target: { value } } = e;

        setEdits({...edits, "interest": String(value)});
    }

    // 확장자, 파일 사이즈
    const ALLOW_FILE_EXTENSION = "jpg,jpeg,png";
    const FILE_SIZE_LIMIT = 5 * 1024 * 1024 // 5MB
    // 미리보기
    const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
    // const [file, setFile] = useState<File[]>([]);
    // 이미지 추가하기
    const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files }, currentTarget } = e;

        let reader = new FileReader();
        let file = (files as FileList)[0];
        
        if (file === undefined) return;
        // 확장자 체크
        if (!fileExtensionValid(file)) {
            currentTarget.value = "";
            return alert(`사용 불가능한 확장자입니다. [가능 확장자]: ${ALLOW_FILE_EXTENSION}`);
        }
        // 용량 확인
        if (file.size > FILE_SIZE_LIMIT) {
            currentTarget.value = "";
            return alert(`업로드 가능한 최대 용량은 5MB입니다.`);
        }

        reader.onloadend = () => {
            setPreview(reader.result);
        }
        
        reader.readAsDataURL(file);
        setEdits({...edits, "image": file});

    }
    const fileExtensionValid = ({name}: {name: string}):boolean => {
        const extension = removeFileName(name);
        if (!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === "") return false;

        return true;
    }
    
    const removeFileName = (originFileName: string): string => {
        const lastIndex = originFileName.lastIndexOf(".");

        if (lastIndex < 0) return "";
        return originFileName.substring(lastIndex + 1).toLowerCase();
    }

    // 서브 내용 온!
    const [onSubTitle, setOnSubTitle] = useState(false);
    const [onSubTextarea, setOnSubTextarea] = useState(false);
    // 제목
    const onTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = e;

        setEdits({...edits, "title": value});
    }

    // 제목, 텍스트에리어 포커스
    const inputClick = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.type === "focus") setOnSubTitle(true);
        else if (e.type === "blur") setOnSubTitle(false);
    }
    const textareaClick = (e: React.FocusEvent<HTMLElement>) => {
        if (e.type === "focus") setOnSubTextarea(true);
        else if (e.type === "blur") setOnSubTextarea(false);        
    }

    // textarea size auto 변경
    const [area, setArea] = useState("");
    const [areaLength, setAreaLength] = useState(500);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const useAutoSizeTextarea = (textareaRef: HTMLTextAreaElement | null, value: string) => {
        useEffect(() => {
            if (textareaRef) {
                textareaRef.style.height = "0px";
                const scrollHeight = textareaRef.scrollHeight;

                textareaRef.style.height = scrollHeight + "px";
            }
        }, [textareaRef, value])
    }

    useAutoSizeTextarea(textareaRef.current, area);

    // textarea 내용
    const textareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { target: { value } } = e;
        setArea(value);
        setEdits({...edits, "text": value});
        setAreaLength(500 - value.length);
    }

    const onSubmit = async () => {
        
        const formData = new FormData();

        if (edits.title.length <= 1) return alert("제목은 2글자 이상 입력해주세요.");
        else if (edits.text.length <= 5) return alert("내용은 5글자 이상 입력해주세요.");
        if (edits.image === null) return alert("이미지를 넣어주세요.");

        formData.append("_id", edits._id);
        formData.append("_uid", edits._uid);
        formData.append("title", edits.title);
        formData.append("interest", edits.interest);
        formData.append("text", edits.text);
        formData.append("image", edits.image);

        // for (let values of formData.values()) {
        //     console.log(values);
        // }

        await formApi.post("/edit/create", formData)
        .then(res => {
            if (res.data.code === "y") navigation("/");
        })
        .catch(err => console.log("Edit Err", err));
    }

    return (
        <article className={styles.edit_contents}>
            <h1>핀 빌더</h1>

            <div className={styles.edit_box_wrap}>
                <div className={styles.edit_box}>
                    <div className={styles.box_header}>
                        <div onClick={onMore} className={styles.box_more}>
                            <svg className="gUZ ztu U9O kVc" height="18" width="18" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3M3 9c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm18 0c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"></path></svg>
                            {
                                listMore && <ul className={styles.box_more_list}>
                                <li>삭제</li>
                            </ul>
                            }
                        </div>

                        <div className={styles.box_select_wrawp}>
                            <div className={styles.box_select}>
                                <div className={styles.box_arrow}>
                                    <svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>
                                </div>
                                <select onChange={onInterest}>
                                    {
                                        interests.map(item => (
                                            <option key={item.id} value={item.id}>{item.text}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className={styles.box_save_button} onClick={onSubmit}>등록</div>
                        </div>
                    </div>

                    <div className={styles.box_contents_wrap}>
                        <div className={styles.image_wrap}>
                            <div className={styles.image_drop}>
                                <div className={styles.input_wrap}>
                                    <input type="file" onChange={onFile} name="image" accept="image/*" />
                                    {
                                        preview && <img src={preview.toString()} alt="이미지" />
                                    }
                                    <div>업로드!</div>
                                </div>
                                <span>Pinterest는 20MB 미만의 고화질 .jpg 파일을 사용하는 것을 권장합니다.</span>
                            </div>
                        </div>
                        <div className={styles.contents_wrap}>
                            <div className={styles.title_wrap}>
                                <input type="text" placeholder="제목 추가" onFocus={inputClick} onBlur={inputClick} onChange={onTitle} />
                                {
                                    onSubTitle && <div className={styles.title_sub_wrap}>
                                        처음 40글자는 피드에서 볼 수 있습니다.
                                        <span>100</span>
                                    </div>
                                }
                            </div>
                            <div className={styles.profile_wrap}>
                                <div className={styles.profile}>
                                    <title>{auth.email.split("@")[0]}</title>
                                    <span>{auth.email.split("@")[0].charAt(0).toUpperCase()}</span>
                                </div>
                                <div className={styles.profile_nick}>{auth.email.split("@")[0]}</div>
                            </div>
                            <div className={styles.contents_textarea_wrap}>
                                <textarea ref={textareaRef} onChange={textareaChange} onFocus={textareaClick} onBlur={textareaClick} placeholder="핀에 대해 설명해주세요." />
                                {
                                    onSubTextarea && <div className={styles.textarea_sub_wrap}>사람들은 핀을 클릭하면 처음 50글자를 읽습니다. <span>{areaLength}</span></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}