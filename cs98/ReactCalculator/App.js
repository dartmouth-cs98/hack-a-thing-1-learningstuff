/**
 Emily Pitts & Hanting Guo
 CS 98 Hack-a-Thing
 Due 9/20/18
 * Expanded upon tutorial found here https://kylewbanks.com/blog/react-native-tutorial-part-2-designing-a-calculator
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AppRegistry} from 'react-native';
import Style from './Style';
import InputButton from './InputButton';
AppRegistry.registerComponent('ReactCalculator', () => ReactCalculator);

//Calculator buttons
const inputButtons = [
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, 'CE', '=', '+']
];

//List of fibonacci numbers
const fibnums = [0  ,
1 ,
2 ,
3 ,
5 ,
8 ,
13  ,
21  ,
34  ,
55  ,
89  ,
144 ,
233 ,
377 ,
610 ,
987 ,
1597  ,
2584  ,
4181  ,
6765  ,
10946 ,
17711 ,
28657 ,
46368 ,
75025 ,
121393  ,
196418  ,
317811  ,
514229  ,
832040  ,
1346269 ,
2178309 ,
3524578]

//default class setting up state variables
export default class ReactCalculator extends Component {

   constructor(props) {
      super(props);
        
      this.state = {
        inputValue: 0,
        previousInputValue: 0,
        selectedSymbol: null,
        freq: [[17,17,17,24],[17,17,17,24],[17,17,17,24],[17,17,17,24]]
      }
    }

//Rendering the color frames and background for buttons
  render() {
    return (
       <View style={Style.rootContainer}>
          <View style={Style.displayContainer}>
            <Text style={Style.displayText}>{this.state.inputValue}</Text>
          </View>
          <View style={Style.inputContainer}>
            {this._renderInputButtons()}
          </View>
      </View>
    );
  }

//Creates physical buttons, digits, and font size
  _renderInputButtons() {
        
        let views = [];

        //for each row
        for (var r = 0; r < inputButtons.length; r ++) {
            let row = inputButtons[r];

            //each button on the row
            let inputRow = [];
            for (var i = 0; i < row.length; i ++) {
                let input = row[i];

                inputRow.push(
                  <InputButton 
                    font={this.state.freq[r][i]} //this allows us to draw the button corresponding to the frequency of it being clicked
                    value={input} 
                    highlight={this.state.selectedSymbol === input}
                    onPress={this._onInputButtonPressed.bind(this, input)}
                    key={r + "-" + i}/>
                );
            }
            views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
        
        }
        return views;
  }

//Handling when buttons are pressed
//Increment frequency matrix when button is pressed

  _onInputButtonPressed(input) {
      switch (typeof input) {
        case 'number':
            if (input==1) {
              this.state.freq[0][0]+=3
            }
            if (input==2) {
              this.state.freq[0][1]+=3
            }
            if (input==3) {
              this.state.freq[0][2]+=3
            }
            if (input==4) {
              this.state.freq[1][0]+=3
            }
            if (input==5) {
              this.state.freq[1][1]+=3
            }
            if (input==6) {
              this.state.freq[1][2]+=3
            }
            if (input==7) {
              this.state.freq[2][0]+=3
            }
            if (input==8) {
              this.state.freq[2][1]+=3
            }
            if (input==9) {
              this.state.freq[2][2]+=3
            }
            if (input==0) {
              this.state.freq[3][0]+=3
            }
            return this._handleNumberInput(input)
        case 'string':
            return this._handleStringInput(input)
      }
  }

//Handling number button clicks
  _handleNumberInput(num) {
      let inputValue = (this.state.inputValue * 10) + num;

      this.setState({
          inputValue: inputValue
      })
  }

//Handling operation button clicks
  _handleStringInput(str) {
      switch (str) {
        //if it is a numerical operation
          case '/':
          case '*':
          case '+':
          case '-':
          //store it in the state
            this.setState({
                selectedSymbol: str,
                previousInputValue: this.state.inputValue,
                inputValue: 0
            });
            break;
            //if we want to generate answer
          case '=':
          //pull from state variables and calculate
                let symbol = this.state.selectedSymbol,
                    inputValue = this.state.inputValue,
                    previousInputValue = this.state.previousInputValue;

                if (!symbol) {
                    return;
                }
                //If what we calculate is a fibonacci number
                if (fibnums.includes(eval(previousInputValue + symbol + inputValue))) {
                  let temp = eval(previousInputValue + symbol + inputValue)
                  place = fibnums.indexOf(temp)+1
                  let stt = "th"
                  if (place%10==1) {
                    stt = "st";
                  }
                  if(place%10==2) {
                    stt = "nd";
                  }
                  if (place%10==3) {
                    stt = "rd";
                  }
                  //send an alert saying that we have calculated a fibonacci number
                  alert(temp.toString() + " is the " + place.toString()+ stt+" Fibonacci number!")
                }
                //reset state
                this.setState({
                    previousInputValue: 0,
                    inputValue: eval(previousInputValue + symbol + inputValue),
                    selectedSymbol: null
                });
                break;
           case 'CE':
          // Clear Everything
          this.setState({
          connectValue: null,
            inputValue: 0,
            displayedValue: null
          });
          break;
        }
    }
}
