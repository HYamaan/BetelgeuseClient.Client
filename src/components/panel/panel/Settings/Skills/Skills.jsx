import React, {useEffect, useState} from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";
import styles from "./Skills.module.css";

const Skills = () => {
    const [selectedValues, setSelectedValues] = useState([]);
    const skillsData = [
        {
            "value": "520",
            "label": "Design"
        },
        {
            "value": "601",
            "label": "Math"
        },
        {
            "value": "602",
            "label": "Science"
        },
        {
            "value": "603",
            "label": "Language"
        },
        {
            "value": "523",
            "label": "Health & Fitness"
        },
        {
            "value": "604",
            "label": "Lifestyle"
        },
        {
            "value": "605",
            "label": "Beauty & Makeup"
        },
        {
            "value": "525",
            "label": "Marketing"
        },
        {
            "value": "609",
            "label": "Management"
        },
        {
            "value": "610",
            "label": "Communications"
        },
        {
            "value": "611",
            "label": "Business Strategy"
        },
        {
            "value": "606",
            "label": "Web Development"
        },
        {
            "value": "607",
            "label": "Mobile Development"
        },
        {
            "value": "608",
            "label": "Game Development"
        }
    ];
    const handleItemClick = (item) => {
        const isAlreadySelected = selectedValues.some(
            (selectedItem) => selectedItem.value === item.value
        );
        console.log("isAlreadySelected", isAlreadySelected);
        if (isAlreadySelected) {
            const updatedValues = selectedValues.filter(
                (selectedItem) => selectedItem.value !== item.value
            );
            setSelectedValues(updatedValues);
        } else {
            setSelectedValues((prevValues) => [...prevValues, item]);
        }
    };
    useEffect(() => {
        console.log("selectedValues", selectedValues);
    }, [selectedValues]);

    return <section>
        <h1 className={panelCss.title}>Skills</h1>
        <div className={styles.items}>
            {skillsData.map((item, index) => {
                const isSelected = selectedValues.some(
                    (selectedItem) => selectedItem.value === item.value
                );
                const itemClass = isSelected ? styles.active : "";
                return <div className={`${styles.item} ${itemClass}`}
                            key={index}
                            onClick={() => handleItemClick(item)}
                >
                    {item.label}
                </div>
            })}
        </div>
    </section>
};

export default Skills;
