import React from 'react';
import PopupWithForm from './PopupWithForm';
import api from '../utils/api';
import '../blocks/popup/popup.css';
import '../blocks/popup/_is-opened/popup_is-opened.css';

function AddPlacePopup({}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const openHandler = () => {
      setIsOpen(true);
    };
    addEventListener('open-add-place-popup', openHandler);
    return () => removeEventListener('open-add-place-popup', openHandler)
  }, []);


  function closePopup() {
    setIsOpen(false);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function onAddPlace(newCard) {
    api.addCard(newCard)
      .then((newCardFull) => {
        dispatchEvent(new CustomEvent("card-list-change", {
          detail: newCardFull
        }));
        closePopup();
      })
      .catch((err) => console.log(err));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={closePopup} title="Новое место" name="new-card"
    >
      <label className="popup__label">
        <input type="text" name="name" id="place-name"
               className="popup__input popup__input_type_card-name" placeholder="Название"
               required minLength="1" maxLength="30" value={name} onChange={handleNameChange} />
        <span className="popup__error" id="place-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="url" name="link" id="place-link"
               className="popup__input popup__input_type_url" placeholder="Ссылка на картинку"
               required value={link} onChange={handleLinkChange} />
        <span className="popup__error" id="place-link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
