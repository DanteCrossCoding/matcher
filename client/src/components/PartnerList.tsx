import React from "react";
import "../App.scss";
import "../bootstrap/vendor/bootstrap/css/bootstrap.css";
import PartnerListItem from "./PartnerListItem";
import { Button } from "react-bootstrap";
import add from "./add.png"

function PartnerList(props: any) {
  let button;
  if (props.partner) {
    button = (
      <Button onClick={props.inviteConfirm} className="invite">
        Invite
      </Button>
    );
  }
  return (
    <div className="content-card restaurant">
      <div className="partners">
        <h1 className="bold">Partners</h1>
        <ul className="list">
          {props.partners &&
            props.partners.map((element: any) => {
              if (
                element.id !==
                props.getUserByEmail(props.cookies.get("email")).id
              ) {
                return (
                  <PartnerListItem
                    partnerSelect={props.partnerSelect}
                    select={props.select}
                    selected={props.selected}
                    id={element.id}
                    name={element.name}
                  />
                );
              } else {
                return <span></span>
              }
            })}
        </ul>
      </div>
      <div>
        <img className="add-friend-button" src={add} aria-hidden="true" alt="add"></img>
      </div>
      {button}
    </div>
  );
}

export default PartnerList;
