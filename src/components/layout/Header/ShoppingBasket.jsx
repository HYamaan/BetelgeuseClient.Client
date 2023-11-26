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
            className="absolute top-20 right-[10px] w-[22rem] bg-white-3 shadow-xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
            onMouseLeave={() => setShoppingBasketHover(null)}
        >
            <div className="h-[19.5rem] overflow-auto scrollbar-hide">
                {ShoppingCard.kurslar.map((course, index) => (
                    <div
                        key={index}
                        className="h-[6.5rem] flex items-center text-[15px] hover:bg-[#d3d3d3] hover:bg-opacity-25 border-b-2 border-b-fogGray"
                        onClick={() => {
                            handleChooseCourseClick(index);
                        }}
                    >
                        <div className="flex-2 flex items-center h-full justify-center">
                            <Image
                                src={`/assets/image/${course.image}`}
                                width={100}
                                height={160}
                                className="rounded-xl w-3/4 h-3/4"
                                alt={`Thumbnail for ${course.kurs_adi}`}
                            />
                        </div>
                        <div className="flex-1 flex-col justify-items-start">
                            <div className="font-medium line-clamp-2 text-[14px]">
                                {course.kurs_adi.length > 35 ? `${course.kurs_adi.substring(0, 35)}...` : course.kurs_adi}
                            </div>
                            <div className="mt-1 mb-3 font-[400] text-[12px]">{course.yayinci_kullanici}</div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-sapphireBlue text-[13px] font-medium">{`$${course.indirimli_fiyat}`}</p>
                                <p className="text-xs text-fogGray line-through">{`$${course.indirimsiz_fiyat}`}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mx-6 my-4">
                <div className="text-xl mb-3">
                    <span className="font-bold me-2">Toplam:</span>
                    <span className="font-medium">$100</span>
                    <span className="ms-4 text-lg text-fogGray line-through">400$</span>
                </div>
                <div className="px-8 py-4 text-white bg-sapphireBlue text-center rounded-lg">Checkout</div>
            </div>
        </div>
    );
};

export default ShoppingBasketComponent;
