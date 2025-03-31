import React, {lazy, Suspense } from "react";
import { Route, useHistory, Switch, BrowserRouter} from "react-router-dom";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import ReactDOM from "react-dom/client";
import "./index.css";

const Register = lazy(() => import('auth/Register').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
);

const Login = lazy(() => import('auth/Login').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
);


const App = () => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
  }

  return (
        // В компонент App внедрён контекст через CurrentUserContext.Provider
    // <CurrentUserContext.Provider value={currentUser}>
    <React.StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <div className="page__content">
          <Header email={email} onSignOut={onSignOut} />
            <Switch>
              <ProtectedRoute
                exact
                path="/"
                component={Register}
                // cards={cards}
                // onEditProfile={handleEditProfileClick}
                // onAddPlace={handleAddPlaceClick}
                // onEditAvatar={handleEditAvatarClick}
                // onCardClick={handleCardClick}
                // onCardLike={handleCardLike}
                // onCardDelete={handleCardDelete}
                // loggedIn={isLoggedIn}
              />
              <Route path="/signup">
                <Register />
              </Route>
              <Route path="/signin">
                <Login />
              </Route>
            </Switch>
          <Footer />
        </div>
      </BrowserRouter>
      </Suspense>
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