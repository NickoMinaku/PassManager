import Moment from 'moment';
import { useState } from 'react';
function PassWord(props) {
    function press(e) {
        e.preventDefault();
        setIsReadonly(prevState => {
            if (prevState == "password") return prevState = "text"
            else return prevState = "password"
        })
    }
    const [isReadonly, setIsReadonly] = useState("password");
    return <tr onClick={press}>
        <td>{props.pass.name}</td>
        <td>{Moment(props.pass.date).format('MM-DD-YYYY')}</td>
        <td><input id="tablePass" type={isReadonly} value={props.pass.pass} disabled></input></td>
    </tr >
}
export default PassWord;