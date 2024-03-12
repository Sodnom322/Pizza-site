import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://657855a6f08799dc8044f459.mockapi.io/pizzas/' + id,
        );
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <h1 style={{ marginLeft: 50 }}>Loading...</h1>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>

      <h4>{pizza.price} руб.</h4>
    </div>
  );
};

export default FullPizza;
