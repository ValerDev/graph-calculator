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

    const Xmin = 0;
    const Xmax = c.width;
    const Ymin = 0;
    const Ymax = c.height;

    // X and Y 
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.moveTo(0, 250)
    ctx.lineTo(500, 250)
    ctx.moveTo(250, 0)
    ctx.lineTo(250, 500)
    ctx.font = "30px Cursive";
    ctx.fillStyle = 'white';
    ctx.fillText("X", 470, 230);
    ctx.fillText("Y", 270, 30);
    ctx.fillText("^", 241, 25);
    ctx.fillText(">", 490, 260);
    ctx.stroke();


    //graph
    ctx.beginPath();
    ctx.strokeStyle = colors[randomNumber];

    ctx.moveTo(center[0], center[1]);
    ctx.quadraticCurveTo(Xmin, Ymax / 2, Xmin, Ymax);

    ctx.moveTo(center[0], center[1]);
    ctx.quadraticCurveTo(Xmax, Ymax / 2, Xmax, Ymin);
    ctx.stroke();

  }
  render() {
    return (
      <div className="App">
        <div className="input-block">
          <input onChange={e => e.target.value} />
          <button type="submit">Create graph</button>
        </div>

        <canvas id="myCanvas" width="500" height="500" ></canvas>
      </div>
    );
  }
}
export default App;
