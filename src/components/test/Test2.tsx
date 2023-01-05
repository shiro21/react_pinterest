import { useEffect, useRef, useState } from "react";
import styles from "../../styles/login.module.scss";
import ReactScrollWheelHandler from "react-scroll-wheel-handler"

// component
import { LoginHeader } from "../login/LoginHeader";
import { LoginSearch } from "../login/LoginSearch";
import { LoginSave } from "../login/LoginSave";
import { LoginShop } from "../login/LoginShop";
import { LoginBottom } from "../login/LoginBottom";

export const Login = () => {
    const [windowHeight, setWindowHeight] = useState(0);

    const top = useRef<HTMLDivElement>(null);
    const bottom = useRef<HTMLDivElement>(null);
    const [classDiv, setClassDiv] = useState(0);
    const [totalHeight, setTotalHeight] = useState(0);
    const [topOffsetTop, setTopOffsetTop] = useState(0);
    const [topOffsetHeight, setTopOffsetHeight] = useState(0);
    const [innerHeight, setInnerHeight] = useState(0);

    window.onresize = function() {
      setInnerHeight(window.innerHeight);
      console.log('변경');
    }
    useEffect(() => {
      setWindowHeight(window.innerHeight);
      setTotalHeight(Number(bottom.current?.offsetHeight));
      setTopOffsetTop(Number(top.current?.offsetTop));
      setTopOffsetHeight(Number(top.current?.offsetHeight));
    }, [innerHeight])

    const prevIndex = () => {
      // if (Number(top.current?.offsetTop) === classDiv) return setClassDiv(0);
      if (Number(topOffsetTop) === classDiv) return setClassDiv(0);

      // setClassDiv(pre => pre + Number(top.current?.offsetHeight));
      setClassDiv(pre => pre + Number(windowHeight));
    }
    const nextIndex = () => {
      console.log(Math.abs(Number(totalHeight) - Number(topOffsetHeight)) === Math.abs(classDiv));
      console.log(Math.abs(Number(totalHeight)));
      console.log(Math.abs(Number(topOffsetHeight)));
      console.log(Math.abs(classDiv));
      if (Math.abs(Number(totalHeight) - Number(topOffsetHeight)) === Math.abs(classDiv)) return

      // setClassDiv(pre => pre - Number(top.current?.offsetHeight));
      setClassDiv(pre => pre - Number(windowHeight));
    }

    return (
      <>
        <ReactScrollWheelHandler
          upHandler={prevIndex}
          downHandler={nextIndex}
        >
          <section style={{
            overflow: "hidden",
            height: windowHeight+"px"
          }}>
            <div ref={top} style={{
              position: "relative",
              height: "100%",
              touchAction: "none",
              transform: `translate3d(0px, ${classDiv}px, 0px)`,
              transition: "all 700ms ease 0s",
            }}>
              <div id="fullpage" ref={bottom}>
                <div className={styles.table} style={{height: windowHeight+"px"}}>
                  {/* <LoginHeader /> */}
                </div>

                <div className={`${styles.table} ${styles.search_color}`} style={{height: windowHeight+"px"}}>
                  <LoginSearch />
                </div>

                <div className={styles.table} style={{height: windowHeight+"px", overflow: "hidden"}}>
                  <LoginSave />
                </div>

                <div className={styles.table} style={{height: windowHeight+"px"}}>
                  <LoginShop />
                </div>

                <div className={styles.table} style={{height: windowHeight+"px"}}>
                  <LoginBottom />
                </div>
              </div>
            </div>
          </section>
        </ReactScrollWheelHandler>
      </>
    );
};