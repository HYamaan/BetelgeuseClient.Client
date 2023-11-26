import styles from "./header.module.css";
import { useState } from 'react';
import CategoriesJson from '../../../data/Categories.json';
import { FaAngleRight } from "react-icons/fa6";

const CategoriesComponent = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    const handleCategoryHover = (categoryName) => {
        setSelectedCategory(categoryName);
        setSelectedSubcategory(null);
    };

    const handleSubcategoryHover = (subcategoryName) => {
        setSelectedSubcategory(subcategoryName);
    };

    const handleCategoryClick = (categoryName) => {
        console.log(`Category clicked: ${categoryName}`);
    };

    const handleSubcategoryClick = (subcategoryName) => {
        console.log(`Subcategory clicked: ${subcategoryName}`);
    };

    const handleTopicClick = (topic) => {
        console.log(`Topic clicked: ${topic}`);
    };

    // Json Error Control
    const selectedCategoryData = CategoriesJson.categories.find(
        (category) => category.name === selectedCategory
    );

    const selectedSubcategoryData =
        selectedCategoryData?.subcategories?.find(
            (subcategory) => subcategory.name === selectedSubcategory
        );


    return (

            <div className={styles.categoryList}>
                {/* Categories */}
                <div className={`${styles.categoryListCategory}`}>
                    {CategoriesJson.categories.map((category) => (
                        <div
                            key={category.name}
                            className={`${styles.categoryListTitle} ${
                                selectedCategory === category.name
                                    ? `${styles.categoryListTitleHover}`
                                    : ''
                            }`}
                            onMouseEnter={() => handleCategoryHover(category.name)}
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            <p>{category.name}</p>
                            <FaAngleRight />
                        </div>
                    ))}
                </div>

                {/* Subcategories */}
                {selectedCategoryData && (
                    <div className={`${styles.categoryListSubCategory}`}>
                        {selectedCategoryData?.subcategories.map((subcategory) => (
                            <div
                                key={subcategory.name}
                                className={`${styles.categoryListTitle} ${
                                    selectedSubcategory === subcategory.name
                                        ? `${styles.categoryListTitleHover}`
                                        : ''
                                }`}
                                onMouseEnter={() => handleSubcategoryHover(subcategory.name)}
                                onClick={() => handleSubcategoryClick(subcategory.name)}
                            >
                                <p>{subcategory.name}</p>
                                <FaAngleRight />
                            </div>
                        ))}
                    </div>
                )}

                {/* Topics */}
                {selectedSubcategoryData && (
                    <div className={`${styles.categoryListPopularTopic}`}>
                        {selectedSubcategoryData.topics.map((topic) => (
                            <div
                                key={topic}
                                className={styles.categoryListPopularTopicTitle}
                                onClick={() => handleTopicClick(topic)}
                            >
                                {topic}
                            </div>
                        ))}
                    </div>
                )}
            </div>
    );
};

export default CategoriesComponent;
