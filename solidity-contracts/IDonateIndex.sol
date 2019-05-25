pragma solidity ^0.5.0;


contract IDonateIndexContract {
    uint256 private projectCount = 0;
    
    mapping(uint256 => string) projects;
    
    
    function addProject(string memory _address) public {
        projects[projectCount] = _address;
        projectCount = projectCount+1;
    }
    
    function getProject(uint256 _count) public view returns (string memory) {
        return  (projects[_count]);
    }
    
    function getTotalProjects() public view returns (uint256) {
        return projectCount;
    }
    
}