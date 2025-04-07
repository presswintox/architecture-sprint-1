import React from 'react';
import api from '../utils/api';
import Card from './Card';
import '../blocks/places/places.css';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from 'user/CurrentUserContext';

function ListCard({}) {
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const currentUser = React.useContext(CurrentUserContext);
    
    function closePopup() {
        setSelectedCard(null);
    }

    function handleLikeClick(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api
          .changeLikeCardStatus(card._id, !isLiked)
          .then((newCard) => {
            setCards((cards) =>
              cards.map((c) => (c._id === card._id ? newCard : c))
            );
          })
          .catch((err) => console.log(err));
      }
      
    function handleCardDelete(card) {
        api
        .removeCard(card._id)
        .then(() => {
            setCards((cards) => cards.filter((c) => c._id !== card._id));
        })
        .catch((err) => console.log(err));
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    React.useEffect(() => {
        api.getCardList()
        .then((cardData) => {
            setCards(cardData);
        })
        .catch((err) => console.log(err));
    }, []);

    const handleCardListChange = event => { 
        setCards(prevCards => [event.detail, ...prevCards]);
    };

    React.useEffect(() => {
        addEventListener('card-list-change', handleCardListChange);
        return () => removeEventListener('card-list-change', handleCardListChange);
    }, []);
  return (
    <div>
        <section className="places page__section">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={handleLikeClick}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
        </section>
    <ImagePopup card={selectedCard} onClose={closePopup}/>
    <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
    </div>
  );
}

export default ListCard;
