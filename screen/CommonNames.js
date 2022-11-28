import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  FlatList,
  Platform,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Container } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Configs } from "../config";
import { Header, ListEmpty, Loader, AnimalSearchModal } from "../component";
import { getCommonNames } from "../services/APIServices";
import { fetchProfile } from "../services/UserManagementServices";
import AppContext from "../context/AppContext";
import { capitalize } from "../utils/Util";
import Carousel from "react-native-snap-carousel";
import { SliderBox } from "react-native-image-slider-box";
import CachedImage from "expo-cached-image";
import globalStyles from "../config/Styles";

const SLIDER_WIDTH = Dimensions.get("window").width;
const SLIDE_WIDTH = Math.round((SLIDER_WIDTH * 95) / 100);
const itemHorizontalMargin = (2 * SLIDER_WIDTH) / 100;
const ITEM_WIDTH = SLIDE_WIDTH + itemHorizontalMargin * 2;
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 2) / 2.8);

export default class CommonNames extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      commonNames: [],
      filteredData: [],
      classID:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.classID
          : undefined,
      className:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.className
          : undefined,
      categoryID:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.categoryID
          : undefined,
      categoryName:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.categoryName
          : undefined,
      subCategoryID:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.subCategoryID
          : undefined,
      subCategoryName:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.subCategoryName
          : undefined,
      screenName:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.screenName
          : undefined,
      isSubCategoryEmpty: this.props.route.params.hasOwnProperty(
        "isSubCategoryEmpty"
      )
        ? this.props.route.params.isSubCategoryEmpty
        : false,

      showTags: false,
    };

    this.searchModalRef = React.createRef();
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
        commonNames: [],
        isLoading: true,
      },
      () => {
        this.loadCommonNames();
      }
    );
  };

  componentWillUnmount = () => {
    // console.log('hitted page');
    this.focusListener();
  };

  handelRefresh = () => {
    this.setState(
      {
        commonNames: [],
        isLoading: true,
      },
      () => {
        this.loadCommonNames();
      }
    );
  };

  loadCommonNames = () => {
    const { classID, categoryID, subCategoryID } = this.state;
    let userid = this.context.userDetails.id;
    let paramObj = { cid: this.context.userDetails.cid };
    if (typeof classID !== "undefined") {
      paramObj.animal_class = classID;
    }
    if (typeof categoryID !== "undefined") {
      paramObj.category = categoryID;
    }
    if (typeof subCategoryID !== "undefined") {
      paramObj.sub_category = subCategoryID;
    }

    Promise.all([getCommonNames(paramObj), fetchProfile({ userid })])
      .then((response) => {
        let data = response[0];
        let newData = data.filter((item) => {
          return item.total_animals > 0;
        });
        this.context.setUserData(response[1].data);
        this.setState({
          commonNames: data,
          isLoading: false,
          filteredData: newData.map((item) => {
            if (item.cover_image) {
              return item;
            }
          }),
        });
      })
      .catch((error) => console.log(error));
  };

  openSearchModal = () => this.searchModalRef.current.openModal();

  gotoAddCommonNane = () => {
    this.props.navigation.navigate("AddCommonName", {
      classID: this.state.classID,
      categoryID: this.state.categoryID,
      subCategoryID: this.state.subCategoryID,
    });
  };

  onItemTap = (item) => {
    this.props.navigation.navigate("CommonNameDetails", {
      commonNameID: item.id,
      classID: this.state.classID,
      categoryID: this.state.categoryID,
      subCategoryID: this.state.subCategoryID,
      imageUri: item.image,
      coverImageUri: item.cover_image,
      commonName: item.common_name,
      scientificName: item.scientific_name,
      description: item.description,
      taxonid: item.taxonid !== null ? item.taxonid : "",
      databaseName:
        item.database_name !== null ? item.database_name : undefined,
      qr_code: item.qr_code !== null ? item.qr_code : undefined,
    });
  };

  gotoEditCommonName = (item) => {
    console.log({ item });
    this.props.navigation.navigate("AddCommonName", {
      classID: this.state.classID,
      categoryID: this.state.categoryID,
      subCategoryID: this.state.subCategoryID,
      id: item.id,
      commonName: item.common_name,
      scientificName: item.scientific_name,
      taxonid: item.taxonid !== null ? item.taxonid : "",
      databaseName: item.database_name !== null ? item.database_name : "",
      description: item.description !== null ? item.description : "",
      funFacts: item.fun_facts !== null ? item.fun_facts : "",
      imageURI: item.image,
      coverImageURI: item.cover_image !== null ? item.cover_image : undefined,
      qr_code: item.qr_code !== null ? item.qr_code : undefined,
      dietType: item.diet_type,
      assignedTags: item?.tags,
    });
  };

  toggleShowTags = () => this.setState({ showTags: !this.state.showTags });

  renderListItem = ({ item }) => (
    <TouchableHighlight
      underlayColor={"#eee"}
      onPress={this.onItemTap.bind(this, item)}
      onLongPress={this.checkEditActionPermissions.bind(this, item)}
    >
      <View style={styles.view}>
        <View style={[globalStyles.width20, globalStyles.justifyContentCenter]}>
          <Image
            style={styles.image}
            source={{ uri: item.image }}
            resizeMode="cover"
          />
        </View>

        <View style={[globalStyles.justifyContentCenter, globalStyles.flex1]}>
          <Text style={styles.name}>{capitalize(item.common_name)}</Text>
          <Text
            style={[styles.name, { fontSize: 12, fontStyle: "italic" }]}
          >{`( ${capitalize(item.scientific_name)} )`}</Text>
          {this.context.userDetails.action_types.includes(
            Configs.USER_ACTION_TYPES_CHECKING.stats
          ) ? (
            <>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={[styles.name, { fontSize: 12 }]}>{`${
                  "M - " + item.total_male_animal
                }, ${"F - " + item.total_female_animal}, `}</Text>
                <Text
                  style={[styles.name, { fontSize: 12, color: Colors.danger }]}
                >
                  UD - {item.total_Undetermined_animal}
                </Text>
                <Text style={[styles.name, { fontSize: 12 }]}>
                  , ID - {item.total_Indeterminate_animal}
                </Text>
              </View>
              {this.state.showTags && (
                <View
                  style={{
                    marginRight: 10,
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {item.tags?.map((element) => (
                    <View
                      key={element.id.toString()}
                      // onLongPress={() => {
                      //   Alert.alert("", "Do you want to remove the tag?", [
                      //     {
                      //       text: "Yes",
                      //       onPress: () => deleteTagHandler(element),
                      //       style: "cancel",
                      //     },
                      //     { text: "No", onPress: () => "" },
                      //   ]);
                      // }}
                      style={{
                        height: 32,
                        justifyContent: "center",
                        paddingHorizontal: 5,
                        marginHorizontal: 3,
                        marginVertical: 5,
                        borderRadius: 2,
                        backgroundColor: Colors.white,
                        borderColor: Colors.primary,
                        borderWidth: 1,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <Image
                        style={{ height: 25, width: 25, marginRight: 10 }}
                        source={{ uri: element.tag_icon }}
                      />
                      <Text style={{ fontSize: 15, color: Colors.primary }}>
                        {element.tag_name}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </>
          ) : null}
        </View>

        {this.context.userDetails.action_types.includes(
          Configs.USER_ACTION_TYPES_CHECKING.stats
        ) ? (
          <View style={styles.rightSection}>
            <View style={styles.qtyContainer}>
              <Text style={styles.qty}>{item.total_animals}</Text>
            </View>
            {/* <Ionicons name="chevron-forward" style={styles.rightAngelIcon} /> */}
          </View>
        ) : null}
      </View>
    </TouchableHighlight>
  );

  checkAddActionPermissions = () => {
    if (this.state.isLoading == false) {
      if (this.context.userDetails.action_types.includes("Add")) {
        return this.gotoAddCommonNane;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  };

  checkEditActionPermissions = (item) => {
    if (this.context.userDetails.action_types.includes("Edit")) {
      this.gotoEditCommonName(item);
    }
  };

  _renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
        }}
      >
        <View key={item.id.toString()} style={styles.slide}>
          <CachedImage
            source={{
              uri: item.cover_image,
            }}
            cacheKey={`${item.id}-thumb`}
            placeholderContent={
              // <Image  source={require('../assets/icon.png')} style={{height:150 , width: 200}}/>
              <ActivityIndicator
                color={Colors.primary}
                size="small"
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              />
            }
            style={styles.sliderImage}
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 2,
            backgroundColor: "rgba(0,0,0,0.3)",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingHorizontal: 10,
            borderRadius: 2,
            right: 0,
          }}
        >
          <View>
            <Text
              style={{ fontSize: 16, paddingVertical: 5, color: Colors.white }}
            >{`${item.common_name}`}</Text>
          </View>
          {/* <View>
						<Text>{item.description.slice(0, 50)}</Text>
					</View> */}
        </View>
      </View>
    );
  };

  render = () => {
    const carouselItems = this.state.filteredData.map((x) => {
      return {
        id: x.id,
        common_name: x.common_name,
        cover_image: x.cover_image,
      };
    });
    // console.log("carouselItems>>>>>>>>>>",carouselItems);
    return (
      <Container>
        <Header
          title={this.state.screenName}
          showScanButton={this.state.isLoading ? undefined : true}
          searchAction={this.state.isLoading ? undefined : this.openSearchModal}
          addAction={this.checkAddActionPermissions()}
          tagShowAction={this.toggleShowTags}
        />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.carouselConatainer}>
              {/* <Carousel
							layout={'default'}
							inactiveSlideOpacity={0.6}
							inactiveSlideScale={0.65}
							firstItem={0}
							sliderWidth={SLIDER_WIDTH}
							itemWidth={ITEM_WIDTH}
							data={carouselItems}
							renderItem={this._renderItem}
							containerCustomStyle={{ overflow: 'hidden' }}
							contentContainerCustomStyle={{ overflow: 'hidden' }}
							lockScrollWhileSnapping={true}
							activeAnimationType={'timing'}
							activeSlideAlignment={'center'}
							autoplay
							loop
						/> */}
              <SliderBox
                images={carouselItems}
                firstItem={0}
                sliderBoxHeight={ITEM_HEIGHT}
                parentWidth={SLIDER_WIDTH}
                ImageComponentStyle={{
                  borderRadius: 2,
                  width: "99.25%",
                  marginTop: 2,
                }}
                paginationBoxVerticalPadding={20}
                autoplay
                circleLoop
                resizeMethod={"resize"}
                resizeMode={"cover"}
                paginationBoxStyle={{
                  position: "absolute",
                  bottom: 0,
                  padding: 0,
                  alignItems: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                }}
                dotStyle={{
                  width: 0,
                  height: 0,
                  borderRadius: 3,
                  marginHorizontal: 0,
                  padding: 0,
                  margin: 0,
                  backgroundColor: "rgba(128, 128, 128, 0.92)",
                }}
                imageLoadingColor={Colors.primary}
              />
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={() => <ListEmpty />}
              data={this.state.commonNames}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={this.renderListItem}
              initialNumToRender={this.state.commonNames.length}
              refreshing={this.state.isLoading}
              onRefresh={this.handelRefresh}
              contentContainerStyle={
                this.state.commonNames.length === 0 ? styles.container : null
              }
            />
          </>
        )}

        <AnimalSearchModal
          ref={this.searchModalRef}
          animalClass={this.state.classID}
          animalCategory={this.state.categoryID}
          animalSubCategory={this.state.subCategoryID}
          navigation={this.props.navigation}
        />
      </Container>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },
  slide: {
    width: SLIDE_WIDTH,
    height: ITEM_HEIGHT + 5,
    alignItems: "center",
    justifyContent: "center",
  },
  sliderImage: {
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
  },
  carouselConatainer: {
    marginBottom: 5,
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    elevation: 1,
    height: ITEM_HEIGHT,
  },
  view: {
    flexDirection: "row",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  image: {
    width: 55,
    height: 55,
  },
  name: {
    fontSize: 18,
    color: Colors.textColor,
  },
  rightSection: {
    width: "15%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  qtyContainer: {
    height: 35,
    width: 35,
    borderRadius: 100,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  qty: {
    fontSize: 14,
    color: "#FFF",
  },
  rightAngelIcon: {
    fontSize: 18,
    color: "#cecece",
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
});
