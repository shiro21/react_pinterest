import styles from "../../styles/main.module.scss";
import { CardWrap, PinsProps } from "../items/CardWrap";
import { SearchContentsProps } from "./Main";

export const MainContents = ({ popularData, searchValue }: { popularData: SearchContentsProps, searchValue: PinsProps[] }) => {
    return (
        <article id={styles.main_contents}>
            <CardWrap popularData={popularData} searchValue={searchValue} />
        </article>
    );
};
