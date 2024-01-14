import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = (props) => {
    const [rating, setRating] = useState(5);

    const handleClick = (star) => {
        props.setPointEvaluation(star);
        setRating(star);
    };

    return (
        <div>
            {[...Array(5)].map((_, index) => (
                <FaStar
                    key={index}
                    color={index < rating ? '#ffc107' : '#e4e5e9'}
                    size={24}
                    onClick={() => handleClick(index + 1)}
                    style={{ cursor: 'pointer' }}
                />
            ))}
        </div>
    );
};

export default StarRating;
