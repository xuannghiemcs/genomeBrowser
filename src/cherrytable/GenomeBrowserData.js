import React, { Component } from 'react';

import GenomeBrowser from './GenomeBrowser';

class GenomeBrowserData extends Component {


  constructor(props)
  {
    super(props);

    // save the users in the state
    this.state = {
      patInfoKey: [{key:'radio', title: '', render: (data) => {return (<input type="radio" name= 'test' id = 'test' value = {data.id}/>)}},
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

    <GenomeBrowser currentRow = {this.props.currentRow}
    data = {this.props.data}
    defaultChr = {this.props.defaultChr}
    currentCherrySearchMenu = {this.props.currentCherrySearchMenu}
    currentSearchAllHighlight = {this.props.currentSearchAllHighlight}
    genetrackData = {[{boxHeight: 5}, {boxHeight: 10}, {boxHeight: 2}, {boxHeight: 7}]}
    />

  );
}
}

export default GenomeBrowserData;
