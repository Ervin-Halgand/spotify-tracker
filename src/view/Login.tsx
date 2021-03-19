import { FunctionComponent, useEffect } from "react";
//import { useSelector } from "react-redux";
import { setToken, setRefreshToken } from '../redux/actions/spotifyAction'
//import axios from 'axios'
import { Redirect } from "react-router";

export const Login: FunctionComponent<any> = () => {
    const access_token: string = window.location.href?.split("=")[1]?.split("&")[0];
    const refresh_token: string = window.location.href?.split("=")[4]?.split('&')[0];

    useEffect(() => {
        if (access_token && refresh_token) {
            setToken(access_token);
            setRefreshToken(refresh_token);
            /* axios.post("http://localhost:8080/refresh", null, {
                headers: { "Content-Type": "text/plain" },
                params: {
                    refresh_token: refresh_token,
                },
            }).then(res => console.log(res)).catch(err => console.error(err)); */
            /* console.log(access_token);
            console.log(refresh_token); */
        }
    }, [access_token, refresh_token]);
    return (
        access_token ? <Redirect to={{ pathname: '/' }} /> :
            <div className="App">
                <header className="App-header">
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a href="http://localhost:8080/login">LOGIN</a>
                </header>
            </div>
    );
};