import React from "react";
import { Link } from "react-router-dom";

const NoCardsMessage = ({ image, title, text }) => {
  return (
    <div className="NoCardsMessageWrapper">
      <div className="NoCardsMessageBox">
        <img src={image} alt="sadEmoji" />
        <h2>{title}</h2>
        <p>{text}</p>
        <Link to="/">
          <button className="greenButton">
            <img src="img/arrow.svg" alt="Arrow" />
            Вернуться назад
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NoCardsMessage;
