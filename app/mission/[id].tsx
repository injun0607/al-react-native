import { View, Text, Button, SafeAreaView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const missions = [
  { id: 1, title: "조깅 30분", type: "일일", status: "진행중", stat: { type: "힘", value: 5 } },
  { id: 2, title: "책 10페이지 읽기", type: "일일", status: "완료", stat: { type: "지능", value: 3 } },
  { id: 3, title: "스트레칭 10분", type: "평일", status: "진행중", stat: { type: "의지력", value: 2 } },
];

export default function MissionDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  
  const mission = missions.find((m) => m.id.toString() === params.id);
  if (!mission) return <Text>미션을 찾을 수 없습니다.</Text>;

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>{mission.title}</Text>
        <Text style={{ fontSize: 18, color: "gray" }}>{mission.type} 미션</Text>
        <Text style={{ marginTop: 10, fontSize: 16 }}>
            완료하면 **{mission.stat.type} +{mission.stat.value}** 증가!
        </Text>

        <Button title="완료하기" onPress={() => alert("미션 완료!")} />
        <Button title="뒤로 가기" onPress={() => router.back()} />
        </View>
    </SafeAreaView>
  );
}