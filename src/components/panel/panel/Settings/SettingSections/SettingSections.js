import React, {useState} from 'react';
import styles from './SettingSections.module.css';
import {LazyLoadImage} from "react-lazy-load-image-component";
import BasicInformation from "@/components/panel/panel/Settings/BasicInformation/BasicInformation";
import Images from "@/components/panel/panel/Settings/Images/Images";
import {useMediaQuery} from "react-responsive";
import About from "@/components/panel/panel/Settings/About/About";
import Education from "@/components/panel/panel/Settings/Education/Education";
import Experiences from "@/components/panel/panel/Settings/Experiences/Experiences";
import Skills from "@/components/panel/panel/Settings/Skills/Skills";
import IdentityFinancial from "@/components/panel/panel/Settings/IdentityFinancial/IdentityFinancial";
import ExtraInformation from "@/components/panel/panel/Settings/ExtraInformation/ExtraInformation";

const SettingSections = () => {
    const [openSection, setOpenSection] = useState(0);
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 992px)'})
    const sectionData = [
        {
            "id": 0,
            "text": "Basic Information",
            "imageSrc": "/assets/image/icons/basic-info.svg"
        },
        {
            "id": 1,
            "text": "Images",
            "imageSrc": "/assets/image/icons/images.svg"
        },
        {
            "id": 2,
            "text": "About",
            "imageSrc": "/assets/image/icons/about.svg"
        },
        {
            "id": 3,
            "text": "Graduate",
            "imageSrc": "/assets/image/icons/graduate.svg"
        },
        {
            "id": 4,
            "text": "Experiences",
            "imageSrc": "/assets/image/icons/experiences.svg"
        },
        {
            "id": 5,
            "text": "Skill Topics",
            "imageSrc": "/assets/image/icons/skills.svg"
        },
        {
            "id": 6,
            "text": "Identity & Financial",
            "imageSrc": "/assets/image/icons/financial.svg"
        },
        {
            "id": 7,
            "text": "Extra Information",
            "imageSrc": "/assets/image/icons/extra_info.svg"
        }
    ];
    const handleClickPrevious = () => {
    };
    const handleClickNext = () => {
    };
    const handleClickDeleteAccount = () => {
    };
    return <div>
        <div className={styles.webinar_progress}>
            {sectionData.map((item, index) => (
                <div className={`${styles.progress_item} ${styles.active}`} key={index} onClick={() => {
                    setOpenSection(item.id)
                }}>
                    <div className={`${styles.progress_icon} ${openSection === item.id && styles.active}`}>
                        <LazyLoadImage src={item.imageSrc}
                                       alt={item.text}
                                       className={styles.image_cover}/>
                    </div>
                    <div className={styles.progress_icon_title}>
                        {openSection === item.id && !isTabletOrMobile ? <span>{item.text}</span> : ""}
                        {isTabletOrMobile ? <span>{item.text}</span> : ""}
                    </div>
                </div>
            ))}
        </div>
        {openSection === 0 && <BasicInformation/>}
        {openSection === 1 && <Images/>}
        {openSection === 2 && <About/>}
        {openSection === 3 && <Education/>}
        {openSection === 4 && <Experiences/>}
        {openSection === 5 && <Skills/>}
        {openSection === 6 && <IdentityFinancial/>}
        {openSection === 7 && <ExtraInformation/>}

        <div className={styles.buttonsSection}>
            <div className={styles.buttonsSection__col}>
                <div className="button_dark" onClick={handleClickPrevious}>Previous</div>
                <div className="button_dark" onClick={handleClickNext}>Next</div>
            </div>
            <div className={styles.buttonsSection__col}>
                <div className={`button_close ${styles.button_close}`} onClick={handleClickDeleteAccount}>Delete
                    Account
                </div>
                <div className={`button_dark ${styles.button_save}`} onClick={handleClickNext}>Save</div>
            </div>
        </div>
    </div>
};

export default SettingSections;
