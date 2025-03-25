import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

type Mission = {
  id: number;
  title: string;
  type: "일일" | "주간" | "평일";
  status: "진행중" | "완료";
  stat: { type: string; value: number };
};

const missions: Mission[] = [
  { id: 1, title: "조깅 30분", type: "일일", status: "진행중", stat: { type: "💪 힘", value: 5 } },
  { id: 2, title: "책 10페이지 읽기", type: "일일", status: "완료", stat: { type: "🧠 지능", value: 3 } },
  { id: 3, title: "스트레칭 10분", type: "평일", status: "진행중", stat: { type: "🔥 의지력", value: 2 } },
];

export default function MainScreen() {
  const [filter, setFilter] = useState<"전체" | "진행중" | "완료">("전체");
  const router = useRouter();

  const filteredMissions = missions.filter(
    (mission) => filter === "전체" || mission.status === filter
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📜 오늘의 퀘스트</Text>

      {/* 필터 */}
      <View style={styles.filterContainer}>
        {["전체", "진행중", "완료"].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setFilter(type as any)}
            style={[
              styles.filterButton,
              filter === type && styles.filterButtonActive
            ]}
          >
            <Text style={[
              styles.filterText,
              filter === type && styles.filterTextActive
              ]}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 미션 리스트 */}
      <FlatList
        data={filteredMissions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.questCard,
              item.status === "완료" && styles.questCompleted
            ]}
            onPress={() => router.push({
              pathname: "/mission/[id]",
              params: { id: item.id }
            })}
          >
            <Text style={styles.questTitle}>{item.title}</Text>
            <Text style={styles.questType}>🗡 {item.type} 미션</Text>
            <View style={styles.statContainer}>
              <Text style={styles.statText}>{item.stat.type} +{item.stat.value}</Text>
              {item.status === "완료" ? (
                <Text style={styles.completedText}>✅ 완료</Text>
              ) : (
                <Text style={styles.progressText}>⏳ 진행 중</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: "row",
    // justifyContent: "space-around",
    flexWrap: 'nowrap',
    marginBottom: 16,
    gap:8,
  },
  filterButton: {
    flexGrow: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: '#FFD700',
    borderWidth: 1,
    borderRadius: 12
  },
  filterButtonActive: {
    backgroundColor: '#FFD700',
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  filterTextActive : {
    color: '#000'
  },
  questCard: {
    backgroundColor: '#2e2e2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  questCompleted: {
    opacity: 0.6,
    borderColor: '#aaa',
  },
  questTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  questType: {
    color: '#ccc',
    marginTop: 8,
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    alignItems: 'center',
  },
  statText: {
    color: '#00FF99',
    fontWeight: 'bold',
  },
  completedText: {
    color: '#aaa',
    fontWeight: 'bold',
  },
  progressText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
});
