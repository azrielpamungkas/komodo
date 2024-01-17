// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import an external library for generating UUIDs
import "@openzeppelin/contracts/utils/Strings.sol";

contract Election {
    // using Strings for uint256;

    address public owner;
    uint public electionEndTime;

    struct Candidate {
        string name;
        string image;
        uint256 voteCount;
    }

    struct Voter {
        bool isRegistered;
        bool isVerified;
        string id;
        string name;
        string idCard;
        address account;
    }

    struct uuidToId {
        string idcard;
    }

    // Dictionary of voters (address: Voter)
    string[] registeredIdCard;
    mapping(string => Voter) public voters;
    mapping(string => uuidToId) public getIdCard;
    mapping(string => bool) public voted;
    mapping(string => uint) public voteTimestamp;
    mapping(address => bool) public isAdmin;

    Candidate[] public candidates;

    event VoterRegistered(
        address indexed electionAccount,
        string name,
        string idCard,
        string uuid
    );

    // event VoterVerified(address indexed voter);
    constructor(uint256 _durationInMinutes) {
        owner = msg.sender;
        isAdmin[msg.sender] = true;
        electionEndTime = block.timestamp + (_durationInMinutes * 1 minutes);
    }

    //  Voter Component
    function generateUUID() internal view returns (string memory) {
        // Use a simple deterministic algorithm for demonstration
        // In a production environment, consider using an off-chain service for UUID generation
        bytes32 result = keccak256(
            abi.encodePacked(block.timestamp, msg.sender)
        );
        return Strings.toHexString(uint256(result), 32);
    }

    function bytes32ToString(
        bytes32 _bytes32
    ) public pure returns (string memory) {
        uint8 i = 0;
        while (i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }

    function addVoter(string memory _name, string memory _idCard) public {
        require(!voters[_idCard].isRegistered, "Voter is already registered");

        string memory uuid = generateUUID();
        voters[_idCard].id = uuid;
        voters[_idCard].name = _name;
        voters[_idCard].idCard = _idCard;
        voters[_idCard].account = msg.sender;
        voters[_idCard].isRegistered = true;
        getIdCard[uuid].idcard = _idCard;
        registeredIdCard.push(_idCard);
        emit VoterRegistered(msg.sender, _name, _idCard, uuid);
    }

    function fetchVoters() external view returns (string[][] memory) {
        uint numVoters = registeredIdCard.length;
        if (numVoters == 0) {
            // Return an empty array if there are no registered voters
            return new string[][](0);
        }
        string[][] memory votersArray = new string[][](numVoters);

        for (uint i = 0; i < numVoters; i++) {
            string memory voterIdCard = registeredIdCard[i];
            votersArray[i] = new string[](4);
            votersArray[i][0] = voters[voterIdCard].id;
            votersArray[i][1] = voters[voterIdCard].name;
            votersArray[i][2] = voters[voterIdCard].idCard;
            votersArray[i][3] = voters[voterIdCard].isVerified
                ? "Verified"
                : "Not Verified";
            votersArray[i][3] = voters[voterIdCard].isRegistered
                ? "Registered"
                : "Not Registered";
        }

        return votersArray;
    }

    function getVoterById(
        string memory voterId
    )
        external
        view
        returns (string memory, string memory, string memory, bool, bool)
    {
        string memory _idCard = getIdCard[voterId].idcard;
        require(voters[_idCard].isRegistered, "Voter not found");
        return (
            voters[_idCard].id,
            voters[_idCard].name,
            voters[_idCard].idCard,
            voters[_idCard].isVerified,
            voters[_idCard].isRegistered
        );
    }

    function deleteVoterById(string memory voterId) public {
        string memory _idCard = getIdCard[voterId].idcard;
        require(voters[_idCard].isRegistered, "Voter not found");
        delete voters[_idCard];
        emit VoterDeleted(voterId);
    }

    event VoterDeleted(string indexed voterId);

    function updateVoter(string memory uuid, string memory _newName) public {
        string memory _idCard = getIdCard[uuid].idcard;
        require(voters[_idCard].isRegistered, "Voter not found");
        // require(msg.sender == voters[_idCard].account || isAdmin[msg.sender], "Unauthorized");
        voters[_idCard].name = _newName;

        // Emit an event or perform any other necessary actions
        emit VoterUpdated(msg.sender, _idCard, _newName);
    }

    event VoterUpdated(
        address indexed updater,
        string indexed idCard,
        string newName
    );

    function verifyVoter(string memory uuid) public {
        string memory _idCard = getIdCard[uuid].idcard;
        require(voters[_idCard].isRegistered, "Voter not found");
        // require(msg.sender == voters[_idCard].account || isAdmin[msg.sender], "Unauthorized");
        voters[_idCard].isVerified = true;

        // Emit an event or perform any other necessary actions
        emit VoterVerify(msg.sender, _idCard);
    }

    event VoterVerify(address indexed updater, string indexed idCard);

    // End Voter Component

    // Candidate Component
    function addCandidate(string memory _name, string memory _image) public {
        candidates.push(Candidate({name: _name, image: _image, voteCount: 0}));
    }

    function fetchCandidates() external view returns (Candidate[] memory) {
        uint numCandidates = candidates.length;

        // Return an empty array if there are no candidates
        if (numCandidates == 0) {
            return new Candidate[](0);
        }

        Candidate[] memory candidatesArray = new Candidate[](numCandidates);

        for (uint i = 0; i < numCandidates; i++) {
            candidatesArray[i] = candidates[i];
            // candidatesArray[i] = candidates[i];
        }
        return candidatesArray;
    }

    function deleteCandidate(uint candidateIndex) public {
        require(candidateIndex < candidates.length, "Invalid candidate index");

        // You can add additional conditions or permissions if needed

        delete candidates[candidateIndex];

        // Emit an event or perform any other necessary actions
        emit CandidateDeleted(candidateIndex);
    }

    event CandidateDeleted(uint indexed candidateIndex);

    function updateCandidate(
        uint candidateIndex,
        string memory _newName,
        string memory _newImage
    ) public {
        require(candidateIndex < candidates.length, "Invalid candidate index");

        // You can add additional conditions or permissions if needed

        Candidate storage candidate = candidates[candidateIndex];
        candidate.name = _newName;
        candidate.image = _newImage;

        // Emit an event or perform any other necessary actions
        emit CandidateUpdated(msg.sender, candidateIndex, _newName, _newImage);
    }

    event CandidateUpdated(
        address indexed updater,
        uint indexed candidateIndex,
        string newName,
        string newImage
    );

    function vote(uint candidateIndex, string memory _uuid) public {
        string memory _idCard = getIdCard[_uuid].idcard;
        require(
            voters[_idCard].isRegistered,
            "Only registered voters can vote"
        );
        require(!voted[_idCard], "Voter has already cast a vote");
        require(candidateIndex < candidates.length, "Invalid candidate index");

        // You can add additional conditions or permissions if needed

        candidates[candidateIndex].voteCount++;
        voted[_idCard] = true;
        voteTimestamp[_idCard] = block.timestamp;

        // Emit an event or perform any other necessary actions
        emit Voted(msg.sender, _idCard, candidateIndex);
    }

    event Voted(
        address indexed electionAccount,
        string indexed idCard,
        uint indexed candidateIndex
    );
}
