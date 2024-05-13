import React from 'react';
import styles from "@/components/panel/panel/UploadCourses/New/New.module.css";
import panelCss from "@/components/panel/panel/panel.module.css";

const Faq = () => {
    return <section className={styles.section}>
        <div className={styles.container}>
            <p className={`${panelCss.specific_date_title} ${panelCss.after_inline}`}>FAQ (Optional)</p>

        </div>
    </section>
};

export default Faq;
