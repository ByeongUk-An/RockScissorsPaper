import {useState} from "react";
import './App.css';
import Box from './components/Box';



// 1. 박스 2개 (타이틀,사진,결과)
//2. 가위 바위 보 버튼이 있다
//3. 버튼을 클릭하면 클릭한 값이 박스에 보임
//4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
//5. 3 4의 결과를 가지고 누가 이겼는지 승패를 비교해준다
//6. 승패결과에 따라 테두리 색이 바뀐다.(이기면 초록, 지면 빨강, 비기면 검은색)

// 1. 컴퓨터결과보이게하기
// 2. 승패결과에 따라 테두리 색이 바뀐다.(이기면 초록, 지면 빨강, 비기면 검은색)

const choice = {
  rock:{
    name:"Rock",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4rO45LBFzym2h1Qey8QcozVLjE_bHPrNT-g&usqp=CAU"
  },
  scissors:{
    name:"Scissors",
    img:"data:image/jpeg;base64,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"
  },
  paper:{
    name:"Paper",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTByxl21CEOgZgxly6ILu-ZE39e6RrAGFSQGw&usqp=CAU"
  }
}

function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect,setComputerSelect] = useState(null);
  const [result,setResult] = useState("");
  const [results,setResults] = useState("");
  const [game,setGame] = useState("");

  const play=(userChoice)=> {
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userChoice],computerChoice));
    setResults(judgements(choice[userChoice],computerChoice));

  };





  const judgement = (user,computer) => {
    // user == computer tie
    // user == rock, computer == scissors  user win
    // user == rock, computer == paper user lose
    // user == scissors, computer == paper user win
    // user == scissors, computer == rock user lose
    // user == paper computer == rock  user win
    // user == paer , computer == scissors uer lose

    if(user.name == computer.name) {
      return "tie"
    }else if(user.name == "Rock") {
      return computer.name == "Scissors" ? "win" : "lose";
    }else if(user.name =="Scissors") {
      return computer.name == "Paper" ? "win" : "lose";
    }else if(user.name =="Paper") {
      return computer.name =="Rock" ? "win" : "lose";
    }
  };

  const judgements = (user,computer) => {
    if(user.name == computer.name) {
      return "tie"
    }else if(computer.name == "Rock") {
      return user.name == "Scissors" ? "win" : "lose";
    }else if(computer.name =="Scissors") {
      return user.name == "Paper" ? "win" : "lose";
    }else if(computer.name =="Paper") {
      return user.name =="Rock" ? "win" : "lose";
    }
  };


  const randomChoice = () => {
    // let arr = ["rock","scissors","paper"];
    let itemArray = Object.keys(choice);  // 객체에 키값만 뽑아서 베열로 만들어주는 함수
    let randomItem = Math.floor(Math.random()*itemArray.length);
    let final = itemArray[randomItem];
    return choice[final];
  };
  
  
  return (
  <>
    <div className="main">
      <Box title="You" item={userSelect} result={result}/>
      <Box title="Computer" item={computerSelect} results={results}/>
    </div>
    <div className="btn-wrap">
      <button onClick={()=> play("scissors")}>
        <img className="btn" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOrbpupOzM4cRcrhNsIs650n3ub0n4xPyaaA&usqp=CAU" alt="가위"/>
      </button>
      <button onClick={()=> play("rock")}>
        <img className="btn" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4rO45LBFzym2h1Qey8QcozVLjE_bHPrNT-g&usqp=CAU" alt="바위"/>
      </button>
      <button onClick={()=> play("paper")}>
        <img className="btn" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTByxl21CEOgZgxly6ILu-ZE39e6RrAGFSQGw&usqp=CAU" alt="보"/>
      </button>
    </div>
  </>
  );
}

export default App;
