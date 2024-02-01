import React, {useState} from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";
import styles from './About.module.css'

const About = () => {
    const [biography, setBiography] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    return <section className={styles.row}>
        <h1 className={panelCss.title}>About</h1>
        <h2 className={panelCss.specific_date_title}>Biography</h2>
        <textarea
            className={panelCss.specific_input}
            rows={7}
            onChange={(e) => setBiography(e.target.value)}
        />
        <h2 className={panelCss.specific_date_title}>Biography</h2>
        <textarea
            className={panelCss.specific_input}
            rows={3}
            onChange={(e) => setJobTitle(e.target.value)}
        />
        <p className={styles.info}>{`- The "Job title" will be displayed at the bottom of your name on the profile cards.`}</p>
        <p className={styles.info}>{`- Keep it short (2 or 3 words) Eg "Product designer, Senior software engineer".`}</p>
    </section>
};

export default About;
