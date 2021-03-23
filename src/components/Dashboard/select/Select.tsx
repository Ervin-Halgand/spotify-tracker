import "./style.css"

interface SelectProps {
    data: string[],
    onChange: Function
}

export const Select = ({ data, onChange }: SelectProps) => {
    return (
        <select name="pets" className="select" onChange={((e) => onChange(e.target.value))}>
            {data.map((item, i) => <option key={i} className="select__option" value={item}>{item}</option>)}
        </select>
    )
}