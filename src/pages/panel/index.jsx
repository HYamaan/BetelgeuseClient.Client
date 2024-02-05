import React, {useEffect, useState} from 'react';
import PanelNavigator from "@/components/panel/panelNavigator/PanelNavigator";
import Panel from "@/components/panel/panel/Panel";
import styles from './panel.module.css'
import {fetchPanelNavigation} from "@/lib/fetch";

const PanelPage = ({menuItems}) => {
    const [openPanelName, setOpenPanelName] = useState(menuItems[0].componentName);
    useEffect(() => {
        console.log("openPanelName", openPanelName)
    }, [openPanelName]);
    return <section className={styles.PanelSection}>
        <section className={styles.PanelSection__sideBar}>
            <PanelNavigator
                menuItems={menuItems}
                setOpenPanelName={setOpenPanelName}
                openPanelName={openPanelName}
            />
        </section>
        <section className={styles.PanelSection__sidePanel}>
            <Panel openPanelName={openPanelName}/>
        </section>

    </section>
};

export default PanelPage;

export async function getServerSideProps() {
    const menuItems = await fetchPanelNavigation();

    return {
        props: {
            menuItems,
        },
    };
}
