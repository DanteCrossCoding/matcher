import React from "react";
import "../App.scss";
import "../bootstrap/vendor/bootstrap/css/bootstrap.css";
import Matcher from "./Matcher";
import PartnerList from "./PartnerList";
import MatchList from "./MatchList";
import Login from "./Login";

function View(props: any) {
  const match = <Matcher reset={props.reset} user={props.user} />;

  const login = (
    <Login
      redirect={props.redirect}
      success={props.success}
      cookies={props.cookies}
    />
  );

  const matchList = (
    <MatchList partner={props.selected} matchList={props.matchList} />
  );

  const partnerList = (
    <PartnerList
      select={props.select}
      selected={props.selected}
      partners={props.partners}
    />
  );

  let final;

  if (props.view === "match") {
    final = match;
  } else if (props.view === "partner") {
    props.getUserList();
    final = partnerList;
  } else if (!props.cookies.get("email")) {
    final = login;
  } else if (props.view === "match-list") {
    props.getMatchData(props.cookies.get('email'), props.selected);
    final = matchList;
  } else {
    final = match;
  }

  return <>{final}</>;
}

export default View;
