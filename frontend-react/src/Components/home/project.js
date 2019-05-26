import React from "react";
import {Content} from "../shared/common";
import styled from 'styled-components'
import {  Link} from "react-router-dom";
import Webcam from "react-webcam";
import Overlay from 'react-image-overlay'
import FileBase64 from 'react-file-base64';
import { ethers } from 'ethers';
import { IDonateABI, IDonateByteCode, IDonateIndexABI } from "../../ABI";
import ipfs from "../../ipfs";
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

class Project extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            address : props.match.params.address,
            loading: false,
            project: null,
            submitting: false,
            image: null,
            imageOverlay: null,
            overlayPos : "bottomRight"
        }

        

    }

    async componentDidMount() {
        this.infuraProvider = await new ethers.providers.InfuraProvider("kovan", "c719e84c3f494d3ca05aa0fb5a36a2f8");
        this.wallet = await new ethers.Wallet(this.props.privkey, this.infuraProvider)
        this.contract = new ethers.Contract( this.state.address  , IDonateABI, this.wallet);

        this.load();


    }

    load = async () => {
        this.setState({
            loading : true
        })
        
        const title = await this.contract.title();
        const goal = await this.contract.goal();
        const total = await this.contract.total();
        const description = await this.contract.description();
        const from = await this.contract.from();
        const pictureUrl = await this.contract.pictureUrl();
        const overlayPictureUrl = await this.contract.overlayPictureUrl();
        const position = await this.contract.position();

        
        console.log("title,", title)

        const project = {
            title : title,
            description: description,
            goal :  ethers.utils.formatEther(goal.toString()),
            total : ethers.utils.formatEther(total.toString()),
            from : from,
            pictureUrl: pictureUrl,
            overlayPictureUrl: overlayPictureUrl,
            position: position
        }
        this.setState({
            project : project
        })
        try {
            console.log("load ipfs")
            const picRaw = await ipfs.get(pictureUrl);
            const pic = picRaw[0].content.toString('utf8');
            const overlay = await ipfs.get(overlayPictureUrl);
            const picOverlay = overlay[0].content.toString('utf8');
            console.log("load ipfs done")
            this.setState({
                image: pic,
                imageOverlay: picOverlay,
                overlayPos: position
            })



        } catch (e) {
            console.log("error : ",e)
        }
        this.setState({
            loading: false
        })  

    }

    withdraw = async () =>{
        this.setState({
            submitting : true
        })

        //const infuraProvider = await new ethers.providers.InfuraProvider("kovan", "c719e84c3f494d3ca05aa0fb5a36a2f8");
        //const wallet = await new ethers.Wallet(this.props.privkey, infuraProvider)
        //const contract = new ethers.Contract( this.state.address  , IDonateABI, this.wallet);


        const tx = await this.contract.withdrawOwner();

        console.log("waiting tx hash : ",tx.hash," until it is mined...")
        await tx.wait();

        this.setState({
            submitting : false
        })
    }



    fund = async (amount) => {
        console.log("funding : ",amount);
        this.setState({
            submitting : true
        })

        //const infuraProvider = await new ethers.providers.InfuraProvider("kovan", "c719e84c3f494d3ca05aa0fb5a36a2f8");
        //const wallet = await new ethers.Wallet(this.props.privkey, infuraProvider)
        //const contract = new ethers.Contract( this.state.address  , IDonateABI, this.wallet);

        let options = {
            value: ethers.utils.parseEther(amount),

        };

        const tx = await this.contract.add(options);

        console.log("waiting tx hash : ",tx.hash," until it is mined...")
        await tx.wait();
        console.log("mined.")

        this.setState({
            submitting : false
        })




    }

    fundMin = () => {
        this.fund("0.1");
    }

    fundDefault = () => {
        this.fund("0.2");
    }

    fundMax = () => {
        this.fund("0.4");
    }




    render() {
        // console.log(this.state)
        return (
            <Content>
                    { this.state.loading || this.state.project===null ? <Spinner type="grow" />  : 
                    <>
                    <Header>{this.state.project.title}</Header>
                    {/*
                    <h6> Amount {this.state.project.total}/{this.state.project.goal} DAI </h6>
                    */}
                    <h6>
                        {this.state.project.from}
                    </h6>
                    <p>
                        {this.state.project.description}
                    </p>
                    { (this.state.image && this.state.imageOverlay) &&
                        <Overlay 
                                url={this.state.image} // required
                                overlayUrl={this.state.imageOverlay} // required
                                
                                position={this.state.overlayPos}
                                overlayWidth={100}
                                overlayHeight={100}
                                overlayPadding={10}
                                watermark={false}
                        />
                    }
                    <div style={{ marginTop: "20px", marginBottom: "10px"}}>
                        <h6> Funded {this.state.project.total} / {this.state.project.goal} ETH </h6>{ this.state.submitting && <> <Spinner type="grow" />  </>}
                    </div>  
                     <div style={{ marginTop: "20px", marginBottom: "10px"}}>
                        <>
                                <Label style={{marginRight:"4px"}}>Help Them</Label>
                                <FormGroup>
                                    <StyledButton disabled={this.state.submitting} size="sm" onClick={this.fundMin} color="primary">0.1 ETH</StyledButton>
                                    <StyledButton disabled={this.state.submitting} size="sm" onClick={this.fundDefault}  color="primary">0.2 ETH</StyledButton>
                                    <StyledButton disabled={this.state.submitting} size="sm" onClick={this.fundMax}  color="primary" >0.4 ETH</StyledButton>
                                </FormGroup>
                        </>
                        <>
                                <Label style={{marginRight:"4px"}}>Withdraw (If your're fundraiser)</Label>
                                <FormGroup>
                                    <StyledButton disabled={this.state.submitting} size="sm" onClick={this.withdraw} color="info">Submit</StyledButton>
                                </FormGroup>
                        </>


                        </div>
                    
                    

                    
                    </>
                }
            </Content>

        )
    }
}

export default Project;

