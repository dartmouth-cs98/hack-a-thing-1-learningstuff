/**Standard Stylesheet for Calculator
Created by Emily Pitts and Hanting Guo for cs98 hack-a-thing
Due September 20th 2018**/


import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
    rootContainer: {
        flex: 1
    },

    //make display green
    displayContainer: {
        flex: 2,
        backgroundColor: '#419951',
        justifyContent: 'center'
    },

    //make text red
    displayText: {
        color: 'red',
        fontSize: 38,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: 20
    },

    //make bottom dark blue
    inputContainer: {
        flex: 8,
        backgroundColor: '#1B205A'
    },

    //format buttons
    inputButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#91AA9D'
    },

    //highlighted color when clicked
    inputButtonHighlighted: {
        backgroundColor: '#193441'
    },
    
    //button text attributes: font size not specified here but in App.js
    inputButtonText: {
        //fontSize: 22,
        fontWeight: 'bold',
        color: '#7CFC00'
    },
    
    inputRow: {
        flex: 1,
        flexDirection: 'row'
    }

});

export default Style;