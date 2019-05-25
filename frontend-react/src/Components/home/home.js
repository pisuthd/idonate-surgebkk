import React from "react";
import {Content} from "../shared/common";
import {ListGroup, ListGroupItem} from 'reactstrap';
import styled from "styled-components"

const Header = styled.h4`
    margin-bottom: 20px;
`;


class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Content>
                <Header>Projects</Header>
                <ListGroup>
                    <ListGroupItem>Cras justo odio</ListGroupItem>
                    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem>Morbi leo risus</ListGroupItem>
                    <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                </ListGroup>
            </Content>
        )
    }

};

export default Home;
