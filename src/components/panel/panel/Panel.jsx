import React from 'react';
import DashboardPanel from "./Dashboard/Dashboard"
import Purchases from "@/components/panel/panel/Courses/Purchases/Purchases";
import Favorites from "@/components/panel/panel/Courses/Favorites/Favorites";
import MyComments from "@/components/panel/panel/Courses/MyComments/MyComments";
import FollowingCourses from "@/components/panel/panel/UpComingCourses/FollowingCourses/FollowingCourses";
import MyAssignments from "@/components/panel/panel/Assignments/MyAssignments/MyAssignments";
import Reservations from "@/components/panel/panel/Meetings/Reservations/Reservations";
import Achievements from "@/components/panel/panel/Certificates/Achievements/Achievements";
import CompletionCertificates
    from "@/components/panel/panel/Certificates/CompletionCertificates/CompletionCertificates";
import MyPurchases from "@/components/panel/panel/Store/MyPurchases/MyPurchases";
import FinancialSummary from "@/components/panel/panel/Financial/FinancialSummary/FinancialSummary";
import Payout from "@/components/panel/panel/Financial/Payout/Payout";
import NewSupport from "@/components/panel/panel/Support/NewSupport/NewSupport";
import {LazyLoadComponent} from 'react-lazy-load-image-component';
import CoursesSupport from "@/components/panel/panel/Support/CoursesSupport/CoursesSupport";
import SettingSections from "@/components/panel/panel/Settings/SettingSections/SettingSections";
import Notifications from "@/components/panel/panel/Notifications/Notifications";

const Panel = () => {
    return <>

        <LazyLoadComponent>
            <Notifications/>
        </LazyLoadComponent>
    </>
};

export default Panel;
