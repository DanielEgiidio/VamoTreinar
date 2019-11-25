import React from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { setName, setWorkoutDays, setLevel } from '../actions/userActions';

const PageContainer = styled.SafeAreaView`
    flex:1;
    margin:20px;
`;
const Label = styled.Text`
    font-size:15px;
    font-weight:bold;
    margin-top:20px;
    margin-bottom:10px;
`;
const Input = styled.TextInput`
    border:1px solid #CCC;
    width:100%;
    height:50px;
    border-radius:10px;
    font-size:16px;
    padding:10px;
`;
const ListArea = styled.View`
    flex-direction:row;
    justify-content:space-between;
`;
const DayItem = styled.TouchableHighlight`
    width:30px;
    height:30px;
    background-color:#EEE;
    justify-content:center;
    align-items:center;
    border-radius:5px;
`;
const DayItemText = styled.Text``;

const LevelItem = styled.TouchableHighlight`
    padding:0 15px;
    height:30px;
    background-color:#EEE;
    justify-content:center;
    align-items:center;
    border-radius:5px;
`;
const LevelItemText = styled.Text``;

const ResetButton = styled.Button`
    margin-top:30px;
`;

const Page = (props) => {
    const resetAction = () => {
        props.setName('');
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'StarterStack' })],
        });
        global.mainstack.dispatch(resetAction);
    };

    const toggleWorkoutDay = (d) => {
        let newWorkoutDays = [...props.workoutDays];
        if(props.workoutDays.includes(d)) {
            if(newWorkoutDays.length == 1) {
                alert("Calma ae! Tem que ter pelo menos 1 dia!");
                return;
            }
            newWorkoutDays = newWorkoutDays.filter(i=>i!=d);
        } else {
            newWorkoutDays.push(d);
        }
        props.setWorkoutDays(newWorkoutDays);
    }

    return (
        <PageContainer>
            <Label>Qual seu nome?</Label>
            <Input value={props.name} onChangeText={e=>props.setName(e)} />

            <Label>Quais dias da semana você treina?</Label>
            <ListArea>
                <DayItem onPress={()=>toggleWorkoutDay(1)} underlayColor="transparent" style={props.workoutDays.includes(1)?{backgroundColor:'#a5e8bc'}:{}}>
                    <DayItemText>S</DayItemText>
                </DayItem>
                <DayItem onPress={()=>toggleWorkoutDay(2)} underlayColor="transparent" style={props.workoutDays.includes(2)?{backgroundColor:'#a5e8bc'}:{}}>
                    <DayItemText>T</DayItemText>
                </DayItem>
                <DayItem onPress={()=>toggleWorkoutDay(3)} underlayColor="transparent" style={props.workoutDays.includes(3)?{backgroundColor:'#a5e8bc'}:{}}>
                    <DayItemText>Q</DayItemText>
                </DayItem>
                <DayItem onPress={()=>toggleWorkoutDay(4)} underlayColor="transparent" style={props.workoutDays.includes(4)?{backgroundColor:'#a5e8bc'}:{}}>
                    <DayItemText>Q</DayItemText>
                </DayItem>
                <DayItem onPress={()=>toggleWorkoutDay(5)} underlayColor="transparent" style={props.workoutDays.includes(5)?{backgroundColor:'#a5e8bc'}:{}}>
                    <DayItemText>S</DayItemText>
                </DayItem>
                <DayItem onPress={()=>toggleWorkoutDay(6)} underlayColor="transparent" style={props.workoutDays.includes(6)?{backgroundColor:'#a5e8bc'}:{}}>
                    <DayItemText>S</DayItemText>
                </DayItem>
                <DayItem onPress={()=>toggleWorkoutDay(0)} underlayColor="transparent" style={props.workoutDays.includes(0)?{backgroundColor:'#a5e8bc'}:{}}>
                    <DayItemText>D</DayItemText>
                </DayItem>
            </ListArea>

            <Label>Qual seu nível?</Label>
            <ListArea>
                <LevelItem onPress={()=>props.setLevel('beginner')} underlayColor="transparent" style={props.level=='beginner'?{backgroundColor:'#a5e8bc'}:{}}>
                    <LevelItemText>Iniciante</LevelItemText>
                </LevelItem>
                <LevelItem onPress={()=>props.setLevel('intermediate')} underlayColor="transparent" style={props.level=='intermediate'?{backgroundColor:'#a5e8bc'}:{}}>
                    <LevelItemText>Intermediário</LevelItemText>
                </LevelItem>
                <LevelItem onPress={()=>props.setLevel('advanced')} underlayColor="transparent" style={props.level=='advanced'?{backgroundColor:'#a5e8bc'}:{}}>
                    <LevelItemText>Avançado</LevelItemText>
                </LevelItem>
            </ListArea>

            <Label>Deseja limpar tudo?</Label>
            <ResetButton title="Resetar Tudo" onPress={resetAction} />
        </PageContainer>
    );
};

Page.navigationOptions = ({navigation}) => {
    return {
        title:'Configurações'
    };
}


const mapStateToProps = (state) => {
    return {
      name: state.userReducer.name,
      workoutDays:state.userReducer.workoutDays,
      level:state.userReducer.level
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        setName:(name)=> setName(name, dispatch),
        setWorkoutDays:(workoutDays)=> setWorkoutDays(workoutDays, dispatch),
        setLevel:(level)=> setLevel(level, dispatch)
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Page);