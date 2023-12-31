import React from 'react';
import styles from './PopulerCategories.module.css'
import MostPopularCategories from '@/data/MostPopularCategories.json'

const TopCategories = () => {

    return (
        <section className={styles.Categories_Section}>
            <h1 className={styles.top_courses}>Most Popular Categorys</h1>
            <div className={styles.mostPopularCategories}>
                {MostPopularCategories.map((item, index) => {
                    const {title,iconClass,quantity}=item;
                   return <div className={styles.Categories_Cart} key={index}>
                        <p className={styles.icon_content}>
                            <i className={iconClass}></i>
                        </p>
                        <div className={styles.cart_description}>
                            <p className={styles.cart_title}>{title}</p>
                            <p>
                                <span className={styles.quantity}>{quantity}</span>
                                <span className={styles.first_letter}> C</span>ourses</p>
                        </div>
                    </div>
                })}
            </div>
        </section>
    );
};

export default TopCategories;
