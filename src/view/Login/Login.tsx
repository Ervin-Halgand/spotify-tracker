import { FunctionComponent, useEffect } from "react";
import { useSelector } from "react-redux";
import { setToken, setRefreshToken, notification } from '../../redux/actions/spotifyAction'
import { useHistory, useLocation } from "react-router-dom";
import board from '../../assets/images/board.png'
import { Header } from "../../components/Header/Header";
import './style.css'

export const Login: FunctionComponent = () => {
    console.log(navigator);
    const currentUser = useSelector((state: any) => state.userLogin)
    const access_token: string = window.location.href?.split("=")[1]?.split("&")[0];
    const refresh_token: string = window.location.href?.split("=")[4]?.split('&')[0];
    const history = useHistory();
    const path = useLocation();
    useEffect(() => {
        if (access_token && refresh_token) {
            setToken(access_token);
            setRefreshToken(refresh_token);
            notification("success", "Login success", () => history.replace('/'));
            return;
        }
        if (currentUser.access_token)
            notification("success", "You are already logged", () => history.replace('/'));
        if (path.pathname.includes('error'))
            notification('error', "Please login again", () => { }, 1000)
        // eslint-disable-next-line
    }, [access_token, refresh_token]);
    return (
        <div className="login__root">
            <Header />
            <div className="login__root__container">
                <div className="login__root__container__left">
                    <h2 className="login__root__container__left__title">Analyze your music</h2>
                    <h3 className="login__root__container__left__subtitle">& Get recommandation</h3>
                </div>
                <div className="login__root__container__right">
                    <h4 className="login__root__container__right__title">
                        Discover your listening
                    </h4>
                    <div className="login__root__container__right__img__container">
                        <img className="login__root__container__right__img" src={board} alt="board" />
                        <div className="login__root__container__right__img__container__box__root">
                            <div className="login__root__container__right__img__container__box box1">
                                <img src={`${process.env.PUBLIC_URL}/images/icon-artist.svg`} alt="music Icon" />
                                <p>Best Artist</p>
                            </div>
                            <div className="login__root__container__right__img__container__box box2">
                                <img src={`${process.env.PUBLIC_URL}/images/icon-genre.svg`} alt="music Icon" />
                                <p>Best Music</p>
                            </div>
                            <div className="login__root__container__right__img__container__box box3">
                                <img src={`${process.env.PUBLIC_URL}/images/icon-music.svg`} alt="music Icon" />
                                <p>Best Genre</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img className="login__root__background__bottom" src={`${process.env.PUBLIC_URL}/images/background-bottom.svg`} alt="background bottom" />
            <img className="login__root__background__top" src={`${process.env.PUBLIC_URL}/images/background-top.svg`} alt="background top" />
            <img className="login__root__background__bottom__notes" src={`${process.env.PUBLIC_URL}/images/note-musics.svg`} alt="background notes" />
        </div>
    );
};