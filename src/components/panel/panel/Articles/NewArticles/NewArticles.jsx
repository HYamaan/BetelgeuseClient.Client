import React, {useEffect, useState} from 'react';
import styles from "@/components/panel/panel/Articles/NewArticles/NewArticles.module.css"
import panelCss from "@/components/panel/panel/panel.module.css";
import PanelInput from "@/components/ui/Panel/Input";
import OneFileUpload from "@/components/ui/Panel/OneFileUpload";
import axios from "axios";
import WYSIWYG from "@/components/ui/WYSIWYG/WYSIWYG";

const NewArticles = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState('');
    const [coverImage, setCoverImage] = useState([]);
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");

    const [categoryList, setCategoryList] = useState([]);
    const [type, setType] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`${process.env.API_SERVER}/Category/GetBlogCategory`);
                if (result.data.succeeded) {
                    setCategoryList(result.data.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setCategoryList([])
            }
        };
        fetchData();
    }, []);


    function handleMultipleSubmit(event) {
        event.preventDefault();
        const url = 'http://localhost:3000/uploadFiles';
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('coverImage', coverImage);
        formData.append('description', description);
        formData.append('content', content);
    }


    const handleTypeChange = (e) => {
        setCategory(e.target.value)
    }


    return <>
        <section className={styles.section}>
            <h1 className={panelCss.title}>New Article</h1>
            <div className={panelCss.container}>
                <p className={panelCss.specific_date_title}>Title</p>
                <PanelInput setInput={setTitle}/>
                <p className={panelCss.specific_date_title}>Category</p>
                <select
                    className={panelCss.specific_input}
                    value={type}
                    onChange={handleTypeChange}
                >
                    {categoryList.map((group, index) => (
                        <React.Fragment key={index}>
                            {/*TODO: parent category gözüküp gözükmeyeceği konusunda bakılacak*/}
                            {/*{group.parentCategoryID !== null && <option disabled>{group.parentCategoryName}</option>}*/}
                            {group.categories.map((category) => (
                                <option key={category.categoryID} value={category.categoryID}>
                                    {category.name}
                                </option>
                            ))}
                        </React.Fragment>
                    ))}
                </select>

                <p className={panelCss.specific_date_title}>Cover Image</p>
                <OneFileUpload file={coverImage} setFile={setCoverImage}/>
                <p className={panelCss.specific_date_title}>Description</p>
                <WYSIWYG className={styles.wysiwyg}/>
            </div>
            <div className="w-40">
                <div className="button_dark" onClick={handleMultipleSubmit}>Send Message</div>
            </div>
        </section>
    </>
};

export default NewArticles;
