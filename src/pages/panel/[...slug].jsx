import React, { useState} from 'react';
import PanelNavigator from "@/components/panel/panelNavigator/PanelNavigator";
import Panel from "@/components/panel/panel/Panel";
import styles from './panel.module.css'
import {fetchPanelNavigation} from "@/lib/fetch";
import {Roles} from "@/enum/roles";
import cookie from 'cookie';
import jwt from 'jsonwebtoken';


const PanelPage = ({menuItems, slug,userRole}) => {
    const [openPanelName, setOpenPanelName] = useState(menuItems[0].componentName);

    return <section className={styles.PanelSection}>
        {
            Roles.Admin === userRole && (
                <>
                    <section className={styles.PanelSection__sideBar}>
                        <PanelNavigator
                            menuItems={menuItems.filter(item => item.accessibleToAdmin)}
                            setOpenPanelName={setOpenPanelName}
                            openPanelName={openPanelName}
                            slug={slug}
                            userRole={userRole}
                        />
                    </section>
                    <section className={styles.PanelSection__sidePanel}>
                        <Panel openPanelName={openPanelName} slug={slug}/>
                    </section>
                </>
            )
        }
        {
            Roles.Moderator === userRole && (
                <>
                    <section className={styles.PanelSection__sideBar}>
                        <p>Welcome, Moderator!</p>
                        <PanelNavigator
                            menuItems={menuItems.filter(item => item.accessibleToModerators)}
                            setOpenPanelName={setOpenPanelName}
                            openPanelName={openPanelName}
                            slug={slug}
                            userRole={userRole}
                        />
                    </section>
                    <section className={styles.PanelSection__sidePanel}>
                        <Panel openPanelName={openPanelName} slug={slug}/>
                    </section>
                </>
            )
        }
        {
            Roles.Student === userRole && (
                <>
                    <section className={styles.PanelSection__sideBar}>
                        <p>Welcome, Student!</p>
                        <PanelNavigator
                            menuItems={menuItems.filter(item => item.accessibleToStudents)}
                            setOpenPanelName={setOpenPanelName}
                            openPanelName={openPanelName}
                            slug={slug}
                            userRole={userRole}
                        />
                    </section>
                    <section className={styles.PanelSection__sidePanel}>
                        <p>Content available for students.</p>
                    </section>
                </>
            )
        }


    </section>
};

export default PanelPage;

export async function getServerSideProps({req,res,params}) {
    const menuItems = await fetchPanelNavigation();
    const cookies = cookie.parse(req.headers.cookie || '');
    const {slug} = params;



    let userRole = "Moderator";
    try {
        const decoded = jwt.verify(cookies.accessToken, `${process.env.JWT_TOKEN_SECRET}`);
        userRole = decoded.roles;
        console.log('Token decoded:', userRole);
    } catch (error) {
        console.error('Token parse error:', error);
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }


    return {
        props: {
            slug,
            menuItems,
            userRole
        },
    };
}
