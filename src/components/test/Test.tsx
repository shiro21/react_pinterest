import { useEffect, useRef, useState } from "react";

export const Test = () => {

    const wheel = useRef<HTMLDivElement>(null);
    const wheel1 = useRef<HTMLDivElement>(null);
    const wheel2 = useRef<HTMLDivElement>(null);
    const wheel3 = useRef<HTMLDivElement>(null);
    const wheel4 = useRef<HTMLDivElement>(null);

    const [scroll, setScroll] = useState(0);
    const onScroll = () => {
        setScroll(window.scrollY);
    }

    useEffect(() => {
        console.log(wheel1.current?.offsetTop);
        // 0보다 크고, 다음 페이지보다 작을때
        if (scroll > Number(wheel.current?.offsetTop) && scroll < Number(wheel1.current?.offsetTop)) {
            console.log("Yes");
            return wheel1.current?.scrollIntoView({ behavior: "smooth" })
        }
    }, [scroll])
    return (
        <article onWheel={onScroll}>
            <div style={{backgroundColor: "#DDD", height: "100vh"}} ref={wheel}>
                첫번째 페이지
            </div>

            <div style={{backgroundColor: "#FFF", height: "100vh"}} ref={wheel1}>
                둘 페이지
            </div>

            <div style={{backgroundColor: "#DDD", height: "100vh"}} ref={wheel2}>
                셋 페이지
            </div>

            <div style={{backgroundColor: "#FFF", height: "100vh"}} ref={wheel3}>
                넷 페이지
            </div>

            <div style={{backgroundColor: "#DDD", height: "100vh"}} ref={wheel4}>
                넷 페이지
            </div>
        </article>
    );
};