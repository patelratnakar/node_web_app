import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeelapsedaction } from "./Actions/useraction";

export const Chronometer = ({match}) => {
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.user)
    const Time = user && user.TimeElapsed.map(i=>{
          return i.Product === match.params.id && i.Time
    })
    console.log(Time)

  const [time, setTime] = useState({
    seconds: Time[0] && Time[0].substr(17,3),
    minutes: Time[0] && Time[0].substr(14,3),
    hours: Time[0] && Time[0].substr(11,3),
  });


  useEffect(() => {
    let isCancelled = false;

    const advanceTime = () => {
      setTimeout(() => {
        let nSeconds = time.seconds;
        let nMinutes = time.minutes;
        let nHours = time.hours;

        nSeconds++;

        if (nSeconds > 59) {
          nMinutes++;
          nSeconds = 0;
        }
        if (nMinutes > 59) {
          nHours++;
          nMinutes = 0;
        }
        if (nHours > 24) {
          nHours = 0;
        }

        !isCancelled &&
          setTime({ seconds: nSeconds, minutes: nMinutes, hours: nHours });
      }, 1000);
    };
    advanceTime();

    const date = new Date();
    date.setHours(time.hours, time.minutes, time.seconds);
    dispatch(timeelapsedaction(match.params.id,date))

    return () => {
      //final time:
      isCancelled = true;
    };
  }, [time,dispatch,match.params.id]);

  return (
    <div>
      <p>
        {`
          ${time.hours < 10 ? "0" + time.hours : time.hours} :
          ${time.minutes < 10 ? "0" + time.minutes : time.minutes} :
          ${time.seconds < 10 ? "0" + time.seconds : time.seconds}
        `}
      </p>
    </div>
  );
};
