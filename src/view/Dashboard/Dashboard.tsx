import { spotifyGetUserProfile, spotifyRefreshToken } from '../../helpers/axios/Axios';
import { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { SpotifyState } from "../../redux/reducer";
import { Header } from '../../components/Header/Header';
import { EXPIRED_TOKEN, INVALID_TOKEN } from '../../redux/constants/spotifyConstants';
import { setToken } from '../../redux/actions/spotifyAction';
import { DashboardLayout } from '../../components/Dashboard/Layout/DashboardLayout';
import './style.css'

export const Dashboard: FunctionComponent = () => {
    const access_token = useSelector((state: SpotifyState) => state.access_token);
    const refresh_token = useSelector((state: SpotifyState) => state.refresh_token);
    const [userInformation, setUserInformation] = useState();
    const [userInformationLoading, setUserInformationLoading] = useState<Boolean>(true);
    useEffect(() => {
        if (!access_token)
            return;
        setUserInformationLoading(true);
        spotifyGetUserProfile(access_token).then(res => {
            setUserInformation(res.data);
            setUserInformationLoading(false);
        }).catch(err => {
            if (err.response.data.error.message === INVALID_TOKEN) {
                localStorage.clear();
                window.location.href = '/login';
            }
            else if (err.response.data.error.message === EXPIRED_TOKEN) {
                spotifyRefreshToken(refresh_token).then((res) => {
                    setToken(res.data.access_token);
                    localStorage.setItem('access_token', res.data.access_token);
                }).catch(err => console.error(err)).finally(() => setUserInformationLoading(false))
            }
        });
    }
        , [])
    return (
        !access_token ? <Redirect to={{ pathname: '/login' }} /> :
            <div className="dashboard__root">
                <Header user={userInformation} isLoading={userInformationLoading} />
                <DashboardLayout access_token={access_token} />
            </div>
    )
}