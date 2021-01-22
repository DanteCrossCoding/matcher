import React from 'react';
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'
import PartnerListItem from './PartnerListItem';

function PartnerList(props: any) {
  return (
    <div className="content-card restaurant">
      <div className="partners">
      <h1>Partners</h1>
      <ul className="list">
      {props.partners && props.partners.map((element: any) => {
        return <PartnerListItem select={props.select} selected={props.selected} id={element.id} name={element.name}/>
      })}
      </ul>
    </div>
    </div>
  );
}

export default PartnerList