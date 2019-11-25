import React, { useEffect } from 'react';
import { Text, Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { addWorkout, delWorkout } from '../actions/userActions';
import Workout from '../components/Workout';
import workoutJson from '../presetWorkouts.json';

const Container = styled.View`
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

const WorkoutList = styled.FlatList`
    width:100%;
`;

const NextButton = (props) => {
    let btnTitle = 'Ignorar';
    if(props.navigation.state.params && props.navigation.state.params.hasWorkout) {
        btnTitle = 'Concluir';
    }

    const nextAction = () => {
        props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'AppTab' })]
        }));
    }

    return (
        <Button title={btnTitle} onPress={nextAction} />
    );
}

const Page = (props) => {
    const addWorkout = (item) => {
        if(props.myWorkouts.findIndex(i=>i.id==item.id) < 0) {
            props.addWorkout(item);
        } else {
            props.delWorkout(item);
        }
    }

    useEffect(()=>{
        if(props.myWorkouts.length > 0) {
            props.navigation.setParams({hasWorkout:true});
        } else {
            props.navigation.setParams({hasWorkout:false});
        }
    }, [props.myWorkouts]);

    return (
        <Container>
            <HeaderText>Opções de treino pré-criados com base no seu nível.</HeaderText>
            <HeaderText>Você selecionou {props.myWorkouts.length} treinos</HeaderText>
            <WorkoutList
                data={workoutJson}
                renderItem={({item})=><Workout
                    data={item}
                    addAction={()=>addWorkout(item)}
                />}
                keyExtractor={item=>item.id}
            />
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
        level: state.userReducer.level,
        myWorkouts: state.userReducer.myWorkouts
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        addWorkout:(workout)=>addWorkout(workout, dispatch),
        delWorkout:(workout)=>delWorkout(workout, dispatch)
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Page);