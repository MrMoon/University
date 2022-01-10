import './App.css';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import {useState} from "react";

function App() {
    let fileReader, userArrivalTimes = [], userBurstTimes = [], numberOfProcess = 0;
    const [algorithm, setAlgorithm] = useState('both');
    const [quantum, setQuantum] = useState(-1);

    const handleAlgorithm = (event) => {
        setAlgorithm(event.target.value);
    };

    const handleQuantum = (event) => {
        let val = parseInt(event.target.value);
        if (isNaN(val))
            val = 0;
        setQuantum(val);
    };

    const handleFileRead = (e) => {
        const content = fileReader.result.split('\n');
        numberOfProcess = content.length - 1;
        for (let i = 0 ; i < numberOfProcess ; ++i) {
            const x = content[i].split(' ');
            userArrivalTimes.push(x[0]);
            userBurstTimes.push(x[1]);
        }
    };

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };

    const handleSchedule = (e) => {
        const userAlgo = (algorithm === 'both') ? '' : algorithm;
        const userQ = (quantum === -1) ? '' : quantum.toString();
        let url = 'http://localhost:8080/schedule/' + userAlgo;
        if (userQ !== '')
            url += '/' + userQ;
        console.log(userArrivalTimes);
        console.log(userBurstTimes)
        fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'same-origin',
            body: JSON.stringify({
                "n": numberOfProcess,
                "arrivalTimes": userArrivalTimes,
                "burstTimes": userBurstTimes
            })
        }).then(r => console.log(r));
    }

    return (
        <div className="centerContent">
            <FormControl component="fieldset">
                <FormLabel component="legend">Algorithm</FormLabel>
                <RadioGroup
                    aria-label="gender"
                    name="controlled-radio-buttons-group"
                    value={algorithm}
                    onChange={handleAlgorithm}>
                    <FormControlLabel value="rr" control={<Radio/>} label="Round Robin"/>
                    <FormControlLabel value="sjf" control={<Radio/>} label="Pre-emptive Shortest Job First"/>
                    <FormControlLabel value="both" control={<Radio/>} label="Both"/>
                </RadioGroup>
            </FormControl>
            <hr/>
            {algorithm === 'rr' &&
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Quantum"
                            variant="outlined"
                            value={quantum}
                            onChange={handleQuantum}/>
                        <hr/>
                    </div>
            }
            <div className='upload-expense'>
                <input
                    type='file'
                    id='file'
                    className='input-file'
                    accept='.csv'
                    onChange={e => handleFileChosen(e.target.files[0])}
                />
            </div>
            <hr/>
            <Button onClick={handleSchedule} variant="contained">Schedule</Button>
        </div>
    );
}

export default App;
