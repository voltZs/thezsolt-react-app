import React from 'react';
import ReactDOM from 'react-dom';
import './mainpage.styles.css';
import {CAH} from '../cah.js';
import {Deck} from '../deck/deck.component.jsx';

class MainPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      currentCard : 0,
      master : CAH.master[0],
      answers : CAH.answers[0],
      prevMaster : null,
      prevAnswers : null,
      showCards: true,
      blockSwaps: false
    }
  }

  handleScroll = (e) => {
    let el = e.target;
    var curr =  Math.round(el.scrollTop/(el.scrollHeight) * (CAH.master.length));

    if(curr !== this.state.currentCard){
      let diff = curr - this.state.currentCard;
      this.changeCard(diff);
    }
  }

  changeCard = (diff) => {
    this.setState((prevState) => {
      // let prev = prevState.currentCard;
      let curr = prevState.currentCard+diff;
      return{
        currentCard: curr,
        showCards: false
      }
    }, () => {
      setTimeout(() =>{
        this.setState({master: null, answers: null}, () => {
          this.setState({
              showCards: true,
              master: CAH.master[this.state.currentCard],
              answers: CAH.answers[this.state.currentCard]
          });
        });
      }, 300);
    });
  }

  jumpToCard = (number) => {
    let scrollVal = number/CAH.master.length * this.fakeBody.scrollHeight;
    this.fakeBody.scrollTop = scrollVal;
  }

  render(){

    let leftDeck = this.state.master ?
                  <Deck master hand={this.state.master}
                    removeHand={!this.state.showCards}/> : null;
    let rightDeck = this.state.answers ?
                  <Deck hand={this.state.answers}
                    removeHand={!this.state.showCards}/> : null;
    let indicatorArray = [];
    for(var i=0; i<CAH.master.length; i++){
      (function(i, that){
        let active = i === that.state.currentCard ? "active" : null;
        let clickHandler = () => {
          that.jumpToCard(i);
        };
        indicatorArray.push(
          <div className={`pageIndicator ${active}`} onClick={clickHandler}></div>
        );
      })(i, this);
    }

    return(
      <div id="fakeBody" onScroll={this.handleScroll} ref={(el) => this.fakeBody = el}>
        <div id="realBody">
          <div id="head">
            {indicatorArray}
          </div>

          <div id="decks">
            <div id="leftDeck">
              {leftDeck}
            </div>
            <div id="rightDeck">
              {rightDeck}
            </div>
          </div>

          <div id="foot">
            <a href="mailto:zs.zsolt.varga@gmail.com" target="_blank">
              <div className="button">
                Get in touch
              </div>
            </a>
            <div>
              or
            </div>
            <div>
              <a href="CV_Zsolt_Varga.pdf" target="_blank">
                <span className="faButton">
                  <i className="fas fa-address-card fa-lg"></i>
                </span>
              </a>
              <a href="https://github.com/voltZs" target="_blank">
                <span className="faButton">
                  <i className="fab fa-github fa-lg"></i>
                </span>
              </a>
              <a href="https://www.linkedin.com/in/zsolt-varga-175129a3" target="_blank">
                <span className="faButton">
                  <i className="fab fa-linkedin-in fa-lg"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div id="fakeContent"></div>
      </div>
    );
  }

}

export {MainPage};
