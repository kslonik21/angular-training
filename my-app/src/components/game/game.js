import React from 'react';
import Card from '../card';
import StartMenu from '../start-menu';
import ChooseLevel from '../choose-level';
import { connect } from 'react-redux';
import './game.css';
import { initialCards } from '../card';
import { renderCards,backHomePage } from '../../actions';
class Game extends React.Component {
  // state = {
  //   showComp: false,
  //   cards: initialCards,
  //   level:"",
  //   home: false,
  //   numTiles: null
  // }
  homePage = () => {
    this.props.backHomePage({home:true,cards:null})
  }
  shuffle = (arr) => {
    const last = arr.length-1;
    for(let i = last; i > 0; i--){
      const j = Math.floor(Math.random() * i);
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }
  renderCardsBoard = (e) => {
    const targetLevel = e.target.getAttribute('data-level');
    const gridX = targetLevel * 2 + 2;
    const gridY = gridX / 2;
    const numTiles = gridX * gridY;
    const halfNumTiles = numTiles / 2;
    let newCards = [];
    for(let i = 0; i < halfNumTiles;i++) {
      newCards.push(this.props.cards[i],this.props.cards[i]);
    }
    newCards = this.shuffle(newCards);

    // this.setState({
    //   showComp: true,
    //   cards: newCards,
    //   level: e.target,
    //   numTiles: numTiles
    // })
    this.props.renderCards({
      showComp:true,
      cards:newCards,
      level:e.target,
      numTiles:numTiles
    });
  }
  render() {
    const {numTiles,home} = this.props;
    if(home) {
      return <Game/>
    }
    if(this.props.showComp) {
      return <Card numTiles={numTiles} getBack={this.homePage} checkedLevel={this.props.level} tiles={this.props.cards}/>
    }
    return (
      <div className='start-screen'>
        <StartMenu/>
        <ChooseLevel renderCardsBoard={this.renderCardsBoard}/>
      </div>
    )
  }
}
const mapStateToProps = ({showComp,cards,level,numTiles}) => {
  return {
    showComp,
    cards,
    level,
    numTiles
  }
}
const mapDispatchToProps = {
    renderCards,
    backHomePage
}
export default connect(mapStateToProps,mapDispatchToProps)(Game);