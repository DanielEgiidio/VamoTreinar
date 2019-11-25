import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Workout from '../components/Workout';
import { addWorkout, delWorkout } from '../actions/userActions';

const AddWorkoutButtonArea = styled.TouchableHighlight`
    width:30px;
    height:30px;
    justify-content:center;
    align-items:center;
`;
const AddWorkoutButtonImage = styled.Image`
    width:25px;
    height:25px;
`;

const AddWorkoutButton = (props) => {
    const btnAction = () => {
        props.navigation.navigate('EditWorkout');
    }
    return (
        <AddWorkoutButtonArea onPress={btnAction} underlayColor="transparent">
            <AddWorkoutButtonImage source={require('../assets/add.png')} />
        </AddWorkoutButtonArea>
    );
}

const PageContainer = styled.SafeAreaView`
    flex:1;
`;

const WorkoutList = styled.FlatList`
    flex:1;
    padding:20px;
`;

const Page = (props) => {

    const editWorkout = (workout) => {
        props.navigation.navigate('EditWorkout', {workout});
    }

    return (
        <PageContainer>
            <WorkoutList
                data={props.myWorkouts}
                renderItem={({item})=>
                    <Workout
                        data={item}
                        editAction={()=>editWorkout(item)}
                        delAction={()=>props.delWorkout(item)}
                    />
                }
                keyExtractor={item=>item.id}
            />
        </PageContainer>
    );
};

Page.navigationOptions = ({navigation}) => {
    return {
        title:'Meus Treinos',
        headerRight:<AddWorkoutButton navigation={navigation} />,
        headerRightContainerStyle:{
            marginRight:10
        }
    };
}


const mapStateToProps = (state) => {
    return {
      name: state.userReducer.name,
      myWorkouts:state.userReducer.myWorkouts
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        addWorkout:(workout)=>addWorkout(workout, dispatch),
        delWorkout:(workout)=>delWorkout(workout, dispatch)
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Page);