import React, {useState} from 'react';
import PanelNavigator from "@/components/panel/panelNavigator/PanelNavigator";
import Panel from "@/components/panel/panel/Panel";
import styles from './panel.module.css'
import {fetchPanelNavigation} from "@/lib/fetch";

const PanelPage = ({menuItems}) => {
    const [openPanelId, setOpenPanelId] = useState(menuItems[0].id);
    return <section className={styles.PanelSection}>
        <section className={styles.PanelSection__sideBar}>
            <PanelNavigator
                menuItems={menuItems}
                setOpenPanelId={setOpenPanelId}
                openPanelId={openPanelId}
            />
        </section>
        <section className={styles.PanelSection__sidePanel}>
            <Panel/>
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
