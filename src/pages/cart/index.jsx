
import React, { useState} from 'react';
import styles from './cart.module.css'
import Image from 'next/image'
import {useSelector} from "react-redux";
import {FaRegTrashAlt} from "react-icons/fa";
import {GoDotFill} from "react-icons/go";
import {Rating} from "@mui/material";
const Cart = () => {
    const cartSelector =useSelector((state)=>state.shoppingBasket.cart);
    const [couponCode, setCouponCode] = useState('');
    const [couponCodeOpen,setCouponCodeOpen]=useState(false);

    const handleButtonClick = () => {
        console.log('Kupon Kodu:', couponCode);
    };

    return (
        <main className={styles.cart_main}>
            <div className={styles.header}>
                <h1 className={styles.cart_title}>Shopping Cart </h1>
                <div className={styles.action_buttons}>
                    Continue Shopping
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.list_container}>
                    <div className={styles.cart_items_container}>
                        <div className={styles.cart_item}>
                            <Image src="/assets/image/video1.jpg"
                                   width={150}
                                   height={150}
                                   className={styles.image_container}
                                   alt="video1"
                            />
                            <div className={styles.item_description}>
                                <div>
                                    <p className={styles.item_title}>Groupon Gift Card of $25 - Groupon Gift Card</p>
                                    <p className={styles.item_author}>Eğitmen: Jane Smith</p>
                                    <p className={styles.item_stars}>
                                        <span>4.6</span>
                                        <span>
                                        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                    </span>
                                        <span>(10.450 puan)</span>
                                    </p>
                                    <p className={styles.item_info}>
                                        <span> <GoDotFill /> 12.5 toplam saat</span>
                                        <span><GoDotFill /> 152 ders</span>
                                        <span><GoDotFill /> Tüm düzeyler</span>
                                    </p>
                                    <div className={styles.priceMobil}>
                                        <p><del>200.99 $</del></p>
                                        <p>160.77 $</p>
                                    </div>
                                </div>
                                <div className={styles.price}>
                                    <p>160$</p>
                                    <p><del>200$</del></p>
                                </div>
                                <div className={styles.item_trash}>
                                    <FaRegTrashAlt/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cart_overview_container}>
                    <div className={styles.cart_overview_container_first}>
                        <p className={styles.cart_summary_title}>Cart Summary</p>
                        <div className={styles.cart_subTotal}>
                            <p className={styles.cart_sub_total}><span>Ara toplam :</span>
                                <span>19$</span></p>
                            <p className={styles.cart_total}>
                                <span>Total:</span>
                                <span>19$</span>
                            </p>
                        </div>
                    </div>
                    <div className={styles.cart_overview_container_second}>
                            <div className={styles.couponCode_title}
                            onClick={()=>{setCouponCodeOpen(!couponCodeOpen)}}>Kupon kodu kullan</div>
                        {
                            couponCodeOpen && (
                                <div className={styles.couponCode_input}>
                                    <input type="text" placeholder="Kupon Kodu"
                                           onChange={(e) => setCouponCode(e.target.value)}/>
                                    <div className={styles.couponCode_button} onClick={handleButtonClick}>Button</div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Cart;
