import React, { useState } from 'react';
import Image from 'next/image';
import {useSelector} from "react-redux";

const ShoppingBasketComponent = ({ setShoppingBasketHover }) => {
    const shoppingBasketSelector = useSelector(state => state.shoppingBasket.shoppingBasketValue)
    const PriceSelector = useSelector(state => state.shoppingBasket.Price)
    const [chooseCourse, setChooseCourse] = useState(null);
    const handleChooseCourseClick = (id) => {

        setChooseCourse(id);
        console.log('id', chooseCourse);
    };

    return (
        <div
            className="absolute top-[4.5rem] right-1 w-[16.5rem] bg-white-3 shadow-xl rounded-xl"
            style={{ fontFamily: "'Inter', sans-serif", zIndex: 1000 }}
            onMouseLeave={() => setShoppingBasketHover(null)}
        >
            <div className="max-h-[16.5rem] overflow-auto scrollbar-hide">
                {shoppingBasketSelector.length > 0  ? (shoppingBasketSelector.map((course) => (
                    <div
                        key={course.guid}
                        className="h-[5.5rem] py-4 flex items-center text-[13px] hover:bg-[#d3d3d3] hover:bg-opacity-25 "
                        onClick={() => {
                            handleChooseCourseClick(course.guid);
                        }}
                    >
                        <div className="flex-2 flex items-center h-full justify-center m-2">
                            <Image
                                src={course.courseImage}
                                width={250}
                                height={250}
                                className="rounded-xl w-[4.2rem] h-[3.5rem]"
                                alt={course.courseName.split("/").pop()}
                            />
                        </div>
                        <div className="flex-1 flex-col justify-items-start mt-2">
                            <div className="font-medium line-clamp-2 text-[12px]">
                                {course.courseName.length > 35 ? `${course.courseName.substring(0, 45)}...` : course.courseName}
                            </div>
                            <div className="mt-1  font-[400] text-[12px]">{course.createdName}</div>
                            <div className="flex items-center gap-2">
                                {course.discountedPrice ?
                                    <p className=" text-sapphireBlue text-[.77rem] font-medium">{`$${course.discountedPrice}`}</p>:
                                    <p className=" text-sapphireBlue text-[.77rem] font-medium">{`$${course.price}`}</p>
                                }
                                <p className=" text-fogGray line-through text-[.77rem]">{`$${course.price}`}</p>
                            </div>
                        </div>
                    </div>
                ))) : (<div className="flex items-center justify-center h-[7rem] w-full">You have no items in your cart!</div>)}
            </div>
            <div className="mx-6 my-4">
                {shoppingBasketSelector.length > 0 && ( <div className="text-lg mb-1 ">
                    <span className="ms-1 text-[16px] font-bold me-2">Toplam:</span>
                    <span className="text-[16px] font-medium">${PriceSelector.discountPrice}</span>
                    <span className="ms-3 text-[14px] text-fogGray line-through">{PriceSelector.totalPrice}$</span>
                </div>)}
                <div className="px-8 py-2 text-white bg-sapphireBlue text-center rounded-lg">Checkout</div>
            </div>
        </div>
    );
};

export default ShoppingBasketComponent;
