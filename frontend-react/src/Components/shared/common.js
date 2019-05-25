
import styled from "styled-components";


export const Content = styled.div`
    padding: 24px;
    background-color: ${props=> props.color ? props.color : "white"};
    height: 100vh;
    padding-top: 80px;
    z-index:2;
`
