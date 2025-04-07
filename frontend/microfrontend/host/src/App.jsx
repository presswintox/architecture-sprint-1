import React, {lazy, Suspense } from "react";
import { Route, useHistory, Switch, BrowserRouter} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./components/Main";
import api from 'auth/api';
// import CurrentUserProvider from 'user/CurrentUserProvider';
import CurrentUserContext from 'user/CurrentUserContext';

const Register = lazy(() => import('auth/Register').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
);

const Login = lazy(() => import('auth/Login').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
);

const AddPlacePopup = lazy(() => import('card/AddPlacePopup').catch(() => {
  return { default: () => <div className='error'>Compon12312312xavailable!</div> };
 }
));

const ProtectedRoute = lazy(() => import('auth/ProtectedRoute').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
);

const CurrentUserProvider = lazy(() => import('user/CurrentUserProvider').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
);


function App (){
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      api
        .checkToken(token)
        .then((res) => {
          // setEmail(res.data.email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [history]);

  function onSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/signup");
  }

  return (
      <div className="page__content">
        <Header email={currentUser.email} onSignOut={onSignOut} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              isLoggedIn={isLoggedIn}
            />
            <Route path="/signup">
              <Register />
            </Route>
            <Route path="/signin">
              <Login />
            </Route>
          </Switch>
          <AddPlacePopup/>
        <Footer />
      </div>

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

root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <CurrentUserProvider>
          <App />
        </CurrentUserProvider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
)
