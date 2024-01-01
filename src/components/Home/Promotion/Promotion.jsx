import React from 'react';
import styles from "@/components/Home/Promotion/promotion.module.css";
import Image from "next/image";
import {useQuery} from "react-query";
import { fetchPromotion} from "@/lib/fetch";
const Promotion = () => {
    const { data:promotionData } = useQuery('Promotion', fetchPromotion);
    return <section className={styles.section}>
        {promotionData?.map((item,index)=>{
            const order=(index % 2 === 0);
            const {image,title,description,button_dark,button_light}=item;
            return  <div className={styles.promotionSection} key={index}>
                <div className={`${styles.promotion_image} ${order ? "order-2" : styles.promotion_imageFalse}`}>
                    <Image
                        src={image}
                        width={400}
                        height={460}
                        className={`${styles.banner_image} ${!order && styles.banner_imageFalse}`}
                        alt="banner"/>
                    <Image
                        src={"/assets/image/shape/promotion-shape.png"}
                        width={65}
                        height={65}
                        className={`${styles.dot_shape} ${!order && styles.dot_shapeFalse}`}
                        alt="shape"
                    />
                    <Image
                        src={"/assets/image/shape/circle-1.png"}
                        width={170}
                        height={170}
                        className={`${styles.circle} ${!order && styles.circleFalse}`}
                        alt="circle"
                    />
                </div>
                <div className={`${styles.promotionContainer} ${order ? "order-1" : styles.promotionContainerFalse}`}>
                    <h3 className={styles.promotion_title}>{title}</h3>
                    <p className={styles.promotion_description}>{description}</p>
                    <div className={styles.buttons}>
                        <div className={styles.button_dark}>{button_dark}</div>
                        <div className={styles.button_light}>{button_light}</div>
                    </div>
                </div>
            </div>
        })}
    </section>
};

export default Promotion;
