import Quadrado from "./Quadrado"
import { useState } from "react"

export default function Tabela() {

    const [quadrados, setQuadrados] = useState(Array(9).fill(" "))
    const [xProximo, setXProximo] = useState(true)

    function handleClick(i) {
        if (quadrados[i] != " "|| calcularVencedor(quadrados) === null) {
            return;
        }
        
        const next = quadrados.slice()

        if (xProximo) {
            next[i] = 'X';
    
        } else {
            next[i] = 'O';
            
        }
        setQuadrados(next);
        setXProximo(!xProximo);
    }

    const vencedor = calcularVencedor(quadrados);
    let status;
    if (vencedor) {
        status = "Vencedor: " + vencedor;
    } else {
        status = "Próximo a jogar: " + (xProximo ? "X" : "O");
    }


    return (
        <>
        <section className="containerJogo">
            <h2>Jogo da</h2>
            <h1>Velha</h1>
            <div className="containerVelha">
                <div className="fileira">
                    <Quadrado value={quadrados[0]} onQuadradoClick = {() => handleClick(0)}/>
                    <Quadrado value={quadrados[1]} onQuadradoClick = {() => handleClick(1)}/>
                    <Quadrado value={quadrados[2]} onQuadradoClick = {() => handleClick(2)}/>
                </div>
                <div className="fileira">
                    <Quadrado value={quadrados[3]} onQuadradoClick = {() => handleClick(3)}/>
                    <Quadrado value={quadrados[4]} onQuadradoClick = {() => handleClick(4)}/>
                    <Quadrado value={quadrados[5]} onQuadradoClick = {() => handleClick(5)}/>
                </div>
                <div className="fileira">
                    <Quadrado value={quadrados[6]} onQuadradoClick = {() => handleClick(6)}/>
                    <Quadrado value={quadrados[7]} onQuadradoClick = {() => handleClick(7)}/>
                    <Quadrado value={quadrados[8]} onQuadradoClick = {() => handleClick(8)}/>
                </div>
                <div className="containerProximo">
                    <h3>Vencedor: {vencedor}</h3>
                    <h3>Próximo a jogar: {}</h3>
                    <button type="submit" onClick={Recomecar}>Recomeçar</button>
                </div>
            </div>
        </section>
        </>
    )
}

function calcularVencedor(quadrados) {
      const linhas = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < linhas.length; i++) {
        const [a, b, c] = linhas[i];
        if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) {
            return quadrados[a];
    }
  }
  return null;
}

function Recomecar() {
    // codigo para recomeçar
}
