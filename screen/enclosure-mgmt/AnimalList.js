import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ActivityIndicator,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { Container } from "native-base";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import Base64 from "../../config/Base64";
import Colors from "../../config/colors";
import { Header, Loader, DownloadFile, ListEmpty } from "../../component";
import { getSectionAnimals, exportAnimals } from "../../services/APIServices";
import AppContext from "../../context/AppContext";
import globalStyles from "../../config/Styles";
import styles from "./Styles";

export default class AnimalList extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      animals: [],
      commonName:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.commonName
          : undefined,
      animalType:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.animalType
          : undefined,
      enclosureID:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params?.enclosure_id
          : undefined,
      identificationType:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.identificationType
          : undefined,
      gender:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.gender
          : undefined,
      sectionID:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.sectionID
          : undefined,
      selectedIDs: [],
      processingText: "Processing...",
      isModalOpen: false,
      isFileSaved: false,
      isSearchModalOpen: false,
      searchValue: "",
      searchData: [],
      downloadUrl: "",
    };

    this.searchInput = React.createRef();
  }

  componentDidMount() {
    this.loadAnimals();
  }

  onScreenFocus = () => {
    this.setState(
      {
        isLoading: true,
        animals: [],
      },
      () => {
        this.loadAnimals();
      }
    );
  };

  handelRefresh = () => {
    this.setState(
      {
        animals: [],
        isLoading: true,
      },
      () => {
        this.loadAnimals();
      }
    );
  };

  loadAnimals = () => {
    const {
      commonName,
      animalType,
      enclosureID,
      identificationType,
      gender,
      sectionID,
    } = this.state;
    let params = { common_name: Base64.encode(commonName) };

    if (typeof animalType !== "undefined") {
      params.type = animalType;
    }
    if (typeof enclosureID !== "undefined") {
      params.enclosure_id = enclosureID;
    }
    if (typeof identificationType !== "undefined") {
      params.identification_type = identificationType;
    }

    if (typeof gender !== "undefined") {
      params.gender = gender;
    }

    if (typeof sectionID !== "undefined") {
      params.sectionID = sectionID;
    }

    getSectionAnimals(params)
      .then((data) => {
        this.setState({
          animals: data,
          isLoading: false,
        });
      })
      .catch((error) => console.log(error));
  };

  gotoBack = () => this.props.navigation.goBack();

  gotoEditAnimal = (item) => {
    this.context.setAnimalID(item.animal_id);

    this.props.navigation.navigate("Animals", {
      id: item.id,
      classID: item.animal_group,
      categoryID: item.category,
      subCategoryID: item.sub_category !== null ? item.sub_category : undefined,
      animalType: item.type,
      commonName: item.english_name,
      scientificName: item.full_name,
      databaseName: item.database !== null ? item.database : undefined,
      taxonid: item.taxonid !== null ? item.taxonid : "",
    });
  };

  toggleItemSelect = (id) => {
    id = parseInt(id);
    let arr = this.state.selectedIDs;
    let index = arr.findIndex((element) => element === id);

    if (index > -1) {
      arr = arr.filter((element) => element !== id);
    } else {
      arr.push(id);
    }

    this.setState({ selectedIDs: arr });
  };

  exportList = () => {
    let { selectedIDs } = this.state;
    let ids = selectedIDs.join(",");
    exportAnimals(ids)
      .then((response) => {
        let data = response.data;
        this.setState({
          downloadUrl: data.fileuri,
          isModalOpen: true,
        });
      })
      .catch((error) => console.log(error));
  };

  downloadFile = (fileName, fileUri) => {
    let documentDirectory = FileSystem.documentDirectory + fileName;

    FileSystem.downloadAsync(fileUri, documentDirectory)
      .then(({ uri }) => {
        this.saveFile(uri);
      })
      .catch((error) => console.log(error));
  };

  saveFile = async (fileUri) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
      this.setState({ isFileSaved: true });
    } else {
      alert("Please grant the permission");
    }
  };

  closeModal = () =>
    this.setState({
      isModalOpen: false,
      isFileSaved: false,
      processingText: "Processing...",
      selectedIDs: [],
    });

  openSearchModal = () => {
    this.setState({
      isSearchModalOpen: true,
      searchValue: "",
      searchData: [],
    });

    setTimeout(() => {
      this.searchInput.current.focus();
    }, 500);
  };

  closeSearchModal = () => {
    this.setState({
      isSearchModalOpen: false,
      searchValue: "",
      searchData: [],
    });
  };

  searchAnimal = () => {
    let { searchValue, animals } = this.state;

    let data = animals.filter((element) => {
      let animalID = element.animal_id.toLowerCase();
      let index = animalID.indexOf(searchValue.toLowerCase());
      return index > -1;
    });

    this.setState({ searchData: data });
  };

  onSearchItemSelect = (item) => {
    this.setState(
      {
        isSearchModalOpen: false,
        searchValue: "",
        searchData: [],
      },
      () => {
        this.gotoEditAnimal(item);
      }
    );
  };

  renderSearchItem = ({ item }) => {
    let identificationValues = [];
    if (item.dna !== null) {
      identificationValues.push(item.dna);
    }
    if (item.microchip !== null) {
      identificationValues.push(item.microchip);
    }
    if (item.ring_number !== null) {
      identificationValues.push(item.ring_number);
    }

    return (
      <TouchableHighlight
        underlayColor={"#eee"}
        // onPress={this.onSearchItemSelect.bind(this, item)}
      >
        <View style={globalStyles.fieldBox}>
          <View style={[globalStyles.checkboxImgContainer, styles.width15]}>
            <Image
              style={globalStyles.image_h55w55}
              source={{ uri: item.image }}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={[globalStyles.labelName, globalStyles.pd0]}>
              {item.animal_id}
            </Text>
            {identificationValues.length > 0 ? (
              <Text style={globalStyles.inputText}>
                {identificationValues.join("-")}
              </Text>
            ) : null}
          </View>
          <View activeOpacity={1} style={globalStyles.iconContainer}>
            {/* <Ionicons name="chevron-forward" style={globalStyles.rightAngelIcon} /> */}
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  renderAnimalItem = ({ item }) => {
    let { selectedIDs } = this.state;
    let isChecked = selectedIDs.includes(parseInt(item.id));

    let identificationValues = [];
    let dnaIdentificationValues = [];
    let ringNumberIdentificationValues = [];
    let microchipIdentificationValues = [];
    if (item.dna !== null) {
      identificationValues.push(item.dna);
      dnaIdentificationValues.push(item.dna);
    }
    if (item.microchip !== null) {
      identificationValues.push(item.microchip);
      microchipIdentificationValues.push(item.microchip);
    }
    if (item.ring_number !== null) {
      identificationValues.push(item.ring_number);
      ringNumberIdentificationValues.push(item.ring_number);
    }

    return (
      <View style={globalStyles.fieldBox}>
        <View style={globalStyles.checkboxImgContainer}>
          {/* <TouchableOpacity
						activeOpacity={1}
						style={globalStyles.p3}
						onPress={this.toggleItemSelect.bind(this, item.id)}
					>
						<MaterialCommunityIcons
							name={isChecked ? "checkbox-marked" : "checkbox-blank-outline"}
							color={Colors.primary}
							size={22}
						/>
					</TouchableOpacity> */}
          <Image
            style={globalStyles.image_h55w55}
            source={{ uri: item.image }}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[globalStyles.width75, globalStyles.flexDirectionRow]}
          // onPress={this.gotoEditAnimal.bind(this, item)}
        >
          <View>
            <View style={globalStyles.flexDirectionRow}>
              <Text inputText>{`${item.animal_id}`}</Text>
              <Text style={[globalStyles.labelName, globalStyles.pd0]}>{` ${
                item.gender ? "- " + item.gender : ""
              }`}</Text>
              <Text style={[globalStyles.labelName, globalStyles.pd0]}>{`  ${
                item.age && item.age <= 1 ? "(infant)" : ""
              }`}</Text>
            </View>

            {dnaIdentificationValues.length > 0 ? (
              <Text style={[globalStyles.labelName, globalStyles.pd0]}>
                {`DNA: ${dnaIdentificationValues}`}
              </Text>
            ) : null}

            {microchipIdentificationValues.length > 0 ? (
              <Text style={[globalStyles.labelName, globalStyles.pd0]}>
                {`Micro Chip: ${microchipIdentificationValues}`}
              </Text>
            ) : null}

            {ringNumberIdentificationValues.length > 0 ? (
              <Text style={[globalStyles.labelName, globalStyles.pd0]}>
                {`Ring Number: ${ringNumberIdentificationValues}`}
              </Text>
            ) : null}

            <View>
              {item.enclosure_id ? (
                <Text
                  style={[globalStyles.labelName, globalStyles.pd0]}
                >{`Enclosure ID: ${item.enclosure_id}`}</Text>
              ) : null}
              {/* {item.section ? (<Text style={[globalStyles.name, { fontSize: 12, }]}>{`Section: ${item.section}`}</Text>) : null} */}
            </View>
          </View>
          <View style={globalStyles.iconContainer}>
            {/* <Ionicons name="chevron-forward" style={globalStyles.rightAngelIcon} /> */}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render = () => (
    <Container>
      <Header
        title={this.state.commonName}
        // showScanButton={this.state.isLoading ? undefined : true}
        // searchAction={this.state.isLoading ? undefined : this.openSearchModal}
      />
      {this.state.isLoading ? (
        <Loader />
      ) : (
        <FlatList
          ListEmptyComponent={() => <ListEmpty />}
          data={this.state.animals}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={this.renderAnimalItem}
          initialNumToRender={this.state.animals.length}
          refreshing={this.state.isLoading}
          onRefresh={this.handelRefresh}
          contentContainerStyle={
            this.state.animals.length === 0 ? globalStyles.container : null
          }
        />
      )}

      {this.state.selectedIDs.length > 0 ? (
        <TouchableOpacity
          style={globalStyles.floatingBtn}
          onPress={this.exportList}
        >
          <Feather name="download" style={globalStyles.floatingBtnText} />
        </TouchableOpacity>
      ) : null}

      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalOpen}
      >
        <View style={globalStyles.modalContainer}>
          <View style={globalStyles.modalBody}>
            <DownloadFile
              url={this.state.downloadUrl}
              viewStyle={globalStyles.downloadBtn}
              textStyle={globalStyles.downloadFileButtonText}
              design={<AntDesign name="download" size={20} />}
              text={"Download"}
            />
            <TouchableOpacity
              activeOpacity={1}
              style={globalStyles.closeBtn}
              onPress={this.closeModal}
            >
              <Text style={globalStyles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/*Search Modal*/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isSearchModalOpen}
        onRequestClose={this.closeSearchModal}
      >
        <View style={globalStyles.searchModalOverlay}>
          <View style={globalStyles.seacrhModalContainer}>
            <View style={globalStyles.searchModalHeader}>
              <TouchableOpacity
                activeOpacity={1}
                style={globalStyles.searchBackBtn}
                onPress={this.closeSearchModal}
              >
                <Ionicons name="arrow-back" size={25} color={Colors.white} />
              </TouchableOpacity>

              <View style={globalStyles.searchContainer}>
                <View style={globalStyles.searchFieldBox}>
                  <Ionicons name="search" size={24} color={Colors.white} />
                  <TextInput
                    ref={this.searchInput}
                    value={this.state.searchValue}
                    onChangeText={(searchValue) =>
                      this.setState(
                        {
                          searchValue: searchValue,
                        },
                        () => {
                          this.searchAnimal();
                        }
                      )
                    }
                    autoCompleteType="off"
                    placeholder="Search by animal ID"
                    placeholderTextColor={Colors.white}
                    style={globalStyles.searchField}
                  />
                </View>
              </View>
            </View>
            <View style={globalStyles.searchModalBody}>
              {this.state.searchValue.trim().length > 0 ? (
                <FlatList
                  data={this.state.searchData}
                  keyExtractor={(item, index) => item.id.toString()}
                  renderItem={this.renderSearchItem}
                  initialNumToRender={this.state.searchData.length}
                  ListEmptyComponent={() => (
                    <Text
                      style={[
                        {
                          color: Colors.textColor,
                        },
                        globalStyles.textAlignCenter,
                        globalStyles.mt10,
                      ]}
                    >
                      No Result Found
                    </Text>
                  )}
                />
              ) : null}
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
}

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 		paddingHorizontal: 5,
// 	},
// 	view: {
// 		flexDirection: "row",
// 		borderBottomColor: "#eee",
// 		borderBottomWidth: 1,
// 		paddingHorizontal: 5,
// 		paddingVertical: 3,
// 	},
// 	image: {
// 		width: 55,
// 		height: 55,
// 	},
// 	checkboxImgContainer: {
// 		width: "20%",
// 		flexDirection: "row",
// 		alignItems: "center",
// 		justifyContent: "space-between",
// 		// paddingRight: 5,
// 	},
// 	name: {
// 		fontSize: 18,
// 		color: Colors.textColor,
// 	},
// 	inputText: {
// 		color: Colors.textColor,
// 		opacity: 0.8,
// 		fontSize: 14,

// 	},
// 	iconContainer: {
// 		width: "15%",
// 		flexDirection: "row",
// 		justifyContent: "flex-end",
// 		alignItems: "center",
// 	},
// 	rightAngelIcon: {
// 		fontSize: 18,
// 		color: "#cecece",
// 	},
// 	floatingBtn: {
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
// 	floatingBtnText: {
// 		fontSize: 28,
// 		color: Colors.white,
// 		position: "absolute",
// 		top: 8,
// 	},
// 	modalContainer: {
// 		flex: 1,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		backgroundColor: "rgba(0, 0, 0, 0.5)",
// 	},
// 	downloadBtn: {
// 		flexDirection: "row",
// 		paddingHorizontal: 20,
// 		paddingVertical: 8,
// 		borderWidth: StyleSheet.hairlineWidth,
// 		borderRadius: 3,
// 	},
// 	modalBody: {
// 		alignItems: "center",
// 		justifyContent: "center",
// 		backgroundColor: Colors.white,
// 		width: Math.floor((windowWidth * 70) / 100),
// 		minHeight: Math.floor(windowHeight / 4),
// 		padding: 15,
// 		borderRadius: 3,
// 		elevation: 5,
// 	},
// 	loadingText: {
// 		fontSize: 14,
// 		color: Colors.textColor,
// 		opacity: 0.6,
// 		marginTop: 10,
// 	},
// 	closeBtn: {
// 		position: "absolute",
// 		bottom: 10,
// 		padding: 10,
// 	},
// 	closeBtnText: {
// 		fontSize: 16,
// 		fontWeight: "bold",
// 		color: Colors.tomato,
// 	},
// 	searchModalOverlay: {
// 		justifyContent: "center",
// 		alignItems: "center",
// 		backgroundColor: Colors.white,
// 		width: windowWidth,
// 		height: windowHeight,
// 	},
// 	seacrhModalContainer: {
// 		flex: 1,
// 		backgroundColor: Colors.white,
// 		width: windowWidth,
// 		height: windowHeight,
// 		elevation: 5,
// 	},
// 	searchModalHeader: {
// 		height: 55,
// 		width: "100%",
// 		elevation: 5,
// 		paddingHorizontal: 10,
// 		flexDirection: "row",
// 		alignItems: "center",
// 		justifyContent: "flex-start",
// 		backgroundColor: Colors.primary,
// 	},
// 	searchBackBtn: {
// 		width: "15%",
// 		height: 55,
// 		alignItems: "flex-start",
// 		justifyContent: "center",
// 	},
// 	searchContainer: {
// 		width: "85%",
// 		flexDirection: "row",
// 		alignItems: "flex-start",
// 		justifyContent: "center",
// 	},
// 	searchFieldBox: {
// 		width: "100%",
// 		height: 40,
// 		paddingHorizontal: 10,
// 		flexDirection: "row",
// 		alignItems: "center",
// 		justifyContent: "space-between",
// 		backgroundColor: "rgba(0,0,0, 0.1)",
// 		borderRadius: 50,
// 	},
// 	searchField: {
// 		width: "90%",
// 		padding: 5,
// 		color: Colors.white,
// 		fontSize: 15,
// 	},
// 	searchModalBody: {
// 		flex: 1,
// 		height: windowHeight - 55,
// 	},
// });
