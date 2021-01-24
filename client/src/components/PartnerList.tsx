import React from 'react';
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'
import PartnerListItem from './PartnerListItem';
import { Button } from "react-bootstrap"

function PartnerList(props: any) {
  return (
    <div className="content-card restaurant">
      <div className="partners">
      <h1 className="bold">Partners</h1>
        <ul className="list">
          {props.partners && props.partners.map((element: any) => {
            return <PartnerListItem partnerSelect={props.partnerSelect} select={props.select} selected={props.selected} id={element.id} name={element.name}/>
          })}
        </ul>
      </div>
      <Button onClick={props.inviteConfirm} className="invite">
        Invite
      </Button> 
    </div>
  );
}

export default PartnerList