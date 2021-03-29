import './style.css'
import iconSun from '../../../assets/images/sun.png'
import iconMoon from '../../../assets/images/moon.png'

export const ToggleButton = ({ checkboxHandler, isDarkTheme }: any) => {
    return (
        <label className="label__checkBox" >
            <img width="20" height="20" className="label__checkBox__img__sun" src={iconSun} alt="sun" />
            <img width="20" height="20" className="label__checkBox__img__moon" src={iconMoon} alt="moon" />
            <input checked={isDarkTheme} className="input__toggle" type="checkbox" onChange={(e) => checkboxHandler(e.target.checked)} />
            <span className="slider"></span>
        </label>
    )
}