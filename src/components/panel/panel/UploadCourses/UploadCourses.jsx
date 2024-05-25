import React, {useState} from 'react';
import styles from "@/components/panel/panel/Settings/SettingSections/SettingSections.module.css";
import {LazyLoadImage} from "react-lazy-load-image-component";
import BasicInformation from "@/components/panel/panel/Settings/BasicInformation/BasicInformation";
import Images from "@/components/panel/panel/Settings/Images/Images";
import About from "@/components/panel/panel/Settings/About/About";
import Education from "@/components/panel/panel/Settings/Education/Education";
import Experiences from "@/components/panel/panel/Settings/Experiences/Experiences";
import Skills from "@/components/panel/panel/Settings/Skills/Skills";
import IdentityFinancial from "@/components/panel/panel/Settings/IdentityFinancial/IdentityFinancial";
import ExtraInformation from "@/components/panel/panel/Settings/ExtraInformation/ExtraInformation";
import {useMediaQuery} from "react-responsive";
import New from "@/components/panel/panel/UploadCourses/New/New";
import UploadExtraInformation from "@/components/panel/panel/UploadCourses/New/UploadExtraInformation";
import {useRouter} from "next/router";
import Pricing from "@/components/panel/panel/UploadCourses/New/Pricing";
import Faq from "@/components/panel/panel/UploadCourses/New/Faq";
import Content from "@/components/panel/panel/UploadCourses/New/Content";

const UploadCourses = ({slug}) => {
    const router = useRouter();
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 992px)'});
    const [currentPath, setCurrentPath] = useState(slug[2] || '');
    const sectionData = [
        {
            "id": 0,
            "text": "Basic Information",
            "imageSrc": "/assets/image/icons/basic-info.svg",
            "url": ""
        },
        {
            "id": 1,
            "text": "Extra Information",
            "imageSrc": "/assets/image/icons/images.svg",
            "url": "extra-information"
        },
        {
            "id": 2,
            "text": "Pricing",
            "imageSrc": "/assets/image/icons/about.svg",
            "url": "pricing"
        },
        {
            "id": 3,
            "text": "Content",
            "imageSrc": "/assets/image/icons/folder.svg",
            url: "content"
        },
        {
            "id": 4,
            "text": "FAQ",
            "imageSrc": "/assets/image/icons/graduate.svg",
            url: "faq"
        },
    ];
    const handleSectionClick = (url) => {
        const basePath = `/panel/${slug[0]}/${slug[1]}`;
        const newPath = `${basePath}/${url}`;
        setCurrentPath(url);
        router.push(newPath, undefined, {shallow: true});
    };
    const handleClickPrevious = () => {
    };
    const handleClickNext = () => {
    };
    const handleClickDeleteAccount = () => {
    };

    return <div>
        <div className={styles.webinar_progress}>
            {sectionData.map((item, index) => (
                <div className={`${styles.progress_item} ${currentPath === item.url && styles.active}`} key={index}
                     onClick={() => {
                         handleSectionClick(item.url)
                     }}>
                    <div className={`${styles.progress_icon} ${currentPath === item.url && styles.active}`}>
                        <LazyLoadImage src={item.imageSrc}
                                       alt={item.text}
                                       className={styles.image_cover}/>
                    </div>
                    <div className={styles.progress_icon_title}>
                        {currentPath === item.url && !isTabletOrMobile ? <span>{item.text}</span> : ""}
                        {isTabletOrMobile ? <span>{item.text}</span> : ""}
                    </div>
                </div>
            ))}
        </div>
        {currentPath === '' && <New/>}
        {currentPath === 'extra-information' && <UploadExtraInformation/>}
        {currentPath === 'pricing' && <Pricing/>}
        {currentPath === "content" && <Content/>}
        {currentPath === "faq" && <Faq/>}
        {/*{openSection === 5 && <Skills/>}*/}
        {/*{openSection === 6 && <IdentityFinancial/>}*/}
        {/*{openSection === 7 && <ExtraInformation/>}*/}

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

export default UploadCourses;
