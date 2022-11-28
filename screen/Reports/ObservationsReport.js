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
} from "react-native";
import moment from "moment";
import { Container } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../config/colors";
import {
  Header,
  Loader,
  ListEmpty,
  MultiSelectDropdown,
} from "../../component";
import {
  getObservationReports,
  getObservation,
  searchObservationByType,
} from "../../services/MedicalAndIncidenTServices";
import AppContext from "../../context/AppContext";
import { debounce } from "lodash";
import { Configs } from "../../config";
import styles from "../../config/Styles";
import { capitalize } from "../../utils/Util";
import { showDate } from "../../utils/Util";
import { userList } from "../../services/UserManagementServices";
import { getReportsforObservation } from "../../services/ReportsServices";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const tabHeight = 50;

const danger = require("../../assets/tasks/Danger.png");
const low = require("../../assets/tasks/Low.png");
const moderate = require("../../assets/tasks/Moderate.png");
const high = require("../../assets/tasks/High.png");

export default class ObservationsReport extends React.Component {
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
      selectedFilterItem: "all",
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
        this.getObservationbyUser(this.state.selectedUsers);
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
          page: 1,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setSelectedUsers = (item) => {
    if (item.length > 0) {
      this.setState(
        {
          selectedUsers: item,
        },
        () => {
          this.getObservationbyUser(item);
        }
      );
    } else {
      alert("Select atleast one user");
    }
  };

  getObservationbyUser = (user) => {
    this.setState({
      isLoading: true,
    });
    let users = user.map((v, i) => v.id).join(",");
    let obj = {
      cid: this.context.userDetails.cid,
      users: users,
      page: this.state.page,
    };
    getReportsforObservation(obj)
      .then((data) => {
        console.log("Observation Report****", data);
        let dataArr = [];
        for (let key in data) {
          dataArr.push({ title: key, data: data[key] });
        }
        this.setState({ dataLength: dataArr.length });
        let listData = this.state.page == 1 ? [] : this.state.consumptions;
        let result = listData.concat(dataArr);

        // let items = data.filter(item => item.id == 259)
        // console.log("pending Observation>>>>>>>>>>",items);
        this.setState({
          isLoading: false,
          consumptions: result,
        });
      })
      .catch((error) => console.log(error));
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.isLoading) return null;
    return <ActivityIndicator style={{ color: Colors.primary }} />;
  };

  handleLoadMore = () => {
    if (!this.state.isLoading && this.state.dataLength > 0) {
      this.state.page = this.state.page + 1; // increase page by 1
      this.getObservationbyUser(this.state.selectedUsers); // method for API call
    }
  };

  onRefresh = () => {
    this.setState({ isLoading: true, consumptions: [], page: 1 }, () => {
      this.getData();
      this.getObservationbyUser(this.state.selectedUsers);
    });
  };

  gotoView = (item) => {
    this.props.navigation.navigate("ViewObservation", {
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
        style={[styles.CardBox, styles.mh5]}
        onPress={this.gotoView.bind(this, item)}
      >
        <View
          style={[
            globalStyles.flexDirectionRow,
            globalStyles.justifyContentBetween,
            globalStyles.pr5,
            globalStyles.mb10,
          ]}
        >
          <Text style={[styles.labelName, styles.pd0, styles.w80]}>
            {/* {"Desc: "} */}
            <Text style={[styles.textfield, styles.width60]}>
              {item?.description ?? "N/A"}
            </Text>
          </Text>
          <Image source={priority} style={styles.priorityImage} />
        </View>
        <View
          style={[
            globalStyles.flexDirectionRow,
            globalStyles.justifyContentBetween,
            globalStyles.pr5,
          ]}
        >
          <Text style={[styles.labelName, styles.pd0]}>
            {"ID: "}
            <Text style={[styles.textfield, styles.width60]}>
              {"#" + item.id}{" "}
            </Text>
          </Text>
        </View>
        {/* <Text style={[styles.labelName, styles.pd0]}>
          {"Observation Type: "}
          <Text style={[styles.textfield, styles.width60]}>
            {item.type_name}
          </Text>
        </Text> */}
        {item.ref == "others" ? null : (
          <Text style={[styles.labelName, styles.pd0]}>
            {"Ref: "}
            {item.ref == "animal" ? (
              <Text style={[styles.textfield, styles.width60]}>
                {capitalize(item.english_name)} ({capitalize(item.ref_value)} )
              </Text>
            ) : (
              <Text style={[styles.textfield, styles.width60]}>
                {capitalize(item.ref_value)} ({capitalize(item.ref)} )
              </Text>
            )}
          </Text>
        )}

        {item.ref == "animal" ? (
          <>
            {/* <Text style={[styles.labelName,styles.pd0]}>
							{"Common Name: "}
							<Text style={[styles.textfield,styles.width60]}>{`${item.english_name}`}</Text>
						</Text> */}
            {item.dna == null || item.dna == "" ? null : (
              <Text style={[styles.labelName, styles.pd0]}>
                {"DNA No: "}
                <Text
                  style={[styles.textfield, styles.width60]}
                >{`${item.dna}`}</Text>
              </Text>
            )}
            {item.microchip == null || item.microchip == "" ? null : (
              <Text style={[styles.labelName, styles.pd0]}>
                {"Microchip No: "}
                <Text
                  style={[styles.textfield, styles.width60]}
                >{`${item.microchip}`}</Text>
              </Text>
            )}
            <Text style={[styles.labelName, styles.pd0]}>
              {"Encl: "}
              <Text style={[styles.textfield, styles.width60]}>{`${capitalize(
                item.enclosure
              )} (${capitalize(item.section)})`}</Text>
            </Text>
          </>
        ) : null}

        {/* {!item.solution ? null :
					<Text style={[styles.labelName, styles.pd0]}>
						{"Comments: "}
						<Text style={[styles.textfield, styles.width60]}>{item?.solution ?? 'N/A'}</Text>
					</Text>
				} */}
        {!item.learning ? null : (
          <Text style={[styles.labelName, styles.pd0]}>
            {"Learning: "}
            <Text style={[styles.textfield, styles.width60]}>
              {item?.learning ?? "N/A"}
            </Text>
          </Text>
        )}
        <View></View>
        {!item.full_name ? null : (
          <Text style={[styles.labelName, styles.pd0]}>
            {"Rep By: "}
            <Text style={[styles.textfield, styles.width60]}>
              {item?.full_name ?? "N/A"}
            </Text>
          </Text>
        )}
        <Text style={[styles.labelName, styles.pd0]}>
          {"Date: "}
          <Text style={[styles.textfield, styles.width60]}>
            {moment(item.created_on, "YYYY-MM-DD").format("Do MMM YY (ddd)")}
          </Text>
        </Text>
        {/* <Text
          style={[
            styles.labelName,
            styles.pd0,
            // item.status === "P" ? styles.pendingStatus : styles.approveStatus,
          ]}
        >
          {"Status: "}
          <Text style={[styles.textfield, styles.width60]}>
            {item.status === "P" ? "Pending" : ""}
          </Text> 
        </Text>*/}
      </TouchableOpacity>
    );
  };

  render = () => (
    <Container>
      <Header title={"Observation Reports"} />

      <View style={styles.listContainer}>
        <MultiSelectDropdown
          label={"Select User"}
          items={this.state.users}
          selectedItems={this.state.selectedUsers}
          onSave={this.setSelectedUsers}
          placeHolderContainer={styles.textfield}
          placeholderStyle={styles.placeholderStyle}
          labelStyle={styles.labelName}
          textFieldStyle={styles.textfield}
          selectedItemsContainer={[
            styles.selectedItemsContainer,
            styles.width60,
            { height: 100 },
          ]}
          style={styles.fieldBox}
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
              this.state.consumptions.length === 0 ? styles.container : null
            }
            ListEmptyComponent={() => <ListEmpty />}
            stickySectionHeadersEnabled
            renderSectionHeader={({ section: { title } }) => {
              return (
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionHeaderRight}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: Colors.white,
                      }}
                    >
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
