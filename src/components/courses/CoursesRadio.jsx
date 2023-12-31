import React from 'react';
import styles from "@/pages/courses/courses.module.css";
import {IoIosRadioButtonOff, IoIosRadioButtonOn} from "react-icons/io";
import {Rating} from "@mui/material";

const CoursesRadio = (prop) => {
    const{valueArray,
        stateValue,
        setStateValue,
        showAll,
        setShowAll,
        stars,
        title
    }=prop;
    const visibleArray = showAll ? valueArray : valueArray.slice(0, 5);

    const stringValue =(value)=> <span>{value.name ? value.name : value}</span>;
    const ratingsValue=(value)=> <span className={styles.stars}>
        <Rating name="half-rating-read" defaultValue={ +value} precision={0.5} readOnly />
    </span>

    return <>
        <div className={styles.categories_filter_embracing}>
            <p className={styles.categories_title}>{title}</p>
            {visibleArray.map((value, index) => {
                const key = value.guid ? value.guid : index;
                return (
                    <div key={key} className={styles.courses_filter_radio} onClick={() => setStateValue(key)}>
                        {stateValue === key ? <IoIosRadioButtonOn /> : <IoIosRadioButtonOff />}
                        {stars === undefined ? stringValue(value) : ratingsValue(value)}
                    </div>
                );
            })}
            {
                showAll !==undefined && (
                    <button className="w-4/5 mx-auto" onClick={() => setShowAll(!showAll)}>
                     <div className={styles.show_more}>
                         {valueArray.length > 8 && !showAll
                             ? <span> Show More</span>
                             :<span>Show Less</span>
                         }
                     </div>
                    </button>
                )
            }
        </div>
        </>


};

export default CoursesRadio;
