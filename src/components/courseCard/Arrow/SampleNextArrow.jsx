import styless from './../courseCard.module.css'
export default function SampleNextArrow(props) {
    const {currentSlide,length, className, style, onClick} = props;
    if (currentSlide === length) {
        return null;
    } else {

    }
    return (<div
        className={`${className} ${styless.course_sample_next_arrow}}`}
        style={{...style, display: "block"}}
        onClick={onClick}

    />)
}
