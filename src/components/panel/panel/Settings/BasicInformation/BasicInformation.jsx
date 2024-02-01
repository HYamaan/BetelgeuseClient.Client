import React from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";
import styles from './BasicInformation.module.css'
import {useFormik} from "formik";
import {PanelBasicInformationSchema} from "@/schema/PanelBasicInformationSchema";
import AccountInput from "@/components/ui/Panel/AccountInput";
import PanelSelect from "@/components/ui/Panel/Select";

const BasicInformation = () => {
    const onSubmit = async (values, actions) => {
        console.log("Burada", values);
    }
    const LanguageData = [
        {"value": "100", "text": "English"},
        {"value": "101", "text": "Turkish"},
    ];
    const TimezoneData = [
        {"value": "100", "text": "ABD"},
        {"value": "101", "text": "Turkey"},
    ];
    const CurrencyData = [
        {"value": "100", "text": "USD"},
        {"value": "101", "text": "TRY"},
    ]
    const BasicInformationFormik = useFormik({
        initialValues: {
            email: "",
            name: "",
            password: "",
            confirmPassword: "",
            phone: "",
            language: "",
            timezone: "",
            currency: "",
        }, onSubmit, validationSchema: PanelBasicInformationSchema,
    });
    const BasicInformationInput = [
        {
            id: 1,
            name: "email",
            type: "email",
            value: BasicInformationFormik.values.email,
            errorMessage: BasicInformationFormik.errors.email,
            touched: BasicInformationFormik.touched.email,
            title: "Email"
        },
        {
            id: 2,
            name: "name",
            type: "text",
            value: BasicInformationFormik.values.name,
            errorMessage: BasicInformationFormik.errors.name,
            touched: BasicInformationFormik.touched.name,
            title: "Name"
        },
        {
            id: 3,
            name: "password",
            type: "password",
            value: BasicInformationFormik.values.password,
            errorMessage: BasicInformationFormik.errors.password,
            touched: BasicInformationFormik.touched.password,
            title: "Password"
        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            value: BasicInformationFormik.values.confirmPassword,
            errorMessage: BasicInformationFormik.errors.confirmPassword,
            touched: BasicInformationFormik.touched.confirmPassword,
            title: "Retype Password"
        },
        {
            id: 5,
            name: "phone",
            type: "phone",
            value: BasicInformationFormik.values.phone,
            errorMessage: BasicInformationFormik.errors.phone,
            touched: BasicInformationFormik.touched.phone,
            title: "Phone"
        }
    ];

    return <section className={styles.section}>
        <h1 className={panelCss.title}>Account</h1>
        <div className={styles.row}>
            <form onSubmit={BasicInformationFormik.handleSubmit}>
                {
                    BasicInformationInput.map((input) => {
                        return <AccountInput
                            key={input.id}
                            {...input}
                            onChange={BasicInformationFormik.handleChange}
                            onBlur={BasicInformationFormik.handleBlur}
                        />
                    })
                }
                <h2 className={`${panelCss.specific_date_title} my-2`}>Language</h2>
                <PanelSelect
                    Data={LanguageData}
                    value={BasicInformationFormik.values.language}
                    onChange={BasicInformationFormik.handleChange}
                />
                <h2 className={`${panelCss.specific_date_title} my-2`}>Language</h2>
                <PanelSelect
                    Data={TimezoneData}
                    value={BasicInformationFormik.values.timezone}
                    onChange={BasicInformationFormik.handleChange}/>
                <h2 className={`${panelCss.specific_date_title} my-2`}>Currency</h2>
                <PanelSelect
                    Data={CurrencyData}
                    value={BasicInformationFormik.values.currency}
                    onChange={BasicInformationFormik.handleChange}/>
            </form>
        </div>
    </section>

};

export default BasicInformation;
