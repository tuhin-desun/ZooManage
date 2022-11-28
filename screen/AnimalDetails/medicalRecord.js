import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../config";
import { ListEmpty, Loader } from "../../component/";
import { getAnimalDiagnosis } from "../../services/APIServices";
import { getFormattedDate, convertDate } from "../../utils/Util";
import AppContext from "../../context/AppContext";
import globalStyles from "../../config/Styles";

const tabHeight = 50;

export default class MedicalRecord extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      activeTabKey: "animal",
      id:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.id
          : 0,
      enclosureID:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.enclosureID
          : undefined,
    };
  }

  componentDidMount = () => {
    this.loadAnimalDiagnosis();
  };

  loadAnimalDiagnosis = () => {
    let ref = this.state.id;
    let ref_id = this.state.activeTabKey;

    if (this.state.activeTabKey != "animal") {
      ref = this.state.enclosureID;
      ref_id = this.state.activeTabKey;
    }
    getAnimalDiagnosis(ref, ref_id)
      .then((data) => {
        console.log(data);
        this.setState({ isLoading: false });
        this.context.setAnimalDiagnosis(data);
      })
      .catch((error) => console.log(error));
  };

  handelRefresh = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.loadAnimalDiagnosis();
      }
    );
  };

  setActiveTab = (key) =>
    this.setState(
      {
        activeTabKey: key,
      },
      () => this.loadAnimalDiagnosis()
    );

  gotoAddMedicalRecord = () =>
    this.props.navigation.navigate("MedicalRecordEntry");

  gotoEditMedicalRecord = (id) => {
    this.props.navigation.navigate("MedicalRecordEntry", {
      id: typeof id !== "undefined" ? id : 0,
    });
  };

  renderItem = ({ item }) => (
    <TouchableWithoutFeedback
    // onPress={this.gotoEditMedicalRecord.bind(this, item.id)}
    >
      <View style={globalStyles.CardBox}>
        <View style={globalStyles.cardList}>
          <Text style={[globalStyles.labelName, globalStyles.pd0]}>
            Diagnosis :{" "}
            <Text style={[globalStyles.textfield, globalStyles.width60]}>
              {item?.diagnosis_name}
            </Text>
          </Text>
          <Text style={[globalStyles.labelName, globalStyles.pd0]}>
            Diagnosed By :{" "}
            <Text style={[globalStyles.textfield, globalStyles.width60]}>
              {item?.diagnosed_by_name}
            </Text>
          </Text>
          <Text style={[globalStyles.labelName, globalStyles.pd0]}>
            Drug given :{" "}
            <Text style={[globalStyles.textfield, globalStyles.width60]}>
              {item?.drug_name}
            </Text>
          </Text>
          <Text style={[globalStyles.labelName, globalStyles.pd0]}>
            Dosage given :{" "}
            <Text style={[globalStyles.textfield, globalStyles.width60]}>
              {item?.dosage}
            </Text>
          </Text>
          <Text style={[globalStyles.labelName, globalStyles.pd0]}>
            Date :{" "}
            <Text style={[globalStyles.textfield, globalStyles.width60]}>
              {getFormattedDate(convertDate(item?.date), "DD/MM/YYYY")}
            </Text>
          </Text>
          <Text style={[globalStyles.labelName, globalStyles.pd0]}>
            Next Treatment Date :{" "}
            <Text style={[globalStyles.textfield, globalStyles.width60]}>
              {getFormattedDate(
                convertDate(item?.next_treatment_date),
                "DD/MM/YYYY"
              )}
            </Text>
          </Text>
          <Text style={[globalStyles.labelName, globalStyles.pd0]}>
            Status :{" "}
            <Text style={[globalStyles.textfield, globalStyles.width60]}>
              {item?.status == "P"
                ? "Pending"
                : item?.status == "O"
                ? "Ongoing"
                : "Closed"}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  render = () => (
    <View style={globalStyles.container}>
      {this.state.isLoading ? (
        <Loader />
      ) : (
        <>
          {/* <View style={globalStyles.tabContainer}>
						<TouchableOpacity
							onPress={this.setActiveTab.bind(this, "animal")}
							style={[
								globalStyles.tab,
								this.state.activeTabKey === "animal" ? globalStyles.activeTab : null,
							]}
						>
							<Text
								style={
									this.state.activeTabKey === "animal"
										? globalStyles.activeText
										: globalStyles.inActiveText
								}
							>
								Individual
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={this.setActiveTab.bind(this, "enclosure")}
							style={[
								globalStyles.tab,
								this.state.activeTabKey === "enclosure" ? globalStyles.activeTab : null,
							]}
						>
							<Text
								style={
									this.state.activeTabKey === "enclosure"
										? globalStyles.activeText
										: globalStyles.inActiveText
								}
							>
								Enclosure
							</Text>
						</TouchableOpacity>

					</View> */}
          <FlatList
            ListEmptyComponent={() => <ListEmpty />}
            data={this.context.animalDiagnosis}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={this.renderItem}
            initialNumToRender={this.context.animalDiagnosis.length}
            refreshing={this.state.isLoading}
            onRefresh={this.handelRefresh}
            contentContainerStyle={
              this.context.animalDiagnosis.length === 0
                ? globalStyles.container
                : null
            }
          />
        </>
      )}
      {/* <TouchableOpacity
				style={globalStyles.button}
				onPress={this.gotoAddMedicalRecord}
			>
				<Ionicons name="add" style={globalStyles.plusIcon} />
			</TouchableOpacity> */}
    </View>
  );
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		padding: 8,
// 	},
// 	cardList: {
// 	},
// 	CardBox: {
// 		flexDirection: "row",
// 		padding: 5,
// 		borderRadius: 3,
// 		borderColor: "#ddd",
// 		borderWidth: 1,
// 		backgroundColor: "#fff",
// 		justifyContent: "space-between",
// 		marginBottom: 5,
// 		marginTop: 5,
// 		shadowColor: "#999",
// 		shadowOffset: {
// 			width: 0,
// 			height: 1,
// 		},
// 		shadowOpacity: 0.22,
// 		shadowRadius: 2.22,
// 		elevation: 3,
// 	},
// 	labelName: {
// 		fontSize: 12,
// 		paddingLeft: 4,
// 		color: Colors.textColor,
// 		textAlign: "left",
// 		fontWeight: "bold",
// 		flex: 1,
// 		width: "100%",
// 	},
// 	mc: {
// 		color: Colors.textColor,
// 		opacity: 0.8,
// 		marginLeft: 5,
// 		fontSize: 12,
// 		fontWeight: "500",
// 	},
// 	button: {
// 		alignItems: "center",
// 		backgroundColor: Colors.primary,
// 		width: 50,
// 		height: 50,
// 		shadowColor: "#000",
// 		shadowOffset: {
// 			width: 0,
// 			height: 2,
// 		},
// 		shadowOpacity: 0.23,
// 		shadowRadius: 2.62,
// 		elevation: 4,
// 		borderRadius: 50 / 2,
// 		position: "absolute",
// 		bottom: 20,
// 		right: 20,
// 	},
// 	plusIcon: {
// 		fontSize: 24,
// 		color: Colors.white,
// 		position: "absolute",
// 		bottom: 12.5,
// 	},
// 	tabContainer: {
// 		width: "100%",
// 		height: tabHeight,
// 		flexDirection: "row",
// 		borderBottomWidth: 1,
// 		borderBottomColor: "#d1d1d1",
// 		borderTopWidth: 1,
// 		borderTopColor: Colors.primary,
// 		elevation: 1,
// 	},
// 	tab: {
// 		flex: 1,
// 		alignItems: "center",
// 		justifyContent: "center",
// 		height: tabHeight,
// 	},
// 	activeTab: {
// 		height: tabHeight - 1,
// 		borderBottomWidth: 2,
// 		borderBottomColor: Colors.primary,
// 	},
// 	activeText: {
// 		fontSize: 14,
// 		fontWeight: "bold",
// 		color: Colors.primary,
// 	},
// 	inActiveText: {
// 		fontSize: 14,
// 		color: Colors.textColor,
// 		opacity: 0.8,
// 	},
// });
