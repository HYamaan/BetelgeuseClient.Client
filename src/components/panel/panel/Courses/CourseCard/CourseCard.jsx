import React, {useEffect, useState} from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";
import styles from "./courseCard.module.css";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {HiDotsVertical} from "react-icons/hi";
import {Rating} from "@mui/material";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import PaginationUI from "@/components/ui/PaginationUi/paginationUI";

const CourseCard = ({AxiosName}) => {
    const [paginationNumber, setPaginationNumber] = useState(1);
    const [purchasesCourse, setPurchasesCourse] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const startIndex = (paginationNumber - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;

                const PurchasesCourse = await AxiosName(startIndex, endIndex);
                setPurchasesCourse(PurchasesCourse.data);

                // Calculate total pages and set it using setTotalPages
                const calculatedTotalPages = Math.ceil(PurchasesCourse.length / itemsPerPage);
                setTotalPages(calculatedTotalPages);
                window.scrollTo({top: 0, behavior: 'smooth'});
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [paginationNumber, AxiosName]);
    const handleClickPagination = (number) => {
        if (number > 0 && number <= totalPages) {
            setPaginationNumber(number);
        }
    };
    return <>
        {
            purchasesCourse && purchasesCourse.map((item, index) => (
                <div className={panelCss.panel_row} key={index}>
                    <div className={styles.col_12}>
                        <div className={styles.container}>
                            <div className={styles.container_image}>
                                <LazyLoadImage
                                    src={item.media.image}
                                    alt={item.media.image.split("/").pop()}
                                />
                                <span className={styles.container_image_badge}>{item.status}</span>
                            </div>
                            <div className={styles.container_information}>
                                <div className="flex justify-between items-center">
                                    <div className={styles.information__header}>
                                        <h2 className={styles.container_title}>{item.title}</h2>
                                        {
                                            item.info.map((info, index) =>
                                                <p className={`${styles[`course_information_${info.degree}`]}`}
                                                   key={index}>{info.type}
                                                </p>
                                            )
                                        }
                                    </div>
                                    <HiDotsVertical className={styles.information_other_button}/>
                                </div>
                                <div className={styles.information_ratings}>
                                    <Rating name="half-rating-read" defaultValue={item.rating} precision={0.5} readOnly/>
                                    <p className={styles.course_information_success}>{item.rating}</p>
                                </div>
                                <div className={styles.information_price}> {item.currency}{item.amount}</div>
                                <div className={styles.information_container}>
                                    <div className={styles.information}>
                                        <p className={styles.information_title}>Item ID:</p>
                                        <p className={styles.information_description}>{item.details.itemID}</p>
                                    </div>
                                    <div className={styles.information}>
                                        <p className={styles.information_title}>Category:</p>
                                        <p className={styles.information_description}>{item.details.category}</p>
                                    </div>
                                    <div className={styles.information}>
                                        <p className={styles.information_title}>Duration:</p>
                                        <p className={styles.information_description}>{item.details.duration}</p>
                                    </div>
                                    <div className={styles.information}>
                                        <p className={styles.information_title}>Start Date:</p>
                                        <p className={styles.information_description}>{item.details.startDate}</p>
                                    </div>
                                    <div className={styles.information}>
                                        <p className={styles.information_title}>Instructor:</p>
                                        <p className={styles.information_description}>{item.details.instructor}</p>
                                    </div>
                                    <div className={styles.information}>
                                        <p className={styles.information_title}>Purchase Date:</p>
                                        <p className={styles.information_description}>{item.details.purchaseDate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>))
        }
        <PaginationUI
            paginationNumber={paginationNumber}
            setPaginationNumber={setPaginationNumber}
            totalPages={totalPages}
        />
    </>
};

export default CourseCard;
