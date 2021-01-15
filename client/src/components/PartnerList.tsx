import React from 'react';
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'
import PartnerListItem from './PartnerListItem';

function PartnerList(props: any) {
  return (
    <div className="partners">
      <h1 className="mt-5">Partners</h1>
      <ul className="list">
      {Object.keys(props.partners).map((key: any) => {
        {console.log(props.partners[key].name)}
        <PartnerListItem name={props.partners[key].name}/>
      })}
      </ul>
    </div>
  );
}

export default PartnerList