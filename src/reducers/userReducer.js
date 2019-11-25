const initialState = {
  name:'',
  workoutDays:[], // 1-7
  level:'', // beginner, intermediate, advanced
  lastWorkout:'', // hash
  myWorkouts:[],
  dailyProgress:['2019-10-02', '2019-10-03']
};

export default (state = initialState, action) => {
  let dailyProgress = [...state.dailyProgress];
  let myWorkouts = [...state.myWorkouts];

  switch (action.type) {
    case 'SET_NAME':
      return {...state, name:action.payload.name};
      break;
    case 'SET_WORKOUTDAYS':
      return {...state, workoutDays:action.payload.workoutDays};
      break;
    case 'SET_LEVEL':
      return {...state, level:action.payload.level};
      break;
    case 'SET_LASTWORKOUT':
      return {...state, lastWorkout:action.payload.lastWorkout};
      break;
    case 'ADD_WORKOUT':
      if(myWorkouts.findIndex(i=>i.id==action.payload.workout.id) < 0) {
        myWorkouts.push(action.payload.workout);
      }
      return {...state, myWorkouts};
      break;
    case 'UPDATE_WORKOUT':
        let index = myWorkouts.findIndex(i=>i.id==action.payload.workout.id);
        if(index > -1) {
          myWorkouts[index].name = action.payload.workout.name;
          myWorkouts[index].exercises = action.payload.workout.exercises;
        }
        return {...state, myWorkouts};
        break;
    case 'DEL_WORKOUT':
        myWorkouts = myWorkouts.filter(i=>i.id!=action.payload.workout.id);
        return {...state, myWorkouts};
        break;
    case 'ADD_PROGRESS':
      if(!dailyProgress.includes(action.payload.date)) {
        dailyProgress.push(action.payload.date);
      }
      return {...state, dailyProgress};
      break;
    case 'DEL_PROGRESS':
      dailyProgress = dailyProgress.filter(i=>i!=action.payload.date);
      return {...state, dailyProgress};
      break;
    case 'RESET':
      return initialState;
      break;
  }

  return state;
};