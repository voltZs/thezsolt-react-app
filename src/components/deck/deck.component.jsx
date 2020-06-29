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
      let trans = "translateX(-50%)";
      let spread = window.innerWidth < 700 ?
                  `translateX(${modifier*(-30)}%)` : "";
      console.log(spread);
      let style = {
        transform: numOfCards < 2 ? trans+"rotate("+ ratio*20 +"deg)" :
                  trans + spread + "rotate("+ modifier*(90/numOfCards) + "deg)",
        left: numOfCards < 2 ? "" : modifier * 120 + "px"
      };

      let linkCard = card.link ? "linkCard" : null;
      let cardComponent = (
        <div className={`card ${cardType} ${linkCard}`} style={style}>
          <div>{card.content}</div>
          <div>{card.note}</div>
        </div>
      );
      if(card.link != null){
        cardComponent = (
          <a href={card.link} target="_blank">
            {cardComponent}
          </a>
        )
      };
      return cardComponent;
    });

    return (
      <div className={`handOfCards ${removeClass}`}>
        {stack}
      </div>
    )
  }
}

export {Deck}
