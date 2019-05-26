pragma solidity ^0.5.0;

contract IDonate {
    address payable owner;
    uint public goal;
    uint public total = 0;
    bool public ended = false;
    
    mapping(address=>uint) donations;
    
    string public title;
    string public description;
    string public from;
    
    string public pictureUrl;
    string public overlayPictureUrl;
    string public position;
    
    
    constructor(uint _goal, string memory _title, string memory _description, string memory _from) public {
        owner = msg.sender;
        goal = _goal;
        title = _title;
        description = _description;
        from = _from;
    }
    
    function attachPictureUrl(string memory _pictureUrl, string memory _overlayPictureUrl, string memory _position) public {
        pictureUrl = _pictureUrl;
        overlayPictureUrl = _overlayPictureUrl;
        position = _position;
    }
    
    function add() payable public {
        require(total < goal, "We reached a goal.");
        require(msg.value > 0, "You need to send some ether");
        donations[msg.sender] += msg.value; 
        total += msg.value;
    }
    
    function withdrawOwner() public {
        require(msg.sender == owner, "You must be owner");
        require(total >= goal, "Fundraising not closed yet");
        owner.transfer(address(this).balance);
        ended = true;
    }
    
    function withdraw() public {
        require(total < goal, "Can not withdraw when fundraising was successful");
        uint amount = donations[msg.sender];
        total -= amount;
        donations[msg.sender] = 0;
        address(msg.sender).transfer(amount);
    }


}