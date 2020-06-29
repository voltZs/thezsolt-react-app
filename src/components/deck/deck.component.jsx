import React from 'react';
import './deck.styles.css';

class Deck extends React.Component {

  render(){
    let cardType = this.props.master ? 'masterCard' : 'answerCard';
    let removeClass = this.props.removeHand ? 'removed' : null;

    let stack = this.props.hand.map((card, index) => {
      var numOfCards = this.props.hand.length;
      var modifier = index-((numOfCards-1)/2);
      var ratio = (Math.random()*2)-1;
      let style = {
        transform: numOfCards < 2 ? "rotate("+ ratio*20 + "deg)" :
                                  "rotate("+ modifier*(80/numOfCards) + "deg)",
        left: numOfCards < 2 ? "" : modifier * 120 + "px"
      };
      return (
        <div className={`card ${cardType}`} style={style}>
          {card.content}
        </div>
      );
    });

    return (
      <div className={`handOfCards ${removeClass}`}>
        {stack}
      </div>
    )
  }
}

export {Deck}
