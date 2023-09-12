import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props){

  console.log("props",props);

  
  console.log("map",props.days.map((e) => {return e}))
  console.log("day", props.day)
  console.log("state appointments", props.appointments)
  const listItem = props.days.map(item => {
    return(
      <DayListItem 
        key={item.id}
        name={item.name} 
        spots={item.spots} 
        selected={item.name === props.day}//review
        setDay={props.onChange}
        appointmentNumber={item.appointments}
        appointments={props.appointments}
      />
    )
  })

  return(
    <ul>
      {listItem}
    </ul>
  )
}