import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ContenedorResultado = styled.div`
    color: #0d2235;
    margin-top: 2rem;
    border-radius: 10px;
    padding: 20px;
    background-color: #eaeaea;
    box-shadow: 3px 3px 3px 2px rgba(0, 0, 0, 0.2);
`;

const Info = styled.p`
    font-size:18px;
    span{
        font-weight: bold;
    }
`;

const Precio = styled.p`
    font-size: 22px;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
`;

const Resultado = ({ resultado }) => {

    if(Object.keys(resultado).length === 0) return null;

    return (
        <ContenedorResultado>
            <Precio>El precio es: <span>{ resultado.PRICE }</span></Precio>
            <Info>Precio más alto del día: <span>{ resultado.HIGHDAY }</span></Info>
            <Info>Precio más bajo del día: <span>{ resultado.LOWDAY }</span></Info>
            <Info>Variación últimas 24 horas: <span>{ resultado.CHANGEPCT24HOUR }</span></Info>
            <Info>Última actualización: <span>{ resultado.LASTUPDATE }</span></Info>
        </ContenedorResultado>
    );

}

Resultado.propTypes = {
    resultado: PropTypes.object.isRequired
}

export default Resultado;
