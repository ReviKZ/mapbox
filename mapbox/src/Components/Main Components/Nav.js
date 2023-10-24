import { useState, useEffect } from 'react';
import '../../Styling/Nav.css';

const Nav = ({ coordList, distance, time, removeMarker, planRoute }) => {
    const [list, setList] = useState(coordList);

    useEffect(() => {
        // Update the 'list' state when 'coordList' changes
        setList(coordList);
    }, [coordList]);

    return (
        <div id="nav-box">
            <ul className="markers">
                {list ?
                    list.map((marker, index) => (
                        <li key={index} className="marker">
                            {marker.marker._lngLat.lng}, {marker.marker._lngLat.lat} <button className="del-button" onClick={() => removeMarker(index)}>X</button>
                        </li>
                    ))
                    :
                    <></>
                }
            </ul>
            <div id="information">
                <b className="distance">{distance ? distance : <></>} km</b><br />
                <b className="time">{time ? time : <></>} minutes</b><br />
                <button id="plan-button" onClick={() => planRoute()}>Plan</button>
            </div>
        </div>
    );
};

export default Nav;