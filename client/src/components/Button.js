import React from "react";

import "./Button.scss";

// Renders button Component
export default function Button(props) {

  return (
    <button
      className={props.class}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
}