export default function SamplePrevArrow(props) {
    const {currentSlide,className, style, onClick} = props;
    if (currentSlide === 0) {
        return null;
    } else {
        return (
            <div
                className={className}
                style={{...style, display: "block"}}
                onClick={onClick}
            />
        );
    }
}
