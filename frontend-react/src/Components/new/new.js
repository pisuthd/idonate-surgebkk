import React from "react";
import {Content} from "../shared/common";
import styled from 'styled-components'
import Webcam from "react-webcam";
import Overlay from 'react-image-overlay'
import FileBase64 from 'react-file-base64'; 
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
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
            hasCamera: false,
            image: null,
            state: "",
            imageOverlay: null,
            overlayPos : "bottomRight",
            contractTitle:"",
            contractDescription: "",
            contractTarget : "",
            contractFrom : ""
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

    submit = () => {
        
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
                        <Form>
                                <FormGroup>
                                    <Label for="title">Title</Label>
                                    <Input type="text" name="title" id="title" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="desc">Description</Label>
                                    <Input type="textarea" name="text" id="desc" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="from">From</Label>
                                    <Input type="text" name="from" id="from" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="target">Target</Label>
                                    <Input type="number" name="target" id="target" />
                                </FormGroup>    
                        </Form>
                        </div>


                        <div style={{display:"flex", marginTop: "20px", marginBottom: "10px"}}>
                            <StyledButton onClick={this.backToCapture} color="secondary">Back</StyledButton>
                            <StyledButton onClick={this.submit} color="success">Submit</StyledButton>
                            
                        </div>
                    </Content>
                }
            </>
            
        )
    }

};

export default New;
