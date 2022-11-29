import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SectionList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import moment from "moment";
import { Container } from "native-base";
import Colors from "../../config/colors";
import { Header, Loader, ListEmpty, MultiSelectDropdown } from "../../component";
import {
  getMedicalRecords,
  filterMedicalRecords,
} from "../../services/MedicalAndIncidenTServices";
import AppContext from "../../context/AppContext";
import { Configs } from "../../config";
import DownloadFile from "../../component/DownloadFile";
import { AntDesign } from "@expo/vector-icons";
import globalStyles from "../../config/Styles";
import { userList } from "../../services/UserManagementServices";
import { showDayAsClientWant, showDate } from "../../utils/Util";
import { getReportsforMedical } from "../../services/ReportsServices";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const tabHeight = 50;

export default class MedicalReport extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      activeTabKey: "O",
      records: [],
      selectedFilterItem: "all",
      page: 1,
      dataLength: "",
      users: [],
      selectedUsers: [],
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      "focus",
      this.onScreenFocus
    );
  }

  onScreenFocus = () => {
    this.setState(
      {
        isLoading: true,
        activeTabKey: "O",
        records: [],
      },
      () => {
        this.getData();
        this.getMedicalbyUser(this.state.selectedUsers);
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
        this.getMedicalbyUser(item);
      })
    } else {
      alert("Select atleast one user")
    }
  };

  getMedicalbyUser = (user) => {
    this.setState({
      isLoading: true,
    });
    let users = user.map((v, i) => v.id).join(",");
    let obj = {
      cid: this.context.userDetails.cid,
      users: users,
      page: this.state.page
    };
    getReportsforMedical(obj)
      .then((data) => {
        let dataArr = [];
        for (let key in data) {
          dataArr.push({ title: key, data: data[key] });
        }
        this.setState({ dataLength: dataArr.length });
        let listData = this.state.page == 1 ? [] : this.state.records;
        let result = listData.concat(dataArr);
        this.setState({
          isLoading: false,
          records: result,
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
      this.getMedicalbyUser(this.state.selectedUsers); // method for API call
    }
  };

  onRefresh = () => {
    this.setState({ isLoading: true, records: [], page: 1 }, () => {
      this.getData();
      this.getMedicalbyUser(this.state.selectedUsers);
    });
  };

  gotoView = (item) =>
    this.props.navigation.navigate("ViewMedicalRecord", {
      item: item,
      status: this.state.activeTabKey,
    });

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[globalStyles.CardBox, globalStyles.mh5]}
        onPress={this.gotoView.bind(this, item)}
      >
        <View
          style={{
            flexDirection: "row",
            // justifyContent: "space-between",
            paddingRight: 5,
          }}
        >
          <Text style={[globalStyles.labelName, globalStyles.pd0]}>
            {"Case ID: "}
            <Text style={[globalStyles.textfield, globalStyles.width60]}>
              {"#" + item.id}{" "}
            </Text>
          </Text>
          <Text
            style={[
              globalStyles.labelName,
              globalStyles.pd0,
              item.status === "P" ? globalStyles.pendingStatus : globalStyles.approveStatus,
            ]}
          >
            {item.status === "P"
              ? "(Pending)"
              : item.status === "O"
                ? "(Ongoing)"
                : ""}
          </Text>
        </View>
        <Text
          style={[
            globalStyles.labelName,
            globalStyles.pd0,
            globalStyles.width80,
            globalStyles.marginVertical10
          ]}
        >
          {/* {"Desc: "} */}
          <Text style={[globalStyles.textfield, globalStyles.width60]}>
            {item?.description ?? "N/A"}
          </Text>
        </Text>
        <Text style={[globalStyles.labelName, globalStyles.pd0]}>
          {"Diagnosis: "}
          <Text style={[globalStyles.textfield, globalStyles.width60]}>
            {item.diagnosis_name}
          </Text>
        </Text>
        <Text style={[globalStyles.labelName, globalStyles.pd0]}>
          {"Ref: "}
          {item.ref == "animal" ? (
            <Text style={[globalStyles.textfield, globalStyles.width60]}>
              {item.english_name} ({item.ref_value} )
            </Text>
          ) : (
            <Text style={[globalStyles.textfield, globalStyles.width60]}>
              {item.ref_value} ({item.ref} )
            </Text>
          )}
        </Text>
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
              <Text
                style={[globalStyles.textfield, globalStyles.width60]}
              >{`${item.enclosure} (${item.section})`}</Text>
            </Text>
          </>
        ) : null}
        <Text style={[globalStyles.labelName, globalStyles.pd0]}>
          {"Rep By: "}
          <Text style={[globalStyles.textfield, globalStyles.width60]}>
            {item?.reported_by_name ?? "N/A"}
          </Text>
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 5,
          }}
        >
          <Text style={[globalStyles.labelName, globalStyles.pd0]}>
            {"Date: "}
            <Text style={[globalStyles.textfield, globalStyles.width60]}>
              {moment(item.date, "YYYY-MM-DD").format("DD/MM/YYYY")}
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render = () => (
    <Container>
      <Header
        title={"Medical Reports"}
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
            sections={this.state.records}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={this.renderItem}
            contentContainerStyle={
              this.state.records.length === 0 ? globalStyles.container : null
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
