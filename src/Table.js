import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  table: {
    minWidth: 100,
    maxWidth:200
  },
  button:{
    width :50,
    height:50
  }
});

const rows = [
  [{name:'red'},{name:'yellow'},{name:'black'},{name:'blue'}],
  [{name:'green'},{name:'brown'},{name:'Beige'},{name:'#B0C4DE'}],
  [{name:'#191970'},{name:'#FFA500'},{name:'#DB7093'},{name:'#708090'}],
  [{name:'#008080'},{name:'#808000'},{name:'#FF00FF'},{name:'#DAA520'}],
  [{name:'#FF1493'},{name:'##F0E68C'},{name:'#4B0082'},{name:'#8FBC8F'}],
  [{name:'#FFC0CB'},{name:'#BC8F8F'},{name:'#FFDEAD'},{name:'#FFE4E1'}]
];

export default function BasicTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
       
        <TableBody>
          {rows.map((row) => (
            <TableRow >
              {row.map((r) => (<TableCell component="th" scope="row">
                <Button variant="contained" className={classes.button} style={{backgroundColor:r.name}} onClick = {() => props.changeColor1(r.name)}>         
                </Button>               
              </TableCell>))}
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
