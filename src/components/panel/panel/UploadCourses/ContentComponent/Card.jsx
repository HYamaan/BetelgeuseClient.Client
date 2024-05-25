import React from 'react';
import styles from "../New/New.module.css"

const CourseCard = () => {
    return <>
        <div className={styles.courseCard}>
            <div className={styles.icon}>
                <span>📅</span>
            </div>
            <div className={styles.courseDetails}>
                <h3 className={styles.title}>Different File Types</h3>
                <p className={styles.subtitle}>12 Topic | 0:00 Hr</p>
            </div>
            <div className={styles.actions}>
                <button className={styles.addButton}>+</button>
                <button className={styles.editButton}>✏️</button>
                <button className={styles.deleteButton}>🗑️</button>
                <button className={styles.moveButton}>↕️</button>
                <button className={styles.moreButton}>⋮</button>
            </div>
        </div>

    </>

};

export default CourseCard;
