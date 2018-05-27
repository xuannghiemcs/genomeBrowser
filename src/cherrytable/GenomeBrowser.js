import React, { Component } from 'react';

let chromValues = [
        [undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,undefined],
        [undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,undefined],
        [undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,undefined],
        [undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,undefined],
        [undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,undefined],
        [undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,undefined],
        [undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,undefined],
        [undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,undefined],
        [undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,undefined],
        [undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,
          undefined,undefined,undefined,undefined,undefined]];
export default class GenomeBrowser extends Component {



  constructor(props)
  {
    super(props);

    // save the users in the state
    this.state = {
        currentCherrySearchMenu: 0,
        currentSearchAllHighlight: 0,
        viewBoxWidth: 100,
        defaultViewBoxHeight: 6,
        viewBoxHeight: 6,
        redLineStart: 18,
        currMenuVal: '',
        maxBP: 300000000,
        currPage: 0,
        pageDivide: 50,
        endIntervalBlueLine: 100,
        chromScaleDivide: 6,
Scalefactor: 50.0,
      Shiftfactor: 0.0,
        defaultDivingLength: undefined,
        genomeBrowserButton: [],
      };

      this.handleDefaultMenu = this.handleDefaultMenu.bind(this);
      this.handleCurrentMenu = this.handleCurrentMenu.bind(this);
      this.handleChromLengthSearch = this.handleChromLengthSearch.bind(this);
      this.handleButtonMove = this.handleButtonMove.bind(this);
      this.handleButtonZoom = this.handleButtonZoom.bind(this);
      this.handleGenomeBrowerRulerButton = this.handleGenomeBrowerRulerButton.bind(this);
    }


    componentWillMount() {
      var genetrackDataLength = this.props.genetrackData.length;
this.state.genomeBrowserButton = new Array(genetrackDataLength);
for(var i = 0; i < genetrackDataLength; i++){
this.state.genomeBrowserButton[i] = 0;

}

      this.state.currentCherrySearchMenu = this.props.currentCherrySearchMenu;
      this.state.currentSearchAllHighlight = this.props.currentSearchAllHighlight;
chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight] = {defaultChr: this.props.defaultChr,
      ChromStart: '',
      ChromStop: ''};


    }

    componentWillReceiveProps(nextProps) {
      this.state.currentCherrySearchMenu = nextProps.currentCherrySearchMenu;
      this.state.currentSearchAllHighlight = nextProps.currentSearchAllHighlight;



if(nextProps.defaultChr == undefined){

  chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight] = {defaultChr: nextProps.defaultChr,
        ChromStart: '',
        ChromStop: ''};

      } else {



      }

}



handleGenomeBrowerRulerButton(num){

if(this.state.genomeBrowserButton[num] || this.state.genomeBrowserButton[num] == 0){

if(this.state.genomeBrowserButton[num] == 0){
this.state.genomeBrowserButton[num] = 1;

}else{
this.state.genomeBrowserButton[num] = 0;

}

}

    this.setState({});


}


    handleButtonMove(num){


      var chromLength = chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromLength"];
      var shiftfactor = Math.ceil(chromLength*num);
      var valueRange1 = chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromStart"];
      var valueRange2 = chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromStop"];

      if( valueRange1 + shiftfactor >= 0 && valueRange2 + shiftfactor <= this.state.maxBP){

chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromStart"] = valueRange1 + shiftfactor;
chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromStop"] = valueRange2 + shiftfactor;
this.state.tesShiftfactor += shiftfactor;
        this.setState({});

        }

      }

      handleButtonZoom(num){


        if(num == 0){
          chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromStart"] = chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["defaultLengthStart"];
            chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromStop"] = chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["defaultLengthStop"];

          this.setState({});
          } else {

            var chromLength = chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromLength"]*num;

            if( chromLength >= 1 && chromLength <= this.state.maxBP){

              var shiftfactor = (chromLength)/2.0;
              var midpoint = (chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromStop"]
              + chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromStart"])/2.0;
              var valueRange1 = Math.round(midpoint - shiftfactor);
              var valueRange2 = Math.round(midpoint + shiftfactor);

              var diff = 0;
              if(valueRange1 < 1){
                diff = 1 - valueRange1;
                valueRange1 = 1;
                valueRange2 += diff;
              }
              if(valueRange2 > this.state.maxBP){
                diff = this.state.maxBP - valueRange2;
                valueRange2 = this.state.maxBP;
                valueRange1 -= diff;
              }

              chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromStart"] = valueRange1;
              chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromStop"] = valueRange2;
chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromLength"] = valueRange2 - valueRange1;

              this.setState({defaultDivingLength: undefined});
              }
            }
          }

          handleCurrentMenu(){



          }

          handleChromLengthSearch(num, e){
            if(num == -1){

              if(isNumber(e.target.value)){

                chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromStart"] = e.target.value;
                chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["searchChromStart"] = e.target.value;

                this.setState({});

                }


              }else{

                if(isNumber(e.target.value)){

                  chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromStop"] = e.target.value;
                  chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["searchChromStop"] = e.target.value;

                  this.setState({});

                  }


                }

              }

              handleDefaultMenu(){
                chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromStart"] =
                chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["defaultLengthStart"];
                chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromStop"] =
                chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["defaultLengthStop"];
                chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["searchChromStart"] =
            '';
                chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["searchChromStop"] =
            '';
                this.setState({});

                }

                render() {



                  var genetrackData = this.props.genetrackData;
                  var genetrackDataLength = genetrackData.length;
                  var genetrackButton = [];
                  var viewBoxHeight = this.state.defaultViewBoxHeight + genetrackData[0]["boxHeight"];
                  var count = 3;

                  genetrackButton.push(<g ><rect x="0" y={count} height={genetrackData[0]["boxHeight"]} className = "genomeBrowserButton" />
                  <rect x="1.4px" y={count} height={genetrackData[0]["boxHeight"]} className = "genomeBrowserButtonStrip"/>
  <rect x="0" y={count} height=".4" className = "genomeBrowserRedButton"
  onClick = {this.handleGenomeBrowerRulerButton.bind(this, 0)}/>

                  </g>);

                  for(var i = 1; i < genetrackDataLength; i++){

                    count += genetrackData[i - 1]["boxHeight"];
                    viewBoxHeight += (genetrackData[i]["boxHeight"]);
                    genetrackButton.push(<g>

                      <rect x="0" y={count} height={genetrackData[i]["boxHeight"]} className = "genomeBrowserButton"/>
                    <rect x="1.4px" y={count} height={genetrackData[i]["boxHeight"]}   className = "genomeBrowserButtonStrip"/>
  <rect x="0" y={count} height=".4" className = "genomeBrowserRedButton"
  onClick = {this.handleGenomeBrowerRulerButton.bind(this, i)}/>

                    </g>);




                  }

                  if(genetrackDataLength > 0){



                  }

                  this.state.viewBoxHeight = viewBoxHeight;

                  var value = '';
                  var valueRange1 = '';
                  var valueRange2 = '';

                  var data = this.props.data;

                  if(data && chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["defaultChr"] == undefined){

                  chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["defaultChr"] = data["chrom"];
                    chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["defaultLengthStart"] = data["start"];
                    chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["defaultLengthStop"] = data["stop"];
                    chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromStart"] = data["start"];
                    chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromStop"] = data["stop"];

                    value = data["chrom"] + ': ' + data["start"] + '-' + data["stop"] + ' ' + (data["stop"] - data["start"]) + 'bp ';
                    valueRange1 = data["start"];
                    valueRange2 = data["stop"];
this.state.dividingLength = valueRange2 - valueRange1;

                    chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromLength"] = valueRange2 - valueRange1;
                    var defaultLengthStart = chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["defaultLengthStart"];
                    var defaultLengthStop = chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["defaultLengthStop"];
                    var searchChromStart = chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["searchChromStart"];
                    var searchChromStop = chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["searchChromStop"];
                    var defaultChr = chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["defaultChr"];
                    var chromLength = valueRange2 - valueRange1;

  chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromLength"] = chromLength;

                  } else {

var defaultChr = chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["defaultChr"];
var chromStart = chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromStart"];
var chromStop = chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromStop"];


var defaultLengthStart = chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["defaultLengthStart"];
var defaultLengthStop = chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["defaultLengthStop"];
var searchChromStart = chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["searchChromStart"];
var searchChromStop = chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["searchChromStop"];

                    value = defaultChr + ': ' + chromStart + '-' + chromStop + ' ' + (chromStop - chromStart) + 'bp ';
                    valueRange1 = chromStart;
                    valueRange2 = chromStop;
                    if(valueRange1 < valueRange2)
                  {  chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromLength"] = valueRange2 - valueRange1;}

var chromLength = chromValues[this.state.currentCherrySearchMenu][this.state.currentSearchAllHighlight]["chromLength"];

                  }


                  var blueDivideLine = [];
                  var ruler = [];

                  var section = (this.state.endIntervalBlueLine-this.state.redLineStart)/this.state.pageDivide;
                  var sectionActChrom = (valueRange2-valueRange1)/this.state.pageDivide;


                  ruler.push( <g>
                      <line x1={'0%'} y1={this.state.viewBoxHeight} x2={'100%'} y2={this.state.viewBoxHeight} stroke = "black" stroke-width = ".2px"/>
                    <line x1={'0%'} y1="0" x2={'100%'} y2='0' stroke = "black" stroke-width = ".2px"/>

                    </g>);


var maxLength = this.state.maxBP;

  var divideFactor = (valueRange2- valueRange1)/10.0;
  var totalDividingSection = Math.ceil((maxLength)/((valueRange2- valueRange1 - divideFactor)/120.0));

totalDividingSection = (maxLength/totalDividingSection);

var startingIndex = Math.floor((valueRange1)/(totalDividingSection))*totalDividingSection;

var endingIndex = Math.ceil((valueRange2)/(totalDividingSection))*totalDividingSection;

var diff = valueRange1 - startingIndex;






                    for(var i = startingIndex; i < endingIndex + totalDividingSection; i = i + totalDividingSection){

var section = ((i - diff) - startingIndex)/( valueRange2 - diff - startingIndex)*(this.state.viewBoxWidth - this.state.redLineStart);



                        ruler.push( <g><line x1={(section) + '%'} y1={this.state.viewBoxHeight - .5} x2={( section) + '%'} y2={this.state.viewBoxHeight} stroke = "black" stroke-width = ".1px"/>
                        <line x1={(section) + '%'} y1="0" x2={(section) + '%'} y2='.5' stroke = "black" stroke-width = ".1px"/>
                        </g>);


      blueDivideLine.push(  <line x1={(section ) + '%'} y1="0" x2={(section) + '%'} y2={this.state.viewBoxHeight} stroke = "#A9CCE3" stroke-width = ".1px"/>);
      blueDivideLine.push(  <line  className = "ruler" x1={(section ) + '%'} y1="0" x2={(section) + '%'} y2={this.state.viewBoxHeight} stroke = "#A9CCE3" stroke-width = ".5px"/>);



                    }



                    var divideFactor = (valueRange2- valueRange1)/10.0;
                    var totalDividingSection = Math.ceil((maxLength)/((valueRange2- valueRange1 - divideFactor)/11.0));

                  totalDividingSection = (maxLength/totalDividingSection);


var test = totalDividingSection;
var count = 0;
while (test > 1) {
    test = test/10;

    count++;
}

totalDividingSection = Math.ceil(totalDividingSection/Math.pow(10, count - 1))*Math.pow(10, count - 1);
this.state.defaultDivingLength = totalDividingSection;

                  var startingIndex = Math.floor((valueRange1)/(totalDividingSection))*totalDividingSection;

                  var endingIndex = Math.ceil((valueRange2)/(totalDividingSection))*totalDividingSection;

                  var diff = valueRange1 - startingIndex;



                  var section = ((valueRange1 - diff) - startingIndex)/( valueRange2 - diff - startingIndex)*(this.state.viewBoxWidth - this.state.redLineStart);
                  var section1 = ((valueRange2 - diff) - startingIndex)/( valueRange2 - diff - startingIndex)*(this.state.viewBoxWidth - this.state.redLineStart);


                  var test1 = ( <g><line x1={(section + this.state.redLineStart) + '%'} y1={this.state.viewBoxHeight - 1.7} x2={(section + this.state.redLineStart) + '%'} y2={this.state.viewBoxHeight - 0.4} stroke = "black" stroke-width = ".1px"/>
                  <line x1={(section + this.state.redLineStart) + '%'} y1=".5" x2={(section + this.state.redLineStart) + '%'} y2='1.7' stroke = "black" stroke-width = ".1px"/>

                  <text x = {section + this.state.redLineStart - .1} y = {this.state.viewBoxHeight - .7} text-anchor="end" font-family = "ariel"
                  font-size = "1.1" fill = "black"> { (Math.round(valueRange1)).toLocaleString()}
                  </text>

                  <text x = {section + this.state.redLineStart - .1} y = "1.6" text-anchor="end" font-family = "ariel"
                  font-size = "1.1" fill = "black"> { (Math.round(valueRange1)).toLocaleString()}
                  </text>

                  <line x1={(section1 + this.state.redLineStart) + '%'} y1={this.state.viewBoxHeight - 1.7} x2={(section1 + this.state.redLineStart) + '%'} y2={this.state.viewBoxHeight - 0.4} stroke = "black" stroke-width = ".1px"/>
                  <line x1={(section1 + this.state.redLineStart) + '%'} y1=".5" x2={(section1 + this.state.redLineStart) + '%'} y2='1.7' stroke = "black" stroke-width = ".1px"/>

                  <text x = {section1 + this.state.redLineStart - .1} y = {this.state.viewBoxHeight - .7} text-anchor="end" font-family = "ariel"
                  font-size = "1.1" fill = "black"> { (Math.round(valueRange2)).toLocaleString()}
                  </text>

                  <text x = {section1 + this.state.redLineStart - .1} y = "1.6" text-anchor="end" font-family = "ariel"
                  font-size = "1.1" fill = "black"> { (Math.round(valueRange2)).toLocaleString()}
                  </text>


                  </g>);



                                      for(var i = startingIndex; i < endingIndex + totalDividingSection; i = i + totalDividingSection){



                                          var section = ((i - diff) - startingIndex)/( valueRange2 - diff - startingIndex)*(this.state.viewBoxWidth - this.state.redLineStart);


                  ruler.push( <g><line x1={(section) + '%'} y1={this.state.viewBoxHeight - 2.8} x2={(section) + '%'} y2={this.state.viewBoxHeight - 1.5} stroke = "black" stroke-width = ".1px"/>
                  <line x1={(section) + '%'} y1="1.6" x2={(section) + '%'} y2='2.8' stroke = "black" stroke-width = ".1px"/>

                  <text x = {section - .1} y = {this.state.viewBoxHeight - 2.0} text-anchor="end" font-family = "ariel"
                  font-size = "1.1" fill = "black"> { (Math.round((i))).toLocaleString()}
                  </text>

                  <text x = {section - .1} y = "2.7" text-anchor="end" font-family = "ariel"
                  font-size = "1.1" fill = "black"> { (Math.round((i))).toLocaleString()}
                  </text>
                  <line x1={(section ) + '%'} className = "ruler" y1="0" x2={(section) + '%'} y2={this.state.viewBoxHeight} stroke = "#A9CCE3" stroke-width = ".5px"/>
                  </g>);
                                      }


                    var section = ((defaultLengthStart  - diff) - startingIndex)/( valueRange2 - diff - startingIndex)*(this.state.viewBoxWidth - this.state.redLineStart);

                    blueDivideLine.push(  <line x1={(section ) + '%'} y1="0" x2={(section) + '%'} y2={this.state.viewBoxHeight} stroke = "black" stroke-width = ".1px"/>);
                    var section = ((defaultLengthStop  - diff) - startingIndex)/( valueRange2 - diff - startingIndex)*(this.state.viewBoxWidth - this.state.redLineStart);

                    blueDivideLine.push(  <line x1={(section ) + '%'} y1="0" x2={(section) + '%'} y2={this.state.viewBoxHeight} stroke = "black" stroke-width = ".1px"/>);


                    var divideFactor = (valueRange2- valueRange1)/10.0;
                    var totalDividingSection = Math.ceil((maxLength)/((valueRange2- valueRange1 - divideFactor)/120.0));

                  totalDividingSection = (maxLength/totalDividingSection);



                    var scaleLength = (totalDividingSection*40)/( valueRange2 - diff - startingIndex)*(this.state.viewBoxWidth - this.state.redLineStart);
                    var scaleStart =((this.state.viewBoxWidth - this.state.redLineStart)/5.0);
                      scaleStart =(scaleStart)*2.0;

                    var scaleEnd = scaleStart + scaleLength;



                    ruler.push(<g>
                      <text x = {(scaleEnd + .1) + '%'} y = "1.2" text-anchor="start" font-family = "ariel"
                      font-size = "1.1" fill = "black"> {(totalDividingSection).toFixed(2)  + "bp"}
                      </text>
                      <text x = {(scaleEnd +.1) + '%'} y = {this.state.viewBoxHeight  -.8} text-anchor="start" font-family = "ariel"
                      font-size = "1.1" fill = "black"> {(totalDividingSection).toFixed(2)  + "bp"}
                      </text>

                      <text x = {(scaleStart - .1) + '%'} y = "1.2" text-anchor="end" font-family = "ariel"
                      font-size = "1.1" fill = "black"> {(totalDividingSection*40).toFixed(2)  + "bp"}
                      </text>
                      <text x = {(scaleStart - .1) + '%'} y = {this.state.viewBoxHeight  -.8} text-anchor="end" font-family = "ariel"
                      font-size = "1.1" fill = "black"> {((totalDividingSection*40).toFixed(2))  + "bp"}
                      </text>

                      <line x1={(scaleStart) + '%'} y1="1.0" x2={(scaleLength + scaleStart) + '%'} y2='1.0' stroke = "black" stroke-width = ".1px"/>
                      <line x1={(scaleStart) + '%'} y1=".4" x2={(scaleStart) + '%'} y2='1.4' stroke = "black" stroke-width = ".1px"/>
                      <line x1={(scaleLength + scaleStart) + '%'} y1=".4" x2={(scaleLength + scaleStart) + '%'} y2='1.4' stroke = "black" stroke-width = ".1px"/>
                      <line x1={(scaleStart) + '%'} y1={this.state.viewBoxHeight  -1.0} x2={(scaleLength + scaleStart) + '%'} y2={this.state.viewBoxHeight  -1.0} stroke = "black" stroke-width = ".1px"/>
                      <line x1={(scaleStart) + '%'} y1={this.state.viewBoxHeight  -1.4} x2={(scaleStart) + '%'} y2={this.state.viewBoxHeight  -.4} stroke = "black" stroke-width = ".1px"/>
                      <line x1={(scaleLength + scaleStart) + '%'} y1={this.state.viewBoxHeight  -1.4} x2={(scaleLength + scaleStart) + '%'} y2={this.state.viewBoxHeight  -.4} stroke = "black" stroke-width = ".1px"/>
                                        </g>);


                    var chromScaleLabel = (    <g>
                      <text x = "3.5" y = "2.6" font-family = "ariel"
                      font-size = "1.4" fill = "black" > { defaultChr + ': ' }
                      </text>
                      <text x = {(this.state.redLineStart/2.5) + '%'} y = "1.2" font-family = "ariel"
                      font-size = "1.4" fill = "black"> scale
                      </text>
                      <text x = {(this.state.redLineStart/2.5) + '%'} y = {this.state.viewBoxHeight -.2} font-family = "ariel"
                      font-size = "1.4" fill = "black" > scale
                      </text>
                      <text x = "3.5" y = {this.state.viewBoxHeight  -1.6} font-family = "ariel"
                      font-size = "1.4" fill = "black"> { defaultChr + ': ' }
                      </text>
                      </g>);

                      return(
                        <div>

                        <span>Move: </span>
                        <a href="#" data-toggle="tooltip" data-placement="bottom" title={"95" + " Left"}><button onClick = {this.handleButtonMove.bind(this, -.95)}>{"<<<"}</button></a>
                        <a href="#" data-toggle="tooltip" data-placement="bottom" title={"47.5" + " Left"}><button onClick = {this.handleButtonMove.bind(this, -.475)}>{"<<"}</button></a>
                        <a href="#" data-toggle="tooltip" data-placement="bottom" title={"10" + " Left"}><button onClick = {this.handleButtonMove.bind(this, -.10)}>{"<"}</button></a>
                        <a href="#" data-toggle="tooltip" data-placement="bottom" title={"10" + " Right"}><button onClick = {this.handleButtonMove.bind(this, .10)}>{">"}</button></a>
                        <a href="#" data-toggle="tooltip" data-placement="bottom" title={"47.5" + " Right"}><button onClick = {this.handleButtonMove.bind(this, .475)}>{">>"}</button></a>
                        <a href="#" data-toggle="tooltip" data-placement="bottom" title={"95 " + " Right"}><button onClick = {this.handleButtonMove.bind(this, .95)}>{">>>"}</button></a>
                        <span>Zoom in: </span>
                        <a href="#" data-toggle="tooltip" data-placement="bottom" title="Hooray!"><button onClick = {this.handleButtonZoom.bind(this, 1/1.5)}>{"1.5x"}</button></a>
                        <a href="#" data-toggle="tooltip" data-placement="bottom" title="Hooray!"><button onClick = {this.handleButtonZoom.bind(this, 1/3)}>{"3x"}</button></a>
                        <a href="#" data-toggle="tooltip" data-placement="bottom" title="Hooray!"><button onClick = {this.handleButtonZoom.bind(this, .10)}>{"10x"}</button></a>
                        <a href="#" data-toggle="tooltip" data-placement="bottom" title="Hooray!"><button onClick = {this.handleButtonZoom.bind(this, 0)}>{"base"}</button></a>
                        <span>Zoom out: </span>
                        <a href="#" data-toggle="tooltip" data-placement="bottom" title="Hooray!"><button onClick = {this.handleButtonZoom.bind(this, 1.5)}>{"1.5x"}</button></a>
                        <a href="#" data-toggle="tooltip" data-placement="bottom" title="Hooray!"><button onClick = {this.handleButtonZoom.bind(this, 3)}>{"3x"}</button></a>
                        <a href="#" data-toggle="tooltip" data-placement="bottom" title="Hooray!"><button onClick = {this.handleButtonZoom.bind(this, 10)}>{"10x"}</button></a>

                        <br/>
                        <br/>

                        <a href="#" data-toggle="tooltip" data-placement="bottom" title="Base Chrom Location">
                        <input type = "text" readonly="readonly" value = {defaultChr + ': ' + defaultLengthStart + '-' + defaultLengthStop + ' ' + (defaultLengthStop - defaultLengthStart) + 'bp'} size = "25"
                        onClick = {this.handleDefaultMenu}
                        /> </a>
                        <a href="#" data-toggle="tooltip" data-placement="bottom" title="Current Chrom Location">
                        <input type = "text" readonly="readonly" value = {value} size = "25"
                        onClick = {this.handleCurrentMenu} /> </a>
                        <span>{"     " + this.props.data["chrom"] + ':'}</span>
                        <input type = "search" placeholder = {valueRange1} value = {searchChromStart} size = "8"
                        onChange = {this.handleChromLengthSearch.bind(this, -1)}
                        />
                        <span>-</span>
                        <input type = "search" placeholder = {valueRange2} value = {searchChromStop} size = "8"
                        onChange = {this.handleChromLengthSearch.bind(this, 1)}
                        />
                        <span>{' ' + (valueRange2 - valueRange1) + 'bp '}</span>

                        <input type = "search" placeholder = "Search"  size = "20"
                        />

                        <br/>
                        <br/>
                        <div className = "genome">

                        <svg viewBox={"0 0 " + this.state.viewBoxWidth + ' ' +this.state.viewBoxHeight} xmlns="http://www.w3.org/2000/svg">

                        <rect width="95%" height={this.state.viewBoxHeight} className = "genomeBrowserBoard"/>
                        <line x1={this.state.redLineStart + '%'} y1="0" x2={this.state.redLineStart  + '%'} y2={this.state.viewBoxHeight} stroke = "#F1948A" stroke-width = ".2px"/>


<svg x = {this.state.redLineStart} >
                        {blueDivideLine}
                          {ruler}
</svg>
{chromScaleLabel}
{test1}

                        <rect x="0" y="0" height="3.0" className = "genomeBrowserButton"/>
                        <rect x="0" y={this.state.viewBoxHeight - 3} height="3" className = "genomeBrowserButton"/>
                        {genetrackButton}
                        </svg>
                        </div>
                        </div>
                      );
                    }
                  }




                  function isNumber(n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                  }


                  function parseText(e){



  return;


}
