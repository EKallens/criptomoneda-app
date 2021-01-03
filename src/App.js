import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from '../src/images/cryptomonedas.png';
import Formulario from './components/Formulario';
import axios from 'axios';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [ moneda, setMoneda ] = useState('');
  const [ criptomoneda, setCriptomoneda ] = useState('');
  const [ resultado, setResultado ] = useState({});
  const [ cargando, setCargando ] = useState(false);

  useEffect( () => {

    const consultarApi = async() => {

      //Prevenir la primera ejecución
      if(moneda === '') return;

      //Consultar la api con los valores de moneda y criptomoneda para obtener la cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const res = await axios.get(url);
      setResultado(res.data.DISPLAY[criptomoneda][moneda])
      setCargando(false);
    }

    consultarApi();

  }, [moneda, criptomoneda, cargando])

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen crypto"/>
      </div>
      <div>
        <Heading>Cotizador de Criptomonedas</Heading>
        <Formulario
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
          setCargando={setCargando}
        />
        { cargando  ? <Spinner/> : null }
        { !cargando ? <Resultado resultado={ resultado } /> : null}
      </div>
    </Contenedor>
  );
}

export default App;
