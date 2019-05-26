import React from "react";
import {Content} from "../shared/common";
import styled from 'styled-components'
import Webcam from "react-webcam";
import Overlay from 'react-image-overlay'
import FileBase64 from 'react-file-base64';
import { ethers } from 'ethers';
import { IDonateABI, IDonateByteCode } from "../../ABI";
import { Button,Spinner, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import {
    ArrowDownLeft,
    ArrowDownRight,
    ArrowUpLeft,
    ArrowUpRight,
    Circle
} from 'react-feather'

const PreviewWrapper = styled.img`
    margin-bottom: 20px;
`

const FileButton = styled(Button)`
    margin-left: 4px;
    width: 230px;
`   

const StyledButton = styled(Button)`
    margin-right: 4px;
`;

class New extends React.Component {

    constructor(props) {
        super(props);

        // this.toggle = this.toggle.bind(this);
        this.state = {
            preview: "",
            loading : false,
            hasCamera: false,
            image: null,
            state: "",
            imageOverlay: null,
            overlayPos : "bottomRight",
            contractTitle:"",
            contractDescription: "",
            contractTarget : "0.4",
            contractFrom : "",
            miningStatus : ""
        };
    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        const imageSrc = this
            .webcam
            .getScreenshot();
        this.setState({
            image : imageSrc
        })

        
    };

    cancelCapture = () => {
        this.setState({
            image: null
        })
    }

    getFiles(files){
        // this.setState({ files: files })
        console.log(files[0]);
        if (files[0]) {
            this.setState({
            imageOverlay: files[0].base64,
            state: "edit"
        })
        
        }
        
    }

    backToCapture = () => {
        this.setState({
            state: "",
            image: null,
            imageOverlay:null
        })
    }

    setTR = ()=>{
        this.setState({
            overlayPos: "topRight"
        })
    }

    setTL = ()=>{
        this.setState({
            overlayPos: "topLeft"
        })
    }

    setCenter = ()=>{
        this.setState({
            overlayPos: "center"
        })
    }

    setBL = ()=>{
        this.setState({
            overlayPos: "bottomLeft"
        })
    }

    setBR = ()=>{
        this.setState({
            overlayPos: "bottomRight"
        })
    }

    setFillState = () => { 
        this.setState({
            state : "form"
        })
    }


    setMinTarget = () => {
        this.setState({
            contractTarget : "0.2"
        })
    }

    setMaxTarget = () => {
        this.setState({
            contractTarget : "0.6"
        })
    }

    setDefaultTarget = () => {
        this.setState({
            contractTarget : "0.4"
        })
    }

    uploadPics = async  (pic, picOverlay, pos) => {
        console.log("uploading...");
        
    }

    submit = async () => {
    
        if (!this.props.privkey) {
            alert("No privkey provided!")
            return;
        }

        if (!this.state.contractTitle) {
            alert("No Title!")
            return;
        }

        if (!this.state.contractFrom) {
            alert("From who is not provided!")
            return;
        }

        if (!this.state.image || !this.state.imageOverlay || !this.state.overlayPos ) {
            alert("Cannot find pics!")
            return;
        }




        this.setState({
            loading : true
        })

        await this.uploadPics(this.state.image,this.state.imageOverlay, this.state.overlayPos );
        
        /*
        const infuraProvider = await new ethers.providers.InfuraProvider("kovan", "c719e84c3f494d3ca05aa0fb5a36a2f8");
        
        const wallet = await new ethers.Wallet(this.props.privkey, infuraProvider)

        // const etherContract = new ethers.Contract(this.props.contractAddress , IDonateABI , wallet);

        let factory = await new ethers.ContractFactory(IDonateABI, IDonateByteCode, wallet);
        
        const amount = ethers.utils.parseEther(this.state.contractTarget);
        
        let contract = await factory.deploy(amount, this.state.contractTitle , this.state.contractDescription  , this.state.contractFrom);

        console.log(contract.address);


        console.log(contract.deployTransaction.hash);
        this.setState({
            miningStatus : `Confirming, Tx Hash : ${contract.deployTransaction.hash}`
        })
        
        await contract.deployed()
        */
            this.setState({
                loading : false,
                // miningStatus : `Done!, Address : ${contract.deployTransaction.hash }`
            })
    }

    handleChange= (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    
    render() {
        return (
            <>
                {   this.state.state === "" &&
                    <Content color="black">
                { this.state.image === null ?
                    <>
                     <Webcam
                    audio={false}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width="100%"/>
                
                <Button onClick={this.capture} color="primary">Take a picture</Button>{' '}
                    </>
                    :
                    <>
                        <PreviewWrapper src={this.state.image}/>
                        
                        <div style={{display:"flex"}}>
                            <Button onClick={this.cancelCapture} color="success">Cancel</Button>
                            <FileButton>
                        <FileBase64
                            multiple={ true } 
                            onDone={ this.getFiles.bind(this) } />
                        </FileButton> 
                        </div>            
                    </>
                }
                </Content>
                }
                { this.state.state === "edit" &&
                    <Content>
                        <Overlay 
                            url={this.state.image} // required
                            overlayUrl={this.state.imageOverlay} // required
                            imageWidth={"100%"}
                            position={this.state.overlayPos}
                            overlayWidth={50}
                            overlayHeight={50}
                            overlayPadding={10}
                            watermark={false}
                        />
                        
                            <div style={{display:"flex", marginTop: "20px", marginBottom: "10px"}}>
                                <StyledButton onClick={this.setTL} color={this.state.overlayPos === "topLeft" ? "info" :"secondary" }><ArrowUpLeft/></StyledButton>
                                <StyledButton onClick={this.setTR} color={this.state.overlayPos === "topRight" ? "info" :"secondary" }><ArrowUpRight/></StyledButton>  
                                <StyledButton onClick={this.setCenter} color={this.state.overlayPos === "center" ? "info" :"secondary" }><Circle/></StyledButton>
                                <StyledButton onClick={this.setBL} color={this.state.overlayPos === "bottomLeft" ? "info" :"secondary" }><ArrowDownLeft/></StyledButton>
                                <StyledButton onClick={this.setBR} color={this.state.overlayPos === "bottomRight" ? "info" :"secondary" }><ArrowDownRight/></StyledButton>
                            </div>
                        
                   
                        

                        <div style={{display:"flex", marginTop: "20px", marginBottom: "10px"}}>
                            <StyledButton onClick={this.backToCapture} color="secondary">Back</StyledButton>
                            <StyledButton onClick={this.setFillState} color="success">Next</StyledButton>       
                        </div>
                        

                        
                    </Content>

                }
                { this.state.state === "form" &&
                    <Content>
                        <Overlay 
                            url={this.state.image} // required
                            overlayUrl={this.state.imageOverlay} // required
                            
                            position={this.state.overlayPos}
                            overlayWidth={100}
                            overlayHeight={100}
                            overlayPadding={10}
                            watermark={false}
                        />
                        <div style={{ marginTop: "20px", marginBottom: "10px"}}>
                        <>
                                <FormGroup>
                                    <Label for="title">Title</Label>
                                    <Input value={this.state.contractTitle} onChange={this.handleChange}  type="text" name="title" id="contractTitle" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="desc">Description</Label>
                                    <Input value={this.state.contractDescription}  onChange={this.handleChange}   type="textarea" name="text" id="contractDescription" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="from">From</Label>
                                    <Input value={this.state.contractFrom} onChange={this.handleChange}  type="text" name="from" id="contractFrom" />
                                </FormGroup>
                                <FormGroup>
                                    <Label style={{marginRight:"4px"}}>Target</Label>
                                    <StyledButton size="sm" onClick={this.setMinTarget} color={this.state.contractTarget === "0.2" ? "primary" : "secondary"}>0.2 ETH</StyledButton>
                                    <StyledButton  size="sm" onClick={this.setDefaultTarget}  color={this.state.contractTarget === "0.4" ? "primary" : "secondary"} >0.4 ETH</StyledButton>
                                    <StyledButton size="sm" onClick={this.setMaxTarget}  color={this.state.contractTarget === "0.6" ? "primary" : "secondary"} >0.6 ETH</StyledButton>
                                </FormGroup>
                        </>
                        </div>
                        <hr/>
                        <p style={{fontSize:"12px" , wordBreak : "break-all"}}>
                        {this.state.miningStatus}</p>
                        <div style={{display:"flex", marginTop: "20px", marginBottom: "10px"}}>
                            <StyledButton disabled={this.state.loading} onClick={this.backToCapture} color="secondary">Back</StyledButton>
                            <StyledButton disabled={this.state.loading} onClick={this.submit} color="success">Submit</StyledButton>
                            { this.state.loading && <> <Spinner type="grow" />  </>}
                        </div>
                       
                        
                    </Content>
                }
            </>
            
        )
    }

};

export default New;
