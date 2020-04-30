import * as React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import ViewScreen from "./screens/ViewScreen";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider as PaperProvider } from "react-native-paper";
const client = new ApolloClient({
  uri: "https://yipah-jojitoon-api.herokuapp.com/graphql",
});
const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <PaperProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerTitle: "Yipah Challenge",
              }}
            />
            <Stack.Screen name="View" component={ViewScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </PaperProvider>
  );
}
// }
