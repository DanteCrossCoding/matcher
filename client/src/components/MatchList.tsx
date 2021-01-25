import React, { useEffect } from "react";
import "../App.scss";
import "../bootstrap/vendor/bootstrap/css/bootstrap.css";
import MatchListItem from "./MatchListItem";

function MatchList(props: any) {
  useEffect(() => {
    props.getMatchData(props.cookies.get("email"), props.partner);
  }, []);

  let noMatches;

  if (props.matchList.length === 0) {
    noMatches = (
      <h3>No Matches Yet!</h3>
    )
  } 

  return (
    <div className="content-card restaurant matches">
      <div className="matches">
        <h1 className="bold">Past Matches</h1>
        {noMatches}
        <ul className="match-list">
          {props.matchList &&
            props.matchList.map((match: any) => {
              return <MatchListItem key={match.id} match={match} />;
            })}
        </ul>
      </div>
    </div>
  );
}

export default MatchList;
