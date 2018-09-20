import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
    rootContainer: {
        flex: 1
    },

    displayContainer: {
        flex: 2,
        backgroundColor: '#419951',
        justifyContent: 'center'
    },

    displayText: {
        color: 'red',
        fontSize: 38,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: 20
    },

    inputContainer: {
        flex: 8,
        backgroundColor: '#1B205A'
    },
    inputButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#91AA9D'
    },

    inputButtonHighlighted: {
        backgroundColor: '#193441'
    },
    
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