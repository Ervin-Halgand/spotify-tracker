import logoLogout from '../../assets/images/logout.png'
import './style.css'
import { clearStore, setTheme } from "../../redux/actions/spotifyAction";
import { useHistory, useLocation } from 'react-router-dom'
import { SkeletonHeader } from './SkeletonHeader/SkeletonHeader';
import { useSelector } from 'react-redux';
import { ToggleButton } from '../Dashboard/ToggleButton/ToggleButton';

interface HeaderProps {
    user?: any,
    isLoading?: Boolean,
}

export const Header = ({ user, isLoading }: HeaderProps) => {
    const history = useHistory();
    const darkTheme = useSelector((state: any) => state.userLogin.isDarkTheme);
    const path = useLocation();
    return (
        <div className="header">
            <div className="header__info">
                <img width="87" height="87" className={`header__info__logo ${path.pathname !== '/' ? 'header__info__logo__animation' : ''}`} src={`${process.env.PUBLIC_URL}/images/spotify-logo.png`} alt="SpotifyLogo"></img>
                <h1 className={`header__info__title ${path.pathname !== '/' ? 'header__info__title__animation' : ''}`}>Spotify Tracker</h1>
                {path.pathname === '/' && <ToggleButton checkboxHandler={setTheme} isDarkTheme={darkTheme} />}
            </div>
            {(() => {
                if (!user)
                    return <div className="header__login"><a href={"https://spotify-redirect-api-personnal.herokuapp.com/login"}><button className="header__login__button">
                        <img width="30" height="30" className="header__login__button__logo" src={`${process.env.PUBLIC_URL}/images/spotify-logo.png`} alt="SpotifyLogo"></img>
                        Login with Spotify</button></a></div>
                if (isLoading)
                    return <SkeletonHeader />
                return <div className="header__identity">
                    <img width="48" height="48" className="header__identity__avatar" src={user?.images[0].url} alt="avatar"></img>
                    <div className="header__identity__contact">
                        <span className="header__identity__contact__name">{user?.display_name}</span>
                        <span className="header__identity_contact__follower">Follower : {user?.followers.total}</span>
                    </div>
                    <button className="header__identity__button" onClick={() => { clearStore(); history.replace('/login') }}>
                        <img width="20" height="20" className="header__identity__button__logoutImg" src={logoLogout} alt="logout icon" />
                    </button>
                </div>
            })()}
        </div >
    )
}