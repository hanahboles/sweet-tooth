import './Slider.css'

interface SliderProps {
    label: String;
    max: number;
    min: number;
    onChange: React.ChangeEventHandler<HTMLInputElement>
    val: number;
}

function Slider({ val, label, max, min, onChange }: SliderProps) {
    return (
        <div className="slide-container">
            <input type="range" min={min} max={max} value={val} className="slider" onChange={(e) => onChange(e)} />
            <p>{label}</p>
        </div>
    )
}

export default Slider