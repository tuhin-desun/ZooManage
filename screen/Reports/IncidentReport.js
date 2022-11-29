import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Modal,
  SafeAreaView,
  TouchableHighlight,
  Image,
  RefreshControl,
  ActivityIndicator,
  SectionList,
  ScrollView,
} from "react-native";
import moment from "moment";
import { Container } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../config/colors";
import { Header, Loader, ListEmpty, MultiSelectDropdown } from "../../component";
import {
  getIncidentReports,
  searchIncidentByType,
} from "../../services/MedicalAndIncidenTServices";
import AppContext from "../../context/AppContext";
import { debounce } from "lodash";
import { Configs } from "../../config";
import globalStyles from "../../config/Styles";
import { capitalize } from "./../../utils/Util";
import { showDate } from "./../../utils/Util";
import { userList } from "../../services/UserManagementServices";
import { getReportsforIncident } from "../../services/ReportsServices";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const tabHeight = 50;

const danger = require("../../assets/tasks/Danger.png");
const low = require("../../assets/tasks/Low.png");
const moderate = require("../../assets/tasks/Moderate.png");
const high = require("../../assets/tasks/High.png");

export default class IncidentReport extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      activeTabKey: "A",
      consumptions: [],
      activeTabSubGroupKey: "PENDING_FOR_ME",
      isSearchModalOpen: false,
      searchValue: "",
      searchData: [],
      loading: false,
      page: 1,
      dataLength: "",
      users: [],
      selectedUsers: [],
    };

    this.searchInput = React.createRef();
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      "focus",
      this.onScreenFocus
    );
  }

  onScreenFocus = () => {
    // console.log(this.context.userDetails)
    this.setState(
      {
        isLoading: true,
        activeTabKey: "A",
        consumptions: [],
      },
      () => {
        this.getData();
        this.getIncidentbyUser(this.state.selectedUsers);
      }
    );
  };

  componentWillUnmount = () => {
    this.focusListener();
  };


  getData = () => {
    userList()
      .then((res) => {
        this.setState({
          users: res.data.map((v, i) => ({
            id: v.id,
            name: `${v.full_name} - ${v.dept_name}`,
          })),
          isLoading: false,
          page: 1
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setSelectedUsers = (item) => {
    if (item.length > 0) {
      this.setState({
        selectedUsers: item
      }, () => {
        this.getIncidentbyUser(item);
      })
    } else {
      alert("Select atleast one user")
    }
  };

  getIncidentbyUser = (user) => {
    this.setState({
      isLoading: true,
    });
    let users = user.map((v, i) => v.id).join(",");
    let obj = {
      cid: this.context.userDetails.cid,
      users: users,
      page: this.state.page
    };
    getReportsforIncident(obj)
      .then((data) => {
        let dataArr = [];
        for (let key in data) {
          dataArr.push({ title: key, data: data[key] });
        }
        this.setState({ dataLength: dataArr.length });
        let listData = this.state.page == 1 ? [] : this.state.consumptions;
        let result = listData.concat(dataArr);
        // console.log("Incident Report****", result[0])
        // let items = data.filter(item => item.id == 259)
        // console.log("pending Incident>>>>>>>>>>",items);
        this.setState({
          isLoading: false,
          consumptions: result,
        });
      })
      .catch((error) => console.log(error));
  }


  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.isLoading) return null;
    return <ActivityIndicator style={{ color: Colors.primary }} />;
  };

  handleLoadMore = () => {
    if (!this.state.isLoading && this.state.dataLength > 0) {
      this.state.page = this.state.page + 1; // increase page by 1
      this.getIncidentbyUser(this.state.selectedUsers); // method for API call
    }
  };

  onRefresh = () => {
    this.setState({ isLoading: true, consumptions: [], page: 1 }, () => {
      this.getData();
      this.getIncidentbyUser(this.state.selectedUsers);
    });
  };

  gotoView = (item) => {
    this.props.navigation.navigate("ViewIncident", {
      item: item,
      status: this.state.activeTabKey,
    });
  };

  renderItem = ({ item }) => {
    // console.log(item);
    let priority = low;
    if (item.priority == "High") {
      priority = high;
    } else if (item.priority == "Medium") {
      priority = moderate;
    } else if (item.priority == "Top") {
      priority = danger;
    }
    return (
      <TouchableOpacity
        style={[globalStyles.CardBox, globalStyles.mh5]}
        // onLongPress={this.gotoEdit.bind(this, item)}
        onPress={this.gotoView.bind(this, item)}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 5,
          }}
        >
          <Text style={[globalStyles.labelName, globalStyles.pd0]}>
            {"ID: "}
            <Text style={[globalStyles.textfield, globalStyles.width60]}>
              {"#" + item.id}{" "}
            </Text>
          </Text>
          <Image
            source={priority}
            style={{ height: 15, width: 15, resizeMode: "contain" }}
          />
        </View>
        <View
          style={[globalStyles.flexDirectionRow,globalStyles.justifyContentSpaceBetween,globalStyles.paddingRight5]}
        >
          <Text
            style={[
              globalStyles.labelName,
              globalStyles.pd0,globalStyles.marginVertical10,globalStyles.width80]}
          >
            {/* {"Desc: "} */}
            <Text style={[globalStyles.textfield, globalStyles.width60]}>
              {item?.description ?? "N/A"}
            </Text>
          </Text>
        </View>
        <Text style={[globalStyles.labelName, globalStyles.pd0]}>
          {"Incident Type: "}
          <Text style={[globalStyles.textfield, globalStyles.width60]}>
            {item.type_name}
          </Text>
        </Text>
        {item.ref == "others" ? null : (
          <Text style={[globalStyles.labelName, globalStyles.pd0]}>
            {"Ref: "}
            {item.ref == "animal" ? (
              <Text style={[globalStyles.textfield, globalStyles.width60]}>
                {capitalize(item.english_name)} ({capitalize(item.ref_value)} )
              </Text>
            ) : (
              <Text style={[globalStyles.textfield, globalStyles.width60]}>
                {capitalize(item.ref_value)} ({capitalize(item.ref)} )
              </Text>
            )}
          </Text>
        )}

        {item.ref == "animal" ? (
          <>
            {/* <Text style={[globalStyles.labelName,globalStyles.pd0]}>
							{"Common Name: "}
							<Text style={[globalStyles.textfield,globalStyles.width60]}>{`${item.english_name}`}</Text>
						</Text> */}
            {item.dna == null || item.dna == "" ? null : (
              <Text style={[globalStyles.labelName, globalStyles.pd0]}>
                {"DNA No: "}
                <Text
                  style={[globalStyles.textfield, globalStyles.width60]}
                >{`${item.dna}`}</Text>
              </Text>
            )}
            {item.microchip == null || item.microchip == "" ? null : (
              <Text style={[globalStyles.labelName, globalStyles.pd0]}>
                {"Microchip No: "}
                <Text
                  style={[globalStyles.textfield, globalStyles.width60]}
                >{`${item.microchip}`}</Text>
              </Text>
            )}
            <Text style={[globalStyles.labelName, globalStyles.pd0]}>
              {"Encl: "}
              <Text style={[globalStyles.textfield, globalStyles.width60]}>{`${capitalize(
                item.enclosure
              )} (${capitalize(item.section)})`}</Text>
            </Text>
          </>
        ) : null}

        {/* {!item.solution ? null :
					<Text style={[globalStyles.labelName, globalStyles.pd0]}>
						{"Comments: "}
						<Text style={[globalStyles.textfield, globalStyles.width60]}>{item?.solution ?? 'N/A'}</Text>
					</Text>
				} */}
        {!item.learning ? null : (
          <Text style={[globalStyles.labelName, globalStyles.pd0]}>
            {"Learning: "}
            <Text style={[globalStyles.textfield, globalStyles.width60]}>
              {item?.learning ?? "N/A"}
            </Text>
          </Text>
        )}
        <View></View>
        {!item.full_name ? null : (
          <Text style={[globalStyles.labelName, globalStyles.pd0]}>
            {"Rep By: "}
            <Text style={[globalStyles.textfield, globalStyles.width60]}>
              {item?.full_name ?? "N/A"}
            </Text>
          </Text>
        )}
        <Text style={[globalStyles.labelName, globalStyles.pd0]}>
          {"Date: "}
          <Text style={[globalStyles.textfield, globalStyles.width60]}>
            {moment(item.created_on, "YYYY-MM-DD").format("Do MMM YY (ddd)")}
          </Text>
        </Text>
        <Text
          style={[
            globalStyles.labelName,
            globalStyles.pd0,
            // item.status === "P" ? globalStyles.pendingStatus : globalStyles.approveStatus,
          ]}
        >
          {"Status: "}
          <Text style={[globalStyles.textfield, globalStyles.width60]}>
            {item.status === "P" ? "Pending" : ""}
          </Text>
        </Text>
      </TouchableOpacity>
    );
  };

  render = () => (
    <Container>
      <Header
        title={"Incident Reports"}
        searchAction={this.openSearchModal}
      />

      <View style={globalStyles.listContainer}>
        <MultiSelectDropdown
          label={"Select User"}
          items={this.state.users}
          selectedItems={this.state.selectedUsers}
          onSave={this.setSelectedUsers}
          placeHolderContainer={globalStyles.textfield}
          placeholderStyle={globalStyles.placeholderStyle}
          labelStyle={globalStyles.labelName}
          textFieldStyle={globalStyles.textfield}
          selectedItemsContainer={[
            globalStyles.selectedItemsContainer,
            globalStyles.width60,
            { height: 100 }
          ]}
          style={globalStyles.fieldBox}
          listView={true}
        />
        {this.state.isLoading && this.state.page === 1 ? (
          <Loader />
        ) : (
          <SectionList
            sections={this.state.consumptions}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={this.renderItem}
            contentContainerStyle={
              this.state.consumptions.length === 0 ? globalStyles.container : null
            }
            ListEmptyComponent={() => <ListEmpty />}
            stickySectionHeadersEnabled
            renderSectionHeader={({ section: { title } }) => {
              return (
                <View style={globalStyles.sectionHeader}>
                  <View style={globalStyles.sectionHeaderRight}>
                    <Text style={[globalStyles.fontSize16,globalStyles.fontWeightBold,{color: Colors.white }]}>
                      {title}
                    </Text>
                  </View>
                </View>
              );
            }}
            ListFooterComponent={this.renderFooter.bind(this)}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isLoading && this.state.page === 1}
                onRefresh={this.onRefresh}
              />
            }
            onEndReachedThreshold={0.4}
            onEndReached={this.handleLoadMore.bind(this)}
          />
        )}
      </View>
    </Container>
  );
}

// const globalStyles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		padding: 8,
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
// 	underlineStyle: {
// 		backgroundColor: Colors.primary,
// 		height: 3,
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
// 	listContainer: {
// 		flex: 1,
// 		padding: 8,
// 		height: windowHeight - tabHeight,
// 	},
// 	CardBox: {
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
// 		fontSize: 16,
// 		paddingLeft: 4,

// 		color: Colors.textColor,
// 		opacity: 0.9,
// 		textAlign: "left",
// 		fontWeight: "500",
// 		flex: 1,
// 		width: "100%",
// 	},
// 	mc: {
// 		color: Colors.textColor,
// 		opacity: 0.8,
// 		marginLeft: 5,
// 		fontSize: 16,
// 		fontWeight: "500",
// 	},
// 	pendingStatus: {
// 		textAlign: "right",
// 		color: Colors.warning,
// 		fontStyle: "italic",
// 	},
// 	approveStatus: {
// 		textAlign: "right",
// 		color: Colors.success,
// 		fontStyle: "italic",
// 	},
// 	rejectStatus: {
// 		textAlign: "right",
// 		color: Colors.danger,
// 		fontStyle: "italic",
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
// 		width: "10%",
// 		height: 55,
// 		alignItems: "flex-start",
// 		justifyContent: "center",
// 	},
// 	searchContainer: {
// 		width: "90%",
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
// 	leftPart: {
// 		width: "75%",
// 		justifyContent: "center",
// 	},
// 	rightPart: {
// 		width: "25%",
// 		flexDirection: "row",
// 		justifyContent: "flex-end",
// 		alignItems: "center",
// 	},
// 	name: {
// 		fontSize: 16,
// 		color: Colors.textColor,
// 		fontWeight: "bold",
// 		lineHeight: 24,
// 	},
// 	subText: {
// 		color: Colors.textColor,
// 		opacity: 0.8,
// 		fontSize: 14,
// 		lineHeight: 22,
// 	},
// 	row: {
// 		flexDirection: "row",
// 		borderBottomColor: "#eee",
// 		borderBottomWidth: 1,
// 		paddingHorizontal: 5,
// 		paddingVertical: 15,
// 	}
// });
