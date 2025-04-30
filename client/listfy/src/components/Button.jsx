import React from 'react';



function Button({ type, variant = 'primary', children, ...rest }) {
  const buttonClasses = `
    inline-block px-6 py-3 text-base font-medium rounded-lg text-center
    transition-colors duration-300 ease-in-out
    ${variant === 'primary' ? 'bg-primaryPurple text-white hover:bg-purple-700' : 'bg-bg-3 text-black-1 hover:bg-gray-300'}
  `;

  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={buttonClasses}
      {...rest}
    >
      {children}
    </button>
  );
}

function SelectButton({ children, id, ...rest }) {
  const selectButtonClasses = `
    inline-block px-6 py-3 text-base font-medium rounded-lg text-center
    bg-bg-3 text-black-2 cursor-pointer transition-colors duration-300
    hover:bg-gray-200 focus:outline-none
  `;

    return (
        <select
            id={id}
            className={selectButtonClasses}
            {...rest}
        >
            {children}
        </select>
    );
};

export { SelectButton };
export default Button;
