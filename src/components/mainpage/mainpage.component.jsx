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
      currentCard : -1,
      master : [[]],
      answers : [[]]
    }
  }

  componentDidMount(){
    this.addCard();
  }

  handleScroll = (e) => {
    let el = e.target;
    // console.log(el.scrollTop);
    var curr =  Math.round(el.scrollTop/(el.scrollHeight) * (CAH.master.length));
    console.log(curr);
    if(curr > this.state.currentCard){
      this.addCard();
    } else if(curr < this.state.currentCard){
      this.removeCard();
    }
  }

  addCard = () => {
    this.setState((prevState) => {
      let curr = prevState.currentCard+1
      return{
        currentCard: curr,
        master: [...prevState.master, CAH.master[curr]],
        answers: [...prevState.answers, CAH.answers[curr]]
      }
    }, () => {
      console.log(this.state);
    })
  }

  removeCard = () => {
    this.setState((prevState) => {
      var newMaster = [...prevState.master];
      newMaster.pop();
      var newAnswers = [...prevState.answers];
      newAnswers.pop();

      return {
        currentCard: prevState.currentCard-1,
        master: newMaster,
        answers: newAnswers
      }
    })
  }

  render(){
    return(
      <div id="fakeBody" onScroll={this.handleScroll} >
        <div id="realBody">
          <div id="head"></div>

          <div id="decks">
            <div id="leftDeck">
              <Deck master deck={this.state.master}/>
            </div>
            <div id="rightDeck">
              <Deck deck={this.state.answers}/>
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
