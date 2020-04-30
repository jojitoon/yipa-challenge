import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import {
  Headline,
  Title,
  ActivityIndicator,
  Subheading,
} from "react-native-paper";

const query = gql`
  query OneData($tnx_id: ID!) {
    oneData(tnx_id: $tnx_id) {
      tnx_id
      user
      description
      date
    }
  }
`;
export default function ViewScreen({ route }) {
  const { id } = route.params;
  const { loading, data: result } = useQuery(query, {
    variables: { tnx_id: id },
  });
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Headline style={{ marginVertical: 10, alignSelf: "center" }}>
        Transaction #{id}
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
      {result && result.oneData ? (
        <View>
          <View style={styles.row}>
            <Title style={styles.text}>Description: </Title>
            <Subheading style={styles.text}>
              {result.oneData.description}
            </Subheading>
          </View>
          <View style={styles.row}>
            <Title style={styles.text}>User: </Title>
            <Subheading style={styles.text}>{result.oneData.user}</Subheading>
          </View>
          <View style={styles.row}>
            <Title style={styles.text}>Date: </Title>
            <Subheading style={styles.text}>
              {new Date(result.oneData.date).toDateString()}
            </Subheading>
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    padding: 15,
  },
  text: {
    textTransform: "capitalize",
    marginVertical: 10,
    textAlignVertical: "center",
  },
  row: { flexDirection: "row", alignItems: "center" },
});
