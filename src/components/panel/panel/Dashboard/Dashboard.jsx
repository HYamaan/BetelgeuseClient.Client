import React from 'react';
import styles from "./dashboard.module.css";
import {LazyLoadImage} from "react-lazy-load-image-component";
import moment from "moment";


const DashboardPanel = ({slug}) => {
    const getFormattedCurrentDate = () => moment(new Date()).format("MMMM YYYY");
    const noticeBoard = [
        {
            title: "New Private Course Published",
            createdBy: "Created by Light Moon",
            date: "13 Jul 2021",
            time: "23:58",
        },
        {
            title: "New Class Published",
            createdBy: "Created by Light Moon",
            date: "13 Jul 2021",
            time: "04:30",
        },
        {
            title: "New Year Sales Festival",
            createdBy: "Created by Staff",
            date: "12 Jul 2021",
            time: "19:26",
        },
        {
            title: "Op Summer Classes",
            createdBy: "Created by Staff",
            date: "10 Jul 2021",
            time: "08:55",
        },
    ];
    return <>
        <h1 className={styles.title}>Dashboard</h1>
        <section className={styles.notification}>
            <h2>Hi Cameron Schofield,</h2>
            <h3>You have 57 new events</h3>
            <ul className={styles.notification__unread_lists}>
                <li>- Installment verification request approved</li>
                <li>- New reward point</li>
                <li>- New financial document</li>
                <li>- Installment verification request submitted</li>
                <li>- You got cashback!</li>
                <li>&nbsp;&nbsp;...</li>
            </ul>
            <div className={styles.notification__view_all}>View all events</div>
            <div className={styles.banner}>
                <LazyLoadImage
                    src={"/assets/image/background/panel/notification.png"}
                    alt="circle"
                />
            </div>
        </section>
        <section className={styles.information}>
            <div className={styles.information_row}>
                <div className={styles.information_col_25}>
                    <div className={styles.information__account_balance}>
                        <div className={styles.account_balance__title}>
                            <LazyLoadImage
                                src={"/assets/image/background/panel/account-balance.svg"}
                                alt="circle"
                            />
                            <h3>Account Balance</h3>
                            <span>$297.90</span>
                        </div>
                        <div className={styles.account_balance__charge}>
                            Charge account
                        </div>
                    </div>
                </div>
                <div className={styles.information_col_25}>
                    <div className={styles.information__parent__icon}>
                        <div className={`${styles.information__icon} ${styles.purchased}`}>
                            <LazyLoadImage
                                src={"/assets/image/background/panel/purchased.svg"}
                                alt="circle"
                            />
                        </div>
                        <div className={styles.information__icon_info}>
                            <span className={styles.information__icon_info_count}>10</span>
                            <span className={styles.information__icon_info_title}>Purchased Courses</span>
                        </div>
                    </div>
                    <div className={styles.information__parent__icon}>
                        <div className={`${styles.information__icon} ${styles.meeting_date}`}>
                            <LazyLoadImage
                                src={"/assets/image/background/panel/meeting.svg"}
                                alt="circle"
                            />
                        </div>
                        <div className={styles.information__icon_info}>
                            <span className={styles.information__icon_info_count}>0</span>
                            <span className={styles.information__icon_info_title}>Meetings</span>
                        </div>
                    </div>
                </div>
                <div className={styles.information_col_25}>
                    <div className={styles.information__parent__icon}>
                        <div className={`${styles.information__icon} ${styles.support_message}`}>
                            <LazyLoadImage
                                src={"/assets/image/background/panel/support.svg"}
                                alt="circle"
                            />
                        </div>
                        <div className={styles.information__icon_info}>
                            <span className={styles.information__icon_info_count}>1</span>
                            <span className={styles.information__icon_info_title}>Support Messages</span>
                        </div>
                    </div>
                    <div className={styles.information__parent__icon}>
                        <div className={`${styles.information__icon} ${styles.comments}`}>
                            <LazyLoadImage
                                src={"/assets/image/background/panel/comment.svg"}
                                alt="circle"
                            />
                        </div>
                        <div className={styles.information__icon_info}>
                            <span className={styles.information__icon_info_count}>2</span>
                            <span className={styles.information__icon_info_title}>Comments</span>
                        </div>
                    </div>
                </div>

            </div>
            <div className={styles.information_row}>
                <div className={styles.information_col_50}>
                    <div className={styles.information__noticeboard_list}>
                        <h3>Noticeboard</h3>
                        {noticeBoard.map((noticeboard, index) => (
                            <div className={styles.information__noticeboard_list_content} key={index}>
                                <div className={styles.information__noticeboard_item}>
                                    <div className={styles.information__noticeboard_item_content}>
                                        <h4>{noticeboard.title}</h4>
                                        <div className={styles.created_by}>
                                            <span className="mr-2">Created by {noticeboard.createdBy}</span>
                                            |
                                            <span className="ml-2">{noticeboard.date} | {noticeboard.time}</span>
                                        </div>
                                    </div>
                                    <div className={styles.more_info}>More info</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.information_col_50}>
                    <div className={styles.information__learning_statistics}>
                        <div className={styles.information__learning_statistics_title}>
                            <h2>Learning Statistics</h2>
                            <h3>{getFormattedCurrentDate()}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
};

export default DashboardPanel;
