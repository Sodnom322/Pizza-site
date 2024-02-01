import React from 'react';

function Categories({ value, onClickCat }) {
  const pizzaCategories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  return (
    <div className="categories">
      <ul>
        {pizzaCategories.map((categoryName, i) => (
          <li
            className={value === i ? 'active' : ''}
            onClick={() => onClickCat(i)}
            key={i}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Categories;
