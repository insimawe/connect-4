import React, {useState, useEffect} from "react";
import GameCircle from "./GameCircle";
import  "./Game.css";
import { render } from "@testing-library/react";
import Header from "./Header";
import Footer from "./Footer";
import { isDraw, isWinner, getComputerMove } from "./helper";
import { GAME_STATE_PLAYING, NO_PLAYER, PLAYER_1, GAME_STATE_WIN, NO_CIRCLES, PLAYER_2, GAME_STATE_DRAW } from "../Constants";


const GameBoard = () => {
    //default player: 0
    const [gameBoard, setGameBoard] = useState(Array(16).fill(NO_PLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
    const [winPlayer, setWinPlayer] = useState(NO_PLAYER);

    useEffect(() => {
        initGame();
    }, []);

    const initGame = () => {
        console.log('init game');
        setGameBoard(Array(16).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
        setGameState(GAME_STATE_PLAYING);
    } 

    const initBoard = () => {
        //return a jsx data so declare another array
        const circles = [];

        for (let i =0; i < NO_CIRCLES; i++){
            circles.push(renderCircle(i));
        }

        return circles;

    }

    const suggestMove = () => {
        circleClicked(getComputerMove(gameBoard));
    }

    const circleClicked = (id) => {
        console.log('circle clicked:' + id);
         
        if(gameBoard[id] !== NO_PLAYER) return;
        if(gameState !== GAME_STATE_PLAYING) return;
        
        //player wins
        if(isWinner(gameBoard, id, currentPlayer)){
            setGameState(GAME_STATE_WIN);
            setWinPlayer(currentPlayer);
        }

        //if no one wins
        if(isDraw(gameBoard, id, currentPlayer)){
            setGameState(GAME_STATE_DRAW);
            setWinPlayer(NO_PLAYER);
        }
        
        //updating an array if you've got a state
        setGameBoard(prev => {
            return prev.map((circle, pos) => {
                if (pos === id) return currentPlayer;
                return circle;
            })
        })

        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
        console.log(gameBoard)
        console.log(currentPlayer, 'currentPlayer')
    }

    const renderCircle = (id) => (
        <GameCircle id={id} key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked}></GameCircle>
    )

    return (
        <>
            <Header gameState= {gameState} currentPlayer={currentPlayer} winPlayer={winPlayer}></Header>
            <div className='gameBoard' >
            {initBoard()}
            
            </div>
            <Footer onNewGameClick={initGame} onSuggestClick={suggestMove} />
        </>
       
    )
}

export default GameBoard;