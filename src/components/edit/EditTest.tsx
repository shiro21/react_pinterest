export const EditTest = () => {
    return (
        <article>TEST</article>
    );
}
// import React, { useRef, useState } from "react";

// export const EditTest = () => {

//     // 파일 레퍼런스
//     const fileRef = useRef<HTMLInputElement>(null);
//     const [previews, setPreviews] = useState<string[]>([]);

//     // 파일 선택
//     const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { target: { files } } = e;
//         const targetFiles = (files as FileList);
//         // Array.from() 메서드: iterable 객체 or array-like(length와 index를 가진 객체 FileList도 array-like 객체이다.) 객체를 배열로 바꿔준다.
//         // Array.from() 메서드로 FileList를 배열로 만들면 FileList타입이 아닌 File[]( File타입의 요소로 이루어진 배열 ) 타입이 된다.
//         const targetArray = Array.from(targetFiles);

//         // 배열로 만들어진 targetArray를 map() 으로 돌려서 안의 File타입의  요소들을 url로 바꿔준다.
//         // filesSelector는 url로 바뀐 요소들이 담긴 배열이기 때문에 string[]타입을 주면 된다.
//         // URL.createObjectURL({ params }): params의 자리로 들어가는 타입은 Blob | MediaSource이다. File타입은 Blob타입을 상속하고 사용자 시스템의 파일을 지원하도록 확장하기 때문에 URL.createObjectURL()메서드에 들어갈 수 있다.
//         const filesSelector: string[] = targetArray.map(file => {
//             return URL.createObjectURL(file);
//         });
//         console.log(filesSelector);
//         setPreviews(prev => [...prev, ...filesSelector]);
//     }
//     return (
//         <div>
//             <div style={{backgroundColor: "red", width: "150px", height: "150px"}}>
//                 <input type="file" ref={fileRef} multiple accept="image/*" onChange={fileChange} />

//                 <div style={{width: "100%"}}>
//                     {
//                         previews.map((url, index) => (
//                             <div key={index}>
//                                 <img src={url} style={{width: "150px", height: "150px"}} alt={`image${index}`} />
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>
//         </div>
//     );
// }