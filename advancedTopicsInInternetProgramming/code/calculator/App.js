import {useState} from 'react';
import './App.css';
function App() {
 const [calc, setCalc] = useState("")
 const [result,setResult]= useState("")
 const ops=['-','+','*','/','.'];
 const updateCalc = (value)=>{
   if
   (
     ops.includes(value)&& calc===""
   ||
   (ops.includes(value)&&ops.includes(calc.slice(-1))
   
   ))
{
  return
}

  setCalc(calc+value);

 }
 const calculate=()=>{

  setCalc(eval(calc).toString());
 }

    return (
    <>
    <div className="App">
      <div className="Calculator">
      <div className="Display">
        {result?<span>{result}</span>:""}&nbsp; {calc}
      </div>
      <div className="Operators">
        <button onClick={()=>updateCalc('/')}>/</button>
        <button onClick={()=>updateCalc('*')}>*</button>
        <button onClick={()=>updateCalc('+')}>+</button>
        <button onClick={()=>updateCalc('-')}>-</button>
        <button>del</button>
      </div>
      <div className="Digits">
      <button>/</button>
        <button onClick={()=>updateCalc('0')}>0</button>
        <button onClick={()=>updateCalc('1')}>1</button>
        <button onClick={()=>updateCalc('2')}>2</button>
        <button onClick={()=>updateCalc('3')}>3</button>
        <button onClick={()=>updateCalc('4')}>4</button>
        <button onClick={()=>updateCalc('5')}>5</button>
        <button onClick={()=>updateCalc('6')}>6</button>
        <button onClick={()=>updateCalc('7')}>7</button>
        <button onClick={()=>updateCalc('8')}>8</button>
        <button onClick={()=>updateCalc('9')}>9</button>
        <button onClick={()=>updateCalc('.')}>.</button>
        <button onClick={calculate}>=</button>
      </div>

      </div>

    </div>
    </>
  )
}


export default App;

    