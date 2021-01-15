import React from 'react';
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'

function PartnerListItem(props: any) {
  
  let partnerClass = "list-item";

  if (props.selected === props.id) {
    partnerClass += " selected"
  }
  return (
    <li className={partnerClass} >{props.name}</li>
  );
}

export default PartnerListItem