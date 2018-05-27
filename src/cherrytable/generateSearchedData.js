import React from 'react';

export function searchAllVal(arraySearchValue, data, key){


  let keylength = key.length;

 if( arraySearchValue["active"] == 1){

    var arraySearchCondition = 0.0;
    var count = 0.0;
    for(let j = 0; j < keylength; j++){

      if(!arraySearchValue[key[j]["key"]]){
        continue;
      }

      if(arraySearchValue[key[j]["key"]] == ''){
        continue;
      }


      var arraySearchValueLower = String(arraySearchValue[key[j]["key"]]).toLowerCase();
      var arraySearchValueLowerLength = arraySearchValueLower.length;

      var compData = String(data[key[j]["key"]]);
      compData = compData.toLowerCase();
      var compDataLength = compData.length;
      var tempData = "";
      count += 1.0;

      for(var i = 0; i < compDataLength; i++){
        if(i + arraySearchValueLowerLength <= compDataLength){
          tempData = compData.substring(i, arraySearchValueLowerLength + i);

          if(tempData == arraySearchValueLower){

            arraySearchCondition += 1.0;
            break;
            //return 1;
          } else{

          }

        } else {
          return 0;
        }
      }
    }

    if(arraySearchCondition/count == 1.0){
      return 1;
    } else {
      return 0;
    }


  }



  return 0;

}



export default function generateSearchedData(product,
  key, s, arraySearchValue){

console.log("hrtfhg", s);
  let row = [];
  let rowData = [];
  var datalength = product.length;
  var keylength = key.length;
  var searchedIndexes = [];

  for (var i = 0; i < datalength; i++){
    var tempData = [];


    if(arraySearchValue["active"] == 1){

      var checkCond = searchAllVal(
        arraySearchValue, product[i] , key);

      if(checkCond == 0){

        continue;
      }


    }


    searchedIndexes.push(i);

  }


  return (searchedIndexes);

}
