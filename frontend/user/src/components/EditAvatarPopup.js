import React from 'react';
import PopupWithForm from './PopupWithForm';
import api from '../utils/api';
import '../blocks/popup/popup.css';
import '../blocks/popup/_is-opened/popup_is-opened.css';

function EditAvatarPopup({}) {
  const inputRef = React.useRef();
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const openHandler = () => {
      setIsOpen(true);
    };
    addEventListener('open-edit-avatar-popup', openHandler);
    return () => removeEventListener('open-edit-avatar-popup', openHandler)
  }, []);
  
  function closePopup() {
    setIsOpen(false);
  }

  function onUpdateAvatar(avatarUpdate) {
    api
      .setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        dispatchEvent(new CustomEvent("profile-update", {
          detail: newUserData
        }));
        closePopup();
      })
      .catch((err) => console.log(err));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={closePopup} title="Обновить аватар" name="edit-avatar"
    >

      <label className="popup__label">
        <input type="url" name="avatar" id="owner-avatar"
               className="popup__input popup__input_type_description" placeholder="Ссылка на изображение"
               required ref={inputRef} />
        <span className="popup__error" id="owner-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
