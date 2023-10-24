import { useState, useEffect } from 'react';
import '../../Styling/Nav.css';

const Nav = ({ coordList, distance, time, removeMarker, planRoute, changeLine }) => {
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
            <div id="options">
                <form id="line">
                    <label for="color"><b>Color:</b></label>
                    <select name="color" id="color">
                        <option id="o_green" value="#378c5a">Green</option>
                        <option id="o_blue" value="#00bfff">Blue</option>
                        <option id="o_red" value="#b22222">Red</option>
                    </select><br />
                    <label for="width"><b>Linewidth:</b></label>
                    <select name="width" id="width">
                        <option value="4">4 px</option>
                        <option value="5">5 px</option>
                        <option value="6">6 px</option>
                    </select>
                    <br />
                    <button id="save-button" onClick={(e) => changeLine(e)}>Save</button>
                </form>
            </div>
        </div>
    );
};

export default Nav;