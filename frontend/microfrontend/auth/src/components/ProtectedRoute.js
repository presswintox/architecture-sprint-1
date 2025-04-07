import React, {useState, useEffect} from 'react';
import { Route, Redirect, useHistory } from "react-router-dom";
import api from "../utils/api";

function ProtectedRoute({ component: Component, ...props  }){
  return (
    <Route exact>
      {
        () => props.isLoggedIn ? <Component {...props} /> : <Redirect to="./signin" />
      }
    </Route>
)}


export default ProtectedRoute;