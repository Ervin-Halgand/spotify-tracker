import logoSpotify from '../../images/spotify-logo.png'
import logoLogout from '../../images/logout.png'
import './style.css'
import { clearStore } from "../../redux/actions/spotifyAction";
import { SpotifyState } from '../../redux/reducer';
import { useSelector } from 'react-redux';

interface HeaderProps {
    user?: any,
    isLoading?: Boolean
}

export const Header = ({ user, isLoading }: HeaderProps) => {
    const access_token = useSelector((state: SpotifyState) => state.access_token);

    return (
        isLoading ? <div>Loading...</div> :
            <div className="header">
                <div className="header__info">
                    <img width="88" height="88" className="header__info__logo" src={logoSpotify} alt="SpotifyLogo"></img>
                    <h1 className="header__info__title">Spotify Tracker</h1>
                </div>
                {access_token ? <div className="header__identity">
                    <img width="44" height="44" className="header__identity__avatar" src={user?.images[0].url} alt="avatar"></img>
                    <div className="header__identity__contact">
                        <span className="header__identity__contact__name">{user?.display_name}</span>
                        <span className="header__identity_contact__follower">Follower : {user?.followers.total}</span>
                    </div>
                    <button className="header__identity__button" onClick={() => { localStorage.clear(); clearStore(); }}>
                        <img width="20" height="20" className="header__identity__button__logoutImg" src={logoLogout} alt="logout icon" />
                    </button>
                </div> : <div className="header__login"><a href={"http://localhost:8080/login"}><button className="header__login__button">
                    Login</button></a></div>}

            </div>
    )
}