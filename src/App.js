import React from 'react'
import './App.css';


class App extends React.Component {
  state = {
    func: '',
    max: '',
    min: '',
    colors: ['red', 'green', 'blue', 'yellow', 'purple', 'orange'],
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
    ctx.lineWidth = 2;
  }

  // create graph function

  plotFunction = (e) => {
    this.setState({
      randomNumber: Math.floor(Math.random() * (this.state.colors.length - 1))
    })
    e.preventDefault()
    let exp = this.state.func
    this.state.ctx.beginPath();
    this.state.ctx.strokeStyle = this.state.colors[this.state.randomNumber];
    for (let i = this.state.min; i <= this.state.max; i++) {
      let expToArr = exp.split('')

      expToArr.forEach((e, index) => {
        if (e === 'x') {
          expToArr[index] = i;
        } else if (e === "^") {
          expToArr[index] = ',';
          expToArr.unshift("Math.pow(");
          expToArr.push(')');
          eval(expToArr.join(''));
        } else if (expToArr.join('').split("(")[0] === "sqrt") {
          expToArr.unshift("Math.")
        }

      })
      this.state.x.push(i * 10);
      this.state.y.push(+eval(expToArr.join('')) * 5)

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

  render() {
    return (
      <div className="App">
        <form className="inputs-block">
          <input onChange={this.handlePlotFunction} placeholder="Mathematical expression.." />
          <div className="digital-range">
            <input onChange={this.handleMinValue} placeholder="Minimal value.." />
            <input onChange={this.handleMaxValue} placeholder="Maximal value.." />
          </div>
          <button onClick={this.plotFunction}>Plot function</button>
        </form>
        <canvas id="myCanvas" width="500" height="500" ></canvas>
      </div>
    );
  }
}
export default App;
