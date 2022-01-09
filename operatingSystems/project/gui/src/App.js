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
    let fileReader;
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
        const content = fileReader.result;
        console.log(content);
    };

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };

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
            <Button variant="contained">Schedule</Button>
        </div>
    );
}

export default App;
