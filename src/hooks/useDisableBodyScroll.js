import { useEffect } from 'react';

const useDisableBodyScroll = (isEnabled) => {
    useEffect(() => {
        const handleScroll = (event) => {
            if (isEnabled) {
                event.preventDefault();
            }
        };

        if (isEnabled) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('scroll', handleScroll);
        }
        console.log("document.body.style.overflow ",document.body.style.overflow )
        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('scroll', handleScroll);
        };
    }, [isEnabled]);
};

export default useDisableBodyScroll;
