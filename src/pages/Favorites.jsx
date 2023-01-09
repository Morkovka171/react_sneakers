import React from "react";
import Card from "../components/Card";
import NoCardsMessage from '../components/NoCardsMessage';
import AppContext from "../context";

function Favorites() {
  const {favorites, onAddToFavorite} = React.useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>
      <div className="d-flex flex-wrap wrapper_card">
        {favorites.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onFavorite={onAddToFavorite}
            {...item}
          />
        ))}
        {
          favorites.length === 0 && 
          <NoCardsMessage
            image={"img/sad-2.svg"}
            title={"Закладок нет :("}
            text={"Вы ничего не добавляли в закладки"}
          />
        }
      </div>
    </div>
  );
}

export default Favorites;
