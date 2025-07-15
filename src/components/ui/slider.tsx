/**
 * Slider Component
 * ---------------
 * A beautiful, modern slider for adjusting numerical values (e.g., personality traits).
 * Used in character creation and trait editing UIs. Supports custom labels, min/max, and styling.
 */
import React from 'react';

/**
 * Props for the Slider component.
 * @property value - The current value of the slider.
 * @property onValueChange - Callback when the value changes.
 * @property min - Minimum value (default 0).
 * @property max - Maximum value (default 100).
 * @property step - Step size (default 1).
 * @property label - Optional label to display above the slider.
 * @property className - Optional additional CSS classes.
 */
interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  className?: string;
}

/**
 * Slider renders a styled range input for selecting a value.
 * @param value - The current value.
 * @param onValueChange - Callback when the value changes.
 * @param min - Minimum value.
 * @param max - Maximum value.
 * @param step - Step size.
 * @param label - Optional label.
 * @param className - Optional CSS classes.
 */
export const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  className = '',
}) => {
  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {label && (
        <div className="flex justify-between items-end mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</label>
          <span className="text-sm font-semibold text-blue-600">{value}</span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onValueChange(Number(e.target.value))}
        className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        style={{ accentColor: '#3b82f6' }}
      />
      {/* Custom track and thumb styling for a modern look */}
      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: #3b82f6;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
          border: 2px solid #fff;
          transition: background 0.2s, box-shadow 0.2s;
        }
        input[type='range']:hover::-webkit-slider-thumb {
          background: #2563eb;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.25);
        }
        input[type='range']:focus::-webkit-slider-thumb {
          outline: 2px solid #2563eb;
        }
        input[type='range']::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #3b82f6;
          border-radius: 50%;
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
          transition: background 0.2s, box-shadow 0.2s;
        }
        input[type='range']:hover::-moz-range-thumb {
          background: #2563eb;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.25);
        }
        input[type='range']:focus::-moz-range-thumb {
          outline: 2px solid #2563eb;
        }
        input[type='range']::-ms-thumb {
          width: 24px;
          height: 24px;
          background: #3b82f6;
          border-radius: 50%;
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
          transition: background 0.2s, box-shadow 0.2s;
        }
        input[type='range']:hover::-ms-thumb {
          background: #2563eb;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.25);
        }
        input[type='range']:focus::-ms-thumb {
          outline: 2px solid #2563eb;
        }
        input[type='range']::-webkit-slider-runnable-track {
          height: 6px;
          background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
          border-radius: 6px;
        }
        input[type='range']::-moz-range-track {
          height: 6px;
          background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
          border-radius: 6px;
        }
        input[type='range']::-ms-fill-lower {
          background: #3b82f6;
          border-radius: 6px;
        }
        input[type='range']::-ms-fill-upper {
          background: #60a5fa;
          border-radius: 6px;
        }
        input[type='range'] {
          outline: none;
        }
      `}</style>
    </div>
  );
}; 