import React, {useEffect, useState} from 'react';
import styles from './FinancialSummary.module.css';
import panelCss from "@/components/panel/panel/panel.module.css";
import {fetchPanelFinancialSummary} from "@/lib/fetch";
import PaginationUI from "@/components/ui/PaginationUi/paginationUI";
import {useMediaQuery} from "react-responsive";

const FinancialSummary = () => {
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 992px)'})
    const [paginationNumber, setPaginationNumber] = useState(1);
    const [purchasesCourse, setPurchasesCourse] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const startIndex = (paginationNumber - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;

                const PurchasesCourse = await fetchPanelFinancialSummary(startIndex, endIndex);
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
    }, [paginationNumber]);
    const handleClickPagination = (number) => {
        if (number > 0 && number <= totalPages) {
            setPaginationNumber(number);
        }
    };

    return <div className={styles.section}>
        <h1 className={panelCss.title}>Financial documents</h1>
        {!isTabletOrMobile && (
            <div className={panelCss.container}>
                <div className={`${styles.row} ${styles.row_head}`}>
                    <div>Title</div>
                    <div>Description</div>
                    <div>Amount ($)</div>
                    <div>Creator</div>
                    <div>Date</div>
                </div>
                {
                    purchasesCourse.map((item, index) => (
                        <div className={`${styles.row} ${styles.items}`} key={index}>
                            <div className={styles.item_title}>
                                <span>{item.type}</span>
                                <span className={styles.item_detail}>{item.detail}</span></div>
                            <div>{item.description}</div>
                            <div
                                className={`${item.incoming ? panelCss.status_success : panelCss.status_danger} text-[1rem] font-semibold`}>{item.incoming ? "+" : "-"}{item.amount}</div>
                            <div>{item.creator}</div>
                            <div>{item.date}</div>
                        </div>
                    ))
                }

            </div>
        )}
        {
            isTabletOrMobile && <>
                {
                    purchasesCourse.map((item, index) => (
                        <div className={`${styles.row} ${styles.items} ${panelCss.container}`} key={index}>
                            <div>Title</div>
                            <div className={styles.item_title}>
                                <span>{item.type}</span>
                                <span className={styles.item_detail}>{item.detail}</span></div>
                            <div>Description</div>
                            <div>{item.description}</div>
                            <div>Amount ($)</div>
                            <div
                                className={`${item.incoming ? panelCss.status_success : panelCss.status_danger} text-[1rem] font-semibold`}>{item.incoming ? "+" : "-"}{item.amount}</div>
                            <div>Creator</div>
                            <div>{item.creator}</div>
                            <div>Date</div>
                            <div>{item.date}</div>
                        </div>
                    ))
                }
            </>
        }
        <PaginationUI
            paginationNumber={paginationNumber}
            setPaginationNumber={setPaginationNumber}
            totalPages={totalPages}
        />

    </div>
};

export default FinancialSummary;
