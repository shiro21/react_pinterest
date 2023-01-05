import { useEffect, useRef, useState } from "react";
import styles from "../../styles/login.module.scss";
import ReactScrollWheelHandler from "react-scroll-wheel-handler"

// component
import { LoginHeader } from "./LoginHeader";
import { LoginSearch } from "./LoginSearch";
import { LoginSave } from "./LoginSave";
import { LoginShop } from "./LoginShop";
import { LoginBottom } from "./LoginBottom";
import { LoginForm } from "./LoginForm";

export const Login = () => {

    const top = useRef<HTMLDivElement>(null);
    const bottom = useRef<HTMLDivElement>(null);
    // const [fullSize, setFullSize] = useState(0);
    // const [sectionSize, setSectionSize] = useState(0);
    // 추가
    const [sectionAdd, setSectionAdd] = useState(0);
    const [sectionNumber, setSectionNumber] = useState(0);

    const [loginFormOpen, setLoginFormOpen] = useState<boolean>(false);
    const [loginOrJoin, setLoginOrJoin] = useState<string>("");
    let windowInnerHeight = window.innerHeight;

    useEffect(() => {
      // setFullSize(Number(top.current?.scrollHeight));
      // setSectionSize(Number(bottom.current?.scrollHeight));
      setSectionAdd(-Number(window.innerHeight) * sectionNumber);
    }, [windowInnerHeight, sectionNumber])

    const prevIndex = () => {
      if (sectionNumber === 0) return;
      setSectionNumber(prev => prev - 1);

      setSectionAdd(prev => prev + window.innerHeight);
    }
    const nextIndex = () => {
      if (sectionNumber === 4) return;
      setSectionNumber(prev => prev + 1);
      setSectionAdd(prev => prev - window.innerHeight);
    }
    

    return (
      <>
        <ReactScrollWheelHandler
          upHandler={prevIndex}
          downHandler={nextIndex}
        >
          <section style={{
            overflow: "hidden",
            height: window.innerHeight+"px"
          }}>
            <div ref={top} style={{
              position: "relative",
              height: "100%",
              touchAction: "none",
              transform: `translate3d(0px, ${sectionAdd}px, 0px)`,
              transition: "all 700ms ease 0s",
            }}>
              <div id="fullpage" style={{height: window.innerHeight+"px"}}>
                <div className={styles.table} style={{height: window.innerHeight+"px"}} ref={bottom}>
                  <LoginHeader setLoginFormOpen={setLoginFormOpen} setLoginOrJoin={setLoginOrJoin} />
                </div>

                <div className={`${styles.table} ${styles.search_color}`} style={{height: window.innerHeight+"px"}}>
                  <LoginSearch />
                </div>

                <div className={styles.table} style={{height: window.innerHeight+"px", overflow: "hidden"}}>
                  <LoginSave />
                </div>

                <div className={styles.table} style={{height: window.innerHeight+"px"}}>
                  <LoginShop />
                </div>

                <div className={styles.table} style={{height: window.innerHeight+"px"}}>
                  <LoginBottom />
                </div>
              </div>
            </div>
          </section>
        </ReactScrollWheelHandler>

        {
          loginFormOpen && <div className="bg_color" onClick={() => setLoginFormOpen(false)}></div>
        }
        {
          loginFormOpen && <LoginForm loginOrJoin={loginOrJoin} />
        }
      </>
    );
};