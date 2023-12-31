"use client"

import React from 'react';
import Image from "next/image";
import loginPic from "../../../../public/assets/gif/login-security.gif";
import AuthActionButton from "@/components/ui/Button/AuthActionButton";
import {registerSchema} from "@/schema/registerSchema";
import {FaRegEnvelope, FaUserAlt} from "react-icons/fa";
import {BiSolidLockAlt} from "react-icons/bi";
import {useFormik} from "formik";

const RegisterPage = () => {
    const onSubmit = async (values, actions) => {
        actions.preventDefault();
    }

    const RegisterFormik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: ""

        }, onSubmit,
        validationSchema: registerSchema,
    });
    const RegisterInputInfo = [
        {
            id: 1,
            name: "fullName",
            type: "text",
            placeholder: "Enter Your Full Name",
            value: RegisterFormik.values.fullName,
            errorMessage: RegisterFormik.errors.fullName,
            touched: RegisterFormik.touched.fullName,
            icon:<FaUserAlt/>,
            title:"first and lastname"
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Enter Your Email",
            value: RegisterFormik.values.email,
            errorMessage: RegisterFormik.errors.email,
            touched: RegisterFormik.touched.email,
            icon:<FaRegEnvelope/>,
            title:"email"
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "Enter Your valid Password",
            value: RegisterFormik.values.password,
            errorMessage: RegisterFormik.errors.password,
            touched: RegisterFormik.touched.password,
            icon:<BiSolidLockAlt/>,
            title:"your email"

        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            placeholder: "Enter Your Confirm Password",
            value: RegisterFormik.values.confirmPassword,
            errorMessage: RegisterFormik.errors.confirmPassword,
            touched: RegisterFormik.touched.confirmPassword,
            icon:<BiSolidLockAlt/>,
            title:"confirm passoword"
        }
    ]
    return <>
        <div className="container mx-auto flex items-center justify-center gap-6  mt-20">
            <div className="flex-1 self-start">
                <Image
                    src={loginPic}
                    alt="Picture of the author"
                    className="align-middle scale-110 "
                />
            </div>
            <div className="flex-1">
                <div className="flex flex-col">
                    <p className="text-5xl font-semibold text-fogGray">Sign up<span className="text-sapphireBlue">!</span></p>
                    <p className="mt-7 mb-10 text-lg text-fogGray">Explore, learn, and grow with us. enjoy a seamless and enriching educational journey. lets begin!</p>
                    <form onSubmit={RegisterFormik.handleSubmit}>
                        {RegisterInputInfo.map((input) => {
                            return <AuthActionButton
                                key={input.id}
                                {...input}
                                onChange={RegisterFormik.handleChange}
                                onBlur={RegisterFormik.handleBlur}
                            />
                        })}
                        <input type="submit" value="Login"  className="w-full bg-sapphireBlue text-xl rounded-2xl p-4 text-[#fff] cursor-pointer"/>
                    </form>
                    <p className="text-right mt-2 text-lg cursor-pointer">Forgot password?</p>
                    <p className="self-center text-2xl  mt-10">Already you have an account? <span className="m-5 text-sapphireBlue cursor-pointer">Log in</span></p>
                </div>
            </div>
        </div>
    </>
};

export default RegisterPage;
