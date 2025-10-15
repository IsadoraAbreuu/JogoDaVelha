import Quadrado from "./Quadrado"
import { useState, useEffect } from "react"
import confetti from "canvas-confetti"


export default function Tabela() {

    //define variaves e guarda cada quadrado em uma lista de 9 posições, todas começando vazias
    const [quadrados, setQuadrados] = useState(Array(9).fill(""))
    //define as variaveis para controlar a vez de cada jogador ("O" ou "X")
    const [xProximo, setXProximo] = useState(true)
    //define as variaveis para temas
    const [tema, setTema] = useState("azul")

    //função para alternar as jogadas entre "O" e "X"
    function handleClick(i) {
        if (quadrados[i] !== "" || calcularVencedor(quadrados)) {
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

    //função para recomeçar o jogo ao clicar no botao de recomecar
    function Recomecar() {
        setQuadrados(Array(9).fill(""));
        setXProximo(true);
    }

    //condição para mostar o vencedor ou o proximo a jogar
    const vencedor = calcularVencedor(quadrados);

    useEffect(() => {
        if (vencedor) {
            confetti({
                particleCount: 200,
                spread: 80,
                origin: { y: 0.6 },
            });
            alert('O ' + vencedor + ' ganhou!');
        }
    }, [vencedor]); //só dispara quando o vencedor muda

    let status;
    if (vencedor) {
        status = "Vencedor: " + vencedor;
    } else {
        status = "Próximo a jogar: " + (xProximo ? "X" : "O");
    }

    return (
        <>
        <section className={`containerJogo tema-${tema}`}>
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
                    <h3>Vencedor: {vencedor || "—"}</h3>
                    <h3>Próximo a jogar: {xProximo ? "X" : "O"}</h3>
                    <button onClick={Recomecar}>Recomeçar</button>
                </div>
                <div className="temas">
                        <button className="btnAzul" onClick={() => setTema("azul")}>Azul</button>
                        <button className="btnRosa" onClick={() => setTema("rosa")}>Rosa</button>
                        <button className="btnVerde" onClick={() => setTema("verde")}>Verde</button>
                    </div>
            </div>
        </section>
        </>
    )
}

//função para calcular o vencedor com as condições de um jogo da velha normal 
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


