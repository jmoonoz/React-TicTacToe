import { useState } from "react";
import "./styles.css";
// import Icon from './Icon';
import Icon from "./Icon";
// react toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Reactstrap
import { Card, CardBody, Col, Row, Container, Button } from "reactstrap";

// global array variable for game board
const itemArray = new Array(9).fill("empty");

const App = () => {
  // identirfy which player turns
  const [isX, setIsX] = useState(false);
  //check to see if theres a winner
  const [winnerStat, setWinnerStat] = useState("");

  const reloadgmae = () => {
    setIsX(false);
    setWinnerStat("");
    itemArray.fill("");
  };

  // function library to check if the board has any winners
  // this will check every possible win and see if theres a winner
  // it checks to see if the winning positions are filled exactly with the
  // same input
  function checkWinnerStat() {
    // across top row
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"
    ) {
      setWinnerStat(`${itemArray[0]} is the Winner`);
    } else if (
      // across middle row
      itemArray[3] !== "empty" &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      setWinnerStat(`${itemArray[3]} is the Winner`);
    } else if (
      // across bottom row
      itemArray[6] !== "empty" &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      setWinnerStat(`${itemArray[6]} is the Winner`);
    } else if (
      // first colummn vertically
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      setWinnerStat(`${itemArray[0]} is the Winner`);
    } else if (
      //  second column vertical
      itemArray[1] !== "empty" &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      setWinnerStat(`${itemArray[1]} is the Winner`);
    } else if (
      // third column horizontal
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      setWinnerStat(`${itemArray[2]} is the Winner`);
    } else if (
      // top left bottom right
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      setWinnerStat(`${itemArray[0]} is the Winner`);
    } else if (
      // Bottom left to top right
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      setWinnerStat(`${itemArray[2]} is the Winner`);
    }
  }

  const changePlayer = (loc) => {
    // if a winner of the game is found, change winner status
    if (winnerStat) {
      return toast(winnerStat, { type: "Success" });
    }

    // if no winners have been found, contioue the game
    // and chancge the players turn
    if (itemArray[loc] === "empty") {
      itemArray[loc] = isX ? "X" : "O";
      setIsX(!isX);
    } else {
      return toast("Spot filled", { type: "error" });
    }
    checkWinnerStat();
  };

  return (
    // board game being created
    <Container className="game-board">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
          {/* checks board game and sees if theres a winner */}
          {winnerStat ? (
            <div className="my-4">
              <div className="my-4 p-3 border border-3 rounded border-white">
                <h1 className="text-white text-center">{winnerStat}</h1>
              </div>
              <Button className="reload-btn" block onClick={reloadgmae}>
                Reload Game
              </Button>
            </div>
          ) : (
            <div className="banner">
              <h1 className="text-white">{isX ? "X" : "O"}'s Turn</h1>
            </div>
          )}
          <div className="container-grid">
            {itemArray.map((item, index) => (
              <Card onClick={() => changePlayer(index)}>
                <CardBody className="box2 p-5 box">
                  <Icon key={index} className="text-dark" name={item} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
