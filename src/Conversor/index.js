import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import api from '../services/api'

export default class Conversor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            moedaA: props.moedaA,
            moedaB: props.moedaB,
            moedaB_valor: 0,
            valorConvertido: 0
        }

        this.converter = this.converter.bind(this)
    }

    async converter() {
        let de_para = this.state.moedaA + '_' + this.state.moedaB
        const response = await api.get(`/convert?q=${de_para}&compact=ultra&apiKey=c5ce198fc1de392deae8`)
        let cotacao = response.data[de_para];
        
        let resultado = (cotacao * parseFloat(this.state.moedaB_valor)).toFixed(2)
        
        this.setState({
            valorConvertido: resultado
        })

        // Fechar teclado automaticamente 
        Keyboard.dismiss()
    }

 render(){
     const { moedaA, moedaB } = this.props
  return (
    <View style={ styles.container }>

        <Text style={ styles.titulo }>{ moedaA } para { moedaB }</Text>

        <TextInput 
        style={ styles.input } 
        keyboardType='numeric'
        placeholder='Valor a ser convertido'
        onChangeText={ (moedaB_valor) => this.setState({ moedaB_valor }) }
        />

        <TouchableOpacity style={ styles.botao } onPress={ this.converter }>
            <Text style={ styles.txtBotao }>Converter</Text>
        </TouchableOpacity>

        <Text style={ styles.resultado }>{ (this.state.valorConvertido === 0 ? '' : this.state.valorConvertido ) }</Text>

    </View>
   );
 }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000'
    },
    input: {
        width: 280,
        height: 45,
        backgroundColor: '#CCC',
        textAlign: 'center',
        borderRadius: 10,
        marginTop: 15,
        fontSize: 20,
        color: '#000'
    },
    botao: {
        width: 150,
        height: 45,
        backgroundColor: '#FF0000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    txtBotao: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFF'
    },
    resultado: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 15
    }
})

