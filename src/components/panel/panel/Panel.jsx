import React from 'react';
import {LazyLoadComponent} from 'react-lazy-load-image-component';
import NewArticles from "@/components/panel/panel/Articles/NewArticles/NewArticles";
import MyArticles from "@/components/panel/panel/Articles/MyArticles/MyArticles";
import Achievements from "@/components/panel/panel/Certificates/Achievements/Achievements";
import DashboardPanel from "@/components/panel/panel/Dashboard/Dashboard";
import Purchases from "@/components/panel/panel/Courses/Purchases/Purchases";
import FollowingCourses from "@/components/panel/panel/UpComingCourses/FollowingCourses/FollowingCourses";
import MyAssignments from "@/components/panel/panel/Assignments/MyAssignments/MyAssignments";
import Reservations from "@/components/panel/panel/Meetings/Reservations/Reservations";
import CompletionCertificates
    from "@/components/panel/panel/Certificates/CompletionCertificates/CompletionCertificates";
import MyPurchases from "@/components/panel/panel/Store/MyPurchases/MyPurchases";
import FinancialSummary from "@/components/panel/panel/Financial/FinancialSummary/FinancialSummary";
import Payout from "@/components/panel/panel/Financial/Payout/Payout";
import NewSupport from "@/components/panel/panel/Support/NewSupport/NewSupport";
import CoursesSupport from "@/components/panel/panel/Support/CoursesSupport/CoursesSupport";
import SettingSections from "@/components/panel/panel/Settings/SettingSections/SettingSections";
import {Notifications} from "@mui/icons-material";
import MyComments from "@/components/panel/panel/Courses/MyComments/MyComments";
import Favorites from "@/components/panel/panel/Courses/Favorites/Favorites";
import New from "@/components/panel/panel/UploadCourses/New/New";
import UploadCourses from "@/components/panel/panel/UploadCourses/UploadCourses";
const Panel = (props) => {
    const {openPanelName, slug} = props;
    const combinedSlug = slug.join('/');
    console.log("combinedSlug", combinedSlug);
    return <>
        <LazyLoadComponent>
            {combinedSlug === "dashboard" && <DashboardPanel slug={slug}/>}
            {combinedSlug === "purchase" && <Purchases slug={slug}/>}
            {combinedSlug === "favorites" && <Favorites slug={slug}/>}
            {combinedSlug === "comments" && <MyComments slug={slug}/>}
            {combinedSlug === "following-courses" && <FollowingCourses slug={slug}/>}
            {combinedSlug === "my-assignments" && <MyAssignments slug={slug}/>}
            {combinedSlug === "reservations" && <Reservations slug={slug}/>}
            {combinedSlug === "achievements" && <Achievements slug={slug}/>}
            {combinedSlug === "completion-certificates" && <CompletionCertificates slug={slug}/>}
            {combinedSlug === "my-purchases" && <MyPurchases slug={slug}/>}
            {combinedSlug === "financial-summary" && <FinancialSummary slug={slug}/>}
            {combinedSlug === "payout" && <Payout slug={slug}/>}
            {combinedSlug === "new-support" && <NewSupport slug={slug}/>}
            {combinedSlug === "courses-support" && <CoursesSupport slug={slug}/>}
            {combinedSlug === "settings" && <SettingSections slug={slug}/>}
            {combinedSlug === "notifications" && <Notifications slug={slug}/>}
            {combinedSlug === "new-article" && <NewArticles slug={slug}/>}
            {combinedSlug === "my-articles" && <MyArticles slug={slug}/>}
            {`${slug[0]}/${slug[1]}` === "webinar/new" && <UploadCourses slug={slug}/>}
        </LazyLoadComponent>
    </>
};

export default Panel;
