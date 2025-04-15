import { useState } from 'react';
import { Button, StyleSheet, View, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);


  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    setCourseGoals((currentCourseGoals) => [...currentCourseGoals, { text: enteredGoalText, key: Math.random().toString() }]);
    setEnteredGoalText('');
  }

  function deleteGoalHandler(key) {
    setCourseGoals((currentCourseGoals) => currentCourseGoals.filter((courseGoal) => courseGoal.key !== key))
  }

  return (
    <View style={styles.appContainer}>
      <GoalInput value={enteredGoalText} onChangeText={goalInputHandler} onPress={addGoalHandler} />
      <View style={styles.goalsContainer}>
        <FlatList data={courseGoals} renderItem={(itemData) => {
          return (
            <GoalItem
              text={itemData.item.text}
              id={itemData.item.key}
              onDeleteItem={deleteGoalHandler}
            />
          )
        }}
          keyExtractor={(item, index) => item.key}
          alwaysBounceVertical={false}
        />
        {/* <ScrollView>
          {courseGoals.map((goal, index) => (
            <View style={styles.goalItem} key={`${goal}-${index}`}>
              <Text style={styles.goalText} >
                {goal}
              </Text>
            </View>
          ))}
        </ScrollView> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },

});
