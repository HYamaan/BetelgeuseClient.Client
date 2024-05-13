import React, {useEffect, useState} from 'react';
import PanelNavigator from "@/components/panel/panelNavigator/PanelNavigator";
import Panel from "@/components/panel/panel/Panel";
import styles from './panel.module.css'
import {fetchPanelNavigation} from "@/lib/fetch";


const PanelPage = ({menuItems, slug}) => {
    const [openPanelName, setOpenPanelName] = useState(menuItems[0].componentName);


    return <section className={styles.PanelSection}>
        <section className={styles.PanelSection__sideBar}>
            <PanelNavigator
                menuItems={menuItems}
                setOpenPanelName={setOpenPanelName}
                openPanelName={openPanelName}
                slug={slug}
            />
        </section>
        <section className={styles.PanelSection__sidePanel}>
            <Panel openPanelName={openPanelName} slug={slug}/>
        </section>

    </section>
};

export default PanelPage;

export async function getServerSideProps({params}) {
    const menuItems = await fetchPanelNavigation();
    const {slug} = params;
    console.log("slug___", slug)
    return {
        props: {
            slug,
            menuItems
        },
    };
}
