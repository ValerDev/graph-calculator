import React from 'react'
import './App.css';


class App extends React.Component {
  state = {
    func: '',
    max: '',
    min: '',
    colors: ['crimson', 'SeaGreen', 'RoyalBlue', 'DarkOrange', 'Indigo'],
    randomNumber: 1,
    x: [],
    y: [],
    c: null,
    ctx: null,
    centerX: null,
    centerY: null,
    blocker: false,
  }
  componentDidMount() {

    //create canvas
    const c = document.getElementById("myCanvas")
    const ctx = c.getContext("2d")

    //center
    const center = [c.width / 2, c.height / 2]
    this.setState({
      c: c,
      ctx: ctx,
      centerX: center[0],
      centerY: center[1],
    })
    // X and Y lines
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.moveTo(20, 250)
    ctx.lineTo(480, 250)
    ctx.moveTo(250, 20)
    ctx.lineTo(250, 480)
    ctx.font = "30px Cursive";
    ctx.fillStyle = 'white';
    ctx.fillText("X", 470, 230);
    ctx.fillText("Y", 270, 30);
    ctx.fillText("^", 241, 40);
    ctx.fillText(">", 475, 260);
    ctx.font = "8px Cursive";
    for (let i = -20, j = 43; i < 0, j < 250; i += 4, j += 40) {
      ctx.fillText(i, j, 265) ;
    }
    for (let i = 4, j = 285; i < 20, j < 460; i += 4, j += 40) {
      ctx.fillText(i, j, 265);
    }

    for (let i = 20, j = 50; i < 4, j < 250; i -= 4, j += 40) {
      ctx.fillText(i, 260, j);
    }

    for (let i = -4, j = 290; i < -20, j < 480; i -= 4, j += 40) {
      ctx.fillText(i, 260, j);
    }
    ctx.stroke();
    ctx.lineWidth = 3;
  }

  // create graph function

  plotFunction = (e) => {
    this.setState({
      randomNumber: Math.floor(Math.random() * (this.state.colors.length))
    })
    e.preventDefault()
    let exp = this.state.func
    this.state.ctx.beginPath();
    this.state.ctx.strokeStyle = this.state.colors[this.state.randomNumber];
    for (let i = this.state.min; i <= this.state.max; i++) {
      let expToArr = exp.split('')

      if (expToArr.join('').includes('x')) {
        expToArr.forEach((e, index) => {
          if (e === "x") {
            expToArr[index] = `(${i})`
          }
        })
      }
      if (expToArr.join('').includes('^')) {
        expToArr.forEach((e, index) => {
          if (e === "^") {
            expToArr[expToArr.indexOf('^')] = '**';
          }
        })
      }
      if (expToArr.join('').includes("sqrt")) {
        console.log("asd", expToArr.join(''));
        expToArr = expToArr.join('').replace(/sqrt/gi, "Math.sqrt").split('')
      }
      console.log("verjnakan  ", expToArr)
      try {
        this.state.x.push(i * 10);
        this.state.y.push(+eval(expToArr.join('')) * 10)
        this.state.sqrt = true
      }
      catch (err) {
        document.querySelector(".App").innerHTML = `
        <div class="error-block">
          <p class="error">
            You have entered an incorrect math expression, please read the notes to use the app correctly 
          </p>
          <p class="back" onClick="location.reload()">Back to app</p>
        </div>`
      }

      this.setState({
        x: [],
        y: [],
      })
    }
    this.createGraph()
  }
  createGraph = () => {
    if (!this.state.blocker) {
      this.state.ctx.moveTo(
        this.state.centerX + this.state.x[0],
        this.state.centerY - this.state.y[0]);
      this.state.ctx.lineTo(
        this.state.centerX + this.state.x[1],
        this.state.centerY - this.state.y[1]);
      this.setState({
        blocker: true
      })
    }
    for (let i = 1; i < this.state.x.length; i++) {
      this.state.ctx.lineTo(
        this.state.centerX + this.state.x[i],
        this.state.centerY - this.state.y[i]);
    }
    this.state.ctx.stroke()
    this.setState({
      blocker: false
    })
  }

  //inputs handeling

  handlePlotFunction = (e) => {
    this.setState({
      func: e.target.value
    })
  }

  handleMaxValue = (e) => {
    this.setState({
      max: Number(e.target.value)
    })
  }

  handleMinValue = (e) => {
    this.setState({
      min: Number(e.target.value)
    })
  }

  // back to app 

  backToApp = () => {
    this.componentDidMount();
  }
  render() {
    return (
      <div className="App">
        <div className="main-content">

          <form className="inputs-block">
            <label htmlFor="expressonY"  >
              &nbsp; Y =
            <input id="expressonY" onChange={this.handlePlotFunction} placeholder="Mathematical expression.." autoComplete="off" />
            </label>
            <div className="digital-range">
              <input onChange={this.handleMinValue} placeholder="Min value of x.." />
              <input onChange={this.handleMaxValue} placeholder="Max value of x.." />
            </div>
            <button onClick={this.plotFunction}>Plot function</button>
          </form>
          <div className="docs">
            <h2 className='title'>Notes</h2>
              <ul>
                <li>
                  Please enter the variable as ‘x’( e.g. 1 / x).
            </li>
                <li>
                  Enter the expression without equation. (Do not do y=x+4. enter only x+4 ).
            </li>
                <li>
                  For power expressions you can use both the “^” sign and the “*” sign (e.g.  x^2 shows the same result as x*x).
            </li>
                <li>
                  For plotting the square root use sqrt() function. (e.g.  sqrt(x) ).
            </li>
                <li>
                  You can also choose the interval from minimum to maximum to plot the function.
            </li>
              </ul>
              <br />
              Have fun!
          </div>
        </div>
          <button onClick={()=>window.location.reload()} className="clear-graphs">Clear graphs</button>
          <canvas id="myCanvas" width="500" height="500" ></canvas>
      </div>
    );
  }
}
export default App;
