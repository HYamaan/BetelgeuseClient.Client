import {useEffect, useState} from 'react';
import CategoriesJson from '../../../data/Categories.json';
import {FaAngleRight} from "react-icons/fa6";
import {MdArrowBackIos} from "react-icons/md";
import styles from "./header.module.css";
import {NavbarCssStyleUseEffect, NavbarStyle} from "@/components/layout/Header/cssStyle";

const CategoriesComponent = (props) => {
    const { closeIcon, setShowSubCategoriesForCss ,versionNavigation,categoriesHover} = props || {};
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    // MOBILE START
    const [categoryParent, setCategoryParent] = useState(true);
    const [categorySubChild, setCategorySubChild] = useState(true);
    const [backMenu, setBackMenu] = useState(false);
    // MOBILE END

    const [categoriesStyle,setCategoriesStyle]=useState(NavbarStyle(categoriesHover))

    //CSS
    NavbarCssStyleUseEffect(setCategoriesStyle,categoriesHover)
    const handleCategoryHover = (categoryName) => {

        setSelectedCategory(categoryName);
        setSelectedSubcategory(null);
    };

    const handleSubcategoryHover = (subcategoryName) => {
        setSelectedSubcategory(subcategoryName);
    };

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
        setSelectedSubcategory(null)
        if (!versionNavigation) {
            setCategoryParent(false);
            setShowSubCategoriesForCss(true);
        }
    };

    const handleSubcategoryClick = (subcategoryName) => {
        setSelectedSubcategory(subcategoryName);
        if (!versionNavigation) {
            setCategorySubChild(false);
        }
    };


    const handleTopicClick = (topic) => {
        //console.log(`Topic clicked: ${topic}`);
    };

    const handleBackMenu = () => {
        if (!versionNavigation) {
            setCategoryParent(true);
            setShowSubCategoriesForCss(false);
            setBackMenu(true);
        }
    };

    useEffect(() => {
        if (closeIcon) {
            setCategoryParent(true);
            setCategorySubChild(true);
            setShowSubCategoriesForCss(false);
        }
    }, [closeIcon,setShowSubCategoriesForCss]);

    const renderCategories = () => (
        <div className={`${styles.categoryListCategory}`}>
            {CategoriesJson.categories.map((category) => (
                <div
                    key={category.name}
                    className={`
                    ${styles.categoryListTitle} ${selectedCategory === category.name ? `${styles.categoryListTitleHover}` : ''}
                    `}
                    style={categoriesStyle}
                    {...(versionNavigation
                        ? {
                            onMouseEnter: () => handleCategoryHover(category.name),
                            onClick: () => handleCategoryClick(category.name)
                        }
                        : {onClick: () => handleCategoryClick(category.name)})}
                >
                    <div className="flex items-center justify-between w-full">
                        <p>{category.name}</p>
                        <FaAngleRight/>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderSubcategories = () => {
        if (!selectedCategory) return null;

        const selectedCategoryData = CategoriesJson.categories.find((category) => category.name === selectedCategory);

        return (
            <div className={`
      ${props.showSubCategoriesForCss && styles.mobile_nav_module_highlighted}
      ${!versionNavigation && categoryParent && "hidden "}
      ${props.showSubCategoriesForCss && styles.mobile_nav_module_category}
  
    `}>
                <div className={styles.categorySubListCategory}>
                    {!versionNavigation && (
                        <div
                            className="flex items-center justify-start gap-5 mb-4"
                            onClick={handleBackMenu}
                        >
                            <MdArrowBackIos/> Menu
                        </div>
                    )}

                    {selectedCategoryData?.subcategories.map((subcategory) => (
                        <div
                            key={subcategory.name}
                            className={`${styles.categoryListTitle} ${selectedSubcategory === subcategory.name ? styles.categoryListTitleHover : ''}`}
                            onMouseEnter={() => handleSubcategoryHover(subcategory.name)}
                            onClick={() => handleSubcategoryClick(subcategory.name)}
                        >
                            <p>{subcategory.name}</p>
                            {versionNavigation && <FaAngleRight/>}
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    const renderTopics = () => {
        if (!selectedSubcategory || !versionNavigation) return null;
        const selectedCategoryData = CategoriesJson.categories.find((category) => category.name === selectedCategory);
        const selectedSubcategoryData = selectedCategoryData?.subcategories?.find((subcategory) => subcategory.name === selectedSubcategory);

        return <>
            <div className={`
            ${!categorySubChild && styles.mobile_nav_module_highlighted} 
            ${styles.categoryTopListCategory} 
            ${!versionNavigation && categoryParent && "hidden"} 
            `}>
                {selectedSubcategoryData?.topics.map((topic) => (
                    <div
                        key={topic}
                        className={styles.categoryListPopularTopicTitle}
                        onClick={() => handleTopicClick(topic)}
                    >
                        {topic}
                    </div>
                ))}
            </div>
        </>
    };
    return (
        <div className={styles.categoryList} style={categoriesStyle}>
            {renderCategories()}
            {renderSubcategories()}
            {renderTopics()}
        </div>
    );
};

export default CategoriesComponent;
