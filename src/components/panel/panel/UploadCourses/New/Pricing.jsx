import React, {useEffect, useState} from 'react';
import styles from "@/components/panel/panel/UploadCourses/New/New.module.css";
import panelCss from "@/components/panel/panel/panel.module.css";
import PanelInputNumber from "@/components/ui/Panel/PanelInputNumber";
import {Checkbox} from "@mui/material";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import PanelInput from "@/components/ui/Panel/Input";
import PanelDatePicker from "@/components/ui/Panel/PanelDatePicker";
import {HiDotsVertical} from "react-icons/hi";
import {OutsideClickHandler} from "@/hooks/boxOutSideClick";

import {v4 as uuidv4} from 'uuid';
import {useSelector} from "react-redux";
import axios from "axios";
import {useCookies} from "react-cookie";
import {parseISO} from 'date-fns';

const Pricing = () => {
    const courseInformation = useSelector(state => state.courseInformation)
    const [cookies, setCookie] = useCookies();
    const [pricing, setPricing] = useState(0);
    const [isSubscription, setIsSubscription] = useState(false);
    const [isFree, setIsFree] = useState(false);
    const [commentEditButtons, setCommentEditButtons] = useState({});
    const [panels, setPanels] = useState([]);
    const toggleContent = (index) => {
        setPanels(currentPanels => currentPanels.map((panel, idx) => {
            if (idx === index) {
                return {...panel, isContentVisible: !panel.isContentVisible};
            }
            return panel;
        }));
    };


    useEffect(() => {
        const getPricing = async () => {
            var courseId = {
                "courseId": courseInformation.courseId
            }
            var result = await axios.get(`${process.env.API_SERVER}/Course/GetPricing?courseId=${courseInformation.courseId}`, {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`
                }
            });
            if (result.data.succeeded) {
                console.log("result.data", result.data)
                setPricing(result.data.pricing);
                setIsFree(result.data.isFree);
                var plans = result.data.pricingPlan;
                var newPlans = [];
                plans.forEach(plan => {
                    var newPlan = {
                        id: plan.id,
                        isContentVisible: false,
                        isFree: false,
                        language: plan.language,
                        title: plan.title,
                        capacity: parseInt(plan.capacity),
                        discount: parseInt(plan.discount),
                        startDate: parseISO(plan.startDate),
                        endDate: parseISO(plan.endDate)
                    };
                    newPlans.push(newPlan);
                });
                setPanels(newPlans);
            }
        }
        if (cookies.accessToken) {
            getPricing();
        }
    }, [cookies.accessToken]);

    const handleClickNewPlan = () => {
        const newPanel = {
            id: uuidv4(),
            isContentVisible: false,
            isFree: false,
            language: 1,
            title: "",
            capacity: 0,
            discount: 0,
            startDate: new Date(),
            endDate: new Date(new Date().setHours(new Date().getHours() + 1))
        };
        setPanels([...panels, newPanel]);
    };

    const handleInputChange = (index, field, value) => {
        setPanels(currentPanels => currentPanels.map((panel, idx) => {
            if (idx === index) {
                return {...panel, [field]: value};
            }
            return panel;
        }));
    };

    const handleTypeChange = (e, type) => {
        type === "isSubscription" && setIsSubscription(e.target.checked);
        type === "isFree" && setIsFree(e.target.checked);
    }

    const handleMultipleSubmit = async () => {
        const responseBody = {
            "courseId": courseInformation.courseId,
            "pricing": pricing,
            "isFree": isFree,
            "newCoursePricingPlanRequestDto": panels.map(panel => {
                return {
                    "language": panel.language,
                    "title": panel.title,
                    "capacity": panel.capacity,
                    "discount": panel.discount,
                    "startDate": panel.startDate,
                    "endDate": panel.endDate
                }
            })
        }
        console.log(`Bearer ${cookies.accessToken}`)
        await axios.post(`${process.env.API_SERVER}/Course/UploadPricing`, responseBody, {
            headers: {
                'Authorization': `Bearer ${cookies.accessToken}`,
            }
        }).then(response => {
            console.log('Success:', response);
        }).catch(error => {
            console.error('Error:', error.response.data);
        });
    };

    const onDragEnd = (result) => {
        const {source, destination, type} = result;
        console.log(result);
        // Hedef alana bir panel bırakılmamışsa veya aynı yere bırakılmışsa işlem yapma
        if (!destination || (destination.index === source.index && destination.droppableId === source.droppableId)) {
            return;
        }

        if (type === 'group') {
            const reOrderedPanels = [...panels];
            const [removedPanel] = reOrderedPanels.splice(source.index, 1);
            reOrderedPanels.splice(destination.index, 0, removedPanel);
            setPanels(reOrderedPanels);
        }
    };

    const handleCommentButtonClick = (commentId) => {
        setCommentEditButtons((prevButtons) => ({
            ...prevButtons,
            [commentId]: !prevButtons[commentId],
        }));
    };
    const handleClickDelete = async (commentId) => {
        console.log("commentId", commentId)

        var result = await axios.delete(`${process.env.API_SERVER}/Course/DeleteNewPricing?PricingId=${commentId}`, {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`
            }
        });
        console.log("result", result.data);
        if (result.data.succeeded) {
            setPanels(panels.filter(panel => panel.id !== commentId));
        }

    };


    return <section className={styles.section}>
        <div className={styles.container}>
            <div className={styles.input_width}>
                <div className={styles.checkbox_section}>
                    <p>Enable Subscribe</p>
                    <Checkbox checked={isSubscription} onChange={(e) => handleTypeChange(e, "isSubscription")}/>
                </div>
                <div className={styles.checkbox_section_subtitle}>- Students will be able to subscribe to your
                    content in addition of direct purchasing.
                </div>
                <div className={styles.checkbox_section}>
                    <p>Free</p>
                    <Checkbox checked={isFree} onChange={(e) => handleTypeChange(e, "isFree")}/>
                </div>
                <p className={panelCss.specific_date_title}>Price $</p>
                <PanelInputNumber setInput={setPricing} isDefaultValue={pricing} isDisabled={isFree}/>

            </div>
            <p className={`${panelCss.specific_date_title} ${panelCss.after_inline}`}>Price Optional</p>
            <div className={styles.checkbox_section_subtitle}>
                - Pricing plans will help you to create time & capacity depended prices for your content.
            </div>
            <div className={styles.checkbox_section_subtitle}>
                - You can create pricing plans for a limited time or limited number of course students.
            </div>
            <div className={styles.checkbox_section_subtitle}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                - If you don't create a pricing plan, your course base price will be considered.
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="ROOT" type="group">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {panels.map((panel, index) => (
                                <Draggable key={panel.id} draggableId={panel.id} index={index}>
                                    {(provided) => (
                                        <div {...provided.draggableProps} {...provided.dragHandleProps}
                                             ref={provided.innerRef}>
                                            <div className={styles.container_pricing_background}>
                                                <div className={styles.accordion_title}>
                                                    <p>{panel.title.length === 0 ? "New Pricing Plan" : panel.title}</p>
                                                    <div className="flex gap-2 justify-center items-center">
                                                        <i className="fa-solid fa-up-down-left-right"></i>
                                                        <div className={panelCss.comment_button}>

                                                            <OutsideClickHandler
                                                                onOutsideClick={() => setCommentEditButtons({})}
                                                            >
                                                                <HiDotsVertical
                                                                    onClick={() => handleCommentButtonClick(panel.id)}
                                                                />
                                                                <div
                                                                    className={`${panelCss.button_edit} ${commentEditButtons[panel.id] ? panelCss.button_active : ''}`}
                                                                >
                                                                    <span
                                                                        onClick={() => handleClickDelete(panel.id)}>Delete</span>
                                                                </div>
                                                            </OutsideClickHandler>
                                                        </div>
                                                        <i className={`fa-solid fa-angle-down ${panel.isContentVisible ? 'rotate-180' : ''}`}
                                                           onClick={() => toggleContent(index)}></i>
                                                    </div>
                                                </div>
                                                {
                                                    panel.isContentVisible && (
                                                        <div className={styles.accordion_content}>
                                                            <p className={panelCss.specific_date_title}>Language</p>
                                                            <select
                                                                className={panelCss.specific_input}
                                                                value={panel.language}
                                                                onChange={(e) => handleInputChange(index, 'language', Number(e.target.value))}
                                                            >
                                                                <option value={1}>Turkish</option>
                                                                <option value={2}>English</option>
                                                            </select>

                                                            <p className={panelCss.specific_date_title}>Title</p>
                                                            <PanelInput
                                                                setInput={(newValue) => handleInputChange(index, 'title', newValue)}
                                                                value={panel.title}
                                                                isDefaultValue={panel.title}
                                                            />

                                                            <p className={panelCss.specific_date_title}>Capacity</p>
                                                            <PanelInputNumber
                                                                setInput={(newValue) => handleInputChange(index, 'capacity', newValue)}
                                                                value={panel.capacity}
                                                                isDefaultValue={panel.capacity}
                                                            />

                                                            <p className={panelCss.specific_date_title}>Discount %</p>
                                                            <PanelInputNumber
                                                                setInput={(newValue) => handleInputChange(index, 'discount', newValue)}
                                                                value={panel.capacity}
                                                                isDefaultValue={panel.discount}
                                                            />
                                                            <div className={styles.date_section}>
                                                                <PanelDatePicker
                                                                    title="Start Date"
                                                                    select={panel.startDate}
                                                                    setSelect={date => handleInputChange(index, 'startDate', date)}
                                                                />
                                                                <PanelDatePicker
                                                                    title="End Date"
                                                                    select={panel.endDate}
                                                                    setSelect={date => handleInputChange(index, 'endDate', date)}
                                                                />
                                                            </div>
                                                            <div className={styles.button_close_content}>
                                                                <button className="button_close"
                                                                        onClick={() => toggleContent(index)}>Close
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                }

                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <div className="flex gap-2">
                <div className="w-32 mt-5">
                    <div className="button_light" onClick={handleClickNewPlan}>New Plan</div>
                </div>

                <div className="w-40 mt-5">
                    <div className="button_dark" onClick={handleMultipleSubmit}>Send Message</div>
                </div>
            </div>
        </div>
    </section>
};

export default Pricing;
