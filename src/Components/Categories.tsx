import React from "react";

type CategoriesProps = {
  value:number;
  onClickCat:(i:number) => void;
}

const Categories:React.FC<CategoriesProps> = ({ value, onClickCat }) => {
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
