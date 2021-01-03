import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({setMoneda, setCriptomoneda, setCargando}) => {

    const [ listacripto, setListacripto ] = useState([]);
    const [ error, setError ] = useState(false);

    const MONEDAS = [
        { codigo: 'CLP', nombre: 'Peso Chileno' },
        { codigo: 'USD', nombre: 'Dolar Americano' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
    ]

    //Utilizar el hook useMoneda
    const [ moneda, SelectMoneda ] = useMoneda('Elige tu Moneda', '', MONEDAS);

    //Utilizar el hook useCriptoMoneda
    const [ criptoMoneda, SelectCriptoMoneda ] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

    //Ejecutar el llamado a la API
    useEffect(() => {

        const consultarApi = async() => {

            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            setListacripto(resultado.data.Data);
        }

        consultarApi();

    }, []);

    const cotizarMoneda = (e) => {
        e.preventDefault();
        if(moneda === '' || criptoMoneda === ''){
            setError(true);
            return;
        }

        setError(false);
        setCargando(true);
        setMoneda(moneda);
        setCriptomoneda(criptoMoneda);

    }

    return (
        <form>

            <SelectMoneda />
            <SelectCriptoMoneda />
            { error ?
                <Alert variant='danger' className="mt-4">
                    <span>Debes seleccionar moneda y criptomoneda!</span>  <Icon style={{ fontSize: 20, display: 'inline' }} className="fas fa-exclamation-triangle" />
                </Alert> 
                : null
            }
            <Boton 
                type="submit"
                onClick={cotizarMoneda}
            />
        </form>
    )
}

Formulario.propTypes = {
    setMoneda: PropTypes.func.isRequired,
    setCriptomoneda: PropTypes.func.isRequired,
    setCargando: PropTypes.func.isRequired
}

export default Formulario
