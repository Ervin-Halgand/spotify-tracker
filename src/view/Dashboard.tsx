import axios from "axios";
import { FunctionComponent, useEffect } from "react";
import { useSelector } from "react-redux";
import { SpotifyState } from "../redux/reducer";

export const Dashboard: FunctionComponent<any> = () => {
    const access_token = useSelector((state: SpotifyState) => state.access_token)
    useEffect(() => {
        if (access_token) {
            const config = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorozation: `Bearer ${access_token}`
                }
            }
            axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=50&offset=7`, config).then(res => console.log(res)).catch(err => console.error(err))
        }
    })
    return (
        <div>
            LOGGED
            <span>{access_token}</span>
        </div>
    )
}