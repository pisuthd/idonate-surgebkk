import React from "react";
import styled from "styled-components"
import {Content} from "../shared/common";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Spinner, Table } from 'reactstrap';
import Maker from '@makerdao/dai';



const {
    MKR,
    DAI,
    ETH,
    WETH,
    PETH,
    USD_ETH,
    USD_MKR,
    USD_DAI
  } = Maker;

const Header = styled.h4`
    margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
    margin-right: 5px;
`;

class Settings extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadBalance();
    }

    state = {
        loading : false,
        eth : "",
        dai : "",
        weth : "",
        rate: ""
    }

    ETHtoDai = async () => {
        const maker = await Maker.create('http',{
            privateKey: this.props.privkey,
            url: 'https://kovan.infura.io/v3/c719e84c3f494d3ca05aa0fb5a36a2f8'
        })
        const price = maker.service('price');
        const ethPrice = await price.getEthPrice();


    }

    ETHtoWETH = async () => {

    }

    DaiToETH = async () => { 

    }

    WETHtoETH = async () => {

    }

    loadBalance = async () => {
        this.setState({
            loading: true
        })
        const maker = await Maker.create('http',{
            privateKey: this.props.privkey,
            url: 'https://kovan.infura.io/v3/c719e84c3f494d3ca05aa0fb5a36a2f8'
        })

        const tokenService = maker.service('token');

        const dai = tokenService.getToken(DAI);
        // const weth = tokenService.getToken(WETH);
        const eth = tokenService.getToken(ETH);

        const price = maker.service('price');
        const ethPrice = await price.getEthPrice();


        const balance = await eth.balance();
        const balanceDai = await dai.balance();
        // const balanceWeth = await weth.balance();
        console.log(ethPrice.toString())
        
        this.setState({
            loading: false,
            eth : balance.toString(),
            // weth: balanceWeth.toString(),
            dai : balanceDai.toString(),
            rate: ethPrice.toString()
        })
    }

    changeToAlice = () =>{
        this.props.changeUser("alice")
        this.loadBalance()
    }

    changeToBob = () =>{
        this.props.changeUser("bob")
        this.loadBalance()
    }






    render() {
        return (
            <Content>
                <Header>Change User</Header>
                <div style={{display: "flex"}}>
                    <StyledButton disabled={this.state.loading} color={ this.props.user === 'alice' ? "success" : "secondary"} onClick={this.changeToAlice}>Alice</StyledButton>
                    <StyledButton disabled={this.state.loading} color={ this.props.user === 'bob' ? "success" : "secondary"} onClick={this.changeToBob}>Bob</StyledButton>
                    

                </div>
                <hr/>
                <Header>Account : {this.props.user}</Header>
                <div style={{display:"flex"}}>
                    { this.state.loading ?  <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />  :
                         <>
                         <Table>
                         <thead>
                           <tr>
                             <th>{ this.state.eth }</th>
                             <th width="40%">

                                    <StyledButton color="primary" size="sm">Buy 10 DAI</StyledButton>
                                    
                             </th>
                           </tr>
                         </thead>
                         <tbody>
                           {/*
                           
                           <tr>
                             <td>{ this.state.weth }</td>
                             <td><StyledButton color="secondary" size="sm">To ETH</StyledButton></td>
                           </tr>
                            */}
                           <tr>
                             <td>{ this.state.dai }</td>
                             <td><StyledButton color="danger" size="sm">Sell 10 DAI</StyledButton></td>
                           </tr>
                         </tbody>
                       </Table>
                       </>
                    }

                   
                </div>
                <p style={{marginLeft: "10px"}}><small>{ this.state.rate }</small></p>
            </Content>
           
        )
    }
}

export default Settings;
