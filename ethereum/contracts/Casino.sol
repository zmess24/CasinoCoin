pragma solidity ^0.4.17;

contract Casino {
    
    address public owner;
    uint public minimumBet = 0.1 ether;
    uint public totalBet = 0;
    uint public numberOfBets = 0;
    uint public maxAmountOfBets = 10;
    uint public roundsWithOutWinner = 0;
    address[] public players;
    
    struct Player {
        uint amountBet;
        uint numberSelected;
    }
    
    mapping(address => Player) playerInfo;
    
    function Casino() public {
        owner = msg.sender;
    }
   
   function bet(uint number) public payable {
       assert(checkPlayerExists(msg.sender) == false);
       assert(number >= 1 && number <= 10);
       assert(msg.value >= minimumBet);
       
       playerInfo[msg.sender].amountBet = msg.value;
       playerInfo[msg.sender].numberSelected = number;
       numberOfBets += 1;
       players.push(msg.sender);
       totalBet += msg.value;
       
       if (numberOfBets == maxAmountOfBets) {
           generateNumberWinner();
       }
   }
   
   function checkPlayerExists(address player) private view returns (bool) {
       for (uint i = 0; i < players.length; i++) {
           if (players[i] == player) return true;
       }
       return false;
   }
   
   function generateNumberWinner() private {
       uint numberGenerated = block.number % 10 + 1; // This isn't secure
       distributePrizes(numberGenerated);
    }
    
    function distributePrizes(uint numberWinner) private {
        address[100] memory winners;
        uint count = 0;
        
        for (uint i = 0; i < players.length; i++) {
            address playerAddress = players[i];
            if (playerInfo[playerAddress].numberSelected == numberWinner) {
                winners[count] = playerAddress;
                count++;
            }
            delete playerInfo[playerAddress];
        }
        
        players.length = 0;

        if (count > 0) {
            uint winnerEtherAmount = totalBet/count;
        
            for (uint j = 0; j < count; j++) {
                if (winners[j] != address(0)) {
                    winners[j].transfer(winnerEtherAmount);
                }
            }

            totalBet = 0;
            numberOfBets = 0;    
            roundsWithOutWinner = 0;
        } else {
            numberOfBets = 0;
            roundsWithOutWinner++;
        }

    }
    
    function() public payable {}
} 