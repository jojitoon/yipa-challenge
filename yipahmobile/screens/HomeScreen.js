import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import image from "../assets/images/icon.png";
import { Headline, Card, Title, ActivityIndicator } from "react-native-paper";
export const query = gql`
  {
    data {
      tnx_id
      user
      description
      date
    }
  }
`;
export default function HomeScreen({ navigation }) {
  const { loading, data: result } = useQuery(query);
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={image}
          style={{ marginVertical: 10, alignSelf: "center" }}
        />
        <Headline style={{ marginVertical: 10, alignSelf: "center" }}>
          All Transaction
        </Headline>
        {loading ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 50,
            }}
          >
            <ActivityIndicator animating={true} size="large" />
          </View>
        ) : null}
        {result && result.data.length ? (
          <FlatList
            data={result.data}
            renderItem={({ item }) => (
              <Card
                onPress={() => navigation.navigate("View", { id: item.tnx_id })}
              >
                <Card.Title
                  title={item.description}
                  titleStyle={{ textTransform: "capitalize" }}
                  subtitle={item.user}
                  right={() => (
                    <Text style={{ marginHorizontal: 10 }}>#{item.tnx_id}</Text>
                  )}
                />
              </Card>
            )}
            keyExtractor={(item, i) => `${i}`}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
