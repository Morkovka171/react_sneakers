import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import AppContext from "./context";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import Slider from "./components/Slider";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get("https://639f0f125eb8889197f35361.mockapi.io/cart"),
            axios.get("https://639f0f125eb8889197f35361.mockapi.io/favorites"),
            axios.get("https://639f0f125eb8889197f35361.mockapi.io/sneakers"),
          ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных");
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://639f0f125eb8889197f35361.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://639f0f125eb8889197f35361.mockapi.io/cart",
          obj
        );
        setCartItems((prev) => prev.map(item => {
          if(item.parentId === data.parentId){
            return{
              ...item,
              id: data.id
            };
          }
          return item;
        }));
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину");
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://639f0f125eb8889197f35361.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Ошибка при удалении из корзины");
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://639f0f125eb8889197f35361.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://639f0f125eb8889197f35361.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const isItemFavorited = (id) => {
    return favorites.some((obj) => obj.parentId === Number(id));
  };

  const handleSetCartOpened = (value) => {
    const body = document.querySelector('body');
    if (value) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
    setCartOpened(value);
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        isItemFavorited,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
        onAddToCart,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => handleSetCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => handleSetCartOpened(true)} />
        
        <Routes>
          <Route
            path=""
            exact
            element={
              <>
                  <Slider />
                  <Home
                  cartItems={cartItems}
                  items={items}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  onChangeSearchInput={onChangeSearchInput}
                  onAddToFavorite={onAddToFavorite}
                  onAddToCart={onAddToCart}
                  isLoading={isLoading}
                />
              </>
            }
          />
          <Route path="favorites" exact element={<Favorites />} />
          <Route path="orders" exact element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
