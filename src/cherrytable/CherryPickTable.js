import React, { Component } from 'react';
import './CherryPick.css';

import logo from './../images.png';
import logoyellow from './../yellow.png';

import generateSearchedData from './generateSearchedData';
import generateRowData from './generateRowData';
import handleCSVButtonClicks from './handleCSVButtonClicks';

import DeleteMenu from './DeleteMenu';
import SelectMenuBar from './SelectMenuBar';
import GenomeBrowserData from './GenomeBrowserData';
import Pag from './Pag';
import IndColSearchBar from './IndColSearchBar';
import SearchBars from './SearchBars';


export default class CherryPickTable extends Component {

  constructor(props)
  {
    super(props);

    // save the users in the state
    this.state = {
      trueSearchData: 0,
      savedSearchData: undefined,
      savedData: [],
      tabledata: [],
      tablekey:[],
      tablesortDirection:[{dir: 'asc'},
      {dir: 'asc'}, {dir: 'asc'},
      {dir: 'asc'}, {dir: 'asc'}],
      NumSearchBars: 0,
      NumAllSearchBars: [1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0],
      SearchBarValues: [{name: 1},{name: 2},{name: 3},
        {name: 4},{name: 5},{name: 6},{name: 7},
        {name: 8},{name: 9},{name: 10},{name: 11},
        {name: 12},{name: 13},{name: 14},{name: 15}],
        SearchAllBarValues1: [
          {'value':['','','','','','','','','','','','','','','']},
          {'value':['','','','','','','','','','','','','','','']},
          {'value':['','','','','','','','','','','','','','','']},
          {'value':['','','','','','','','','','','','','','','']},
          {'value':['','','','','','','','','','','','','','','']},
          {'value':['','','','','','','','','','','','','','','']},
          {'value':['','','','','','','','','','','','','','','']},
          {'value':['','','','','','','','','','','','','','','']},
          {'value':['','','','','','','','','','','','','','','']},
          {'value':['','','','','','','','','','','','','','','']},
          {'value':['','','','','','','','','','','','','','','']},
          {'value':['','','','','','','','','','','','','','','']},
          {'value':['','','','','','','','','','','','','','','']},
          {'value':['','','','','','','','','','','','','','','']},
          {'value':['','','','','','','','','','','','','','','']}],
          SearchBarBrownHighlight: [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ],
          headerValueClicks: -1,
          revealDeleteModal: 0,
          revealDeleteSearchAllModal: 0,
          cherryNavMenu: 'searchall',
          cherryPagNavMenu: 'incr',
          TurnHighlightOnOff: 'incr',
          currentCherrySearchMenu: 0,
          currentPage: 0,
          pageDivide: 10.0,
          totalpagSection: undefined,
          currPagRange: 0,
          currLength: undefined,
          pagPageDivide: 5.0,
          highlight:undefined,
          currhighlight: undefined,
rowData: '',
          defaultChr: [
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
              undefined,undefined,undefined,undefined,undefined]

        ],
          currentRow:[
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
              undefined,undefined,undefined,undefined,undefined]

        ],
            toggleAccesionSearch: 0,

        };


        this.state.tabledata = this.props.tabledata;
        var highlightLength = Math.ceil(
          this.state.tabledata.length/this.state.pageDivide);

          this.state.highlight = new Array(highlightLength);

          this.handleCherryMenu = this.handleCherryMenu.bind(this);
          this.handleCherryPagMenu = this.handleCherryPagMenu.bind(this);
          this.handleHeaderClicks = this.handleHeaderClicks.bind(this);
          this.handleCherryClicks = this.handleCherryClicks.bind(this);
          this.handleCherrySearchClicks = this.handleCherrySearchClicks.bind(this);
          this.handleCherryPagClicks = this.handleCherryPagClicks.bind(this);
          this.handleCherryPagNavClicks = this.handleCherryPagNavClicks.bind(this);


          this.handleCherryPagArrowClicks = this.handleCherryPagArrowClicks.bind(this);

          this.handleCherrySearch = this.handleCherrySearch.bind(this);
          this.handleMenuClicks = this.handleMenuClicks.bind(this);
          this.handleSearchAllHighlightClicks =
          this.handleSearchAllHighlightClicks.bind(this);
          this.handleDeleteSearchAllHighlightClicks =
          this.handleDeleteSearchAllHighlightClicks.bind(this);
          this.handleSearchBarChanges = this.handleSearchBarChanges.bind(this);
          this.handleSearchAllBarChanges = this.handleSearchAllBarChanges.bind(this);
          this.handlePaginationButtons = this.handlePaginationButtons.bind(this);
          this.handeleDeleteButtonClicks = this.handeleDeleteButtonClicks.bind(this);


          this.handleTROnClick = this.handleTROnClick.bind(this);


          this.handleAccesionSearch = this.handleAccesionSearch.bind(this);
          this.handlePagPageSelect = this.handlePagPageSelect.bind(this);
          this.handleTurnHighlightOnOffClicks =
          this.handleTurnHighlightOnOffClicks.bind(this);

        }

  componentWillReceiveProps(nextProps) {

      this.setState({trueSearchData: 1});

  }


        handleAccesionSearch(num){
          if(this.state.toggleAccesionSearch == 0){
            this.setState({toggleAccesionSearch: 1});
          } else {
            this.setState({toggleAccesionSearch: 0});

          }
        }

        handleTROnClick(num){
          var currentRow = this.state.currentRow[this.state.currentCherrySearchMenu][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]];
          if(currentRow !== this.state.currentPage*this.state.pageDivide + num)
          {

            this.state.currentRow[this.state.currentCherrySearchMenu][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]] = this.state.currentPage*this.state.pageDivide + num;

            this.state.defaultChr[this.state.currentCherrySearchMenu][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]] = undefined;
            this.setState({
              rowData: this.state.tabledata[this.state.currentRow[this.state.currentCherrySearchMenu][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]]]});
            }else{
              this.state.defaultChr[this.state.currentCherrySearchMenu][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]] = this.state.tabledata[this.state.currentPage*this.state.pageDivide + num]["chrom"];

              this.setState({});

            }
          }


        handlePagPageSelect(e){

          this.setState({pagPageDivide: e});
        }

        handleTurnHighlightOnOffClicks(){
          if(this.state.cherryPagNavMenu == 'showhighlight'){

            this.setState({cherryPagNavMenu: 'incr'});
          }else{
            this.setState({cherryPagNavMenu: 'showhighlight'});
          }
        }

      handleDeleteSearchAllHighlightClicks(num){
        if(num == 1){
          if(this.state.NumAllSearchBars[
            this.state.currentCherrySearchMenu] - 1 >= 1){
              var lengthSearchBar =
              this.state.NumAllSearchBars[
                this.state.currentCherrySearchMenu]
                - (this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu] + 1);
                for(var i = 0; i < lengthSearchBar; i++){
                  this.state.SearchAllBarValues1[
                    this.state.currentCherrySearchMenu]['value']
                    [this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu] + i] =
                this.state.SearchAllBarValues1[this.state.currentCherrySearchMenu]
                ['value'][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu] + i + 1];
              this.state.SearchAllBarValues1[
                this.state.currentCherrySearchMenu]['value']
                [this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu] + i + 1] = '';
                this.state.currentRow[this.state.currentCherrySearchMenu][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu] + i] =
                this.state.currentRow[this.state.currentCherrySearchMenu][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu] + i + 1];
  this.state.currentRow[this.state.currentCherrySearchMenu][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu] + i + 1] = undefined;
            }
            this.state.NumAllSearchBars[this.state.currentCherrySearchMenu]--;
          } else {
            this.state.SearchAllBarValues1[
              this.state.currentCherrySearchMenu]['value']
              [this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]] = '';
              this.state.currentRow[this.state.currentCherrySearchMenu][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]] = undefined;
          }
        }
        this.setState({revealDeleteSearchAllModal: 0});
      }

      handleSearchAllHighlightClicks(num){
                this.state.defaultChr[this.state.currentCherrySearchMenu][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]] = undefined;


        if(this.state.cherryNavMenu === 'delete'){
          this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu] = num;

          this.setState({
            revealDeleteSearchAllModal: 1});
          } else {
            this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu] = num;
            this.setState({
              revealDeleteSearchAllModal: 0});
            }
          }


          handleCherrySearchClicks(index, num){

            var temp = this.state.NumAllSearchBars[index];

            if(this.state.cherryNavMenu === 'modify'
            || this.state.cherryNavMenu === 'searchall'
            || this.state.cherryNavMenu === 'save'){
              if(temp + 1 < 11){
                this.state.NumAllSearchBars[index] += 1.0;
                this.setState({});
              } else {
                this.setState({});
              }
            }else if(this.state.cherryNavMenu === 'delete'
            && temp - 1 >= 1.0){
              this.state.NumAllSearchBars[index] -= 1.0;
              this.setState({});
            }else{
              this.setState({});
            }

          }


          handleCherryPagMenu(e){
            this.setState({ cherryPagNavMenu: e });
          }

          handleCherryPagArrowClicks(num){
            if(num == 1){
              if(this.state.pagPageDivide + 1 > 0
                && this.state.totalpagSection > this.state.pagPageDivide + 1){
                  this.setState({ pagPageDivide: this.state.pagPageDivide + 1 });

                }
              } else if(num == -1){
                if(this.state.pagPageDivide - 1 > 0
                  && this.state.totalpagSection > this.state.pagPageDivide - 1){
                    this.setState({ pagPageDivide: this.state.pagPageDivide - 1});
                  }
                }

              }

              handleCherryPagNavClicks(){

                if(this.state.cherryPagNavMenu == 'highlight'){
                  this.setState({ cherryPagNavMenu: 'incr'});

                }else{
                  this.setState({ cherryPagNavMenu: 'highlight'});

                }

      }

      handleCherryPagClicks(num){
            var curr = this.state.currentPage + num;
            if(curr >= 0 && curr < this.state.totalpagSection){
              this.setState({currentPage:curr});
            }
          }

          handlePaginationButtons(num){
            if(this.state.cherryPagNavMenu == 'highlight'){
              if(this.state.highlight[num] == 0
                && this.state.currhighlight == num) {
                this.state.highlight[num] = 1;
                this.state.currhighlight = undefined;

              } else {
                if(this.state.currhighlight == undefined){
                  this.state.currhighlight = num;
                } else if(this.state.highlight[this.state.currhighlight] == 0){
                  this.state.highlight[this.state.currhighlight] = undefined;
                  this.state.currhighlight = num;
                }else if(this.state.highlight[this.state.currhighlight] == 1){

                  this.state.currhighlight = num;
                }
                this.state.highlight[num] = 0;


              }
            }

            this.setState({currentPage:num});

          }


          handleHeaderClicks(num){
            var sortDirectionLength = this.state.tablesortDirection.length;
            var test = this.state.tablekey;
            var tableIndex = this.state.savedSearchData;
            var tabledataval = this.state.tabledata;

            if(this.state.NumSearchBars > 0){

              if (this.state.tablesortDirection[num]["dir"] == 'asc') {
                tableIndex.sort(function(a, b) {

                  if(test[num]["render"]){

                    var nameA = test[num]["render"](tabledataval[a]); // ignore upper and lowercase
                    var nameB =  test[num]["render"](tabledataval[b]); // ignore upper and lowercase


                  }else{

                    var nameA = tabledataval[a][test[num]["key"]]; // ignore upper and lowercase
                    var nameB = tabledataval[b][test[num]["key"]]; // ignore upper and lowercase

                  }

                  if (nameA < nameB) {

                    return -1;
                  }
                  if (nameA > nameB) {

                    return 1;
                  }

                  // names must be equal
                  return 0;
                });
                this.state.tablesortDirection[num]["dir"] = 'desc';
              } else {
                tableIndex.sort(function(a, b) {

                  if(test[num]["render"]){

                    var nameA = test[num]["render"](tabledataval[a]); // ignore upper and lowercase
                    var nameB =  test[num]["render"](tabledataval[b]); // ignore upper and lowercase


                  }else{

                    var nameA = tabledataval[a][test[num]["key"]]; // ignore upper and lowercase
                    var nameB = tabledataval[b][test[num]["key"]]; // ignore upper and lowercase


                  }

                  if (nameA > nameB) {

                    return -1;
                  }
                  if (nameA < nameB) {

                    return 1;
                  }

                  // names must be equal
                  return 0;
                });
                this.state.tablesortDirection[num]["dir"] = 'asc';
              }

              this.state.savedSearchData = tableIndex;

            } else {

              if (this.state.tablesortDirection[num]["dir"] == 'asc') {
                tabledataval.sort(function(a, b) {

                  if(test[num]["render"]){

                    var nameA = test[num]["render"](a); // ignore upper and lowercase
                    var nameB =  test[num]["render"](b); // ignore upper and lowercase


                  }else{

                    var nameA = a[test[num]["key"]]; // ignore upper and lowercase

                    var nameB = b[test[num]["key"]]; // ignore upper and lowercase


                  }

                  if (nameA < nameB) {

                    return -1;
                  }
                  if (nameA > nameB) {

                    return 1;
                  }

                  // names must be equal
                  return 0;
                });
                this.state.tablesortDirection[num]["dir"] = 'desc';
              } else {
                tabledataval.sort(function(a, b) {

                  if(test[num]["render"]){

                    var nameA = test[num]["render"](a); // ignore upper and lowercase
                    var nameB =  test[num]["render"](b); // ignore upper and lowercase


                  }else{

                    var nameA = a[test[num]["key"]]; // ignore upper and lowercase
                    var nameB = b[test[num]["key"]]; // ignore upper and lowercase


                  }

                  if (nameA > nameB) {

                    return -1;
                  }
                  if (nameA < nameB) {

                    return 1;
                  }

                  // names must be equal
                  return 0;
                });
                this.state.tablesortDirection[num]["dir"] = 'asc';
              }

              this.state.tabledata = tabledataval;

            }

            this.setState({headerValueClicks:num});

          }


          handleCherryClicks(e){


            if(this.state.cherryNavMenu === 'modify'
            || this.state.cherryNavMenu === 'searchall'){
              if(this.state.NumSearchBars + 1 < 11){
                this.setState({ NumSearchBars: this.state.NumSearchBars + 1 });
              } else {
                this.setState({});
              }
            }else if(this.state.cherryNavMenu === 'delete'
            && this.state.NumSearchBars - 1 >= 0){

              if(this.state.revealDeleteModal == 2){
                this.setState({revealDeleteModal: 1});
              } else {
                this.setState({revealDeleteModal: 2});
              }

            } else if(this.state.cherryNavMenu === 'save'){
              handleCSVButtonClicks(
                this.state.SearchBarValues[
                  this.state.currentCherrySearchMenu]["name"],
                this.state.savedData, this.state.tabledata,
                this.state.tablekey);
              }else{
                this.setState({});
              }
            }

            handleCherryMenu(e){

              this.setState({ cherryNavMenu: e });
            }

            handleSearchBarChanges(num, e){
              this.state.SearchBarValues[num]["name"] = e.target.value;

              this.setState({currentCherrySearchMenu: num, trueSearchData: 1});

            }

            handleSearchAllBarChanges(num, e){

              var highLength = this.state.highlight.length;
              this.state.currhighlight = undefined;

              for (var i = 0; i < highLength; i++){
                this.state.highlight[i] = undefined;
              }

              this.state.SearchAllBarValues1[
                this.state.currentCherrySearchMenu]["value"][num] = e.target.value;

                this.setState({currentPage:0, trueSearchData: 1});

              }

              handleCherrySearch(num, e){
var tablekey = this.state.tablekey;
                var highLength = this.state.highlight.length;
                this.state.currhighlight = undefined;
                for (var i = 0; i < highLength; i++){
                  this.state.highlight[i] = undefined;
                }

                var val = e.target.value;
                this.state.SearchBarValues[
                  this.state.currentCherrySearchMenu][
                    tablekey[num]["key"]] = val;

                if(val != ''){
                  this.state.SearchBarValues[
                    this.state.currentCherrySearchMenu]["active"] = 1;
                } else {


                  var tablekeylength = tablekey.length;
                  var activeCond = 0;

                  for(var i = 0; i < tablekeylength; i++){
                    if(this.state.SearchBarValues[
                      this.state.currentCherrySearchMenu]
                      [tablekey[i]["key"]]){

                        if(this.state.SearchBarValues[
                          this.state.currentCherrySearchMenu]
                          [tablekey[i]["key"]] !== ''){
                            activeCond = 1;
                            break;
                          }
                        }

                      }
                      this.state.SearchBarValues[
                        this.state.currentCherrySearchMenu]["active"] =
                        activeCond;
                    }


                    this.setState({currentPage: 0, trueSearchData: 1});



                  }


                  handleMenuClicks(num){


this.state.defaultChr[this.state.currentCherrySearchMenu][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]] = undefined;



                    if(this.state.cherryNavMenu === 'delete'
                    && this.state.NumSearchBars - 1 >= 0){
                      if(this.state.revealDeleteModal == 2){
                        if(this.state.currentCherrySearchMenu == num){
                          this.setState({revealDeleteModal: 1,
                            currentCherrySearchMenu: num, trueSearchData: 1, rowData: ''});
                        }else{
                          this.setState({revealDeleteModal: 0,
                            currentCherrySearchMenu: num, rowData: ''});
                        }

                      } else {
                        this.setState({revealDeleteModal: 2,
                          currentCherrySearchMenu: num, trueSearchData: 1, rowData: ''});
                      }

                    } else {

                      this.setState({revealDeleteModal: 0,
                        currentCherrySearchMenu: num, trueSearchData: 1, rowData: ''});
                    }


                  }

                  handeleDeleteButtonClicks(num, numButton){
                    if(num == 0){
                      this.setState({revealDeleteModal:0});
                    } else {
                      if(this.state.NumSearchBars - 1 >= 0){



if(this.state.NumSearchBars ==
(this.state.currentCherrySearchMenu + 1)){


  this.state.currentRow[this.state.currentCherrySearchMenu] = [undefined,undefined,
    undefined,undefined,undefined,undefined,
    undefined,undefined,undefined,undefined,
    undefined,undefined,undefined,undefined,undefined];

this.state.defaultChr[this.state.currentCherrySearchMenu] = [undefined,undefined,
undefined,undefined,undefined,undefined,
undefined,undefined,undefined,undefined,
undefined,undefined,undefined,undefined,undefined];


  this.state.SearchBarValues[
    this.state.currentCherrySearchMenu] =
    {name: this.state.SearchBarValues[
      this.state.currentCherrySearchMenu]["name"]};


  this.state.SearchAllBarValues1[
    this.state.currentCherrySearchMenu] =
    {'value':['','','','','','','','','','','',
  '','','','']};


  this.state.NumAllSearchBars[
    this.state.currentCherrySearchMenu] = 1.0;

    this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu] = 0.0;

}else{

  var lengthSearchBar =
  this.state.NumSearchBars -
  (this.state.currentCherrySearchMenu + 1);

  for(var i = 0; i < lengthSearchBar; i++){

    if(this.state.currentCherrySearchMenu + i + 1 < 11){


      this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu + i] = this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu + i + 1];
      this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu + i + 1] = 0.0;
      this.state.currentRow[this.state.currentCherrySearchMenu + i] =    this.state.currentRow[this.state.currentCherrySearchMenu + i + 1];
      this.state.currentRow[this.state.currentCherrySearchMenu + i + 1] = [undefined,undefined,
        undefined,undefined,undefined,undefined,
        undefined,undefined,undefined,undefined,
        undefined,undefined,undefined,undefined,undefined];
this.state.defaultChr[this.state.currentCherrySearchMenu + i] = this.state.defaultChr[this.state.currentCherrySearchMenu + i + 1];
this.state.defaultChr[this.state.currentCherrySearchMenu + i + 1] = [undefined,undefined,
undefined,undefined,undefined,undefined,
undefined,undefined,undefined,undefined,
undefined,undefined,undefined,undefined,undefined];
      this.state.SearchBarValues[
        this.state.currentCherrySearchMenu + i] =
        this.state.SearchBarValues[
          this.state.currentCherrySearchMenu + i + 1];

      this.state.SearchBarValues[
        this.state.currentCherrySearchMenu + i + 1] =
        {name: this.state.SearchBarValues[
          this.state.currentCherrySearchMenu + i]["name"] + 1};

      this.state.SearchAllBarValues1[
        this.state.currentCherrySearchMenu + i] =
        this.state.SearchAllBarValues1[
          this.state.currentCherrySearchMenu + i + 1];
      this.state.SearchAllBarValues1[
        this.state.currentCherrySearchMenu + i + 1] =
        {'value':['','','','','','','','','','','',
      '','','','']};

      this.state.NumAllSearchBars[
        this.state.currentCherrySearchMenu + i] =
        this.state.NumAllSearchBars[this.state.currentCherrySearchMenu + i + 1];
      this.state.NumAllSearchBars[
        this.state.currentCherrySearchMenu + i + 1] = 1.0;




    }
  }

}






                        this.setState({ NumSearchBars:
                          this.state.NumSearchBars - 1, revealDeleteModal:0 });
                      } else {





                        this.setState({ revealDeleteModal:0 });
                      }
                    }
                  }

                  render() {

                    this.state.tablekey = this.props.tablekey;
                    var tablekey = this.state.tablekey;
                    var lengthtabledata = this.state.tabledata.length;
                    var lengthtablekey = tablekey.length;

                    var genomeBrowser = undefined;
                    var currentRow = this.state.currentRow[this.state.currentCherrySearchMenu][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]];




  if(currentRow || currentRow == 0){

    if(this.state.savedSearchData){


var currentRow = this.state.savedSearchData[currentRow];

      

if(this.state.NumSearchBars == 0){
  this.state.NumSearchBars = 1;
  this.state.SearchAllBarValues1[this.state.currentCherrySearchMenu]['value'][0] = this.state.tabledata[currentRow]["accession"];
} else if(this.state.tabledata[currentRow] !== ''){

  if(this.state.toggleAccesionSearch == 1){
    this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu] = (this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu] + 1.0) % (this.state.NumAllSearchBars[this.state.currentCherrySearchMenu] );
    this.state.SearchAllBarValues1[this.state.currentCherrySearchMenu]['value'][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]] = this.state.tabledata[currentRow]["accession"];

  }else{
    this.state.SearchAllBarValues1[this.state.currentCherrySearchMenu]['value'][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]] = this.state.tabledata[currentRow]["accession"];
  }


}


genomeBrowser = (<GenomeBrowserData currentRow = {currentRow}
  data = {this.state.tabledata[currentRow]}
defaultChr = {        this.state.defaultChr[this.state.currentCherrySearchMenu][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]]}
currentCherrySearchMenu = {this.state.currentCherrySearchMenu}
currentSearchAllHighlight = {this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]}
  />);

this.state.defaultChr[this.state.currentCherrySearchMenu][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]] = this.state.tabledata[currentRow]["chrom"];

} else {
  if(this.state.NumSearchBars == 0){
    this.state.NumSearchBars = 1;
    this.state.SearchAllBarValues1[this.state.currentCherrySearchMenu]['value'][0] = this.state.rowData["accession"];
  } else if(this.state.rowData !== ''){

    if(this.state.toggleAccesionSearch == 1){
      this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu] = (this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu] + 1.0) % (this.state.NumAllSearchBars[this.state.currentCherrySearchMenu] );
      this.state.SearchAllBarValues1[this.state.currentCherrySearchMenu]['value'][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]] = this.state.rowData["accession"];

    }else{
      this.state.SearchAllBarValues1[this.state.currentCherrySearchMenu]['value'][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]] = this.state.rowData["accession"];
    }


  }

  genomeBrowser = (<GenomeBrowserData currentRow = {currentRow}
    data = {this.state.tabledata[currentRow]}
  defaultChr = {        this.state.defaultChr[this.state.currentCherrySearchMenu][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]]}
  currentCherrySearchMenu = {this.state.currentCherrySearchMenu}
  currentSearchAllHighlight = {this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]}
    />);

this.state.defaultChr[this.state.currentCherrySearchMenu][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]] = this.state.tabledata[currentRow]["chrom"];

}



  }




  var currentRow = this.state.currentRow[this.state.currentCherrySearchMenu][this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu]];




                    var col = [];
                    for (var i = 0; i < lengthtablekey; i++){

                      if(tablekey[i]["headRender"]){

                        col.push(<th onClick =
                          {this.handleHeaderClicks.bind(this, i)}>
                          {tablekey[i]["headRender"]()}</th>);
                      }else{
                        col.push(<th onClick =
                          {this.handleHeaderClicks.bind(this, i)}>
                          {tablekey[i]["title"]}</th>);
                      }

                    }

                    if(this.state.NumSearchBars > 0){
                      var alertMod;
                      if(this.state.revealDeleteModal == 1){
                        alertMod = (
                          <DeleteMenu  handeleDeleteButtonClicks =
                          {this.handeleDeleteButtonClicks}  />
                        );
                      }
                    }


                    var row = [];
                    if(this.state.NumSearchBars > 0){

                      var searchAllBars = [];

                      searchAllBars.push(

                     <a href="#" data-toggle="tooltip" data-placement="bottom" title="Click To Add Search Bars">    <span class="glyphicon glyphicon-leaf gray"
                        aria-hidden="true" onClick =
                        {this.handleCherrySearchClicks.bind(this,
                          this.state.currentCherrySearchMenu)}>{" "}</span></a>
                        );


                        for(var i = 0; i < this.state.NumAllSearchBars[
                          this.state.currentCherrySearchMenu]; i++){
                            var searchBarVal = this.state.SearchAllBarValues1[
                              this.state.currentCherrySearchMenu]["value"][i];

                              if(this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu] == i){
                                var highlightBrown = "cherryBarBrown";
                              }else{
                                var highlightBrown = "";
                              }

                              var readOnly=false;
                              if(this.state.cherryNavMenu == 'searchall'
                              || this.state.cherryNavMenu === 'save'){
                                readOnly = false;
                              } else if(this.state.cherryNavMenu == 'modify'){
                                readOnly=true;
                          } else if(this.state.cherryNavMenu == 'delete'){
                            readOnly=true;
                            if(this.state.SearchBarBrownHighlight[this.state.currentCherrySearchMenu] == i){
                              var alertMod;
                              if(this.state.revealDeleteSearchAllModal == 1){
                                alertMod = (
                                  <DeleteMenu  handeleDeleteButtonClicks =
                                  {this.handleDeleteSearchAllHighlightClicks}/>
                                );
                              }
                            } else {
                            }
                          }

                          searchAllBars.push( <input type="search"
                          name="search" size="10"
                          className = {highlightBrown}
                          readOnly={readOnly}
                          value = {searchBarVal}
                          onChange = {this.handleSearchAllBarChanges.bind(this, i)}
                          onClick = {this.handleSearchAllHighlightClicks.bind(this, i)}
                          ></input>);

                        }

                        if(this.state.trueSearchData == 1
                          || this.state.savedSearchData == undefined){

                          var indexRowData = generateSearchedData(this.state.tabledata,
                            tablekey,
                            this.state.SearchAllBarValues1[
                                this.state.currentCherrySearchMenu]["value"],
                            this.state.SearchBarValues[this.state.currentCherrySearchMenu], this.state.currentRow[this.state.currentCherrySearchMenu]);
                            this.state.trueSearchData = 0;
                            this.state.savedSearchData = indexRowData;
                          } else {
                            var indexRowData = this.state.savedSearchData;
                          }

                          var indexRowDataLength = indexRowData.length;
                          this.state.savedData = indexRowData;

                          this.state.totalpagSection =
                          Math.ceil(indexRowData.length/this.state.pageDivide);

                          var temprowdata = [];

                          for(var i = this.state.currentPage*10;
                            i < (this.state.currentPage + 1)*10; i++){
                              if(indexRowData[i] || i === 0){
                                temprowdata.push(indexRowData[i]);
                              }
                            }
                            row = generateRowData(this.state.tabledata,
                              tablekey,
                              temprowdata, this.handleTROnClick, currentRow, this.state.currentPage, this.state.pageDivide);
                              searchAllBars.push(  <span >{" "}</span>);
                              var color = ' gray';
                              if(this.state.toggleAccesionSearch == 1){
                                color = ' yellow'
                              }

                              searchAllBars.push(  <a href="#" data-toggle="tooltip" data-placement="bottom" title="Select Table Elements">  <span class={"glyphicon glyphicon-leaf" + color}
                              aria-hidden="true" onClick = {this.handleAccesionSearch} >{" "}</span></a>);

                            } else {

                              this.state.savedData = [];

                              this.state.totalpagSection =
                              Math.ceil(lengthtabledata/this.state.pageDivide);

                              var temprowdata = [];

                              for(var i = this.state.currentPage*10;
                                i < (this.state.currentPage + 1)*10; i++){
                                  if(this.state.tabledata[i] || i == 0){
                                    temprowdata.push(this.state.tabledata[i]);
                                  }
                                }

                                var rowdatalength = temprowdata.length;
                                for (var i = 0; i < rowdatalength; i++){
                                  var temp = [];
                                  for (var j = 0; j < lengthtablekey; j++){
                                    if(tablekey[j]["render"]){
                                      temp.push(<td>{tablekey[j]["render"](temprowdata[i])}</td>);
                                    }else{
                                    temp.push(<td>{temprowdata[i][tablekey[j]["key"]]}</td>);
                                  }

                                }

                                var tdHoverClass = "tr-hover-class";


                                if(currentRow == this.state.currentPage*this.state.pageDivide + i){

                                  tdHoverClass = "tr-onClick-class";
                                }

                                row.push(<tr className={tdHoverClass}  onClick = {this.handleTROnClick.bind(this, i)}>{temp}</tr>);


                              }
                              }

                              if(this.state.cherryPagNavMenu == 'incr'){

                                var pagCherry = (
                                  <img src={logo} alt="cherry"
                                  width="30" height="30" onClick =
                                  {this.handleCherryPagNavClicks}/>
                                );
                              }else{
                              var pagCherry = (      <img src={logoyellow} alt="cherry"
                                width="30" height="30" onClick =
                                {this.handleCherryPagNavClicks}/>
                              );

                              }

if(this.state.cherryPagNavMenu == "showhighlight"){
var showHighlightLeaf = "glyphicon glyphicon-leaf yellow";

} else {
  var showHighlightLeaf = "glyphicon glyphicon-leaf gray";
}

                              return (
                                <div className="Cherry">
                                <br/>
                                {alertMod}
                                <img src={logo} class="gray"  alt="cherry"
                                width="30" height="30" onClick =
                                {this.handleCherryClicks} id = 'cherryID'

                                />
                                <SelectMenuBar  handleCherryMenu = {(event) =>
                                  this.handleCherryMenu(event.target.value)}
                                  menuVal = {[{"value":"searchall", "inner": "Search"},
                                  {"value":"modify", "inner": "Label"},
                                  {"value":"delete", "inner": "Delete"},
                                  {"value":"save", "inner": "Save"}]}/>
                                  <SearchBars
                                  NumSearchBars = {this.state.NumSearchBars}
                                  cherryNavMenu = {this.state.cherryNavMenu}
                                  currentCherrySearchMenu = {this.state.currentCherrySearchMenu}
                                  SearchBarValues = {this.state.SearchBarValues}
                                  handleSearchBarChanges = {this.handleSearchBarChanges}
                                  handleMenuClicks = {this.handleMenuClicks}
                                  />
                                  <div><pre>{"                 "}{searchAllBars}</pre></div>
                                  {genomeBrowser}
                                  <table >
                                  <tr>{col}</tr>
                                  <IndColSearchBar
                                  lengthtablekey = {lengthtablekey}
                                  NumSearchBars = {this.state.NumSearchBars}
                                  revealDeleteModal = {this.state.revealDeleteModal}
                                  handeleDeleteButtonClicks = {this.handeleDeleteButtonClicks}
                                  SearchBarValues = {this.state.SearchBarValues}
                                  currentCherrySearchMenu = {this.state.currentCherrySearchMenu}
                                  tablekey = {tablekey}
                                  handleCherrySearch = {this.handleCherrySearch}
                                  />
                                  {row}
                                  </table>
                                  <span class={showHighlightLeaf}
                                  aria-hidden="true"
                                  onClick = {this.handleTurnHighlightOnOffClicks.bind(this, 1)}>{" "}</span>

                                    {pagCherry}


                                    <span>{"       "}</span>


<span>{"                      "}</span>
                                    <Pag totalpagSection = {this.state.totalpagSection}
                                    pagPageDivide = {this.state.pagPageDivide}
                                    cherryPagNavMenu = {this.state.cherryPagNavMenu}
                                    currentPage = {this.state.currentPage}
                                    handlePaginationButtons = {this.handlePaginationButtons}
                                    highlight = {this.state.highlight}
                                    handleCherryPagClicks = {this.handleCherryPagClicks}/>

  <span>{"                      "}</span>
                                    <span class="glyphicon glyphicon-leaf gray"
                                    aria-hidden="true" onClick =
                                    {this.handleCherryPagArrowClicks.bind(this, -1)}>{" "}</span>
                                    <SelectMenuBar  handleCherryMenu = {(event) =>
                                      this.handlePagPageSelect(event.target.value)}
                                      menuVal = {[{"value":"5", "inner": "5"},
                                      {"value":"11", "inner": "11"},
                                      {"value":"15", "inner": "15"},
                                      {"value":"21", "inner": "21"}]}/>

                                      <span class="glyphicon glyphicon-leaf gray"
                                      aria-hidden="true" onClick =
                                      {this.handleCherryPagArrowClicks.bind(this, 1)}>{" "}</span>



                                    <br/>
                                    </div>
                                  );
                                }
                              }
