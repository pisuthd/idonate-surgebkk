import React from "react";
import {Content} from "../shared/common";
import {ListGroup, ListGroupItem} from 'reactstrap';

import {  Link} from "react-router-dom";
import styled from "styled-components"
import { ethers } from 'ethers';
import { IDonateABI, IDonateByteCode, IDonateIndexABI } from "../../ABI";
import { Button,Spinner, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';


import {
    ArrowDownLeft,
    ArrowDownRight,
    ArrowUpLeft,
    ArrowUpRight,
    Circle
} from 'react-feather'


const StyledButton = styled(Button)`
    margin-right: 4px;
`;


const Header = styled.h4`
    margin-bottom: 20px;
`;


class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        loading : false,
        projects :[],
        total : 0
    }

    componentDidMount() {
        console.log("load index contract ", this.props.index);
        
        this.loadProjects();


        
    }

    loadProjects = async () => {
        this.setState({
            loading : true
        })
        const infuraProvider = await new ethers.providers.InfuraProvider("kovan", "c719e84c3f494d3ca05aa0fb5a36a2f8");
        const wallet = await new ethers.Wallet(this.props.privkey, infuraProvider)
        const indexContract = new ethers.Contract( this.props.index, IDonateIndexABI, wallet);
        const Btotal = await indexContract.getTotalProjects();
        
        const total = Number(Btotal);
        console.log("total : ", total);
        let projects = [];
        for (let i=0;i< total;i++) {
            
            const address = await indexContract.getProject(i);
            console.log("load project on address  : ",address);
            const thisContract = new ethers.Contract( address , IDonateABI, wallet);
            const title = await thisContract.title();
            const goal = await thisContract.goal();
            const total = await thisContract.total();
            const project = {
                title : title,
                contract: address,
                goal :  ethers.utils.formatEther(goal.toString()),
                total : ethers.utils.formatEther(total.toString()) 
            }
            projects.push(project);
        }


        this.setState({
            loading: false,
            total: total ,
            projects : projects
        })


    }

    render() {
        return (
            <Content>
                <Header>Projects</Header>
                { this.state.loading ?  <Spinner type="grow" /> :
    <ListGroup>
            { this.state.projects.map((item, index)=> {
                return <ListGroupItem key={index} ><Link to={`/projects/${item.contract}`}>{item.title} ({item.total}/{item.goal} DAI)</Link></ListGroupItem>
            })
            }
                    
                </ListGroup>
                }
                
            </Content>
        )
    }

};

export default Home;
