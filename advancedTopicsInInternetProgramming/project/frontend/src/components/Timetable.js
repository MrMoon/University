import React, {useEffect, useState} from "react";
import {auth} from "../utils/auth";
import axios from "axios";
import {Table, TableBody, TableCell, TableRow} from "@mui/material";
import "../styles/timetable.scss";

export const Timetable = () => {

    const [timetables, setTimetables] = useState([]);

    useEffect(() => {
        fetchTimetables().then(data => console.log(data));
    }, []);

    const fetchTimetables = async () => {
        try {
            const authToken = auth.getAuthToken();
            const config = {
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: `Bearer ${authToken}`
                }
            }
            const res = await axios.get('/api/fetchdata', config);
            const timetables = [];
            let section = '';
            console.log(res.data);
            res.data.forEach((cur) => {
                for (let i = 0; i < cur.length; ++i)
                    for (let j = 0; j < cur[i].length; ++j)
                        if (cur[i][j] !== 0)
                            section = cur[i][j].sections[0];

                timetables.push({
                    section: section,
                    timetable: [
                        {
                            day: 'Monday',
                            lectures: cur[0]
                        },
                        {
                            day: 'Tuesday',
                            lectures: cur[1]
                        },
                        {
                            day: 'Wednesday',
                            lectures: cur[2]
                        },
                        {
                            day: 'Thursday',
                            lectures: cur[3]
                        },
                        {
                            day: 'Friday',
                            lectures: cur[4]
                        }
                    ]
                });
            });
            setTimetables(prevState => prevState.concat(timetables));
            console.log(timetables);
        } catch (err) {
            console.log(err);
        }
    };

    return(
        <div className="timetable-cont">
            {timetables.map((cur)=>(
                    <div className="timetable">
                        <h2 className="timetable__heading">{cur.section}</h2>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>Days</b></TableCell>
                                    <TableCell><b>8am-9am</b></TableCell>
                                    <TableCell><b>9am-10am</b></TableCell>
                                    <TableCell><b>10am-11am</b></TableCell>
                                    <TableCell><b>11am-12pm</b></TableCell>
                                    <TableCell><b>1pm-2pm</b></TableCell>
                                    <TableCell><b>2pm-3pm</b></TableCell>
                                    <TableCell><b>3pm-4pm</b></TableCell>
                                </TableRow>
                                {cur.timetable.map((cur)=>{
                                    return(
                                        <TableRow>
                                            <TableCell>{cur.day}</TableCell>
                                            {cur.lectures.map((cur)=>(<TableCell><p>{cur.subject}</p><p>{cur.teacher}</p></TableCell>))}
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                )
            )}
            <Table>
                <TableBody>
                </TableBody>
            </Table>
        </div>
    )
};
