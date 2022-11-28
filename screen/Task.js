import React from 'react';
import { StyleSheet, Text,View, TouchableOpacity} from 'react-native';
import { Container } from "native-base";
import { Header } from "../component";
import { Ionicons } from "@expo/vector-icons";

export default class Task extends React.Component {

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };

  render = () => (
    <Container>
      <Header
        leftIconName={"menu"}
        rightIconName={"add"}
        title={"Task"}
        leftIconShow={true}
        rightIconShow={false}
        leftButtonFunc={this.toggleDrawer}
      />

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => this.props.navigation.navigate('NutritionalValues')}
        >
          <View style={{flex: 1}}>
            <Text style={styles.name}>Nutritional Values</Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons
              name="chevron-forward"
              style={styles.iconStyle}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => this.props.navigation.navigate('Vitamin')}
        >
          <View style={{flex: 1}}>
            <Text style={styles.name}>Vitamin</Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons
              name="chevron-forward"
              style={styles.iconStyle}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => this.props.navigation.navigate('Minerals')}
        >
          <View style={{flex: 1}}>
            <Text style={styles.name}>Minerals</Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons
              name="chevron-forward"
              style={styles.iconStyle}
            />
          </View>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 8
  },
  row: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    alignItems: "center"
  },
  name: {
    fontSize: 18,
    color: "#555",
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-end"
  },
  iconStyle: {
    fontSize: 18,
    color: '#cecece'
  }
});
