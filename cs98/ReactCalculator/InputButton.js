/**InputButton Class for Calculator
Created by Emily Pitts and Hanting Guo for cs98 hack-a-thing
Due September 20th 2018**/

import React, { Component } from 'react'; 
import {
    View,
    TouchableHighlight,
    Text
} from 'react-native';
import Style from './Style';

//Class rendering the input button and actual text within each button; takes font size from App.js
export default class InputButton extends Component {
    render() {
     return (
         <TouchableHighlight style={[Style.inputButton, this.props.highlight ? Style.inputButtonHighlighted : null]}
                underlayColor="#193441"
                onPress={this.props.onPress}>
            <Text style={[Style.inputButtonText,{fontSize: this.props.font}]}>{this.props.value}</Text>
         </TouchableHighlight>
        )
    }  
}