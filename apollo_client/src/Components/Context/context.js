import React, { useReducer } from "react";
import data from "../../data.json";
// global state same as store in redux
const AuthContext = React.createContext({
  user: null,
  mainApiData: data,
  login: data => {},
  logout: () => {}
});

function AuthReducer(state, action) {
  switch (action.type) {
    case "Login":
      return {
        ...state,
        user: action.payload
      };
    case "Logout":
      return {
        ...state,
        user: {}
      };
    case "deleteAccount":
      return {
        ...state,
        user: {}
      };

    default:
      return state;
  }
}

// dispatch actionswith actions on the store
// all the redux actions
function AuthProvider(props) {
  const [state, dispatch] = useReducer(AuthReducer, { user: null });
  const deleteSessionTokens = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("createdAt");
  };
  const login = data => {
    console.log("hey there how are login");
    dispatch({
      type: "Login",
      payload: data
    });
  };
  const logout = () => {
    dispatch({
      type: "Logout"
    });
  };
  const DeleteAcc = () => {
    deleteSessionTokens();
    dispatch({
      type: "Logout"
    });
  };

  return (
    // same as dispactch state to props
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
        DeleteAcc
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
