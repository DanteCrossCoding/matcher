import React from 'react';
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'

function PartnerListItem(props: any) {
  return (
    <div>
    <li className="list-item">{props.name}</li>
    </div>
  );
}

export default PartnerListItem