import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton';
import Modal from '../components/Modal';
import ExerciseItemEdit from '../components/ExerciseItemEdit';
import { addWorkout, updateWorkout } from '../actions/userActions';
import uuid from 'uuid/v4';

const SaveWorkoutButtonArea = styled.TouchableHighlight`
    width:30px;
    height:30px;
    justify-content:center;
    align-items:center;
`;
const SaveWorkoutButtonImage = styled.Image`
    width:25px;
    height:25px;
`;

const SaveWorkoutButton = (props) => {
    const btnAction = () => {
        if(props.navigation.state.params && props.navigation.state.params.canSave) {
            let workout = props.navigation.state.params.workout;

            if(workout.id != '') {
                props.navigation.state.params.updateWorkout(workout);
            } else {
                workout.id = uuid();
                props.navigation.state.params.addWorkout(workout);
            }

            props.navigation.goBack();
        } else {
            alert("Digite um nome e/ou adicione pelo menos 1 exercício");
        }
    }
    return (
        <SaveWorkoutButtonArea onPress={btnAction} underlayColor="transparent">
            <SaveWorkoutButtonImage source={require('../assets/check-black.png')} />
        </SaveWorkoutButtonArea>
    );
}

const PageContainer = styled.SafeAreaView`
    flex:1;
    margin:20px;
`;
const NameInput = styled.TextInput`
    border:1px solid #CCC;
    width:100%;
    height:50px;
    border-radius:10px;
    font-size:16px;
    padding:10px;
`;
const ExercisesArea = styled.View`
    flex:1;
    margin-top:20px;
    padding-top:20px;
    border-top-width:1px;
    border-top-color:#CCC;
`;
const AddExerciseText = styled.Text``;
const ExercisesList = styled.FlatList`
    flex:1;
    padding-top:20px;
`;

const ModalLabel = styled.Text`
    font-size:15px;
    font-weight:bold;
    margin-top:10px;
`;
const ModalInput = styled.TextInput`
    width:100%;
    font-size:14px;
    color:#333;
    height:40px;
    border-bottom-width:1px;
    border-bottom-color:#CCC;
    text-align:${props=>props.align?props.align:'left'}
`;
const ModalMuscles = styled.ScrollView`
    margin-top:10px;
`;
const ModalMuscle = styled.TouchableHighlight`
    width:50px;
    height:50px;
    background-color:#EEE;
    border-radius:10px;
    margin-right:10px;
    opacity:${props=>props.opacity};
    justify-content:center;
    align-items:center;
`;
const ModalMuscleImage = styled.Image`
    width:35px;
    height:35px;
`;
const ModalExtra = styled.View`
    width:100%;
    flex-direction:row;
    justify-content:space-between;
    margin-bottom:20px;
`;
const ModalExtraItem = styled.View`
    align-items:center;
`;

const Page = (props) => {
    let workout = (props.navigation.state.params && props.navigation.state.params.workout)?props.navigation.state.params.workout:false;

    const [id, setId] = useState(workout?workout.id:'');
    const [name, setName] = useState(workout?workout.name:'');
    const [exercises, setExercises] = useState(workout?workout.exercises:[]);
    const [modalVisible, setModalVisible] = useState(false);

    const [modalId, setModalId] = useState('');
    const [modalName, setModalName] = useState('');
    const [modalMuscle, setModalMuscle] = useState('');
    const [modalSets, setModalSets] = useState('');
    const [modalReps, setModalReps] = useState('');
    const [modalLoad, setModalLoad] = useState('');

    const modalSave = () => {
        let newExercises = [...exercises];

        if(modalName == '' || modalMuscle == '' || modalSets == '' || modalReps == '') {
            alert("Preencha todas as informações!");
            return;
        }

        if(modalId) {
            let index = newExercises.findIndex(i=>i.id==modalId);
            if(index > -1) {
                newExercises[index].name = modalName;
                newExercises[index].muscle = modalMuscle;
                newExercises[index].sets = modalSets;
                newExercises[index].reps = modalReps;
                newExercises[index].load = modalLoad;
            }
        } else {
            let ex = {
                id:uuid(),
                name:modalName,
                muscle:modalMuscle,
                sets:modalSets,
                reps:modalReps,
                load:modalLoad
            };
            newExercises.push(ex);
        }
        
        setExercises(newExercises);

        resetModal();
        setModalVisible(false);
    }

    const resetModal = () => {
        setModalId('');
        setModalName('');
        setModalMuscle('');
        setModalSets('');
        setModalReps('');
        setModalLoad('');
    }

    useEffect(()=>{
        if(name != '' && exercises.length > 0) {
            props.navigation.setParams({
                canSave:true,
                addWorkout:props.addWorkout,
                updateWorkout:props.updateWorkout,
                workout:{
                    id,
                    name,
                    exercises
                }
            });
        } else {
            props.navigation.setParams({canSave:false});
        }
    }, [name, exercises]);

    const addExercise = () => {
        resetModal();
        setModalVisible(true);
    }
    const editExercise = (exercise) => {
        setModalId(exercise.id);
        setModalName(exercise.name);
        setModalMuscle(exercise.muscle);
        setModalSets(exercise.sets);
        setModalReps(exercise.reps);
        setModalLoad(exercise.load);
        setModalVisible(true);
    }
    const delExercise = (exercise) => {
        setExercises(exercises => exercises.filter(i=>i.id!=exercise.id));
    }

    return (
        <PageContainer>
            <Modal visible={modalVisible} closeAction={()=>setModalVisible(false)}>
                <ModalLabel>Músculo de foco</ModalLabel>
                <ModalMuscles horizontal={true} showsHorizontalScrollIndicator={false}>
                    <ModalMuscle
                        opacity={modalMuscle=='abs'?1:0.2}
                        onPress={()=>setModalMuscle('abs')} underlayColor="transparent"
                    >
                        <ModalMuscleImage source={require('../assets/muscles/abs.png')} />
                    </ModalMuscle>
                    <ModalMuscle
                        opacity={modalMuscle=='back'?1:0.2}
                        onPress={()=>setModalMuscle('back')} underlayColor="transparent"
                    >
                        <ModalMuscleImage source={require('../assets/muscles/back.png')} />
                    </ModalMuscle>
                    <ModalMuscle
                        opacity={modalMuscle=='biceps'?1:0.2}
                        onPress={()=>setModalMuscle('biceps')} underlayColor="transparent"
                    >
                        <ModalMuscleImage source={require('../assets/muscles/biceps.png')} />
                    </ModalMuscle>
                    <ModalMuscle
                        opacity={modalMuscle=='chest'?1:0.2}
                        onPress={()=>setModalMuscle('chest')} underlayColor="transparent"
                    >
                        <ModalMuscleImage source={require('../assets/muscles/chest.png')} />
                    </ModalMuscle>
                    <ModalMuscle
                        opacity={modalMuscle=='gluteos'?1:0.2}
                        onPress={()=>setModalMuscle('gluteos')} underlayColor="transparent"
                    >
                        <ModalMuscleImage source={require('../assets/muscles/gluteos.png')} />
                    </ModalMuscle>
                    <ModalMuscle
                        opacity={modalMuscle=='legs'?1:0.2}
                        onPress={()=>setModalMuscle('legs')} underlayColor="transparent"
                    >
                        <ModalMuscleImage source={require('../assets/muscles/legs.png')} />
                    </ModalMuscle>
                    <ModalMuscle
                        opacity={modalMuscle=='shoulders'?1:0.2}
                        onPress={()=>setModalMuscle('shoulders')} underlayColor="transparent"
                    >
                        <ModalMuscleImage source={require('../assets/muscles/shoulders.png')} />
                    </ModalMuscle>
                    <ModalMuscle
                        opacity={modalMuscle=='triceps'?1:0.2}
                        onPress={()=>setModalMuscle('triceps')} underlayColor="transparent"
                    >
                        <ModalMuscleImage source={require('../assets/muscles/triceps.png')} />
                    </ModalMuscle>
                </ModalMuscles>
                <ModalLabel>Nome do exercício</ModalLabel>
                <ModalInput value={modalName} onChangeText={e=>setModalName(e)} />
                <ModalExtra>
                    <ModalExtraItem>
                        <ModalLabel>Séries</ModalLabel>
                        <ModalInput keyboardType="number-pad" align="center" value={modalSets} onChangeText={e=>setModalSets(e)} />
                    </ModalExtraItem>
                    <ModalExtraItem style={{width:20, justifyContent:'flex-end'}}>
                        <ModalLabel>x</ModalLabel>
                    </ModalExtraItem>
                    <ModalExtraItem>
                        <ModalLabel>Repetições</ModalLabel>
                        <ModalInput keyboardType="number-pad" align="center" value={modalReps} onChangeText={e=>setModalReps(e)} />
                    </ModalExtraItem>
                    <ModalExtraItem>
                        <ModalLabel>Carga</ModalLabel>
                        <ModalInput keyboardType="number-pad" align="center" value={modalLoad} onChangeText={e=>setModalLoad(e)} />
                    </ModalExtraItem>
                    <ModalExtraItem style={{width:20, justifyContent:'flex-end'}}>
                        <ModalLabel>kg</ModalLabel>
                    </ModalExtraItem>
                </ModalExtra>
                <DefaultButton bgcolor="#4AC34E" onPress={modalSave} underlayColor="#4AC34E">
                    <AddExerciseText>{modalId?'Salvar':'Adicionar'}</AddExerciseText>
                </DefaultButton>
            </Modal>
            <NameInput
                value={name}
                onChangeText={e=>setName(e)}
                placeholder="Digite o nome do treino"
            />
            <ExercisesArea>
                <DefaultButton bgcolor="#4AC34E" onPress={addExercise} underlayColor="transparent">
                    <AddExerciseText>Adicionar Exercício</AddExerciseText>
                </DefaultButton>
                <ExercisesList
                    data={exercises}
                    renderItem={({item})=>
                        <ExerciseItemEdit
                            data={item}
                            editAction={()=>editExercise(item)}
                            delAction={()=>delExercise(item)}
                        />
                    }
                    keyExtractor={item=>item.name}
                />
            </ExercisesArea>
        </PageContainer>
    );
};

Page.navigationOptions = ({navigation, screenProps}) => {
    let isEdit = (navigation.state.params && navigation.state.params.workout)?true:false;

    return {
        title:isEdit?'Editar Treino':'Adicionar Treino',
        headerRight:<SaveWorkoutButton navigation={navigation} screenProps={screenProps} />,
        headerRightContainerStyle:{
            marginRight:10
        }
    };
}


const mapStateToProps = (state) => {
    return {
      name: state.userReducer.name,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        addWorkout:(workout)=>addWorkout(workout, dispatch),
        updateWorkout:(workout)=>updateWorkout(workout, dispatch)
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Page);