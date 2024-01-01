import styles from "./header.module.css";
import {useState} from 'react';
import {NavbarCssStyleUseEffect, NavbarStyle} from './cssStyle'
import {useQuery} from "react-query";
import {fetchBookCategories} from "@/lib/fetch";

const  Ebook= (props) => {
    const {ebookHover} = props;
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [ebookStyle,setEbookStyle]=useState(NavbarStyle(ebookHover))
    const { data:bookCategories } = useQuery('BookCategories', fetchBookCategories);

    //CSS
    NavbarCssStyleUseEffect(setEbookStyle,ebookHover)

    const handleCategoryClick = (categoryName) => {
        //console.log(`Category clicked: ${categoryName}`);
    };

    return (
        <div className={styles.categoryBookList} style={ebookStyle}>
            {/* BookCategories */}
            <div className={`${styles.categoryListCategory}`}>
                {bookCategories?.map((category) => (
                    <div
                        key={category.name}
                        className={`${styles.categoryListTitle} ${
                            selectedCategory === category.name
                                ? `${styles.categoryListTitleHover}`
                                : ''
                        }`}
                        onClick={() => handleCategoryClick(category.name)}
                    >
                        <p>{category.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ebook;
