import React, { useState, useEffect } from "react";
import eventsData from "../../../assets/events.json";
import "./BingoCard.scss";

const shuffleArray = (array, seed) => {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (seed * (i + 1)) % shuffled.length;
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const BingoCard = () => {
  const [card, setCard] = useState([]);
  const [marked, setMarked] = useState(Array(25).fill(false));

  useEffect(() => {
    const seed = new Date().getTime() % 100000;
    const shuffledEvents = shuffleArray(eventsData.events, seed).slice(0, 24);

    const bingoCard = [
      ...shuffledEvents.slice(0, 12), 
      "FREE SPACE", 
      ...shuffledEvents.slice(12)
    ];

    setCard(bingoCard);
  }, []);

  const toggleMark = (index) => {
    const newMarked = [...marked];
    newMarked[index] = !newMarked[index];
    setMarked(newMarked);
  };

  const resetCard = () => {
    setMarked(Array(25).fill(false));
  };

  return (
    <div>
      <h1>ISI Bang Bingo</h1>
      <div className="grid">
        {card.map((event, index) => (
          <div
            key={index}
            className={`cell ${marked[index] ? "marked" : ""}`}
            onClick={() => toggleMark(index)}
          >
            {event}
          </div>
        ))}
      </div>
      <button onClick={resetCard}>Reset</button>
    </div>
  );
};

export default BingoCard;
