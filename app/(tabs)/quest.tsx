import { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    Button, 
    FlatList, 
    StyleSheet, 
    Alert,
    ListRenderItem,
    SafeAreaView
  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type QuestStatus = 'registered' | 'accepted' | 'completed'

interface Quest {
    id: string;
    title: string;
    status: QuestStatus;
    reward: number;
  }

export default function QuestScreen(){
    const [questText, setQuestText] = useState<string>('');
    const [quests, setQuests] = useState<Quest[]>([]);
    // 상태: 'registered' (등록됨), 'accepted' (수락됨), 'completed' (완료됨)
  
    // Quest 등록 함수: 입력한 텍스트로 새 Quest를 생성
    const addQuest = () => {
      if (questText.trim() === '') return;
      const newQuest: Quest = {
        id: Date.now().toString(),
        title: questText,
        status: 'registered' as QuestStatus,
        reward: Math.floor(Math.random() * 10) + 1, // 1~10 사이 랜덤 stat 보상
      };
      setQuests([...quests, newQuest]);
      setQuestText('');
    };
  
    // Quest 수락 함수: 해당 Quest의 상태를 'accepted'로 변경
    const acceptQuest = (id: string) => {
      setQuests(quests.map(quest => 
        quest.id === id ? { ...quest, status: 'accepted' } : quest
      ));
    };
  
    // Quest 완료 함수: 상태를 'completed'로 변경하고 보상 알림을 띄움
    const completeQuest = (id: string) => {
      const quest = quests.find(q => q.id === id);
      if (quest) {
        Alert.alert("퀘스트 완료!", `보상으로 ${quest.reward} stat 포인트 획득!`);
        setQuests(quests.map(q => 
          q.id === id ? { ...q, status: 'completed' } : q
        ));
      }
    };
  
    // 각 Quest 항목 렌더링
    const renderQuestItem: ListRenderItem<Quest> = ({ item }) => {
      return (
        <View style={styles.questItem}>
          <Text style={styles.questTitle}>{item.title}</Text>
          <Text style={styles.questStatus}>상태: {item.status}</Text>
          {item.status === 'registered' && (
            <Button title="수락" onPress={() => acceptQuest(item.id)} />
          )}
          {item.status === 'accepted' && (
            <Button title="완료" onPress={() => completeQuest(item.id)} />
          )}
          {item.status === 'completed' && (
            <Text style={styles.completedText}>퀘스트 완료됨!</Text>
          )}
        </View>
      );
    };
  
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contents}>
                <Text style={styles.title}>판타지 Quest 어플</Text>
                <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Quest 입력..."
                    placeholderTextColor="#95a5a6"
                    value={questText}
                    onChangeText={setQuestText}
                />
                <Button title="등록" onPress={addQuest} />
                </View>
                <FlatList
                data={quests}
                keyExtractor={(item) => item.id}
                renderItem={renderQuestItem}
                contentContainerStyle={styles.questList}
                />
            </View>
        </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2c3e50', // 어둡고 판타지 느낌 배경      
    },
    contents:{
        flex: 1,
        padding:20
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#f1c40f', // 황금빛 느낌
      marginBottom: 20,
      textAlign: 'center',
    },
    inputContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    input: {
      flex: 1,
      borderColor: '#f1c40f',
      borderWidth: 1,
      borderRadius: 5,
      marginRight: 10,
      paddingHorizontal: 10,
      color: '#fff',
    },
    questList: {
      paddingBottom: 100,
    },
    questItem: {
      backgroundColor: '#34495e',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
    },
    questTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#ecf0f1',
    },
    questStatus: {
      marginVertical: 5,
      color: '#bdc3c7',
    },
    completedText: {
      fontSize: 16,
      color: '#27ae60',
      fontWeight: 'bold',
    },
  });
  