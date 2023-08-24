import React from "react";
import { Input, Menu, Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import jwt from "jwt-decode";
import { Image } from "semantic-ui-react";

import { Icon } from "semantic-ui-react";
// context-hook
import { AuthContext } from "../../Context/context";
import Drawer from "./Drawer";

const Navbar = () => {
  const context = React.useContext(AuthContext);
  const [activeItem, setActivename] = React.useState("home");
  const [token, setToken] = React.useState("notoken");
  const [currentUser, setCurrentUser] = React.useState("");
  const [complete, setComplete] = React.useState({});

  const handleItemClick = (e, { name }) => setActivename(name);

  const mainToken = () => {
    let loc = window.location.href;
    loc = loc.replace("http://localhost:3000/", "");
    setActivename(loc.toLowerCase());
    setActivename("home");
    let token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      let decode = jwt(token);
      let time = decode.exp;
      setCurrentUser(decode.username);
      setComplete(decode);
    }
    let username = localStorage.getItem("username");
    let createdAt = localStorage.getItem("createdAt");
    context.login({ username, createdAt });
  };

  React.useEffect(() => {
    mainToken();
  }, []);

  return (
    <div className="appbar-main">
      <Container>
        <Menu pointing secondary>
          <Link to="/">
            <Menu.Item
              name={`Synarcs Restaurent`}
              active={activeItem === "home"}
              onClick={handleItemClick}
              style={{ color: "#fff", fonWeight: "bold" }}
            />
          </Link>
          {token == "notoken" ? (
            <Menu.Menu position="right">
              <Link to="/Login">
                <Menu.Item
                  name="login"
                  active={activeItem === "login"}
                  onClick={handleItemClick}
                />
              </Link>
              <Link to="/Register">
                <Menu.Item
                  name="register"
                  active={activeItem === "register"}
                  onClick={handleItemClick}
                />
              </Link>
            </Menu.Menu>
          ) : (
            <Menu.Item position="right">
              <Menu.Item
                className="user-name"
                name={currentUser.toLocaleLowerCase()}
                active={true}
                style={{ marginBottom: "8px" }}
              />
            </Menu.Item>
          )}
        </Menu>
      </Container>
    </div>
  );
};

export default Navbar;
