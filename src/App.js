import React, { Component } from 'react';
import logo from './images.png';
import './App.css';

import { makeData} from "./Utils";

import CherryPickTable from './cherrytable/CherryPickTable';

let product = makeData();

var sourceFile = require('./data');

product = sourceFile.chr;

let searchValue = '';

class App extends Component {


  constructor(props)
  {
    super(props);

    // save the users in the state
    this.state = {
      patInfoKey: [{key:'radio', title: "", render: (data) => {return (<input type="radio" name= 'test' id = 'test' value = {data.id}/>)}},
      {key:'accession', title: "accession"},
      {key:'chrom', title:"chr"},
      {key:'start', title:"start"},
      {key:'stop', title:"length",
      render: (data) => {return (data.stop - data.start)}}
    ],


    };



  }





  render() {



    return (
      <div className="App">
      <header className="App-header">
      <h1 className="App-title">Cherry-Pick Datatable</h1>
      </header>
      <CherryPickTable
      tabledata = {product}
      tablekey = {this.state.patInfoKey}

      />
      </div>
    );
  }
}

export default App;
