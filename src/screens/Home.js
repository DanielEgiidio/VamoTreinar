import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import MonthScroll from '../components/MonthScroll';
import DaysScroll from '../components/DaysScroll';
import DayStatus from '../components/DayStatus';
import { addProgress, delProgress } from '../actions/userActions';

const ConfigButtonArea = styled.TouchableHighlight`
    width:30px;
    height:30px;
    justify-content:center;
    align-items:center;
`;
const ConfigButtonImage = styled.Image`
    width:25px;
    height:25px;
`;

const ConfigButton = (props) => {
    const btnAction = () => {
        props.navigation.navigate('HomeConfig');
    }
    return (
        <ConfigButtonArea onPress={btnAction} underlayColor="transparent">
            <ConfigButtonImage source={require('../assets/config.png')} />
        </ConfigButtonArea>
    );
}

const PageContainer = styled.SafeAreaView`
    align-items:center;
`;

const Legend = styled.View`
    width:90%;
    align-items:flex-start;
    margin-top:30px;
`;
const LegendItem = styled.View`
    flex-direction:row;
    align-items:center;
    margin-top:2px;
`;
const LegendBox = styled.View`
    width:15px;
    height:15px;
    background-color:#000;
    margin-right:5px;
`;
const LegendText = styled.Text`
    color:#555;
`;

const Page = (props) => {
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentDay = today.getDate();
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedDay, setSelectedDay] = useState(currentDay);

    return (
        <PageContainer>
            <MonthScroll
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
            />
            <DaysScroll
                workoutDays={props.workoutDays}
                dailyProgress={props.dailyProgress}
                selectedMonth={selectedMonth}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
            />
            <DayStatus
                workoutDays={props.workoutDays}
                dailyProgress={props.dailyProgress}
                selectedMonth={selectedMonth}
                selectedDay={selectedDay}
                addProgress={props.addProgress}
                delProgress={props.delProgress}
                goToWorkout={()=>props.navigation.navigate('WorkoutStack')}
            />
            <Legend>
                <LegendText>Legenda:</LegendText>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#B5EEFF'}}></LegendBox>
                    <LegendText>Hoje</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#B5FFB8'}}></LegendBox>
                    <LegendText>Treino feito</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#FFB5B5'}}></LegendBox>
                    <LegendText>Treino perdido</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#F4F4F4', opacity:.2}}></LegendBox>
                    <LegendText>Dia de descanso</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#F4F4F4'}}></LegendBox>
                    <LegendText>Dia futuro</LegendText>
                </LegendItem>
            </Legend>
        </PageContainer>
    );
};



Page.navigationOptions = ({navigation}) => {
    return {
        title:'Seu progresso diário',
        headerRight:<ConfigButton navigation={navigation} />,
        headerRightContainerStyle:{
            marginRight:10
        }
    };
}


const mapStateToProps = (state) => {
    return {
        name:state.userReducer.name,
        dailyProgress:state.userReducer.dailyProgress,
        workoutDays:state.userReducer.workoutDays
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        addProgress:(date)=>addProgress(date, dispatch),
        delProgress:(date)=>delProgress(date, dispatch)
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Page);