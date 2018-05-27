import React from 'react';

export default function generateRowData(product, key, searchedIndexes, rowClick, curr, currentPage, pageDivide){
  let row = [];
  let rowData = [];
  var datalength = searchedIndexes.length;
  var keylength = key.length;

  for (var i = 0; i < datalength; i++){
    var tempData = [];
    for(var j = 0; j < keylength; j++){
      if(product[searchedIndexes[i]]){
        if(key[j]["render"]){
          tempData.push(<td>{key[j]["render"](product[searchedIndexes[i]])}</td>);
        }else{
        tempData.push(<td>{product[searchedIndexes[i]][key[j]["key"]]}</td>);
        }




      }
    }

if(curr === undefined){
    rowData.push(<tr
  className="tr-hover-class"
    onClick = {rowClick.bind(this, i)}>{tempData}</tr>);
}else if(curr == currentPage*pageDivide + i){
  rowData.push(<tr
  className="tr-onClick-class"
  onClick = {rowClick.bind(this, i)}>{tempData}</tr>);
} else {
    rowData.push(<tr
    className="tr-hover-class"
    onClick = {rowClick.bind(this, i)}>{tempData}</tr>);
}
}

  return (rowData);

}
