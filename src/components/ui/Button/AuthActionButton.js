import React from 'react';

const AuthActionButton = (props) => {
    const {title,placeholder, errorMessage,icon, touched, ...inputs} = props

    return <>
        {title && <p className="text-lg text-fogGray font-bold mb-3 capitalize">{title}</p>  }
        <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <i className="text-[#6b7280]"> {icon}</i>
            </div>
            <input
                {...inputs}
                type={inputs.type}
                placeholder={placeholder}
                className="bg-[#e5e7eb]  text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-4 outline-none"
            />
        </div>
    </>
};

export default AuthActionButton;
