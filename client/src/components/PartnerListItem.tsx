import React from 'react';
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'

function PartnerListItem(props: any) {
  return (
    <li className="list-item">
      <a>{props.name}</a>
    </li>
  );
}

export default PartnerListItem