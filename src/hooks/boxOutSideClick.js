import {useEffect, useRef} from "react";

export const OutsideClickHandler = ({ children, onOutsideClick }) => {
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                onOutsideClick();
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onOutsideClick();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
        };
    }, [onOutsideClick]);

    return <div ref={wrapperRef}>{children}</div>;
};

