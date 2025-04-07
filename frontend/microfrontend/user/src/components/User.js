import React, { use } from 'react';
import '../blocks/profile/profile.css';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
function User({}) {
  const currentUser = React.useContext(CurrentUserContext);

  function onAddPlace() {
      dispatchEvent(new CustomEvent("open-add-place-popup"));
  }

  function onEditAvatar() {
    dispatchEvent(new CustomEvent("open-edit-avatar-popup"));
  }  

  function onEditProfile() {
    dispatchEvent(new CustomEvent("open-edit-profile-popup"));
  }  

  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

  return (
    <div>
      <section className="profile page__section">
          <div className="profile__image" onClick={onEditAvatar} style={imageStyle}></div>
          <div className="profile__info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
              <p className="profile__description">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <EditAvatarPopup/>
      <EditProfilePopup/>
    </div>
  );
}

export default User;
