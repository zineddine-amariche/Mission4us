import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
// import { Box } from "@mui/system";
import Keycloak from "keycloak-js";
import { loginSucces } from "../../Redux/logout/slice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const { isAuthenticated, token } = useSelector((state) => state.logout);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  let initOptions = {
    url: "https://auth.mission4us.com/auth",
    realm: "local_tests",
    clientId: "m4us_tests",
    onLoad: "login-required",
  };


  const isRun = useRef(false);
 
  const keycloak = new Keycloak(initOptions);

  const onLogin = (tokenObj) => {
    dispatch(loginSucces(tokenObj));
  };

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;
    keycloak
      .init({ onLoad: initOptions.onLoad, KeycloakResponseType: "code" })
      .then((auth) => {
        if (!auth) {
          window.location.reload();
        } else {
          navigate("/missions");

          localStorage.setItem("user", JSON.stringify({ role: "ADMIN" }));

        }
        let obj = {
          refreshtoken: keycloak.refreshToken,
          bearertoken: keycloak.token,
        };
        onLogin(obj);

        localStorage.setItem("bearer-token", keycloak.token);
        localStorage.setItem("refresh-token", keycloak.refreshToken);

        setTimeout(() => {
          keycloak
            .updateToken(70)
            .then((refreshed) => {
              if (refreshed) {
                console.debug("Token refreshed" + refreshed);
              } else {
                console.warn(
                  "Token not refreshed, valid for " +
                    Math.round(
                      keycloak.tokenParsed.exp +
                        keycloak.timeSkew -
                        new Date().getTime() / 1000
                    ) +
                    " seconds"
                );
                //   dispatch(logout());
                // 	window.location.href = '/login';
              }
            })

            .catch((error) => {
              console.error(error, "Failed to refresh token");
            });
        }, 60000);



      })
      .catch((error) => {
        console.error(error, "Authenticated Failed");
      });
  }, [keycloak]);

  //ADMIN
  //USER

  return <></>;
};

export {Login};
