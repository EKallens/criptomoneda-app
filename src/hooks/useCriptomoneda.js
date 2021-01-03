import React, { useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #fff;
    text-transform: uppercase;
    font-weight: none;
    font-size: 1.8rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    margin-top: 1rem;
`;

const useCriptomoneda = (label, stateInicial, opciones) => {

    const [ state, setState ] = useState(stateInicial);

    const SelectCripto = () => (
        <>
            <Label>{label}</Label>
            <Select onChange={ (e) => setState(e.target.value) } value={state}>
                <option value="">- Seleccione -</option>
                { opciones.map( opcion => (
                    <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{ opcion.CoinInfo.FullName }</option>
                    ))
                }
            </Select>
        </>
    )

    return [ state, SelectCripto, setState ];

}

export default useCriptomoneda;