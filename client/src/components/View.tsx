import React from 'react';
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'
import Matcher from './Matcher'
import PartnerList from './PartnerList'
import Login from './Login'
import MatchList from './MatchList';

function View(props: any) {

  const match = <Matcher
    start={props.start}
    reset={props.reset}
    restaurants={props.restaurants}
    user={props.user}
    changeCat={props.changeCat}
    foundMatch={props.foundMatch}
    rating={2.5}
  />

  const login = <Login

  />

  const matchList = <MatchList partner={props.selected} matchList={props.matchList}/>

  const partnerList = <PartnerList
    select={props.select}
    selected={props.selected}
    partners={props.partners}
  />

  let final;

  if (props.view === 'match') {
    final = match;
  } else if (props.view === 'partner') {
    final = partnerList;
  } else if (props.view === 'login') {
    final = login;
  } else if (props.view === 'match-list') {
    final = matchList;
  }

  return (
      <>
        {final}
      </>
    );
}

export default View;