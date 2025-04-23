import { useState } from 'react';
import { Button, StyleSheet, View, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);


  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    setCourseGoals((currentCourseGoals) => [...currentCourseGoals, { text: enteredGoalText, key: Math.random().toString() }]);
    setEnteredGoalText('');
    setModalOpen(false);
  }

  function deleteGoalHandler(key) {
    setCourseGoals((currentCourseGoals) => currentCourseGoals.filter((courseGoal) => courseGoal.key !== key))
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button
          title='Add New Goal'
          color='#a065ec'
          onPress={() => setModalOpen(true)}
        />
        <GoalInput
          value={enteredGoalText}
          onChangeText={goalInputHandler}
          onPress={addGoalHandler}
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
        />
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
        </View>
      </View>
    </>
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
