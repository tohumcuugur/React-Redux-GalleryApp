/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import { useState } from "react"
import { GoChevronLeft, GoChevronDown } from "react-icons/go"


export default function ExpendablePanel({ children, header }) {
    // debugger;

    const [expanded, setExpanded] = useState(false)
    const handleClick = () => {
        setExpanded(!expanded)
    }
    return (
        <div className="panelDiv">
            <div className="topArrangement">
                <div>{header}</div>
                <div onClick={handleClick}>
                    {expanded ? <GoChevronDown color="#fff" size={25} /> : <GoChevronLeft color="#fff" size={25} />}
                </div>
            </div>
            {expanded && <div>{children}</div>}

        </div>
    )
}
