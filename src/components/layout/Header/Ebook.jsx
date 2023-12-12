import styles from "./header.module.css";
import { useState } from 'react';
import EbookJson from '../../../data/Ebook.json';
import { FaAngleRight } from "react-icons/fa6";

const EbookComponent = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleBookHover = (categoryName) => {
        setSelectedCategory(categoryName);
    };
    const handleCategoryClick = (categoryName) => {
        //console.log(`Category clicked: ${categoryName}`);
    };

    const handleSubcategoryClick = (subcategoryName) => {
        //console.log(`Subcategory clicked: ${subcategoryName}`);
    };

    const selectedBookData = EbookJson.bookCategories.find(
        (category) => category.name === selectedCategory
    );

    return (
        <div className={styles.categoryBookList}>
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
                        onMouseEnter={() => handleBookHover(category.name)}
                        onClick={() => handleCategoryClick(category.name)}
                    >
                        <p>{category.name}</p>
                        <FaAngleRight />
                    </div>
                ))}
            </div>

            {/* Books */}
            {selectedBookData && (
                <div className={`${styles.categoryBookListPopularTopic}`}>
                    {selectedBookData.subcategories.map((topic) => (
                        <div
                            key={topic}
                            className={styles.categoryListPopularTopicTitle}
                            onClick={() => handleSubcategoryClick(topic)}
                        >
                            {topic}
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
};

export default EbookComponent;
