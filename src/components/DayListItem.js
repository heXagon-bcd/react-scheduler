import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props){
  console.log("daylistitems", props)
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : props.spots === 0
  })
console.log(props)
  const formatSpots = function (props) {
    if (props.spots === 0) {
      return "no spots remaining"
    }
    if (props.spots === 1) {
      return "1 spot remaining"
    }
    if(props.spots > 1) {
      return `${props.spots} spots remaining`
    }
  }

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass} selected={props.selected}>
      <h2 className={"text--regular"}>{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}