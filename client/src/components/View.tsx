import React from "react";
import "../App.scss";
import "../bootstrap/vendor/bootstrap/css/bootstrap.css";
import Matcher from "./Matcher";
import PartnerList from "./PartnerList";
import Login from "./Login";
import Cookies from "universal-cookie";

function View(props: any) {
  const match = <Matcher reset={props.reset} user={props.user} />;

  const login = (
    <Login
      redirect={props.redirect}
      success={props.success}
      cookies={props.cookies}
    />
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
    final = partnerList;
  } else if (!props.cookies.get('email')) {
    final = login;
  } else {
    final = match;
  }

  return <>{final}</>;
}

export default View;
