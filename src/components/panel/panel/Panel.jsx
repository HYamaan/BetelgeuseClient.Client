import React from 'react';
import {LazyLoadComponent} from 'react-lazy-load-image-component';
import NewArticles from "@/components/panel/panel/Articles/NewArticles/NewArticles";

const Panel = (props) => {
    const {openPanelName} = props;
    return <>
        <LazyLoadComponent>
            <NewArticles/>
            {/*{openPanelName === "DashboardPanel" && <DashboardPanel/>}*/}
            {/*{openPanelName === "Purchases" && <Purchases/>}*/}
            {/*{openPanelName === "Favorites" && <Favorites/>}*/}
            {/*{openPanelName === "MyComments" && <MyComments/>}*/}
            {/*{openPanelName === "FollowingCourses" && <FollowingCourses/>}*/}
            {/*{openPanelName === "MyAssignments" && <MyAssignments/>}*/}
            {/*{openPanelName === "Reservations" && <Reservations/>}*/}
            {/*{openPanelName === "Achievements" && <Achievements/>}*/}
            {/*{openPanelName === "CompletionCertificates" && <CompletionCertificates/>}*/}
            {/*{openPanelName === "MyPurchases" && <MyPurchases/>}*/}
            {/*{openPanelName === "FinancialSummary" && <FinancialSummary/>}*/}
            {/*{openPanelName === "Payout" && <Payout/>}*/}
            {/*{openPanelName === "NewSupport" && <NewSupport/>}*/}
            {/*{openPanelName === "CoursesSupport" && <CoursesSupport/>}*/}
            {/*{openPanelName === "SettingSections" && <SettingSections/>}*/}
            {/*{openPanelName === "Notifications" && <Notifications/>}*/}
            {/*{openPanelName === "NewArticles" && <NewArticles/>}*/}
            {/*{openPanelName === "MyArticles" && <MyArticles/>}*/}
        </LazyLoadComponent>
    </>
};

export default Panel;
