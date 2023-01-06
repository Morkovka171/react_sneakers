import React from "react";
import axios from "axios";

import Card from "../components/Card";
import NoCardsMessage from '../components/NoCardsMessage';
import AppContext from "../context";

function Orders() {
  const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://639f0f125eb8889197f35361.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе заказов");
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap wrapper_card">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card key={index} loading={isLoading} {...item} />
        ))}
        {orders.length === 0 && (
          <NoCardsMessage
            image={"/img/sad.svg"}
            title={"У вас нет заказов"}
            text={"Оформите хотя бы один заказ"}
          />
        )}
      </div>
    </div>
  );
}

export default Orders;
