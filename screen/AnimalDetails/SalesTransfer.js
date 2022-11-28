import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DatePicker, OverlayLoader } from "../../component";
import Colors from "../../config/colors";
import AppContext from "../../context/AppContext";
import { AntDesign } from "@expo/vector-icons";
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import globalStyles from "../../config/Styles";

export default class SalesTransfer extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      date: new Date(),
      transferTo: "",
      destinationValidationFailed: false,
      showLoader: false,
    };
    this.scrollViewRef = React.createRef();
  }

  componentDidMount = () => {
    let animalID = this.context.selectedAnimalID;
  };

  // onChangeDate = (event, selectedDate) => {
  // 	const currentDate = selectedDate || this.state.date;
  // 	this.setState({
  // 		show: false,
  // 		date: currentDate,
  // 	});
  // };

  showDatePicker = (type) => {
    this.setState({ show: true, type: type });
  };

  handleConfirm = (selectDate) => {
    const currentDate = selectDate || this.state.date;
    this.setState({
      date: currentDate,
    });
    this.hideDatePicker();
  };

  hideDatePicker = () => {
    this.setState({ show: false });
  };

  scrollViewScrollTop = () =>
    this.scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });

  saveData = () => {
    let { transferTo } = this.state;

    this.setState(
      {
        destinationValidationFailed: false,
      },
      () => {
        if (transferTo.trim().length === 0) {
          this.setState({ destinationValidationFailed: true });
          this.scrollViewScrollTop();
        } else {
          // this.setState({ showLoader: true });
          alert("OK");
        }
      }
    );
  };

  render = () => (
    <>
      <ScrollView ref={this.scrollViewRef} showsVerticalScrollIndicator={false}>
        <View style={globalStyles.container}>
          <View style={globalStyles.formBorder}>
            <View
              style={[
                globalStyles.fieldBox,
                this.state.destinationValidationFailed
                  ? globalStyles.errorFieldBox
                  : null,
              ]}
            >
              <Text style={globalStyles.labelName}>Sales/Transfer To : </Text>
              <TextInput
                value={this.state.transferTo}
                onChangeText={(transferTo) => this.setState({ transferTo })}
                style={globalStyles.textfield}
                autoCompleteType="off"
                autoCapitalize="words"
              />
            </View>
            <View style={[globalStyles.fieldBox, { borderBottomWidth: 0 }]}>
              <Text style={globalStyles.labelName}>Date: </Text>
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  globalStyles.flexDirectionRow,
                  globalStyles.alignItemsCenter,
                  globalStyles.width50,
                ]}
                onPress={() => {
                  this.showDatePicker("date");
                }}
              >
                <Text style={globalStyles.dateField}>
                  {this.state.date.toDateString()}
                </Text>
                <AntDesign name="calendar" color={Colors.primary} size={20} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={globalStyles.button} onPress={this.saveData}>
            <Text style={globalStyles.textWhite}>Save Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <OverlayLoader visible={this.state.showLoader} />
      <DateTimePickerModal
        mode={"date"}
        display={Platform.OS == "ios" ? "inline" : "default"}
        isVisible={this.state.show}
        onConfirm={this.handleConfirm}
        onCancel={this.hideDatePicker}
      />
    </>
  );
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		padding: 8,
// 	},
// 	fieldBox: {
// 		alignItems: "center",
// 		width: "100%",
// 		overflow: "hidden",
// 		flexDirection: "row",
// 		padding: 5,
// 		borderRadius: 3,
// 		borderColor: "#ddd",
// 		borderBottomWidth: 1,
// 		backgroundColor: "#fff",
// 		height: "auto",
// 		justifyContent: "space-between",
// 	},
// 	textfield: {
// 		backgroundColor: "#fff",
// 		height: "auto",
// 		width:'50%',
// 		fontSize: Colors.textSize,
// 		color: Colors.textColor,
// 		textAlign: "left",
// 		padding: 5,
// 	},
// 	labelName: {
// 		color: Colors.labelColor,
// 		// lineHeight: 40,
// 		fontSize: Colors.lableSize,
// 		paddingLeft: 4,
// 		height: "auto",
// 		paddingVertical: 10,
// 	},
// 	dateField: {
// 		backgroundColor: "#fff",
// 		height: "auto",
// 		fontSize: Colors.textSize,
// 		color: Colors.textColor,
// 		textAlign: "left",
// 		padding: 5,
// 	  },

// 	button: {
// 		alignItems: "center",
// 		backgroundColor: Colors.primary,
// 		padding: 10,
// 		// shadowColor: "#000",
// 		// shadowOffset: {
// 		// 	width: 0,
// 		// 	height: 2,
// 		// },
// 		// shadowOpacity: 0.23,
// 		// shadowRadius: 2.62,
// 		// elevation: 4,
// 		borderRadius: 20,
// 		color: "#fff",
// 		marginTop: 10,
// 	},
// 	textWhite: {
// 		color: "#fff",
// 		fontWeight: "bold",
// 		fontSize: Colors.lableSize,
// 	},
// 	item: {
// 		height: 35,
// 		backgroundColor: "#00b386",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// 	itemtitle: {
// 		color: "#fff",
// 		textAlign: "center",
// 		fontSize: Colors.textSize,
// 	},
// 	errorFieldBox: {
// 		borderWidth: 1,
// 		borderColor: Colors.tomato,
// 	},
// });
