import React from 'react';
import { useState } from 'react';
import Board from './components/Board';
import { NavBar } from '../../components/NavBar';
import './MineSweeper.css'

export const MineSweeper = () => {
    const [numberOfMines, setNumberOfMines] = useState(10);
    const [numberOfRows, setNumberOfRows] = useState(8);

    return (
        <>
            <NavBar/>
            <div className='MineSweeper'>
                <div className='head'>Mine Sweeper</div><br/>
                <Board size={numberOfRows} numberOfMines={numberOfMines} />
            </div>
        </>
    );
}