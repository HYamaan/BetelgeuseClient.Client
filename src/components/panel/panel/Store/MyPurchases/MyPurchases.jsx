import React, {useEffect, useState} from 'react';
import styles from './MyPurchases.module.css'
import panelCss from "@/components/panel/panel/panel.module.css";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useMediaQuery} from "react-responsive";
import {OutsideClickHandler} from "@/hooks/boxOutSideClick";
import {HiDotsVertical} from "react-icons/hi";
import {fetchPanelStorePurchases} from "@/lib/fetch";
import PanelDatePicker from "@/components/ui/Panel/Input/PanelDatePicker";
import PanelSelect from "@/components/ui/Panel/Select";

const MyPurchases = () => {
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 992px)'})
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [sellerOption, setSellerOption] = useState("");
    const [typeOption, setTypeOption] = useState("");
    const [statusOption, setStatusOption] = useState("");
    const [myPurchasesValues, setMyPurchasesValues] = useState([]);
    const [myPurchasesEditButtons, setMyPurchasesEditButtons] = useState({});
    const seller = [
        {"value": "all", "text": "All"},
        {"value": "1995", "text": "Admin"},
        {"value": "1996", "text": "Robert Ransdell"},
        {"value": "1997", "text": "Ricardo dave"}
    ]
    const quiz = [
        {"value": "all", "text": "All quizzes"},
        {"value": "28", "text": "Virtual", "className": "none"},
        {"value": "29", "text": "Physical", "className": "none"}
    ];

    const status = [
        {"value": "all", "text": "All"},
        {"value": "waiting_delivery", "text": "Waiting for Delivery"},
        {"value": "shipped", "text": "Shipped"},
        {"value": "success", "text": "Completed"},
        {"value": "canceled", "text": "Canceled"}
    ];

    useEffect(() => {
        const myPurchasesInstructor = async () => {
            const response = await fetchPanelStorePurchases();
            setMyPurchasesValues(response);
        }
        myPurchasesInstructor();
    }, []);
    const handleSelectSellerChange = (e) => {
        setSellerOption(e.target.value);
    }
    const handleSelectTypeChange = (e) => {
        setTypeOption(e.target.value);
    }
    const handleSelectStatusChange = (e) => {
        setStatusOption(e.target.value);
    }
    const handlePurchasesSearch = () => {
    }
    const handleClickDownload = (guid) => {
    }
    const handleClickInvoice = (guid) => {
    }
    const handleClickFeedback = (guid) => {
    }
    const handleMyPurchasesButtonClick = (itemId) => {
        setMyPurchasesEditButtons((prevButtons) => ({
            ...prevButtons,
            [itemId]: !prevButtons[itemId],
        }));
    };

    return <div className={styles.section}>
        <h1 className={panelCss.title}>Purchases Statistics</h1>
        <div className={panelCss.container}>
            <div className={styles.purchases_statistics_row}>
                <div className={panelCss.status_summary_row_item}>
                    <div className={panelCss.status_summary_content}>
                        <LazyLoadImage
                            src={"/assets/image/background/panel/total-orders.png"}
                            alt="circle"
                        />
                        <p className={panelCss.status_summary_content_count}>3</p>
                        <p className={panelCss.status_summary_content_title}>Total Orders</p>
                    </div>
                </div>
                <div className={panelCss.status_summary_row_item}>
                    <div className={panelCss.status_summary_content}>
                        <LazyLoadImage
                            src={"/assets/image/background/panel/pending-orders.png"}
                            alt="circle"
                        />
                        <p className={panelCss.status_summary_content_count}>1</p>
                        <p className={panelCss.status_summary_content_title}>Pending Orders</p>
                    </div>
                </div>
                <div className={panelCss.status_summary_row_item}>
                    <div className={panelCss.status_summary_content}>
                        <LazyLoadImage
                            src={"/assets/image/background/panel/canceled-orders.png"}
                            alt="circle"
                        />
                        <p className={panelCss.status_summary_content_count}>0</p>
                        <p className={panelCss.status_summary_content_title}>Canceled Orders</p>
                    </div>
                </div>
                <div className={panelCss.status_summary_row_item}>
                    <div className={panelCss.status_summary_content}>
                        <LazyLoadImage
                            src={"/assets/image/background/panel/total-purchase.png"}
                            alt="circle"
                        />
                        <p className={panelCss.status_summary_content_count}>$74.50</p>
                        <p className={panelCss.status_summary_content_title}>Total Purchase</p>
                    </div>
                </div>
            </div>
        </div>
        <h1 className={panelCss.title}>Purchases Report</h1>
        <div className={panelCss.container}>
            <div className={styles.purchases_report_row}>
                <PanelDatePicker title="To" select={startDate} setSelect={setStartDate}/>
                <PanelDatePicker title="To" select={endDate} setSelect={setEndDate}/>
                <div className={panelCss.specific_date}>
                    <p className={panelCss.specific_date_title}>Seller</p>
                    <PanelSelect value={sellerOption} onChange={handleSelectSellerChange} Data={seller}/>
                </div>
                <div className={panelCss.specific_date}>
                    <p className={panelCss.specific_date_title}>Quiz</p>
                    <PanelSelect value={typeOption} onChange={handleSelectTypeChange} Data={quiz}/>
                </div>
                <div className={panelCss.specific_date}>
                    <p className={panelCss.specific_date_title}>Status</p>
                    <PanelSelect value={statusOption} onChange={handleSelectStatusChange} Data={status}/>
                </div>
                <div className={panelCss.specific_date_show}>
                    <div className="button_dark mt-2" onClick={() => handlePurchasesSearch()}>Show Results</div>
                </div>
            </div>
        </div>
        <h1 className={panelCss.title}>Purchases history</h1>
        {!isTabletOrMobile && <div className={panelCss.container}>
            <div className={`${styles.history_row} ${styles.history_row_head}`}>
                <div>Seller</div>
                <div>Order ID</div>
                <div>Price</div>
                <div>Discount</div>
                <div>Tax</div>
                <div>Delivery Fee</div>
                <div>Total Amount</div>
                <div>Type</div>
                <div>Status</div>
                <div>Date</div>
                <div></div>
            </div>
            {
                myPurchasesValues.map((item, index) => (
                    <div className={`${styles.history_row} ${styles.history_row_item}`} key={index}>
                        <div className={panelCss.instructor_item}>
                            <LazyLoadImage
                                src={item.instructor.imageSrc}
                                alt={item.instructor.imageSrc.split("/").pop()}
                                loading='lazy'
                                effect="opacity"
                            />
                            <div>
                                <p className={panelCss.instructor_item_title}>{item.instructor.title}</p>
                                <p className={panelCss.instructor_item_email}>{item.instructor.email}</p>
                            </div>
                        </div>
                        <div className={styles.orderId}><span>{item.orderId.Id}</span>
                            <span className={styles.orderId_productCount}>{item.orderId.productCount} Products</span>
                        </div>
                        <div>{item.currency}{item.price}</div>
                        <div>{item.currency}{item.discount}</div>
                        <div>{item.currency}{item.tax}</div>
                        <div>{item.currency}{item.deliveryFee}</div>
                        <div>{item.currency}{item.totalAmount}</div>
                        <div className="capitalize">{item.type}</div>
                        <div
                            className={`${panelCss[`status_${item.status.color}`]} capitalize`}>{item.status.text}</div>
                        <div>{item.timestamp.date} {item.timestamp.time}</div>
                        <div className={panelCss.comment_button}>
                            <OutsideClickHandler
                                onOutsideClick={() => setMyPurchasesEditButtons({})}
                            >
                                <HiDotsVertical
                                    onClick={() => handleMyPurchasesButtonClick(index)}
                                />
                                <div
                                    className={`${panelCss.button_edit} ${styles.view_button_edit} ${myPurchasesEditButtons[index] ? panelCss.button_active : ''}`}
                                >
                                    <span onClick={() => handleClickDownload(item.guid)}>Download</span>
                                    <span
                                        onClick={() => handleClickInvoice(item.guid)}>Invoice</span>
                                    <span onClick={() => handleClickFeedback(item.guid)}>Feedback</span>
                                </div>
                            </OutsideClickHandler>
                        </div>
                    </div>
                ))
            }
        </div>}
        {isTabletOrMobile && (
            myPurchasesValues.map((item, index) => (
                <div className={`${styles.history_row}  ${panelCss.container}`} key={index}>
                    <div className={styles.history_row_head}>Seller</div>
                    <div className={panelCss.instructor_item}>
                        <LazyLoadImage
                            src={item.instructor.imageSrc}
                            alt={item.instructor.imageSrc.split("/").pop()}
                        />
                        <div>
                            <p className={panelCss.instructor_item_title}>{item.instructor.title}</p>
                            <p className={panelCss.instructor_item_email}>{item.instructor.email}</p>
                        </div>
                    </div>
                    <div className={styles.history_row_head}>Order ID</div>
                    <div className={styles.orderId}><span>{item.orderId.Id}</span>
                        <span className={styles.orderId_productCount}>{item.orderId.productCount} Products</span>
                    </div>
                    <div className={styles.history_row_head}>Price</div>
                    <div>{item.currency}{item.price}</div>
                    <div className={styles.history_row_head}>Discount</div>
                    <div>{item.currency}{item.discount}</div>
                    <div className={styles.history_row_head}>Tax</div>
                    <div>{item.currency}{item.tax}</div>
                    <div className={styles.history_row_head}>Delivery Fee</div>
                    <div>{item.currency}{item.deliveryFee}</div>
                    <div className={styles.history_row_head}>Total Amount</div>
                    <div>{item.currency}{item.totalAmount}</div>
                    <div className={styles.history_row_head}>Type</div>
                    <div className="capitalize">{item.type}</div>
                    <div className={styles.history_row_head}>Status</div>
                    <div
                        className={`${panelCss[`status_${item.status.color}`]} capitalize`}>{item.status.text}</div>
                    <div className={styles.history_row_head}>Date</div>
                    <div>{item.timestamp.date} {item.timestamp.time}</div>
                    <div className={`${panelCss.comment_button} ${styles.purchases_button}`}>
                        <div className={styles.view_button} onClick={() => handleClickDownload(item.guid)}>
                            Download
                        </div>
                        <div className={styles.view_button}
                             onClick={() => handleClickInvoice(item.guid)}>
                            Invoice
                        </div>
                        <div className={styles.view_button}
                             onClick={() => handleClickFeedback(item.guid)}>
                            Feedback
                        </div>
                    </div>
                </div>
            ))
        )}
    </div>
};

export default MyPurchases;
