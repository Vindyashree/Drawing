
import { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import BasicTable from './Table';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import BrushIcon from '@mui/icons-material/Brush';
import Button from '@mui/material/Button';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const useStyles = makeStyles({ 
  button:{
    width :50,
    height:50,
  }
});

function App() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing,setIsDrawing] = useState(false)
  const [eraserActive,setEraserActive] = useState(false)
  const classes = useStyles();
  
  useEffect(() => { 
    const canvas = canvasRef.current; 
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d")
    context.scale(2,2)
    context.lineCap = "round"
    context.strokeStyle = 'black'
    context.lineWidth = 5
    contextRef.current = context; 
  },[])

const changeColor = (color) => {
  contextRef.current.strokeStyle = color
}

  const onClickOfBrush = () => {
    contextRef.current.lineWidth = 50;
    if(eraserActive){
      contextRef.current.strokeStyle = 'black'
      setEraserActive(false)
    }
  }

  const onClickOfPen = () => {
    contextRef.current.lineWidth = 5;
    if(eraserActive){
      contextRef.current.strokeStyle = 'black'
      setEraserActive(false)
    }
  }

  const onClickOfEraser = () => {
    contextRef.current.lineWidth = 20;
    contextRef.current.strokeStyle = 'white'
    setEraserActive(true)
  }

  const startDrawing = ({nativeEvent}) => {
    const{offsetX,offsetY} = nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX,offsetY)
    setIsDrawing(true)
  }

  const stopDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({nativeEvent}) => {
    if(!isDrawing){
      return;
    }  
    const {offsetX,offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX,offsetY)
    contextRef.current.stroke()
  }

  const refreshPage = () => {
    window.location.reload();
 }

  return (
    <center>
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          
        },
      }}
    >
      <Paper variant="outlined" sx={{width : '70%',}}>
      <center style = {{color:'green'}}>Start Drawing </center>
        <canvas 
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          ref={canvasRef}
        />
      </Paper>
      <Paper variant="outlined" square sx={{width:'30%', marginTop:'500px'}}>
        <BasicTable changeColor1 = {changeColor}/>
        <Paper> 
          <Button variant="contained" className={classes.button} style={{margin:10}} onClick = {() => onClickOfPen()}> <CreateIcon/></Button>   
          <Button variant="contained" className={classes.button} style={{margin:10}} onClick = {() => onClickOfEraser()}> <CheckBoxOutlineBlankIcon/></Button>
          <Button variant="contained" className={classes.button} style={{margin:10}} onClick = {() => onClickOfBrush()}> <BrushIcon/> </Button>
        </Paper>
        </Paper>
    </Box>
    </center>
    
  );
}

export default App;
