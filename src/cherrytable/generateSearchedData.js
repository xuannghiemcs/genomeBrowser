import React from 'react';

export function searchAllVal(arraySearchValue, data, key, s, defaultchr){



  let keylength = key.length;

  if(s !== '' && (arraySearchValue["active"] == undefined || arraySearchValue["active"] == 0)){


    var sLength = s.length;
    var count = 0;
    var foundCount = 0;
    var countEmpty = 0;
var countMissing = 0;
    for(var m = 0; m < sLength; m++){


      if(isNumber(defaultchr[m])){
countMissing++;

        continue;
      }


      if(s[m] !== ''){

        count += 1.0;

        var strLower = s[m].toLowerCase();
        var strLowerLength = strLower.length;

      } else {

        countEmpty += 1.0;

        continue;
      }

      for(let j = 0; j < keylength; j++){

        var compData = String(data[key[j]["key"]]);
        compData = compData.toLowerCase();
        var compDataLength = compData.length;
        var tempData = "";

        for(var i = 0; i < compDataLength; i++){
          if(i + strLowerLength <= compDataLength){

            tempData = compData.substring(i, strLowerLength + i);

            if(tempData == strLower){

              foundCount += 1.0;
              break;
            }
          } else {break;}
        }

        if(tempData == strLower){

          break;
        }
      }
    }


    if(countEmpty == s.length - countMissing){
      return -1;
    }
    if(foundCount/count == 1.0){
      return 1;
    } else {
      return 0;
    }
  } else if(arraySearchValue["active"] == 1){


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


  }else if(s !== '' && arraySearchValue["active"] === 1){

    var arraySearchCondition = 0;
    var count = 0.0;
    var oneCondition = 0.0;


    var sLength = s.length;
    var count = 0;
    var foundCount = 0;
    var countEmpty = 0;

    for(var m = 0; m < sLength; m++){

      if(s[m] !== ''){

        count += 1.0;
        var strLower = s[m].toLowerCase();
        var strLowerLength = strLower.length;
      } else {

        countEmpty += 1.0;
        continue;
      }

      for(let j = 0; j < keylength; j++){

        var compData = String(data[key[j]["key"]]);
        compData = compData.toLowerCase();
        var compDataLength = compData.length;
        var tempData = "";
        for(var i = 0; i < compDataLength; i++){
          if(i + strLowerLength <= compDataLength){
            tempData = compData.substring(i, strLowerLength + i);


            if(tempData == strLower){

              foundCount += 1.0;
              break;
            }

          } else {break;}


        }

        if(tempData == strLower){

          break;
        }

      }


    }


    if(countEmpty == s.length){
      count = 0;

    } else {

      if(foundCount/count == 1.0){
        arraySearchCondition += foundCount;

      } else {
        return 0;

      }


    }



    for(let j = 0; j < keylength; j++){

      var compData = String(data[key[j]["key"]]);
      compData = compData.toLowerCase();
      var compDataLength = compData.length;
      var tempData = "";


      if(!arraySearchValue[key[j]["key"]]){
        continue;
      }

      if(arraySearchValue[key[j]["key"]] == ''){
        continue;
      }

      var arraySearchValueLower = String(arraySearchValue[key[j]["key"]]).toLowerCase();
      var arraySearchValueLowerLength = arraySearchValueLower.length;

      count += 1.0;
      for(var i = 0; i < compDataLength; i++){
        if(i + arraySearchValueLowerLength <= compDataLength){
          tempData = compData.substring(i, arraySearchValueLowerLength + i);
          if(tempData == arraySearchValueLower){

            arraySearchCondition += 1.0;
            break;
            //return 1;
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
  key, SearchAllBarValues, arraySearchValue, defaultchr){

  let row = [];
  let rowData = [];
  var datalength = product.length;
  var keylength = key.length;
  var searchedIndexes = [];

  for (var i = 0; i < datalength; i++){
    var tempData = [];


    if(SearchAllBarValues != '' || arraySearchValue["active"] == 1){

      var checkCond = searchAllVal(
        arraySearchValue, product[i] , key, SearchAllBarValues, defaultchr);

      if(checkCond === 0){

        continue;
      }


    }


    searchedIndexes.push(i);

  }


  return (searchedIndexes);

}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
