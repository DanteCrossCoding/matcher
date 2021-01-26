import React from "react";
import "../App.scss";
import "../bootstrap/vendor/bootstrap/css/bootstrap.css";
import Matcher from "./Matcher";
import PartnerList from "./PartnerList";
import MatchList from "./MatchList";
import Login from "./Login";

function View(props: any) {
  const match = <Matcher partner={props.selected} username={props.username} reset={props.reset} user={props.user} />;

  const login = (
    <Login
      redirect={props.redirect}
      success={props.success}
      cookies={props.cookies}
    />
  );

  const matchList = (
    <MatchList cookies={props.cookies} getMatchData={props.getMatchData} partner={props.selected} matchList={props.matchList} />
  );

  const partnerList = (
    <PartnerList
      partner={props.partner}
      inviteConfirm={props.inviteConfirm}
      partnerSelect={props.partnerSelect}
      select={props.select}
      selected={props.selected}
      partners={props.partners}
      cookies={props.cookies}
      getUserByEmail={props.getUserByEmail}
    /*   onLoad={props.getUserList()} */
    />
  );

  let final;

  if (props.view === "match") {
    final = match;
  } else if (props.view === "partner") {
    final = partnerList;
  } else if (!props.cookies.get("email")) {
    final = login;
  } else if (props.view === "match-list") {
    final = matchList;
  } else {
    final = match;
  }

  return <>{final}</>;
}

export default View;
