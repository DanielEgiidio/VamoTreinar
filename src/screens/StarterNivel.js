import React, { useState } from 'react';
import { Text, Button } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { setLevel } from '../actions/userActions';
import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
    flex:1;
    align-items:center;
    background-color:#FFF;
    margin:50px 30px 0px 30px;
`;

const HeaderText = styled.Text`
    font-size:15px;
    color:#333;
    text-align:center;
    margin-bottom:30px;
`;

const LevelArea = styled.View`
    width:100%;
`;

const NextButton = (props) => {

    const nextAction = () => {
        if(!props.navigation.state.params || !props.navigation.state.params.level) {
            alert("Você precisa dizer seu nível");
            return;
        }
        props.navigation.navigate('StarterRecommendations');
    }

    return (
        <Button title="Próximo" onPress={nextAction} />
    );
}

const Page = (props) => {
    let funnyPhrase = '';
    switch(props.workoutDays.length) {
        case 1:
            funnyPhrase = "Só 1 dia não né, no minimo 4...";
            break;
        case 2:
            funnyPhrase = "2 Dias? levanta do sofá e vai treinar";
            break;
        case 3:
            funnyPhrase = " 3 dias dá pro gasto...";
            break;
        case 4:
            funnyPhrase = " 4 dias ? ai eu gostei";
            break;
        case 5:
            funnyPhrase = "É isso aí, 5 dias é nivel bodybuilder, lets GO!";
            break;
        case 6:
            funnyPhrase = "AJUDA O MALUCO TA DOENTE!!!";
            break;
        case 7:
            funnyPhrase = "AQUI NÓS CONSTRÓI FIBRA!!!";
            break;
    }

    const setMyLevel = (l) => {
        props.setLevel(l);
        props.navigation.setParams({level:l});
    }

    return (
        <Container>
            <HeaderText style={{fontWeight:'bold'}}>{funnyPhrase}</HeaderText>
            <HeaderText>Qual seu nível hoje?</HeaderText>

            <LevelArea>
                <DefaultButton onPress={()=>setMyLevel('beginner')} bgcolor={props.level=='beginner'?'#a5e8bc':false} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Iniciante / Num vai dá Não</Text>
                </DefaultButton>
                <DefaultButton onPress={()=>setMyLevel('intermediate')} bgcolor={props.level=='intermediate'?'#a5e8bc':false} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Intermediário / Me viro bem</Text>
                </DefaultButton>
                <DefaultButton onPress={()=>setMyLevel('advanced')} bgcolor={props.level=='advanced'?'#a5e8bc':false} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Avançado / AQUI NÓS CONSTRÓI FIBRA!</Text>
                </DefaultButton>
            </LevelArea>

            <HeaderText>Você pode alterar isso a qualquer momento.</HeaderText>
        </Container>
    );
};

Page.navigationOptions = ({navigation}) => {
    return {
        title:'',
        headerRight:<NextButton navigation={navigation} />,
        headerRightContainerStyle:{
            marginRight:10
        }
    };
}

const mapStateToProps = (state) => {
    return {
        workoutDays: state.userReducer.workoutDays,
        level: state.userReducer.level
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        setLevel:(level)=> setLevel(level, dispatch)
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Page);