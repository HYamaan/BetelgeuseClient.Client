import React, {useEffect, useState} from 'react';
import styles from "@/components/panel/panel/Articles/NewArticles/NewArticles.module.css"
import panelCss from "@/components/panel/panel/panel.module.css";
import PanelInput from "@/components/ui/Panel/Input/Input";
import OneFileUpload from "@/components/ui/Panel/OneFileUpload";
import axios from "axios";
import WYSIWYG from "@/components/ui/WYSIWYG/WYSIWYG";
import {useSelector} from "react-redux";
import {useCookies} from 'react-cookie';

const NewArticles = ({slug}) => {
    const selector = useSelector((state) => state.authToken);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState('');
    const [coverImage, setCoverImage] = useState([]);
    const [defaulImageUrl, setDefaultImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [keyWords, setKeyWords] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [cookies, setCookie] = useCookies();
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

    useEffect(() => {

        const fetchBlogEdit = async () => {
            var result = await axios.get(`${process.env.API_SERVER}/Blog/GetPanelBlogEdit?id=${slug[1]}`, {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`
                }
            });
            console.log(result.data)
            if (result.data.succeeded) {
                setTitle(result.data.data.title);
                setCategory(result.data.data.categoryId);
                setDescription(result.data.data.description);
                setContent(result.data.data.content);
                setKeyWords(result.data.data.keywords);
                setDefaultImageUrl(result.data.data.blogImage);
            }
        }
        if (slug.length > 1) {
            fetchBlogEdit();


        }
    }, []);

    async function handleMultipleSubmit(event) {
        event.preventDefault(); // Formun varsayılan gönderimini engelle

        const formData = new FormData();
        formData.append('Title', title);
        formData.append('BlogCategoriesID', category);
        formData.append('Keywords', keyWords);
        formData.append('Description', description);
        formData.append('Content', content);
        if (coverImage.length > 0) {
            formData.append('BlogImage', coverImage)
        }
        if (slug.length > 1) {
            formData.append('Id', slug[1]);
        }

        axios.post(`${process.env.API_SERVER}/Blog/CreateBlog`, formData, {
            headers: {
                'Authorization': `Bearer ${cookies.accessToken}`,
            }
        }).then(response => {
            console.log('Success:', response.data);
        }).catch(error => {
            console.error('Error:', error.response.data);
        });
    }

    const handleTypeChange = (e) => {
        setCategory(e.target.value)
    }


    return <>
        <section className={styles.section}>
            <h1 className={panelCss.title}>New Article</h1>
            <div className={panelCss.container}>
                <div className={styles.input_width}>
                    <p className={panelCss.specific_date_title}>Title</p>
                    <PanelInput setInput={setTitle} isDefaultValue={title}/>
                    <p className={panelCss.specific_date_title}>Category</p>
                    <select
                        className={panelCss.specific_input}
                        value={category}
                        onChange={handleTypeChange}
                    >
                        {categoryList.map((group, index) => (
                            <React.Fragment key={index}>
                                {/*TODO: parent category gözüküp gözükmeyeceği konusunda bakılacak*/}
                                {/*{group.parentCategoryID !== null && <option disabled>{group.parentCategoryName}</option>}*/}
                                {group.categories.map((categoryValue) => (
                                    <option key={categoryValue.categoryID} value={categoryValue.categoryID}
                                            defaultValue={category}>
                                        {categoryValue.name}
                                    </option>
                                ))}
                            </React.Fragment>
                        ))}
                    </select>

                    <p className={`${panelCss.specific_date_title} ${styles.marginBottom}`}>Cover Image</p>
                    <OneFileUpload file={coverImage} setFile={setCoverImage} className={styles.uploadImage}
                                   isDefaultValue={defaulImageUrl}/>
                    <p className={panelCss.specific_date_title}>Key Words</p>
                    <PanelInput setInput={setKeyWords} isDefaultValue={keyWords}/>
                </div>
                <p className={`${panelCss.specific_date_title} ${styles.marginTop}`}>Description</p>
                <WYSIWYG className={styles.wysiwyg} text={description} setText={setDescription}/>

                <p className={panelCss.specific_date_title}>Content</p>
                <WYSIWYG className={styles.wysiwyg} text={content} setText={setContent}/>
            </div>
            <div className="w-40">
                <div className="button_dark" onClick={handleMultipleSubmit}>Send Message</div>
            </div>
        </section>
    </>
};

export default NewArticles;
