import { FunctionComponent, useEffect } from "react";
import { useSelector } from "react-redux";
import { setToken, setRefreshToken } from '../../redux/actions/spotifyAction'
import { Redirect } from "react-router";
import { Header } from "../../components/Header/Header";
import './style.css'

export const Login: FunctionComponent = () => {
    const token = useSelector((state: any) => state.access_token)
    const access_token: string = window.location.href?.split("=")[1]?.split("&")[0];
    const refresh_token: string = window.location.href?.split("=")[4]?.split('&')[0];
    useEffect(() => {
        if (access_token && refresh_token) {
            setToken(access_token);
            setRefreshToken(refresh_token);
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
        }
    }, [access_token, refresh_token]);
    return (
        token ? <Redirect to={{ pathname: '/' }} /> :
            <div className="login__root">
                <Header />
            </div>
    );
};