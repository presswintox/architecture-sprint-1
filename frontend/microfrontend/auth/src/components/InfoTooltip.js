import React from 'react';
import SuccessIcon from '../images/success-icon.svg';
import ErrorIcon from '../images/error-icon.svg';
import '../blocks/popup/popup.css';
import '../blocks/popup/_is-opened/popup_is-opened.css';

function InfoTooltip({}) {
  const [isOpen, setIsOpenPopup] = React.useState(false);
  const [status, setStatus] = React.useState('success');

  function closePopup() {
    setIsOpenPopup(false);
  }

  const openHandler = (event) => {
    console.log('Event received: ', event.detail);
    setIsOpenPopup(true);
    setStatus(event.detail);
  };

  React.useEffect(() => {
    addEventListener('open-info-tooltip', openHandler);
    return () => removeEventListener('open-info-tooltip', openHandler)
  }, []);

  const icon = status === 'success' ? SuccessIcon : ErrorIcon
  const text = status === 'success' ? "Вы успешно зарегистрировались" : 
     "Что-то пошло не так! Попробуйте ещё раз."
  return (
    <div className={`popup ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__content">
        <form className="popup__form" noValidate>
          <button type="button" className="popup__close" onClick={closePopup}></button>
            <div>
              <img className="popup__icon" src={icon} alt=""/>
              <p className="popup__status-message">{text}</p>
            </div>
        </form>
      </div>
    </div>
  );
}

export default InfoTooltip;

 