import { useEffect, useState } from 'react';
import './App.css';
import Modal from 'react-modal';
import PassWord from './passWord.jsx'
import { validEmail, validPassword } from './regex.js';

Modal.setAppElement('#root');

function App() {
    const [pass, setPass] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [pwdError, setPwdError] = useState(false);
    const [emptyErr, setEmptyErr] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const validate = () => {
        if (email == "" || password == "") {
            setEmptyErr(true);
        }
        if (document.querySelector('#mailCheck').checked == true && !validEmail.test(email)) {
            setEmailErr(true);
        }
        if (!validPassword.test(password)) {
            setPwdError(true);
        }
        return !validPassword.test(password) || (document.querySelector('#mailCheck').checked == true && !validEmail.test(email))
    };
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    useEffect(() => {
        populatePassData();
    }, []);

    function commitChanges(e) {
        setSearchInput(e.target.value);
    }

    const contents = pass === undefined
        ? <p><em>Загрузка... Пожалуйста, подождите или обновите страницу.</em></p>
        : <div>
            <div id="searchLabel">Поиск:</div><input id="search" type="text" onChange={commitChanges}></input>
            <button id="passAdd" onClick={openModal}>Добавить пароль</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <button onClick={closeModal}>Закрыть</button><br />
                <label htmlFor="mailCheck">Почта</label><input id="mailCheck" type="checkbox"></input><br />
                <form id="passForm" method="post" action="bd">
                    <label htmlFor="mailInput">{`Адрес/Почта`}</label><br /><input required value={email} onChange={(e) => setEmail(e.target.value)} name="Name" id="mailInput"></input><br />
                    <label htmlFor="passInput">Пароль</label><br /><input required value={ password } onChange={(e) => setPassword(e.target.value)} name="Pass" id="passInput" type="password"></input><br />
                </form>
                {emptyErr && <p>Заполните все поля!</p>}
                {emailErr && <p>Почта введена неверно!</p>}
                {pwdError && <p>Пароль введён неверно!</p>}
                <button onClick={sendData}>Добавить</button>
                
            </Modal> 
        <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Адрес/Почта</th>
                    <th>Дата</th>
                    <th>Пароль</th>
                </tr>
            </thead>
            <tbody>
                    {pass.filter((s) => s.name.toString().toLowerCase().includes(searchInput.toString().toLowerCase())).map(pass =>
                    <PassWord key={pass.id} pass={pass}></PassWord>
                )}
            </tbody>
            </table>
        </div>            ;

    async function sendData() {
        if (!validate()) {
        const formData = new FormData(document.querySelector('#passForm'));
        const searchParams = new URLSearchParams();
        for (const [key, value] of formData) {
            searchParams.append(key, value);
        }

        await fetch('bd', {
            method: 'POST',
            body: searchParams,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => res.json()).then((result) => (setPass([...result].map(i => i))));
        }
    }

    return (
        <div>
            <h1 id="tabelLabel">Менеджер паролей</h1>
            {contents}
        </div>
    );
    
    async function populatePassData() {
        const response = await fetch('bd');
        const data = await response.json();
        setPass(data);
    }
}

export default App;