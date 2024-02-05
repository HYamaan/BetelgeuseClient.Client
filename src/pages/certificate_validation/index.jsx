'use client'
import React, {useState} from 'react';
import styles from "./certificate_validation.module.css"
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useFormik} from "formik";
import {certificateValidationSchema} from "@/schema/certificateValidationSchema";
import AuthActionButton from "@/components/ui/Button/AuthActionButton";
import {FaCertificate} from "react-icons/fa6";
import {GoogleReCaptchaProvider, useGoogleReCaptcha} from "react-google-recaptcha-v3";
import axios from "axios";

const CertificateValidation = () => {
    const {executeRecaptcha} = useGoogleReCaptcha();
    const [submit, setSubmit] = useState('')
    const onSubmit = async (values, actions) => {
        setSubmit('');
        if (!executeRecaptcha) {
            console.log("executeRecaptcha not found")
            return;
        }
        const gRecaptchaToken = await executeRecaptcha("certificate_validation");
        const response = await axios({
            method: "post",
            url: "/api/recaptchaSubmit/route",
            data: {
                gRecaptchaToken,
            },
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
        });

        if (response?.data?.success === true) {
            console.log(`Success with score: ${response?.data?.score}`);
            setSubmit('ReCaptcha Verified and Form Submitted!')
        } else {
            console.log(`Failure with score: ${response?.data?.score}`);
            setSubmit("Failed to verify recaptcha! You must be a robot!")
        }
    }

    const certificateValidationFormik = useFormik({
        initialValues: {
            certificateID: "",
        },
        onSubmit,
        validationSchema: certificateValidationSchema,
    });


    return (
        <section className={styles.certificate_section}>
            <div className={styles.certificate_row}>
                <div>
                    <LazyLoadImage
                        src={"/assets/image/background/certificate/certificate-banner.jpg"}
                        className={styles.certificate_banner}
                        alt="circle"
                    />
                </div>
                <div className={styles.certificate_validation}>
                    <h1 className={styles.validation__title}>Certificate Validation</h1>
                    <div className={styles.validation__description}>To validate certificates please enter the
                        certificate id
                        in this input field and click on validate button.
                    </div>
                    <form onSubmit={certificateValidationFormik.handleSubmit} className={styles.form}>
                        <AuthActionButton
                            name="certificateID"
                            type="text"
                            placeholder=""
                            value={certificateValidationFormik.values.certificateID}
                            errorMessage={certificateValidationFormik.errors.certificateID}
                            touched={certificateValidationFormik.touched.certificateID}
                            icon={<FaCertificate/>}
                            title="Certificate ID:"
                            onChange={certificateValidationFormik.handleChange}
                            onBlur={certificateValidationFormik.handleBlur}
                        />
                        <div className="flex items-center justify-center">
                            <span className="w-1/3"><button type="submit"
                                                            className={"button_dark"}>Search</button></span>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

const CertificateValidationWithRecaptchaProvider = () => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.GOOGLE_RECAPTCHA_V3_SITE_KEY}>
            <CertificateValidation/>
        </GoogleReCaptchaProvider>
    );
};

export default CertificateValidationWithRecaptchaProvider;
