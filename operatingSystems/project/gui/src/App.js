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
    let fileReader, arrivalTimes = [], burstTimes = [];
    const [algorithm, setAlgorithm] = useState('both');
    const [quantum, setQuantum] = useState(0);

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
        console.log(content);
        for (let i = 0 ; i < content.length - 1 ; ++i) {
            const x = content[i].split(' ');
            console.log(x);
            arrivalTimes.push(x[0]);
            burstTimes.push(x[1]);
        }
        console.log(arrivalTimes);
        console.log(burstTimes);
    };

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };

    const handleSchedule = (e) => {

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
