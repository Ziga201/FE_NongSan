import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const PriceFilterSlider = ({ min, max, onChange }) => {
    const [value, setValue] = useState([min, max]);

    const handleSliderChange = (newValue) => {
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <div>
            <Slider step={1000} min={min} max={max} range value={value} onChange={handleSliderChange} />
            <div>
                Giá: {value[0]} VND - {value[1]} VND
            </div>
        </div>
    );
};

export default PriceFilterSlider;
