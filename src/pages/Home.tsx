import React from 'react';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import {
  selectCategoryId,
  selectCurrentPage,
  selectSort,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../Redux/slices/filterSlice';
import PizzaBlock from '../Components/PizzaBlock/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Categories from '../Components/Categories';
import { popArr } from '../Components/Sort';
import Pagination from '../Components/Pagination/index';
import { SearchPizzaParams, fetchPizzas, selectPizzaData } from '../Redux/slices/pizzasSlice';
import { useAppDispatch } from '../Redux/store';
import SortPop from '../Components/Sort';

const Home: React.FC = () => {
  const categoryId = useSelector(selectCategoryId);
  const sort = useSelector(selectSort);
  const { items, status } = useSelector(selectPizzaData);
  const currentPage = useSelector(selectCurrentPage);
  const searchValue = useSelector((state: any) => state.filter.searchValue);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onClickCat = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
    window.scroll(0, 0);
  };

/*   React.useEffect(() => {
    if (window.location.search) {
      const params = (qs.parse(window.location.search.substring(1))) as unknown as SearchPizzaParams
      const sort = popArr.find(obj => obj.sortProperty === params.sortBy);
    
      dispatch(
        setFilters({
        searchValue:params.search,
        categoryId:Number(params.category),
        currentPage: Number(params.currentPage), 
        sort: sort ? sort : popArr[0],
        }),
      );
      isMounted.current = true;
    }
  }, []); */

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  React.useEffect(() => {
   
      getPizzas();
  
  }, [categoryId, sort, searchValue, currentPage]);

/*   React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        categoryId: categoryId > 0 ? categoryId : null,
        sortProperty: sort.sortProperty,
        currentPage,
      };
      const queryString = qs.stringify(params, { skipNulls: true });

      navigate(`/?${queryString}`);
    }
    if (!window.location.search) {
      dispatch(fetchPizzas({} as SearchPizzaParams));
    }
  }, [categoryId, sort.sortProperty, currentPage, navigate]);
 */
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCat={onClickCat} />
        <SortPop />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка 😕
            <p>
              К сожалению не удалось получить пиццы! Попробуйте поворить попытку
              позже
            </p>
          </h2>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
