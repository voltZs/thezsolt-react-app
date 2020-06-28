import React from 'react';
import ReactDOM from 'react-dom';
import './mainpage.styles.css';
import {Deck} from '../deck/deck.component.jsx';

const CAH = {

  master : [
    [
      { content: "Hi! My name is Zsolt and I think you should ____________ .", link: null}
    ],[
      { content: "I'm a ____________ currently living in ____________ .", link: null}
    ],[
      { content: "With a good track for ____________ I'm finishing my ____________ soon .", link: null}
    ],[
      { content: "And what I'd love is to ____________ .", link: null}
    ],[
      { content: "I've had loads of fun developing ____________ , ____________ , and ____________ .", link: null}
    ],[
      { content: "But also did my bit in technical projects like ____________ and ____________ .", link: null}
    ],[
      { content: "I'll be delighted if you have a look at my ____________ below or ____________ .", link: null}
    ],
  ],

  answers: [
    [
      { content: "Scroll down.", link: null}
    ],[
      { content: "Nerd.", link: null},
      { content: "Edinburgh.", link: null},
    ],[
      { content: "A first-class degree.", link: null},
      { content: "Bachelor in Computing", link: null},
    ],[
      { content: "Start the career I've been growing my skillset for the past 5 years.", link: null}
    ],[
      { content: "Pokédex.", link: "https://github.com/voltZs/varga_zsolt_set09103_cw1"},
      { content: "Say the Same Thing.", link: "https://github.com/voltZs/varga_zsolt_set09103_cw2"},
      { content: "Vent.", link: "https://github.com/voltZs/varga_zsolt_set08101_coursework2"}
    ],[
      { content: "Tic-Cat-Toe.", link: "https://github.com/voltZs/varga_zsolt_ads"},
      { content: "Improvisor.", link: "https://github.com/voltZs/improvisor-group-project"},
    ],[
      { content: "CV / socials.", link: null},
      { content: "Drop me an e-mail.", link: null},
    ]
  ]
};

class MainPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      currentCard : 0,
      master : CAH.master[0],
      answers : CAH.answers[0],
      prevMaster : null,
      prevAnswers : null,
      showCards: true
    }
  }

  // componentDidMount(){
  //   this.addCard();
  // }

  handleScroll = (e) => {
    let el = e.target;
    // console.log(el.scrollTop);
    var curr =  Math.round(el.scrollTop/(el.scrollHeight) * (CAH.master.length));
    console.log(curr);
    if(curr > this.state.currentCard){
      this.changeCard(1);
    } else if(curr < this.state.currentCard){
      this.changeCard(-1);
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

  render(){

    let leftDeck = this.state.master ?
                  <Deck master hand={this.state.master}
                    removeHand={!this.state.showCards}/> : null;
    let rightDeck = this.state.answers ?
                  <Deck hand={this.state.answers}
                    removeHand={!this.state.showCards}/> : null;

    return(
      <div id="fakeBody" onScroll={this.handleScroll} >
        <div id="realBody">
          <div id="head"></div>

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
