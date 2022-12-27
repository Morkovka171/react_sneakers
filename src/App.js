import React from "react";
import axios from "axios";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searhValue, setSearhValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("https://639f0f125eb8889197f35361.mockapi.io/sneakers")
      .then((res) => {
        setItems(res.data);
      });
      axios
      .get("https://639f0f125eb8889197f35361.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://639f0f125eb8889197f35361.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://639f0f125eb8889197f35361.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearhValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>
            {searhValue ? `Поиск по запросу:"${searhValue}"` : "Все кроссовки"}
          </h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searhValue && (
              <img
                onClick={() => setSearhValue("")}
                className="clear cu-p"
                src="/img/btn-remove.svg"
                alt="Clear"
              />
            )}
            <input
              onChange={onChangeSearchInput}
              value={searhValue}
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>
        <div className="d-flex flex-wrap wrapper_card">
          {items
            .filter((item) =>
              item.title.toLowerCase().includes(searhValue.toLowerCase())
            )
            .map((item, index) => (
              <Card
                key={index}
                id={item.id}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={() => console.log("Добавили в закладки")}
                onPlus={(obj) => onAddToCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
