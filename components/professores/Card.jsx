import { useState } from 'react';
import '@/styles/card.module.css'

function Card({ title, description, moreInfo }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`card ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
      <h3>{title}</h3>
      {isExpanded ? <p>{moreInfo}</p> : null}
      <button onClick={toggleExpand}>
        {isExpanded ? 'Mostrar menos' : 'Mostrar mais'}
      </button>
    </div>
  );
}

export default Card;
