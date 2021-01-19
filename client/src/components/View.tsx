import React from 'react';
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'
import Matcher from './Matcher'
import PartnerList from './PartnerList'

function View(props: any) {
  
  const match = <Matcher 
    reset={props.reset}
    user={props.user}
    foundMatch={props.foundMatch}
  />

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
  }

  return (
    <>
    {final}
    </>
  );
}

export default View;