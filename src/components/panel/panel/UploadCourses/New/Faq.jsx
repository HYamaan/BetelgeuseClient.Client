import React, {useState} from 'react';
import styles from "@/components/panel/panel/UploadCourses/New/New.module.css";
import panelCss from "@/components/panel/panel/panel.module.css";
import {v4 as uuidv4} from "uuid";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {OutsideClickHandler} from "@/hooks/boxOutSideClick";
import {HiDotsVertical} from "react-icons/hi";
import PanelInput from "@/components/ui/Panel/Input/Input";
import PanelInputNumber from "@/components/ui/Panel/Input/PanelInputNumber";
import PanelDatePicker from "@/components/ui/Panel/Input/PanelDatePicker";
import FaqComponent from "@/components/panel/panel/UploadCourses/FaqComponent/FaqComponent";
import LearningMaterialsComponent from "@/components/panel/panel/UploadCourses/FaqComponent/LearningMaterialsComponent";
import CompanyLogosComponent from "@/components/panel/panel/UploadCourses/FaqComponent/CompanyLogosComponent";
import RequirementComponent from "@/components/panel/panel/UploadCourses/FaqComponent/RequirementComponent";

const Faq = () => {


    return <section className={styles.section}>
        <div className={styles.container}>
            <FaqComponent/>
            <LearningMaterialsComponent/>
            <CompanyLogosComponent/>
            <RequirementComponent/>
        </div>
    </section>
};

export default Faq;
