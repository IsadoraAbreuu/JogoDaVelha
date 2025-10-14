import './Quadrado.css';

export default function Quadrado({value, onQuadradoClick}) {

    return (
        <button 
            className="quadrado"
            onClick={onQuadradoClick}
            >
                {value}
        </button>
    )
}