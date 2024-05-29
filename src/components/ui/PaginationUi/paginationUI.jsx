import React from 'react';
import styles from "./paginationUi.module.css";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

const PaginationUI = ({paginationNumber, setPaginationNumber, totalPages}) => {
    const handleClickPagination = (number) => {
        if (number > 0 && number <= totalPages) {
            setPaginationNumber(number);
        }
    };
    return <>
        {
            paginationNumber > 0 && (
                <div className="my-10">
                    <nav className="flex justify-center items-center">
                        <ul className={styles.custom_pagination}>
                            <li className={paginationNumber === 1 ? styles.disabled : styles.previous}
                                onClick={() => handleClickPagination(paginationNumber - 1)}>
                                <span><FaChevronLeft/></span>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index + 1} onClick={() => handleClickPagination(index + 1)}>
                                        <span
                                            className={paginationNumber === index + 1 ? styles.active : ''}>{index + 1}</span>
                                </li>
                            ))}
                            <li className={paginationNumber === totalPages ? styles.disabled : styles.next}
                                onClick={() => handleClickPagination(paginationNumber + 1)}>
                                <span><FaChevronRight/></span>
                            </li>
                        </ul>
                    </nav>
                </div>
            )
        }</>
};

export default PaginationUI;
