import React, { useState, useEffect } from 'react';
import { Plus, Minus } from "lucide-react";

const InputNumber = ({ value, onChange, min = 0, max = 100 }) => {

    const handleDecrement = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    const handleIncrement = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    const handleChange = (e) => {
        const newValue = parseInt(e.target.value, 10);
        if (newValue >= min && newValue <= max) {
            onChange(newValue);
        }
    };


    return (
        <div className="w-full border-[0.5px] border-gray-200 rounded-md flex flex-row justify-between items-center">

            <button
                type="button"
                onClick={handleDecrement}
                className="py-3 px-6 border-r-[0.5px] border-gray-200 rounded-l-md bg-gray-100 active:bg-gray-300 transition-bg duration-200 ease-out"
            >
                <Minus size={16} />
            </button>
            <div>
                <input
                    type="number"
                    value={value}
                    onChange={handleChange}
                    min={min}
                    max={max}
                    className={`${value <= 0 ? 'hidden' : null} font-satoshi-medium text-center`}
                />
                <label className={`${value > 0 ? 'hidden' : null} font-satoshi-medium`}>Sin Limite</label>
            </div>
            <button
                type="button"
                onClick={handleIncrement}
                className="py-3 px-6 border-l-[0.5px] border-gray-200 rounded-r-md bg-gray-100 active:bg-gray-300 transition-bg duration-200 ease-out"
            >
                <Plus size={16} />
            </button>
        </div>
    );
}

export default InputNumber;