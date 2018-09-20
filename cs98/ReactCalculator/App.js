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

const inputButtons = [
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, 'CE', '=', '+']
];

const fibnums = [0  ,
1 ,
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

export default class ReactCalculator extends Component {

   constructor(props) {
      super(props);
        
      this.state = {
        inputValue: 0,
        previousInputValue: 0,
        selectedSymbol: null
      }
    }

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
  
  _renderInputButtons() {
        
        let views = [];

        for (var r = 0; r < inputButtons.length; r ++) {
            let row = inputButtons[r];

            let inputRow = [];
            for (var i = 0; i < row.length; i ++) {
                let input = row[i];

                inputRow.push(
                  <InputButton 
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

  _onInputButtonPressed(input) {
      switch (typeof input) {
        case 'number':
            return this._handleNumberInput(input)
        case 'string':
            return this._handleStringInput(input)
      }
  }

  _handleNumberInput(num) {
      let inputValue = (this.state.inputValue * 10) + num;

      this.setState({
          inputValue: inputValue
      })
  }

  _handleStringInput(str) {
      switch (str) {
          case '/':
          case '*':
          case '+':
          case '-':
            this.setState({
                selectedSymbol: str,
                previousInputValue: this.state.inputValue,
                inputValue: 0
            });
            break;
          case '=':
                let symbol = this.state.selectedSymbol,
                    inputValue = this.state.inputValue,
                    previousInputValue = this.state.previousInputValue;

                if (!symbol) {
                    return;
                }
                if (fibnums.includes(eval(previousInputValue + symbol + inputValue))) {
                  let temp = eval(previousInputValue + symbol + inputValue).toString()
                  alert(temp + " is a Fibonacci number!")
                }
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
