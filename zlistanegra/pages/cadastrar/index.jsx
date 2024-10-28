import { useEffect, useState } from 'react'
import moment from 'moment';
import './index.scss'

import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';



export default function Cadastrar() {
    const [token, setToken] = useState(null);

    const [nome, setNome] = useState('');
    const [motivo, setMotivo] = useState('');
    const [vinganca, setVinganca] = useState('');
    const [nota, setNota] = useState('');
    const [perdoado, setPerdoado] = useState(false);

    const navigate = useNavigate()

    const { id } = useParams();

    async function salvar() {
        let paramCorpo = {
            "nome": nome,
            "motivo": motivo,
            "vinganca": vinganca,
            "notaOdio": nota,
            "perdoado": perdoado
        }
        
        if (id == undefined) {
            // CRIAR
            const url = `http://localhost:5010/listaNegra?x-access-token=${token}`;
            let resp = await axios.post(url, paramCorpo);
            alert('Pessoa adicionada na lista negra. Id: ' + resp.data.novoId);
        } else {
            // ALTERAR
            const url = `http://localhost:5010/listaNegra/${id}?x-access-token=${token}`;
            let resp = await axios.put(url, paramCorpo);
            alert('Pessoa alterada na lista negra.');
        }
    }

    async function consultar(token) {
        if (id != undefined) {
            const url = `http://localhost:5010/listaNegra/${id}?x-access-token=${token}`;
            let resp = await axios.get(url);
            let dados = resp.data;

            let data = moment(dados.vinganca).format('YYYY-MM-DD')
            console.log(data)

            setNome(dados.nome)
            setMotivo(dados.motivo)
            setVinganca(data)
            setNota(dados.notaOdio)
            setPerdoado(dados.perdoado)
        }
    }

    useEffect(() => {
        let token = localStorage.getItem('USUARIO')
        setToken(token)

        if (token == 'null') {
            navigate('/')
        }

        consultar(token);
    }, [])

    return (
        <div className='pagina-cadastrar'>
            <button><Link to={'/consultar'}>Voltar</Link></button>
            <h1>{id ? 'EDITAR' : 'CADASTRAR'}</h1>


            <div className='form'>
                <div>
                    <label>Nome:</label>
                    <input
                        type='text'
                        value={nome}
                        onChange={e => setNome(e.target.value)} />
                </div>
                <div>
                    <label>Motivo:</label>
                    <input
                        type='text'
                        value={motivo}
                        onChange={e => setMotivo(e.target.value)} />
                </div>
                <div>
                    <label>Vingança:</label>
                    <input
                        type='date'
                        value={vinganca}
                        onChange={e => setVinganca(e.target.value)} />
                </div>
                <div>
                    <label>Nota de Ódio</label>
                    <input
                        type='text'
                        value={nota}
                        onChange={e => setNota(e.target.value)} />
                </div>
                <div>
                    <label>Perdoado:</label>
                    <input
                        type='checkbox'
                        checked={perdoado}
                        onChange={e => setPerdoado(e.target.checked)} />
                </div>
            </div>
            <button onClick={salvar}> SALVAR </button>

        </div>
    )
}
