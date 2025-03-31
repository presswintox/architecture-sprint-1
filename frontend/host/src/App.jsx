import React, {lazy} from "react";
import { Route, useHistory, Switch, BrowserRouter  } from "react-router-dom";
import Footer from "./components/Footer";
import ReactDOM from "react-dom/client";
import "./index.css";

const Register = lazy(() => import('auth/Register').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
);

const App = () => {

  return (
        // В компонент App внедрён контекст через CurrentUserContext.Provider
    // <CurrentUserContext.Provider value={currentUser}>
    <React.StrictMode>
      <BrowserRouter>
        <div className="page__content">
          <Switch>
            <Route path="/signup">
              <Register />
            </Route>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </React.StrictMode>
    //     <Header email={email} onSignOut={onSignOut} />
    //     <Switch>
    //       <ProtectedRoute
    //         exact
    //         path="/"
    //         component={Main}
    //         cards={cards}
    //         onEditProfile={handleEditProfileClick}
    //         onAddPlace={handleAddPlaceClick}
    //         onEditAvatar={handleEditAvatarClick}
    //         onCardClick={handleCardClick}
    //         onCardLike={handleCardLike}
    //         onCardDelete={handleCardDelete}
    //         loggedIn={isLoggedIn}
    //       />

    //       <Route path="/signin">
    //         <Login onLogin={onLogin} />
    //       </Route>
    //     </Switch>
    //     <Footer />
    //     <EditProfilePopup
    //       isOpen={isEditProfilePopupOpen}
    //       onUpdateUser={handleUpdateUser}
    //       onClose={closeAllPopups}
    //     />
    //     <AddPlacePopup
    //       isOpen={isAddPlacePopupOpen}
    //       onAddPlace={handleAddPlaceSubmit}
    //       onClose={closeAllPopups}
    //     />
    //     <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
    //     <EditAvatarPopup
    //       isOpen={isEditAvatarPopupOpen}
    //       onUpdateAvatar={handleUpdateAvatar}
    //       onClose={closeAllPopups}
    //     />
    //     <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    //     <InfoTooltip
    //       isOpen={isInfoToolTipOpen}
    //       onClose={closeAllPopups}
    //       status={tooltipStatus}
    //     />
    //   </div>
    // </CurrentUserContext.Provider>
  );
};
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)