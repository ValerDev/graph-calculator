import React from 'react'
import './App.css';


class App extends React.Component {
  componentDidMount() {

    //create canvas
    const c = document.getElementById("myCanvas")
    const ctx = c.getContext("2d")

    //colors
    const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange']
    let randomNumber = Math.floor(Math.random() * (colors.length - 1))

    //center
    const center = [c.width / 2, c.height / 2]

    //min, max

    const minX = 0;
    const maxX = c.width;
    const minY = 0;
    const maxY = c.height;

    // X and Y 
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.moveTo(0, 250)
    ctx.lineTo(500, 250)
    ctx.moveTo(250, 0)
    ctx.lineTo(250, 500)
    ctx.font = "30px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText("X", 470, 230);
    ctx.fillText("Y", 270, 30);
    ctx.fillText("^", 243, 22);
    ctx.fillText(">", 483, 261);
    ctx.stroke();


    //graph
    ctx.beginPath();
    ctx.strokeStyle = colors[randomNumber];

    ctx.moveTo(center[0], center[1]);
    ctx.quadraticCurveTo(minX, maxY / 2, minX, maxY);

    ctx.moveTo(center[0], center[1]);
    ctx.quadraticCurveTo(maxX, maxY / 2, maxX, minY);
    ctx.stroke();

  }
  render() {
    return (
      <div className="App" style={{ padding: 1 + "em" }}>
        <canvas id="myCanvas" width="500" height="500" style={{ border: 1 + 'px' + ' solid' + '#000000' }}></canvas>
      </div>
    );
  }
}
export default App;
