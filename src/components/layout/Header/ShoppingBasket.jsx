import React, { useState } from 'react';
import Image from 'next/image';
import ShoppingCard from './../../../data/shoppingBasketProudct.json';

const ShoppingBasketComponent = ({ setShoppingBasketHover }) => {
    const [chooseCourse, setChooseCourse] = useState(null);
    const handleChooseCourseClick = (id) => {
        console.log('id', id);
    };

    return (
        <div
            className="absolute top-[4.5rem] right-1 w-[16.5rem] bg-white-3 shadow-xl rounded-xl"
            style={{ fontFamily: "'Inter', sans-serif", zIndex: 1000 }}
            onMouseLeave={() => setShoppingBasketHover(null)}
        >
            <div className="h-[16.5rem] overflow-auto scrollbar-hide">
                {ShoppingCard.kurslar.map((course, index) => (
                    <div
                        key={index}
                        className="h-[5.5rem] py-4 flex items-center text-[13px] hover:bg-[#d3d3d3] hover:bg-opacity-25 "
                        onClick={() => {
                            handleChooseCourseClick(index);
                        }}
                    >
                        <div className="flex-2 flex items-center h-full justify-center">
                            <Image
                                src={`/assets/image/${course.image}`}
                                width={100}
                                height={100}
                                className="rounded-xl w-3/4 h-3/4"
                                alt={`Thumbnail for ${course.kurs_adi}`}
                            />
                        </div>
                        <div className="flex-1 flex-col justify-items-start mt-2">
                            <div className="font-medium line-clamp-2 text-[12px]">
                                {course.kurs_adi.length > 35 ? `${course.kurs_adi.substring(0, 35)}...` : course.kurs_adi}
                            </div>
                            <div className="mt-1  font-[400] text-[12px]">{course.yayinci_kullanici}</div>
                            <div className="flex items-center gap-2">
                                <p className=" text-sapphireBlue text-[.77rem] font-medium">{`$${course.indirimli_fiyat}`}</p>
                                <p className=" text-fogGray line-through text-[.77rem]">{`$${course.indirimsiz_fiyat}`}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mx-6 my-4">
                <div className="text-lg mb-1 ">
                    <span className="ms-1 text-[16px] font-bold me-2">Toplam:</span>
                    <span className="text-[16px] font-medium">$100</span>
                    <span className="ms-3 text-[14px] text-fogGray line-through">400$</span>
                </div>
                <div className="px-8 py-2 text-white bg-sapphireBlue text-center rounded-lg">Checkout</div>
            </div>
        </div>
    );
};

export default ShoppingBasketComponent;
