import styles from "./header.module.css";
import {useState} from 'react';
import EbookJson from '../../../data/Ebook.json';
import {NavbarCssStyleUseEffect, NavbarStyle} from './cssStyle'

const  Ebook= (props) => {
    const {ebookHover} = props;
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [ebookStyle,setEbookStyle]=useState(NavbarStyle(ebookHover))

    //CSS
    NavbarCssStyleUseEffect(setEbookStyle,ebookHover)

    const handleCategoryClick = (categoryName) => {
        //console.log(`Category clicked: ${categoryName}`);
    };

    return (
        <div className={styles.categoryBookList} style={ebookStyle}>
            {/* BookCategories */}
            <div className={`${styles.categoryListCategory}`}>
                {EbookJson.bookCategories.map((category) => (
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
