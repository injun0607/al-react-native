import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView,StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

type QuestStatus = 'registered' | 'accepted' | 'completed'

type Mission = {
  id: number;
  title: string;
  type: "일일" | "주간" | "평일";
  status: "진행중" | "완료";
  stat: { type: string; value: number };
};

const missions: Mission[] = [
  { id: 1, title: "조깅 30분", type: "일일", status: "진행중", stat: { type: "힘", value: 5 } },
  { id: 2, title: "책 10페이지 읽기", type: "일일", status: "완료", stat: { type: "지능", value: 3 } },
  { id: 3, title: "스트레칭 10분", type: "평일", status: "진행중", stat: { type: "의지력", value: 2 } },
];

export default function MainScreen() {
  const [filter, setFilter] = useState<"전체" | "진행중" | "완료">("전체");
  const router = useRouter();

  const filteredMissions = missions.filter(
    (mission) => filter === "전체" || mission.status === filter
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, padding: 16 }}>
        {/* 필터 버튼 */}
        <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 10 }}>
          {["전체", "진행중", "완료"].map((type) => (
            <TouchableOpacity key={type} onPress={() => setFilter(type as any)}>
              <Text style={{ fontSize: 16, fontWeight: filter === type ? "bold" : "normal" }}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 미션 리스트 */}
        <FlatList
          data={filteredMissions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                padding: 12,
                marginBottom: 8,
                backgroundColor: item.status === "완료" ? "#ddd" : "#fff",
                borderRadius: 8,
              }}
              onPress={() => router.push({
                pathname: "/mission/[id]",
                params: { id: item.id }
              })}
            >
              <Text style={{ fontSize: 18 }}>{item.title}</Text>
              <Text style={{ color: "gray" }}>{item.type} 미션</Text>
              <Text style={{ fontWeight: "bold" }}>
                {item.status === "완료" ? "✅ 완료됨" : "⏳ 진행 중"}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  }
})