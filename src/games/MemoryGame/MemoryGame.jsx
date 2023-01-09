import { useState, useEffect } from 'react'
import './MemoryGame.css'
import SingleCard from './components/SingleCard'
import helmet from './img/helmet-1.png'
import potion from './img/potion-1.png'
import ring from './img/ring-1.png'
import scroll from './img/scroll-1.png'
import shield from './img/shield-1.png'
import sword from './img/sword-1.png'
import { NavBar } from '../../components/NavBar'

const cardImages = [
    { "src": helmet, matched: false },
    { "src": potion, matched: false },
    { "src": ring, matched: false },
    { "src": scroll, matched: false },
    { "src": shield, matched: false },
    { "src": sword, matched: false },
]

export const MemoryGame = () => {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)

    // shuffle cards for new game
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map(card => ({ ...card, id: Math.random() }))
        
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }

    // handle a choice
    const handleChoice = (card) => {
        // Stop the user from being able to click the first card twice
        if(card.id === choiceOne?.id) return;
        // console.log(card)
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // compare 2 selected cards
    useEffect(() => {
        if (choiceOne && choiceTwo) {
        setDisabled(true)

        if (choiceOne.src === choiceTwo.src) {
            setCards(prevCards => {
            return prevCards.map(card => {
                if (card.src === choiceOne.src) {
                return { ...card, matched: true }
                } else {
                return card
                }
            })
            })
            resetTurn()
        } else {
            setTimeout(() => resetTurn(), 1000)
        }

        }
    }, [choiceOne, choiceTwo])

    // reset choices & increase turn
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    // start new game automagically
    useEffect(() => {
        shuffleCards()
    }, [])

    return (
        <>
            <NavBar/>
            <div className="MemoryGame">
                <div className='head'>Magic Match</div><br/>
                <button onClick={shuffleCards} className="newgamebtn">New Game</button>

                <div className="card-grid">
                    {cards.map(card => (
                    <SingleCard 
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />
                    ))}
                </div>

                <p className='head'>Turns: {turns}</p>
            </div>
        </>
    );
}