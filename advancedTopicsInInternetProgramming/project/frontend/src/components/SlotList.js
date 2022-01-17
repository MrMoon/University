import React, {useEffect, useState} from "react";
import axios from "axios";
import {auth} from "../utils/auth";
import "../styles/slotslist.scss";
import {SlotListItem} from "./SlotListItem";

export const SlotList = () => {

    const [slots, setSlots] = useState([]);

    useEffect(() => {
        fetchSlots().then(data => console.log(data));
    }, []);

    const fetchSlots = async () => {
      try {
          const authToken = auth.getAuthToken();
          const config = {
              headers: {
                  'Content-Type': 'Application/json',
                  Authorization: `Bearer ${authToken}`
              }
          }
          const res = await axios.get('/api/slots', config);
          console.log(res);
          setSlots(prevState => prevState.concat(res.data));
      } catch (err) {
          console.log(err);
      }
    };

    const handleRemoveSlot = async (id) => {
        try {
            const authToken = auth.getAuthToken();
            const config = {
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: `Bearer ${authToken}`
                }
            }
            const res = await axios.delete(`/api/slots/${id}`, config);
            console.log(res.status);
            setSlots(prevState => prevState.filter((slot) => slot._id !== id));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="viewbox">
            <h1 className="viewbox__heading">Allocated Slots</h1>
            {slots.map((cur) => (
                <SlotListItem
                    remove={handleRemoveSlot}
                    teacherName={cur.teacherName}
                    subjectName={cur.subjectName}
                    session={cur.session}
                    section={cur.section}
                    contactHours={cur.contactHours}
                    itemId={cur._id}
                />
            ))}
        </div>
    );
};
