import React from 'react';
import styles from './footer.module.css'
import {GiStripedSun} from "react-icons/gi";
import {FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter} from "react-icons/fa";
import {FooterSchema} from "@/schema/footerSchema";
import {useFormik} from "formik";
import {useQuery} from "react-query";
import {fetchFooter} from "@/lib/fetch";

const Footer = () => {
    const { data:footerData } = useQuery('footer', fetchFooter);

    const onSubmit = async (values, actions) => {
        actions.preventDefault();
        console.log("values",values)
        console.log("actions",actions)
    }
    const FooterFormik = useFormik({
        initialValues: {
            email: ""
        },
        onSubmit,
        validationSchema: FooterSchema,
    });
    return (
        <section className={styles.footer}>
            <div className={styles.footerSection}>
                <div className={styles.footerSubscribe}>
                    <div className={styles.footerSubscribe_title}>
                        <h2>Join us today</h2>
                        <span>#We will send the best deals and offers to your email.</span>
                    </div>

                    <form onSubmit={FooterFormik.handleSubmit} className={styles.join_us}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email here"
                                value={FooterFormik.values.email}
                                onChange={FooterFormik.handleChange}
                                onBlur={FooterFormik.handleBlur}
                                className={styles.formInput}
                            />
                            <input type="submit" value="Join" className={styles.button}/>
                    </form>
                </div>
                <div className={styles.container}>
                    <div className={styles.logoSection}>
                        <div className={styles.banner}>
                            <GiStripedSun className={styles.LogoSun}/>
                            <h3 className={styles.logoText}>Betelgeuse</h3>

                        </div>
                        <p>
                            Study any topic, anytime. explore thousands of courses for the lowest price ever!
                        </p>
                        <div className={styles.socialMediaSection}>
                            <span className={styles.contact_with_us}>Follow us</span>
                            <div>
                                <FaFacebookF/>
                            </div>
                            <div>
                                <FaInstagram/>
                            </div>
                            <div>
                                <FaTwitter/>
                            </div>
                            <div>
                                <FaLinkedinIn/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contents}>
                        {footerData?.map((section, index) => (
                            <div key={index}>
                                <h4>{section.title}</h4>
                                <div className={styles.title_contents}>
                                    {section.links.map((link, linkIndex) => (
                                        <p key={linkIndex}>
                                            <a href={link.url}>{link.text}</a>
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <div className={styles.footer_bottom}>
                    <div>
                        <p>Copyright &#169; 2023 Betelgeuse. Tüm hakları saklıdır.</p>
                    </div>
                    <div className={styles.footer_bottom_details}>
                        <p><span>Gizlilik Politikası</span></p>
                        <p><span>Davranış Kuralları</span></p>
                        <p><span>Aydınlatma Metni</span></p>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default Footer;
