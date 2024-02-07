import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setCategoryId } from '../Redux/slices/filterSlice.js';
import PizzaBlock from '../Components/PizzaBlock/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import Pagination from '../Components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const categoryId = useSelector(state => state.filter.categoryId);
  const activePop = useSelector(state => state.filter.sort.sortProperty);

  const dispatch = useDispatch();

  const { searchValue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [currentPage, setCurrentPage] = React.useState(1);

  const onClickCat = id => {
    dispatch(setCategoryId(id));
  };

  const items = pizzas.map(obj => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  React.useEffect(() => {
    setIsLoading(true);
    const order = activePop.includes('-') ? 'asc' : 'desc';
    const sortBy = activePop.replace('-', '');
    const categort = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    axios
      .get(
        `https://657855a6f08799dc8044f459.mockapi.io/pizzas?page=${currentPage}&limit=4&${categort}&sortBy=${sortBy}&order=${order}&${search}`,
      )
      .then(res => {
        setPizzas(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, activePop, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCat={onClickCat} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : items}</div>
      <Pagination onChangePage={number => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
