import React from 'react';
import './deck.styles.css';

// class Card extends React.Component {
//   constructor(props){
//     super(props);
//     this.state ={
//       cardStyle : props.style
//     }
//   }
//
//   render(){
//     return(
//       <div className={`card ${this.props.cardType}`} style={this.state.cardStyle}>
//         {this.props.content}
//       </div>
//     )
//   }
// }

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
        // <Card style={style} key={index}
        //   content={card.content} cardType={cardType}></Card>
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
