import React from 'react';
import './deck.styles.css';

class Card extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      cardStyle : props.style
    }
  }

  render(){
    return(
      <div className={`card ${this.props.cardType}`} style={this.state.cardStyle}>
        {this.props.content}
      </div>
    )
  }
}

export const Deck = ({deck, master}) => {

  let cardType = master ? 'masterCard' : 'answerCard';

  let stack = deck.map((layer, layerIndex) => {
    return (
      <div key={layerIndex}>
        {layer.map((card, index) => {
          var numOfCards = layer.length;
          var modifier = index-((numOfCards-1)/2);
          var ratio = (Math.random()*2)-1;
          let style = {
            transform: numOfCards < 2 ? "rotate("+ ratio*20 + "deg)" :
                                      "rotate("+ modifier*(80/numOfCards) + "deg)",
            left: numOfCards < 2 ? "" : modifier * 120 + "px"
          };
          return (
            <Card style={style} key={index}
              content={card.content} cardType={cardType}></Card>
          );
        })}
      </div>
    )
  });

  return (
    <div>
      {stack}
    </div>
  )
}
