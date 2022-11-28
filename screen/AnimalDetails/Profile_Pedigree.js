import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Modal,
  FlatList,
  Dimensions,
  TouchableHighlight,
  Image,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  DatePicker,
  ModalMenu,
  OverlayLoader,
  InputDropdown,
} from "../../component";
import Colors from "../../config/colors";
import Configs from "../../config/Configs";
import { getFormattedDate, calculateAge, getFileData } from "../../utils/Util";
import {
  getAnimalPedigree,
  saveAnimalPedigreeDetails,
  getParentAnimals,
  getCommonNameSections,
  getCommonNameEnclosures,
  getAnimalID,
  uploadAnimalImages,
  createAnimalProfile,
  getAnimalProfileData,
  getAnimalFarms,
  getAnimalOrigins,
  getAnimalOwners,
  getAnimalEnclosureTypes,
  getAnimalEnclosureIds,
} from "../../services/APIServices";
import AppContext from "../../context/AppContext";
import moment from "moment";
import { Modal as NativeModal } from "react-native-modal";
import colors from "../../config/colors";
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import globalStyles from "../../config/Styles";
import styles from "./Styles";

export default class Profile_Pedigree extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    console.log(".......this.props", this.props.route.params);
    this.state = {
      id:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.id
          : 0,
      fullName:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.scientificName
          : "",
      englishName:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.commonName
          : "",
      groupID:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.classID
          : undefined,
      categoryID:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.categoryID
          : undefined,
      subCategoryID:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.subCategoryID
          : undefined,
      animalType:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.animalType
          : Configs.ANIMAL_TYPE_INDIVIDUAL,
      database:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.databaseName
          : undefined,
      taxoinid:
        typeof this.props.route.params !== "undefined"
          ? this.props.route.params.taxonid
          : "",
      animalID: "",
      showSourceDate: false,
      show: false,
      showApproxDOB: false,
      dobSelected: false,
      approxDOBSelected: false,
      dob: new Date(),
      approxDOB: new Date(),
      sourceDate: new Date(),
      approxAge: "",
      age: "",
      placeOfBirth: "",
      sex: "",
      sexIdentificationType: undefined,
      source: undefined,
      father: "",
      mother: "",
      referenceNumber: "",
      color: "",
      birthWeight: "",
      birth_type: "",
      conditionOnArrivalOrBirth: "",
      ringNumber: "",
      dna: "",
      microchip: "",
      animal_status: "",
      animal_dead_reason: "",

      isSexIdentificationTypeMenuOpen: false,
      isplaceOfBirthValidationFailed: false,
      isSexValidationFailed: false,
      isSexIdentificationTypeValidationFailed: false,
      isMotherValidationFailed: false,
      isFatherValidationFailed: false,
      isColorValidationFailed: false,
      isBirthWeightValidationFailed: false,
      isConditionOnArrivalOrBirthValidationFailed: false,
      isMicrochipValueValidationFailed: false,
      isRingNumberValueValidationFailed: false,
      isDNAValueValidationFailed: false,
      showLoader: true,
      isAnimalSearchModalOpen: false,
      isAnimalEnclosureMenuOpen: false,
      isAnimalSectionMenuOpen: false,
      searchFor: undefined,
      animalSectionName: undefined,
      animalEnclosures: [],
      parentEnclosureID: undefined,
      parentEnclosureIDName: undefined,
      isFetchingParent: true,
      parentAnimals: [],
      searchValue: "",
      isSourceMenuOpen: false,
      isSourceValidationFailed: false,
      animalSections: [],
      identificationType: "",
      isIdentificationTypeMenuOpen: false,
      imageURI: undefined,
      imageData: undefined,
      animalSingleimageURI: undefined,
      animalSingleimageData: undefined,
      animalImages: [],
      isGenderMenuOpen: false,
      isBirthTypeMenuOpen: false,
      isAnimalStatusMenuOpen: false,
      animalDeadReasonModalVisible: false,
      currentstep: 1,
      animalFarms: [],
      animalOrigins: [],
      animalOwners: [],
      enclosureTypes: [],
      enclosureIds: [],

      enclosureTypeID: undefined,
      enclosureType: undefined,
      enclosureId: undefined,
      enclosureIDName: undefined,
      source: undefined,
      father: "",
      mother: "",
      referenceNumber: "",
      date: new Date(),
      farm: undefined,
      origin: undefined,
      owner: undefined,
      identificationType: "",
      gender: undefined,
      dna: "",
      microchip: "",
      ringNumber: "",
      imageURI: undefined,
      imageData: undefined,
      slNo: "",
      pariveshID: "",
      description: "",
      remarks: "",
      isSourceMenuOpen: false,
      isDatepickerOpen: false,
      isFarmMenuOpen: false,
      isOrigniMenuOpen: false,
      isOwnerMenuOpen: false,
      isEnclosureTypeMenuOpen: false,
      isEnclosureIDMenuOpen: false,
      isIdentificationTypeMenuOpen: false,
      isGenderMenuOpen: false,
      isSourceValidationFailed: false,
      isTaxoinidValidationFailed: false,
      isSerialNoValidationFailed: false,
      isPariveshIDValidationFailed: false,
      isFarmValidationFailed: false,
      isOriginValidationFailed: false,
      isOwnerValidationFailed: false,
      isEnclosureTypeValidationFailed: false,
      isEnclosureIDValidationFailed: false,
      isIdentificationTypeValidationFailed: false,
      isGenderValidationFailed: false,
      isIdentificationValueValidationFailed: false,
      isDNAValueValidationFailed: false,
      isMicrochipValueValidationFailed: false,
      isRingNumberValueValidationFailed: false,
      isDescriptionValidsationFailed: false,
      isRemarksValidationFailed: false,
      animalEnclosures: [],
      parentAnimals: [],
      isAnimalSearchModalOpen: false,
      isAnimalSectionMenuOpen: false,
      isAnimalEnclosureMenuOpen: false,
      animalSectionName: undefined,
      parentEnclosureID: undefined,
      searchValue: "",
      searchFor: undefined,
      isFetchingParent: true,
      type: "",
    };
    this.scrollViewRef = React.createRef();
  }

  componentDidMount = () => {
    // let animalID = this.context.selectedAnimalID;
    let { id, englishName } = this.state;
    let cid = this.context.userDetails.cid;
    let animalID = this.context.selectedAnimalID;
    Promise.all([
      getCommonNameSections(englishName),
      parseInt(id) === 0 ? getAnimalID() : getAnimalPedigree(id),
      getAnimalFarms(cid),
      getAnimalOrigins(),
      getAnimalOwners(),
      getAnimalEnclosureTypes(cid),
      getAnimalProfileData(animalID),
    ])
      .then((response) => {
        console.log("response[2]....", response[2]);
        let stateObj = {
          animalSections: response[0].map((v, i) => ({
            id: v.section_id,
            name: v.section_name,
            value: v.enclosure_ids,
          })),
          animalFarms: response[2].map((v, i) => ({
            id: v.id,
            name: v.name,
            value: v.name,
          })),
          animalOrigins: response[3].map((v, i) => ({
            id: v.id,
            name: v.name,
            value: v.name,
          })),
          animalOwners: response[4].map((v, i) => ({
            id: v.id,
            name: v.name,
            value: v.name,
          })),
          enclosureTypes: response[5].map((v, i) => ({
            id: v.id,
            name: v.name,
            value: v.name,
          })),

          showLoader: false,
        };

        if (parseInt(id) > 0) {
          let data = response[1];
          let dob;
          let approxDOB;
          if (data.dobSelected == "true") {
            dob = new Date(data.dob);
          } else {
            dob = new Date();
          }

          if (data.approxDOBSelected == "true") {
            approxDOB = new Date(data.approxDOB);
          } else {
            approxDOB = new Date();
          }
          stateObj.dob = dob;
          stateObj.animalID = data.animal_id;
          stateObj.approxDOB = approxDOB;
          stateObj.dobSelected = data.dobSelected;
          stateObj.approxDOBSelected = data.approxDOBSelected;
          stateObj.approxAge = data.approxAge;
          stateObj.placeOfBirth =
            data.place_of_birth !== null ? data.place_of_birth : "";
          stateObj.sex = data.sex !== null ? data.sex : "";
          stateObj.mother = data.mother !== null ? data.mother : "";
          stateObj.father = data.father !== null ? data.father : "";
          stateObj.color = data.color !== null ? data.color : "";
          stateObj.birthWeight =
            data.birth_weight !== null ? data.birth_weight : "";
          stateObj.birth_type = data.birth_type !== null ? data.birth_type : "";
          stateObj.conditionOnArrivalOrBirth =
            data.condition_on_arrival_birth !== null
              ? data.condition_on_arrival_birth
              : "";
          stateObj.englishName =
            data.english_name !== null ? data.english_name : "";
          stateObj.source = data.source !== null ? data.source : undefined;
          stateObj.father = data.father !== null ? data.father : "";
          stateObj.mother = data.mother !== null ? data.mother : "";
          stateObj.referenceNumber =
            data.ref_inv_no !== null ? data.ref_inv_no : "";
          stateObj.sourceDate =
            data.source_date !== null ? new Date(data.source_date) : new Date();
          stateObj.identificationType =
            data.identification_type !== null
              ? data.identification_type
              : undefined;
          stateObj.dna = data.dna !== null ? data.dna : "";
          stateObj.microchip = data.microchip !== null ? data.microchip : "";
          stateObj.ringNumber =
            data.ring_number !== null ? data.ring_number : "";
          stateObj.animal_status =
            data.animal_status !== null ? data.animal_status : "";
          stateObj.animal_dead_reason =
            data.animal_dead_reason !== null ? data.animal_dead_reason : "";
          stateObj.imageURI =
            data.dna_image !== null
              ? `${Configs.IMAGE_URL}upload/icon/${data.dna_image}`
              : undefined;
          stateObj.animalImages =
            data.animal_images !== null
              ? data.animal_images.map((item) => {
                  return `${Configs.IMAGE_URL}upload/photos/${item}`;
                })
              : [];
          console.log(
            "..... stateObj.animalImages.....",
            stateObj.animalImages
          );
        } else {
          stateObj.animalID = response[1];
        }
        this.setState(stateObj, () => {
          this.getCurrentAge();
        });

        // let stateObj = {

        // };

        let data = response[6];

        console.log("RESPONSE 7****", data);

        stateObj.fullName = data.full_name !== null ? data.full_name : "";
        stateObj.englishName =
          data.english_name !== null ? data.english_name : "";
        stateObj.groupID = data.group_id;
        stateObj.categoryID = data.category_id;
        stateObj.subCategoryID =
          data.sub_category_id !== null ? data.sub_category_id : undefined;
        stateObj.animalType =
          data.type !== null ? data.type : Configs.ANIMAL_TYPE_INDIVIDUAL;
        stateObj.animalID = data.animal_id;
        stateObj.database =
          data.databasee !== null ? data.databasee : undefined;
        stateObj.taxoinid = data.taxonid !== null ? data.taxonid : "";
        stateObj.enclosureTypeID =
          data.enclosure_type_id !== null ? data.enclosure_type_id : undefined;
        stateObj.enclosureType =
          data.enclosure_type_name !== null
            ? data.enclosure_type_name
            : undefined;
        stateObj.enclosureId =
          data.enclosure_id !== null ? data.enclosure_id : undefined;
        stateObj.enclosureIDName =
          data.enclosure_id_name !== null ? data.enclosure_id_name : undefined;

        stateObj.farm = data.farm !== null ? data.farm : undefined;
        stateObj.origin = data.origin !== null ? data.origin : undefined;
        stateObj.owner = data.owner !== null ? data.owner : undefined;

        stateObj.pariveshID = data.parivesh_id !== null ? data.parivesh_id : "";
        stateObj.description =
          data.description !== null ? data.description : "";
        stateObj.remarks = data.remarks !== null ? data.remarks : "";
        stateObj.gender = data.gender !== null ? data.gender : "";

        this.getEnclosureIds(data.enclosure_type_id);

        this.setState(stateObj);
      })
      .catch((error) => console.log(error));

    console.log("Age", this.state.age);
  };

  componentDidUpdate() {
    // console.log("Age did update", this.state.age)
  }

  chooseIcon = () => {
    ImagePicker.requestMediaLibraryPermissionsAsync().then((status) => {
      if (status.granted) {
        this.setState({
          imageURI: undefined,
          imageData: undefined,
        });

        let optins = {
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          // allowsEditing: false,
          // presentationStyle: 0,
          quality: 1,
        };

        ImagePicker.launchImageLibraryAsync(optins).then((result) => {
          if (!result.cancelled) {
            this.setState({
              imageURI: result.uri,
              imageData: getFileData(result),
            });
          }
        });
      } else {
        Alert.alert("Please allow permission to choose an icon");
      }
    });
  };

  chooseAnimalPhotos = () => {
    ImagePicker.requestMediaLibraryPermissionsAsync().then((status) => {
      if (status.granted) {
        this.setState({
          animalSingleimageURI: undefined,
          animalSingleimageData: undefined,
        });

        let optins = {
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          // allowsEditing: false,
          quality: 1,
          // presentationStyle: 0,
        };

        ImagePicker.launchImageLibraryAsync(optins).then((result) => {
          if (!result.cancelled) {
            this.setState(
              {
                animalSingleimageURI: result.uri,
                animalSingleimageData: getFileData(result),
                animalImages: [...this.state.animalImages, result.uri],
                showLoader: true,
              },
              () => {
                this.docUploadHandler({
                  data: getFileData(result),
                });
              }
            );
          }
        });
      } else {
        Alert.alert("Please allow permission to choose an icon");
      }
    });
  };

  docUploadHandler = (data) => {
    data.animal_id = this.state.animalID;
    uploadAnimalImages(data)
      .then((res) => {
        console.log("Response", res);
        if (res.check == "success") {
          this.setState({ imageLoader: false, showLoader: false });
        } else {
          this.setState({ imageLoader: false, showLoader: false });
          alert("Please reupload the last image");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.dob;
    this.setState({
      show: false,
      dob: currentDate,
      dobSelected: true,
      approxDOBSelected: false,
    });
  };

  onChangeSourceDate = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.dob;
    this.setState({
      showSourceDate: false,
      sourceDate: currentDate,
    });
  };

  onChangeApproxDate = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.dob;
    this.setState(
      {
        showApproxDOB: false,
        approxDOB: currentDate,
        approxDOBSelected: true,
        dobSelected: false,
      },
      () => this.calCulateApproxAge(currentDate)
    );
  };

  toggleFarmMenu = () =>
    this.setState({ isFarmMenuOpen: !this.state.isFarmMenuOpen });
  toggleOriginMenu = () =>
    this.setState({ isOrigniMenuOpen: !this.state.isOrigniMenuOpen });
  toggleOwnerMenu = () =>
    this.setState({ isOwnerMenuOpen: !this.state.isOwnerMenuOpen });
  toggleEnclosureTypeMenu = () =>
    this.setState({
      isEnclosureTypeMenuOpen: !this.state.isEnclosureTypeMenuOpen,
    });
  toggleEnclosureIDMenu = () =>
    this.setState({
      isEnclosureIDMenuOpen: !this.state.isEnclosureIDMenuOpen,
    });

  // showSourceDatepicker = () => this.setState({ showSourceDate: true });

  // showApproximateDOBpicker = () => this.setState({ showApproxDOB: true });

  calCulateApproxAge = (dob) => {
    let result = calculateAge(new Date(), dob);
    this.setState({
      approxAge: result.age,
      age: result.age,
    });
  };

  getCurrentAge = () => {
    let result = {
      age: "1",
    };
    let { dobSelected, approxDOBSelected, dob, approxDOB } = this.state;
    if (dobSelected == "true") {
      result = calculateAge(new Date(), dob);
      this.setState({ age: result.age, approxAge: 0 });
    }
    if (approxDOBSelected == "true") {
      result = calculateAge(new Date(), approxDOB);
      this.setState({ age: result.age });
    }
    this.setState({ showLoader: false });
  };

  handleApproxAge = (approxAge) => {
    let date = moment();
    let age = approxAge.split(" ");
    if (age[1] == "Y") {
      let dob = date.subtract(age[0], "years");
      this.setState({
        approxDOB: new Date(dob),
        approxDOBSelected: true,
        dobSelected: false,
        dob: new Date(),
      });
    }

    if (age[1] == "M") {
      let dob = date.subtract(age[0], "months");
      this.setState({
        approxDOB: new Date(dob),
        approxDOBSelected: true,
        dobSelected: false,
        dob: new Date(),
      });
    }

    this.setState({ approxAge: approxAge, age: approxAge });
  };
  toggleIdentificationTypeMenu = () =>
    this.setState({
      isIdentificationTypeMenuOpen: !this.state.isIdentificationTypeMenuOpen,
    });

  toggleSexIdentificationTypeMenu = () =>
    this.setState({
      isSexIdentificationTypeMenuOpen:
        !this.state.isSexIdentificationTypeMenuOpen,
    });

  setSexIdentificationType = (type) =>
    this.setState({
      sexIdentificationType: type,
      isSexIdentificationTypeMenuOpen: false,
    });

  setSource = (v) => {
    this.setState({
      source: v.value,
      isSourceMenuOpen: false,
    });
  };
  setFarmData = (v) => {
    console.log("............v...........", v);
    this.setState({
      farm: v.value,
      isFarmMenuOpen: false,
    });
  };
  setOriginData = (v) => {
    this.setState({
      origin: v.value,
      isOrigniMenuOpen: false,
    });
  };
  setOwnerData = (v) => {
    this.setState({
      owner: v.value,
      isOwnerMenuOpen: false,
    });
  };
  setEnclosureType = (v) => {
    this.setState(
      {
        enclosureTypeID: v.id,
        enclosureType: v.value,
        isEnclosureTypeMenuOpen: false,
        enclosureId: undefined,
        enclosureIDName: undefined,
        showLoader: true,
      },
      () => {
        this.getEnclosureIds(v.id);
      }
    );
  };

  setIdentificationType = (v) => {
    this.setState({
      identificationType: v.value,
      isIdentificationTypeMenuOpen: false,
    });
  };
  toggleSourceMenu = () =>
    this.setState({ isSourceMenuOpen: !this.state.isSourceMenuOpen });

  toggleAnimalSectionMenu = () =>
    this.setState({
      isAnimalSectionMenuOpen: !this.state.isAnimalSectionMenuOpen,
    });

  toggleAnimalEnclosureMenu = () =>
    this.setState({
      isAnimalEnclosureMenuOpen: !this.state.isAnimalEnclosureMenuOpen,
    });
  toggleGenderMenu = () =>
    this.setState({
      isGenderMenuOpen: !this.state.isGenderMenuOpen,
    });

  toggleBirthTypeMenu = () => {
    this.setState({
      isBirthTypeMenuOpen: !this.state.isBirthTypeMenuOpen,
    });
  };

  toggleAnimalStatusMenu = () => {
    this.setState({
      isAnimalStatusMenuOpen: !this.state.isAnimalStatusMenuOpen,
    });
  };

  setParentEnclosure = (v) => {
    let { englishName } = this.state;
    console.log("..........englishName........", englishName);
    this.setState(
      {
        parentEnclosureID: v.value,
        parentEnclosureIDName: v.name,
        isAnimalEnclosureMenuOpen: false,
        isFetchingParent: true,
        parentAnimals: [],
        searchValue: "",
        showLoader: true,
      },
      () => {
        getParentAnimals(englishName, v.value)
          .then((data) => {
            this.setState({
              isFetchingParent: false,
              showLoader: false,
              parentAnimals: data,
            });
          })
          .catch((error) => console.log(error));
      }
    );
  };

  setGender = (v) => {
    this.setState({
      sex: v.value,
      isGenderMenuOpen: false,
    });
  };

  setBirthType = (v) => {
    this.setState({
      birth_type: v.value,
      isBirthTypeMenuOpen: false,
    });
  };

  setAnimalStatus = (v) => {
    this.setState({
      animal_status: v.value,
      isAnimalStatusMenuOpen: false,
      animalDeadReasonModalVisible: v.value == "Dead" ? true : false,
    });
  };

  openSearchModal = (searchFor) => {
    this.setState({
      isAnimalSearchModalOpen: true,
      searchFor: searchFor,
      animalSectionName: undefined,
      animalEnclosures: [],
      parentEnclosureID: undefined,
      parentEnclosureIDName: undefined,
      isFetchingParent: true,
      parentAnimals: [],
      searchValue: "",
    });
  };

  closeSearchModal = () => {
    this.setState({
      isAnimalSearchModalOpen: false,
      searchFor: "",
      animalSectionName: undefined,
      animalEnclosures: [],
      parentEnclosureID: undefined,
      parentEnclosureIDName: undefined,
      isFetchingParent: true,
      parentAnimals: [],
      searchValue: "",
    });
  };

  selectParent = (animalCode) => {
    let stateObj = {
      isAnimalSearchModalOpen: false,
      searchFor: "",
      animalSectionName: undefined,
      animalEnclosures: [],
      parentEnclosureID: undefined,
      parentEnclosureIDName: undefined,
      isFetchingParent: true,
      parentAnimals: [],
      searchValue: "",
    };

    if (this.state.searchFor === "father") {
      stateObj.father = animalCode;
    } else {
      stateObj.mother = animalCode;
    }

    this.setState(stateObj);
  };

  getParentAnimalsData = () => {
    let { parentAnimals, searchValue } = this.state;
    console.log("......parentAnimals............", parentAnimals);
    let data = parentAnimals.filter((element) => {
      let animalID = element.animal_id.toLowerCase();
      let index = animalID.indexOf(searchValue.toLowerCase());
      return index > -1;
    });

    return data;
  };
  getEnclosureIds = (enclosureTypeID) => {
    let reqObj = {
      cid: this.context.userDetails.cid,
      enclosure_type_id: enclosureTypeID,
    };
    getAnimalEnclosureIds(reqObj)
      .then((data) => {
        this.setState({
          enclosureIds: data.map((v, i) => ({
            id: v.id,
            name: v.enclosure_id,
            value: v.enclosure_id,
          })),
          showLoader: false,
        });
      })
      .catch((error) => console.log(error));
  };
  setEnclosureID = (v) => {
    this.setState({
      enclosureId: v.id,
      enclosureIDName: v.value,
      isEnclosureIDMenuOpen: false,
    });
  };

  setAnimalSection = (v) => {
    this.setState(
      {
        animalSectionName: v.name,
        isAnimalSectionMenuOpen: false,
        parentEnclosureID: undefined,
        parentEnclosureIDName: undefined,
        isFetchingParent: true,
        parentAnimals: [],
        searchValue: "",
        showLoader: true,
      },
      () => {
        let { englishName } = this.state;
        let ids = v.value.join(",");

        getCommonNameEnclosures(englishName, v.id)
          .then((data) => {
            this.setState({
              showLoader: false,
              animalEnclosures: data.map((v, i) => ({
                id: v.id,
                name: v.enclosure_id,
                value: v.id,
              })),
            });
          })
          .catch((error) => console.log(error));
      }
    );
  };

  scrollViewScrollTop = () =>
    this.scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });

  savePedigreeData = () => {
    let {
      placeOfBirth,
      sex,
      mother,
      father,
      color,
      birthWeight,
      conditionOnArrivalOrBirth,
      dobSelected,
      approxDOBSelected,
      source,
      identificationType,
      dna,
      microchip,
      ringNumber,
      birth_type,
      animal_status,
      animal_dead_reason,
      enclosureType,
      enclosureId,
      farm,
      origin,
      owner,
      gender,
    } = this.state;

    // this.setState(
    //   {
    //     isplaceOfBirthValidationFailed: false,
    //     isSexValidationFailed: false,
    //     isMotherValidationFailed: false,
    //     isFatherValidationFailed: false,
    //     isColorValidationFailed: false,
    //     isBirthWeightValidationFailed: false,
    //     isConditionOnArrivalOrBirthValidationFailed: false,
    //     isIdentificationTypeValidationFailed: false,
    //     isDNAValueValidationFailed: false,
    //     isMicrochipValueValidationFailed: false,
    //     isRingNumberValueValidationFailed: false,
    //     isEnclosureTypeValidationFailed: false,
    //     isEnclosureIDValidationFailed: false,
    //     isSourceValidationFailed: false,
    //     isFarmValidationFailed: false,
    //     isOriginValidationFailed: false,
    //     isOwnerValidationFailed: false,
    //     isGenderValidationFailed: false,
    //   },
    //   () => {
    //     if (identificationType === undefined) {
    //       this.setState({ isIdentificationTypeValidationFailed: true,current_step : 1 });
    //       this.scrollViewScrollTop();
    //     } else if (placeOfBirth.trim().length === 0) {
    //       this.setState({ isplaceOfBirthValidationFailed: true });
    //       this.scrollViewScrollTop();
    //     } else if (typeof sex === "undefined") {
    //       this.setState({ isSexValidationFailed: true });
    //     } else if (color.trim().length === 0) {
    //       this.setState({ isColorValidationFailed: true });
    //     } else if (birthWeight.trim().length === 0) {
    //       this.setState({ isBirthWeightValidationFailed: true });
    //     }else  if (
    //       (identificationType === "DNA" ||
    //         identificationType === "DNA-Microchip" ||
    //         identificaelsetionType === "DNA-Ring Number" ||
    //         identificationType === "DNA-Microchip-Ring Number") &&
    //       dna.trim().length === 0
    //     ) {
    //       this.setState({ isDNAValueValidationFailed: true });
    //     } else if (typeof enclosureType === "undefined") {
    //       this.setState({ isEnclosureTypeValidationFailed: true });
    //       this.scrollViewScrollTop();
    //     } else if (typeof enclosureId === "undefined") {
    //       this.setState({ isEnclosureIDValidationFailed: true });
    //       this.scrollViewScrollTop();
    //     } else if (typeof farm === "undefined") {
    //       this.setState({ isFarmValidationFailed: true });
    //       this.scrollViewScrollTop();
    //     } else if (typeof origin === "undefined") {
    //       this.setState({ isOriginValidationFailed: true });
    //     } else if (typeof owner === "undefined") {
    //       this.setState({ isOwnerValidationFailed: true });
    //     }else if (typeof identificationType === "undefined") {
    //       this.setState({ isOwnerValidationFailed: true });
    //     } else if (
    //       (identificationType === "Microchip" ||
    //         identificationType === "DNA-Microchip" ||
    //         identificationType === "Microchip-Ring Number" ||
    //         identificationType === "DNA-Microchip-Ring Number") &&
    //       microchip.trim().length === 0
    //     ) {
    //       this.setState({ isMicrochipValueValidationFailed: true });
    //     } else if (
    //       (identificationType === "Ring Number" ||
    //         identificationType === "DNA-Ring Number" ||
    //         identificationType === "Microchip-Ring Number" ||
    //         identificationType === "DNA-Microchip-Ring Number") &&
    //       ringNumber.trim().length === 0
    //     ) {
    //       this.setState({ isRingNumberValueValidationFailed: true });
    //     } else {
    this.setState({ showLoader: true });
    let obj = {
      id: this.state.id,
      cid: this.context.userDetails.cid,
      animal_id: this.state.animalID,
      full_name: this.state.fullName,
      english_name: this.state.englishName,
      animal_group: this.state.groupID,
      category: this.state.categoryID,
      sub_category:
        typeof this.state.subCategoryID !== "undefined"
          ? this.state.subCategoryID
          : "",
      type: this.state.animalType,
      databasee:
        typeof this.state.database !== "undefined" ? this.state.database : "",
      taxonid: this.state.taxoinid,
      place_of_birth: placeOfBirth,
      sex: sex,
      sex_identification_type:
        typeof this.state.sexIdentificationType !== "undefined"
          ? this.state.sexIdentificationType
          : "",
      mother: mother,
      father: father,
      color: color,
      birth_weight: birthWeight,
      birth_type: birth_type,
      condition_on_arrival_birth: conditionOnArrivalOrBirth,
      age: this.state.age,
      dobSelected: this.state.dobSelected,
      approxDOBSelected: this.state.approxDOBSelected,
      approxAge: this.state.approxAge,

      source: source,
      father: this.state.father,
      mother: this.state.mother,
      ref_inv_no: this.state.referenceNumber,
      source_date: getFormattedDate(this.state.sourceDate),
      identification_type: identificationType,
      dna: dna,
      microchip: microchip,
      ring_number: ringNumber,
      animal_status: animal_status,
      animal_dead_reason: animal_dead_reason,
      enclosure_type: this.state.enclosureTypeID,
      enclosure_id: enclosureId,
      parivesh_id: this.state.pariveshID,
      farm: farm,
      origin: origin,
      owner: owner,
      description: this.state.description,
      remarks: this.state.remarks,
    };
    if (typeof this.state.imageData !== "undefined") {
      obj.image = this.state.imageData;
    }
    if (dobSelected) {
      obj.dob = getFormattedDate(this.state.dob);
    } else {
      obj.dob = getFormattedDate(this.state.approxDOB);
    }

    if (approxDOBSelected) {
      obj.approxDOB = getFormattedDate(this.state.approxDOB);
    } else {
      obj.approxDOB = null;
    }
    console.log("..........obj.........", obj);
    createAnimalProfile(obj)
      .then((response) => {
        console.log("Response>>>>>>>>>>>>>>>>>", response);
        this.context.setAnimalID(this.state.animalID);
        let msg =
          parseInt(this.state.id) > 0
            ? "Profile Updated Successfully"
            : "Profile Created Successfully";
        this.setState(
          {
            showLoader: false,
          },
          () => {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
          }
        );
      })
      .catch((error) => console.log(error));
    //     }
    //   }
    // );
  };

  showDatePicker = (type) => {
    this.setState({ show: true, type: type });
  };

  handleConfirm = (selectDate) => {
    const currentDate = selectDate || this.state.dob;
    if (this.state.type == "sourceDate") {
      this.setState({
        sourceDate: currentDate,
      });
    } else if (this.state.type == "dob") {
      this.setState({
        dob: currentDate,
      });
    }
    {
      this.setState({
        approxDOB: currentDate,
      });
    }
    this.hideDatePicker();
  };

  hideDatePicker = () => {
    this.setState({ show: false });
  };
  current_step = (step) => {
    console.log(step);
    this.setState({
      currentstep: step,
    });
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
        onPress={this.selectParent.bind(this, item.animal_id)}
      >
        <View style={globalStyles.listItemContainer}>
          <View
            style={[globalStyles.width85, globalStyles.justifyContentCenter]}
          >
            <Text style={globalStyles.titleText}>{item.animal_id}</Text>
            <Text style={globalStyles.subText}>{item.english_name}</Text>
            {identificationValues.length > 0 ? (
              <Text style={globalStyles.subText}>
                {identificationValues.join("-")}
              </Text>
            ) : null}
          </View>
          <View style={globalStyles.angelIconContainer}>
            <Ionicons
              name="chevron-forward"
              style={globalStyles.rightAngelIcon}
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  nextForm = (data) => {
    //  console.log(data);
    let {
      placeOfBirth,
      sex,
      mother,
      father,
      color,
      birthWeight,
      conditionOnArrivalOrBirth,
      dobSelected,
      approxDOBSelected,
      source,
      identificationType,
      dna,
      microchip,
      ringNumber,
      birth_type,
      animal_status,
      animal_dead_reason,
      enclosureType,
      enclosureId,
      farm,
      origin,
      owner,
      gender,
    } = this.state;
    let identificaelsetionType;
    this.setState(
      {
        isplaceOfBirthValidationFailed: false,
        isSexValidationFailed: false,
        isMotherValidationFailed: false,
        isFatherValidationFailed: false,
        isColorValidationFailed: false,
        isBirthWeightValidationFailed: false,
        isConditionOnArrivalOrBirthValidationFailed: false,
        isIdentificationTypeValidationFailed: false,
        isDNAValueValidationFailed: false,
        isMicrochipValueValidationFailed: false,
        isRingNumberValueValidationFailed: false,
        isEnclosureTypeValidationFailed: false,
        isEnclosureIDValidationFailed: false,
        isSourceValidationFailed: false,
        isFarmValidationFailed: false,
        isOriginValidationFailed: false,
        isOwnerValidationFailed: false,
        isGenderValidationFailed: false,
      },
      () => {
        // Validation for first page
        if (data == 1) {
          if (identificationType === undefined) {
            this.setState({ isIdentificationTypeValidationFailed: true });
          } else if (
            (identificationType === "DNA" ||
              identificationType === "DNA-Microchip" ||
              identificaelsetionType === "DNA-Ring Number" ||
              identificationType === "DNA-Microchip-Ring Number") &&
            dna.trim().length === 0
          ) {
            this.setState({ isDNAValueValidationFailed: true });
          } else if (
            (identificationType === "Microchip" ||
              identificationType === "DNA-Microchip" ||
              identificationType === "Microchip-Ring Number" ||
              identificationType === "DNA-Microchip-Ring Number") &&
            microchip.trim().length === 0
          ) {
            this.setState({ isMicrochipValueValidationFailed: true });
          } else if (
            (identificationType === "Ring Number" ||
              identificationType === "DNA-Ring Number" ||
              identificationType === "Microchip-Ring Number" ||
              identificationType === "DNA-Microchip-Ring Number") &&
            ringNumber.trim().length === 0
          ) {
            this.setState({ isRingNumberValueValidationFailed: true });
          } else if (source === undefined) {
            this.setState({ isSourceValidationFailed: true });
          } else {
            this.setState({
              currentstep: data + 1,
            });
          }
          // Validation for second page
        } else if (data == 2) {
          if (placeOfBirth.trim().length === 0) {
            this.setState({ isplaceOfBirthValidationFailed: true });
          } else if (typeof sex === "undefined") {
            this.setState({ isSexValidationFailed: true });
          } else if (color.trim().length === 0) {
            this.setState({ isColorValidationFailed: true });
          } else if (birthWeight.trim().length === 0) {
            this.setState({ isBirthWeightValidationFailed: true });
          } else {
            this.setState({
              currentstep: data + 1,
            });
          }
        } else if (data == 3) {
          if (typeof enclosureType === "undefined") {
            this.setState({ isEnclosureTypeValidationFailed: true });
            this.scrollViewScrollTop();
          } else if (typeof enclosureId === "undefined") {
            this.setState({ isEnclosureIDValidationFailed: true });
            this.scrollViewScrollTop();
          } else if (typeof farm === "undefined") {
            this.setState({ isFarmValidationFailed: true });
            this.scrollViewScrollTop();
          } else if (typeof origin === "undefined") {
            this.setState({ isOriginValidationFailed: true });
          } else if (typeof owner === "undefined") {
            this.setState({ isOwnerValidationFailed: true });
          } else {
            this.setState({
              currentstep: data + 1,
            });
          }
        } else {
          this.setState({
            currentstep: data + 1,
          });
        }
      }
    );
  };

  preForm = (data) => {
    console.log(data);
    this.setState({
      currentstep: data - 1,
    });
  };

  render = () => (
    <>
      <View
        style={[
          globalStyles.flexDirectionRow,
          globalStyles.alignItemsCenter,
          globalStyles.justifyContentCenter,
        ]}
      >
        <Text style={[globalStyles.step_nav, globalStyles.activeText]}>1</Text>

        {this.state.currentstep == 2 || this.state.currentstep == 3 ? (
          <Text
            style={{
              backgroundColor: Colors.primary,
              height: 3,
              width: "28%",
            }}
          ></Text>
        ) : (
          <Text
            style={{
              backgroundColor: Colors.activeTab,
              height: 3,
              width: "28%",
            }}
          ></Text>
        )}

        {this.state.currentstep == 2 || this.state.currentstep == 3 ? (
          <Text style={[globalStyles.activeText, globalStyles.step_nav]}>
            2
          </Text>
        ) : (
          <Text
            style={[globalStyles.activeText, globalStyles.inactive_step_nav]}
          >
            2
          </Text>
        )}
        {this.state.currentstep == 3 ? (
          <Text
            style={{
              backgroundColor: Colors.primary,
              height: 3,
              width: "28%",
            }}
          ></Text>
        ) : (
          <Text
            style={{
              backgroundColor: Colors.activeTab,
              height: 3,
              width: "28%",
            }}
          ></Text>
        )}
        {this.state.currentstep == 3 ? (
          <Text style={[globalStyles.activeText, globalStyles.step_nav]}>
            3
          </Text>
        ) : (
          <Text
            style={[globalStyles.activeText, globalStyles.inactive_step_nav]}
          >
            3
          </Text>
        )}
      </View>

      <ScrollView ref={this.scrollViewRef} showsVerticalScrollIndicator={false}>
        <View style={globalStyles.container}>
          {this.state.currentstep == "1" ? (
            <>
              <View style={globalStyles.formBorder}>
                <View style={globalStyles.fieldBox}>
                  <Text style={globalStyles.labelName}>
                    Upload animal photos
                  </Text>
                  <TouchableOpacity
                    activeOpacity={1}
                    // style={globalStyles.imagePicker}
                    onPress={this.chooseAnimalPhotos}
                  >
                    {typeof this.state.animalSingleimageURI !== "undefined" ? (
                      <Image
                        style={styles.animalImage}
                        source={{ uri: this.state.animalSingleimageURI }}
                      />
                    ) : (
                      <Ionicons
                        name="image"
                        style={styles.animalDefaultImage}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {this.state.animalImages.length > 0 ? (
                  <View
                    style={{
                      borderWidth: 0.5,
                      borderColor: "#ccc",
                      width: "100%",
                      height: 110,
                      justifyContent: "center",
                    }}
                  >
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={globalStyles.alignItemsCenter}
                    >
                      {this.state.animalImages.length > 0
                        ? this.state.animalImages.map((item, index) => {
                            return (
                              <View key={index}>
                                <Image
                                  key={index}
                                  source={{ uri: item }}
                                  style={{
                                    height: 100,
                                    width: 100,
                                    marginHorizontal: 3,
                                    borderWidth: 0.6,
                                    borderColor: "rgba(68,68,68,0.4)",
                                  }}
                                />
                              </View>
                            );
                          })
                        : null}
                    </ScrollView>
                  </View>
                ) : null}
                <InputDropdown
                  label={"Identification Type:"}
                  isMandatory={true}
                  value={this.state.identificationType}
                  isOpen={this.state.isIdentificationTypeMenuOpen}
                  items={Configs.ANIMAL_IDENTIFICATION_TYPES}
                  openAction={this.toggleIdentificationTypeMenu}
                  closeAction={this.toggleIdentificationTypeMenu}
                  setValue={this.setIdentificationType}
                  labelStyle={globalStyles.labelName}
                  textFieldStyle={[
                    globalStyles.textfield,
                    this.state.identificationType
                      ? [globalStyles.width50, styles.pl0]
                      : null,
                  ]}
                  style={[
                    globalStyles.fieldBox,
                    this.state.isIdentificationTypeValidationFailed
                      ? globalStyles.errorFieldBox
                      : null,
                  ]}
                />

                {this.state.identificationType === "DNA" ||
                this.state.identificationType === "DNA-Microchip" ||
                this.state.identificationType === "DNA-Ring Number" ||
                this.state.identificationType ===
                  "DNA-Microchip-Ring Number" ? (
                  <>
                    <View
                      style={[
                        globalStyles.fieldBox,
                        this.state.isDNAValueValidationFailed
                          ? globalStyles.errorFieldBox
                          : null,
                      ]}
                    >
                      <Text style={globalStyles.labelName}>
                        DNA:<Text style={{ color: Colors.tomato }}> *</Text>
                      </Text>
                      <TextInput
                        value={this.state.dna}
                        onChangeText={(dna) => this.setState({ dna })}
                        style={[globalStyles.textfield, globalStyles.width50]}
                        autoCompleteType="off"
                      />
                    </View>

                    <View style={globalStyles.fieldBox}>
                      <Text style={globalStyles.labelName}>Choose Image</Text>
                      <TouchableOpacity
                        activeOpacity={1}
                        // style={globalStyles.imagePicker}
                        onPress={this.chooseIcon}
                      >
                        {typeof this.state.imageURI !== "undefined" ? (
                          <Image
                            style={styles.animalImage}
                            source={{ uri: this.state.imageURI }}
                          />
                        ) : (
                          <Ionicons
                            name="image"
                            style={styles.animalDefaultImage}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </>
                ) : null}

                {this.state.identificationType === "Microchip" ||
                this.state.identificationType === "DNA-Microchip" ||
                this.state.identificationType === "Microchip-Ring Number" ||
                this.state.identificationType ===
                  "DNA-Microchip-Ring Number" ? (
                  <View
                    style={[
                      globalStyles.fieldBox,
                      this.state.isMicrochipValueValidationFailed
                        ? globalStyles.errorFieldBox
                        : null,
                    ]}
                  >
                    <Text style={globalStyles.labelName}>
                      Microchip:<Text style={{ color: Colors.tomato }}> *</Text>
                    </Text>
                    <TextInput
                      value={this.state.microchip}
                      onChangeText={(microchip) => this.setState({ microchip })}
                      style={[globalStyles.textfield, globalStyles.width50th50]}
                      autoCompleteType="off"
                    />
                  </View>
                ) : null}

                {this.state.identificationType === "Ring Number" ||
                this.state.identificationType === "DNA-Ring Number" ||
                this.state.identificationType === "Microchip-Ring Number" ||
                this.state.identificationType ===
                  "DNA-Microchip-Ring Number" ? (
                  <View
                    style={[
                      globalStyles.fieldBox,
                      this.state.isRingNumberValueValidationFailed
                        ? globalStyles.errorFieldBox
                        : null,
                    ]}
                  >
                    <Text style={globalStyles.labelName}>
                      Ring Number:
                      <Text style={{ color: Colors.tomato }}> *</Text>
                    </Text>
                    <TextInput
                      value={this.state.ringNumber}
                      onChangeText={(ringNumber) =>
                        this.setState({ ringNumber })
                      }
                      style={[globalStyles.textfield, globalStyles.width50]}
                      autoCompleteType="off"
                    />
                  </View>
                ) : null}

                <InputDropdown
                  label={"Transferred IN:"}
                  isMandatory={true}
                  value={this.state.source}
                  isOpen={this.state.isSourceMenuOpen}
                  items={Configs.ANIMAL_SOURCES}
                  openAction={this.toggleSourceMenu}
                  closeAction={this.toggleSourceMenu}
                  setValue={this.setSource}
                  labelStyle={globalStyles.labelName}
                  textFieldStyle={[
                    globalStyles.textfield,
                    this.state.source ? globalStyles.width50 : null,
                  ]}
                  style={[
                    globalStyles.fieldBox,
                    this.state.isSourceValidationFailed
                      ? globalStyles.errorFieldBox
                      : null,
                  ]}
                />

                {this.state.source === "In House Breading" ? (
                  <>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={globalStyles.fieldBox}
                      onPress={this.openSearchModal.bind(this, "father")}
                    >
                      <Text style={globalStyles.labelName}>Father:</Text>
                      <TextInput
                        editable={false}
                        value={this.state.father}
                        onChangeText={(father) => this.setState({ father })}
                        style={[
                          globalStyles.width50,
                          globalStyles.textfield,
                          globalStyles.width50th50,
                        ]}
                        autoCompleteType="off"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={globalStyles.fieldBox}
                      onPress={this.openSearchModal.bind(this, "mother")}
                    >
                      <Text style={globalStyles.labelName}>Mother:</Text>
                      <TextInput
                        editable={false}
                        value={this.state.mother}
                        onChangeText={(mother) => this.setState({ mother })}
                        style={[globalStyles.textfield, globalStyles.width50]}
                        autoCompleteType="off"
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={globalStyles.fieldBox}>
                    <Text style={globalStyles.labelName}>Ref/Invoice No.</Text>
                    <TextInput
                      value={this.state.referenceNumber}
                      onChangeText={(referenceNumber) =>
                        this.setState({ referenceNumber })
                      }
                      style={[globalStyles.textfield, globalStyles.width50]}
                      autoCompleteType="off"
                    />
                  </View>
                )}

                <View style={[globalStyles.fieldBox]}>
                  <Text style={globalStyles.labelName}>Source Date: </Text>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={[
                      globalStyles.flexDirectionRow,
                      globalStyles.alignItemsCenter,
                      globalStyles.width50,
                    ]}
                    onPress={() => {
                      this.showDatePicker("sourceDate");
                    }}
                  >
                    <Text style={[globalStyles.dateField]}>
                      {this.state.sourceDate.toDateString()}
                    </Text>
                    <AntDesign
                      name="calendar"
                      color={Colors.primary}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>

                {/* <DatePicker
                onPress={this.showSourceDatepicker}
                show={this.state.showSourceDate}
                onChange={this.onChangeSourceDate}
                date={this.state.sourceDate}
                mode={"date"}
                label={"Source Date:"}
                style={globalStyles.fieldBox}
              /> */}

                <View style={[globalStyles.fieldBox]}>
                  <Text style={globalStyles.labelName}>Date of Birth: </Text>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={[
                      globalStyles.flexDirectionRow,
                      globalStyles.alignItemsCenter,
                      globalStyles.width50,
                    ]}
                    onPress={() => {
                      this.showDatePicker("dob");
                    }}
                  >
                    <Text style={globalStyles.dateField}>
                      {this.state.dob.toDateString()}
                    </Text>
                    <AntDesign
                      name="calendar"
                      color={Colors.primary}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>

                {/* <DatePicker
                onPress={this.showDatepicker}
                show={this.state.show}
                onChange={this.onChangeDate}
                date={this.state.dob}
                mode={"date"}
                label={"Date of Birth :"}
              /> */}

                <View style={[globalStyles.fieldBox]}>
                  <Text style={globalStyles.labelName}>Approximate DOB: </Text>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={[
                      globalStyles.flexDirectionRow,
                      globalStyles.alignItemsCenter,
                      globalStyles.width50,
                    ]}
                    onPress={() => {
                      this.showDatePicker("approxDOB");
                    }}
                  >
                    <Text style={globalStyles.dateField}>
                      {this.state.approxDOB.toDateString()}
                    </Text>
                    <AntDesign
                      name="calendar"
                      color={Colors.primary}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>

                {/* <DatePicker
                onPress={this.showApproximateDOBpicker}
                show={this.state.showApproxDOB}
                onChange={this.onChangeApproxDate}
                date={this.state.approxDOB}
                mode={"date"}
                label={"Approximate Date of Birth :"}
              /> */}

                <View style={globalStyles.fieldBox}>
                  <Text style={globalStyles.labelName}>Approximate Age: </Text>
                  <TextInput
                    value={this.state.approxAge}
                    onChangeText={(approxAge) =>
                      this.handleApproxAge(approxAge)
                    }
                    style={[globalStyles.textfield, globalStyles.width50]}
                    autoCompleteType="off"
                    autoCapitalize="words"
                    keyboardType="numeric"
                  />
                </View>

                <View style={[globalStyles.fieldBox, globalStyles.bbw0]}>
                  <Text style={globalStyles.labelName}>Age: </Text>
                  <TextInput
                    value={this.state.age}
                    editable={false}
                    style={[globalStyles.textfield, globalStyles.width50]}
                    autoCompleteType="off"
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View
                style={[
                  globalStyles.flexDirectionRow,
                  globalStyles.justifyContentAround,
                ]}
              >
                {/* <TouchableOpacity
                  style={[
                    globalStyles.button,
                    { width: "45%", backgroundColor: "lightgray" },
                  ]}
                >
                  <Text>Back</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={[globalStyles.button, styles.width45]}
                  onPress={() => this.nextForm(this.state.currentstep)}
                >
                  <Text
                    style={{ color: Colors.white, fontSize: Colors.lableSize }}
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              {this.state.currentstep == "2" ? (
                <>
                  <View style={globalStyles.formBorder}>
                    <View
                      style={[
                        globalStyles.fieldBox,
                        this.state.isplaceOfBirthValidationFailed
                          ? globalStyles.errorFieldBox
                          : null,
                      ]}
                    >
                      <Text style={globalStyles.labelName}>
                        Place of Birth:{" "}
                        <Text style={{ color: Colors.tomato }}> *</Text>
                      </Text>
                      <TextInput
                        value={this.state.placeOfBirth}
                        onChangeText={(placeOfBirth) =>
                          this.setState({ placeOfBirth })
                        }
                        style={[globalStyles.textfield, globalStyles.width50]}
                        autoCompleteType="off"
                        autoCapitalize="words"
                      />
                    </View>

                    <InputDropdown
                      label={"Sex:"}
                      isMandatory={true}
                      value={this.state.sex}
                      isOpen={this.state.isGenderMenuOpen}
                      items={Configs.ANIMAL_GENDER}
                      openAction={this.toggleGenderMenu}
                      closeAction={this.toggleGenderMenu}
                      setValue={this.setGender}
                      labelStyle={globalStyles.labelName}
                      textFieldStyle={[
                        globalStyles.textfield,
                        this.state.sex
                          ? [globalStyles.width50, styles.pl0]
                          : null,
                      ]}
                      style={[
                        globalStyles.fieldBox,
                        this.state.isSexValidationFailed
                          ? globalStyles.errorFieldBox
                          : null,
                      ]}
                    />

                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={this.toggleSexIdentificationTypeMenu}
                      style={[
                        globalStyles.fieldBox,
                        this.state.isSexIdentificationTypeValidationFailed
                          ? globalStyles.errorFieldBox
                          : null,
                      ]}
                    >
                      <Text style={globalStyles.labelName}>
                        Identification Type:
                      </Text>
                      <TextInput
                        editable={false}
                        value={this.state.sexIdentificationType}
                        style={[
                          globalStyles.textfield,
                          globalStyles.width50,
                          globalStyles.styles.pl0,
                        ]}
                      />
                    </TouchableOpacity>

                    <View
                      style={[
                        globalStyles.fieldBox,
                        this.state.isColorValidationFailed
                          ? globalStyles.errorFieldBox
                          : null,
                      ]}
                    >
                      <Text style={globalStyles.labelName}>
                        Color :<Text style={{ color: Colors.tomato }}> *</Text>
                      </Text>
                      <TextInput
                        value={this.state.color}
                        onChangeText={(color) => this.setState({ color })}
                        style={[globalStyles.textfield, globalStyles.width50]}
                        autoCompleteType="off"
                        autoCapitalize="words"
                      />
                    </View>

                    <View
                      style={[
                        globalStyles.fieldBox,
                        this.state.isBirthWeightValidationFailed
                          ? globalStyles.errorFieldBox
                          : null,
                      ]}
                    >
                      <Text style={globalStyles.labelName}>
                        Birth Weight :
                        <Text style={{ color: Colors.tomato }}> *</Text>
                      </Text>
                      <TextInput
                        value={this.state.birthWeight}
                        onChangeText={(birthWeight) =>
                          this.setState({ birthWeight })
                        }
                        style={[globalStyles.textfield, globalStyles.width50]}
                        autoCompleteType="off"
                        autoCapitalize="words"
                      />
                    </View>

                    <InputDropdown
                      label={"Birth Type:"}
                      isMandatory={false}
                      value={this.state.birth_type}
                      isOpen={this.state.isBirthTypeMenuOpen}
                      items={Configs.ANIMAL_BIRTH_TYPE}
                      openAction={this.toggleBirthTypeMenu}
                      closeAction={this.toggleBirthTypeMenu}
                      setValue={this.setBirthType}
                      labelStyle={globalStyles.labelName}
                      textFieldStyle={[
                        globalStyles.textfield,
                        this.state.birth_type
                          ? [globalStyles.width50, styles.pl0]
                          : null,
                      ]}
                      style={globalStyles.fieldBox}
                    />

                    <InputDropdown
                      label={"Aminal Status:"}
                      isMandatory={false}
                      value={this.state.animal_status}
                      isOpen={this.state.isAnimalStatusMenuOpen}
                      items={Configs.ANIMAL_STATUS}
                      openAction={this.toggleAnimalStatusMenu}
                      closeAction={this.toggleAnimalStatusMenu}
                      setValue={this.setAnimalStatus}
                      labelStyle={globalStyles.labelName}
                      textFieldStyle={[
                        globalStyles.textfield,
                        this.state.animal_status
                          ? [globalStyles.width50, styles.pl0]
                          : null,
                      ]}
                      style={[globalStyles.fieldBox, globalStyles.bbw0]}
                    />
                  </View>
                  {/* <TouchableOpacity
                            style={globalStyles.button}
                            onPress={this.savePedigreeData.bind(this)}
                        >
                            <Text style={globalStyles.textWhite}>Save Details</Text>
                        </TouchableOpacity> */}
                  <View style={styles.submitBtnContainer}>
                    <TouchableOpacity
                      style={[globalStyles.button, styles.width45]}
                      onPress={() => this.preForm(this.state.currentstep)}
                    >
                      <Text style={styles.btnText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[globalStyles.button, styles.width45]}
                      onPress={() => this.nextForm(this.state.currentstep)}
                    >
                      <Text style={styles.btnText}>Next</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <View style={globalStyles.formBorder}>
                    <View style={[globalStyles.container, globalStyles.p0]}>
                      <InputDropdown
                        label={"Enclosure Type:"}
                        isMandatory={true}
                        value={this.state.enclosureType}
                        isOpen={this.state.isEnclosureTypeMenuOpen}
                        items={this.state.enclosureTypes}
                        openAction={this.toggleEnclosureTypeMenu}
                        closeAction={this.toggleEnclosureTypeMenu}
                        setValue={this.setEnclosureType}
                        labelStyle={globalStyles.labelName}
                        textFieldStyle={[
                          globalStyles.textfield,
                          this.state.enclosureType
                            ? [globalStyles.width50, styles.pl0]
                            : null,
                        ]}
                        style={[
                          globalStyles.fieldBox,
                          this.state.isEnclosureTypeValidationFailed
                            ? globalStyles.errorFieldBox
                            : null,
                        ]}
                      />

                      <InputDropdown
                        label={"Enclosure ID:"}
                        isMandatory={true}
                        value={this.state.enclosureIDName}
                        isOpen={this.state.isEnclosureIDMenuOpen}
                        items={this.state.enclosureIds}
                        openAction={this.toggleEnclosureIDMenu}
                        closeAction={this.toggleEnclosureIDMenu}
                        setValue={this.setEnclosureID}
                        labelStyle={globalStyles.labelName}
                        textFieldStyle={[
                          globalStyles.textfield,
                          this.state.enclosureIDName
                            ? [globalStyles.width50, styles.pl0]
                            : null,
                        ]}
                        style={[
                          globalStyles.fieldBox,
                          this.state.isEnclosureIDValidationFailed
                            ? globalStyles.errorFieldBox
                            : null,
                        ]}
                      />

                      <InputDropdown
                        label={"Location:"}
                        isMandatory={true}
                        value={this.state.farm}
                        isOpen={this.state.isFarmMenuOpen}
                        items={this.state.animalFarms}
                        openAction={this.toggleFarmMenu}
                        closeAction={this.toggleFarmMenu}
                        setValue={this.setFarmData}
                        labelStyle={globalStyles.labelName}
                        textFieldStyle={[
                          globalStyles.textfield,
                          this.state.farm
                            ? [globalStyles.width50, styles.pl0]
                            : null,
                        ]}
                        style={[
                          globalStyles.fieldBox,
                          this.state.isFarmValidationFailed
                            ? globalStyles.errorFieldBox
                            : null,
                        ]}
                      />

                      <InputDropdown
                        label={"Origin:"}
                        isMandatory={true}
                        value={this.state.origin}
                        isOpen={this.state.isOrigniMenuOpen}
                        items={this.state.animalOrigins}
                        openAction={this.toggleOriginMenu}
                        closeAction={this.toggleOriginMenu}
                        setValue={this.setOriginData}
                        labelStyle={globalStyles.labelName}
                        textFieldStyle={[
                          globalStyles.textfield,
                          this.state.origin
                            ? [globalStyles.width50, styles.pl0]
                            : null,
                        ]}
                        style={[
                          globalStyles.fieldBox,
                          this.state.isOriginValidationFailed
                            ? globalStyles.errorFieldBox
                            : null,
                        ]}
                      />

                      <InputDropdown
                        label={"Owner:"}
                        isMandatory={true}
                        value={this.state.owner}
                        isOpen={this.state.isOwnerMenuOpen}
                        items={this.state.animalOwners}
                        openAction={this.toggleOwnerMenu}
                        closeAction={this.toggleOwnerMenu}
                        setValue={this.setOwnerData}
                        labelStyle={globalStyles.labelName}
                        textFieldStyle={[
                          globalStyles.textfield,
                          this.state.owner
                            ? [globalStyles.width50, styles.pl0]
                            : null,
                        ]}
                        style={[
                          globalStyles.fieldBox,
                          this.state.isOwnerValidationFailed
                            ? globalStyles.errorFieldBox
                            : null,
                        ]}
                      />

                      <View
                        style={[
                          globalStyles.fieldBox,
                          this.state.isPariveshIDValidationFailed
                            ? globalStyles.errorFieldBox
                            : null,
                        ]}
                      >
                        <Text style={globalStyles.labelName}>Parivesh ID:</Text>
                        <TextInput
                          value={this.state.pariveshID}
                          onChangeText={(pariveshID) =>
                            this.setState({ pariveshID })
                          }
                          style={[
                            globalStyles.textfield,
                            globalStyles.width50,
                            globalStyles.styles.pl0,
                          ]}
                        />
                      </View>

                      <View
                        style={[
                          globalStyles.fieldBox,
                          this.state.isDescriptionValidsationFailed
                            ? globalStyles.errorFieldBox
                            : null,
                        ]}
                      >
                        <Text style={globalStyles.labelName}>
                          Condition on arrival:
                        </Text>
                        <TextInput
                          value={this.state.description}
                          onChangeText={(description) =>
                            this.setState({ description })
                          }
                          style={[
                            globalStyles.textfield,
                            globalStyles.width50,
                            globalStyles.styles.pl0,
                          ]}
                          autoCompleteType="off"
                          autoCapitalize="words"
                        />
                      </View>

                      <View
                        style={[
                          globalStyles.fieldBox,
                          this.state.isRemarksValidationFailed
                            ? globalStyles.errorFieldBox
                            : null,
                          globalStyles.bbw0,
                        ]}
                      >
                        <Text style={globalStyles.labelName}>Remarks :</Text>
                        <TextInput
                          value={this.state.remarks}
                          onChangeText={(remarks) => this.setState({ remarks })}
                          style={[
                            globalStyles.textfield,
                            globalStyles.width50,
                            globalStyles.styles.pl0,
                          ]}
                          autoCompleteType="off"
                          autoCapitalize="words"
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.submitBtnContainer}>
                    <TouchableOpacity
                      style={[globalStyles.button, styles.width45]}
                      onPress={() => this.preForm(this.state.currentstep)}
                    >
                      <Text style={styles.btnText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[globalStyles.button, styles.width45]}
                      onPress={this.savePedigreeData.bind(this)}
                    >
                      <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </>
          )}

          {/* <View
                            style={[
                                globalStyles.fieldBox,
                                this.state.isSexValidationFailed ? globalStyles.errorFieldBox : null,
                            ]}
                        >
                            <Text style={globalStyles.labelName}>Sex : </Text>
                            <TextInput
                                value={this.state.sex}
                                onChangeText={(sex) => this.setState({ sex })}
                                style={globalStyles.textfield}
                                autoCompleteType="off"
                                autoCapitalize="words"
                            />
                        </View> */}
        </View>
      </ScrollView>

      {/* <OverlayLoader visible={this.state.showLoader} /> */}

      <ModalMenu
        visible={this.state.isSexIdentificationTypeMenuOpen}
        closeAction={this.toggleSexIdentificationTypeMenu}
      >
        {Configs.SEX_IDENTIFICATION_TYPES.map((v, i) => (
          <TouchableOpacity
            activeOpacity={1}
            style={globalStyles.item}
            onPress={this.setSexIdentificationType.bind(this, v.name)}
            key={v.id}
          >
            <Text style={globalStyles.itemtitle}>{v.name}</Text>
          </TouchableOpacity>
        ))}
      </ModalMenu>

      {/*Search Modal for Father and Mother*/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isAnimalSearchModalOpen}
      >
        <View style={globalStyles.searchModalOverlay}>
          <View style={globalStyles.seacrhModalContainer}>
            <View style={globalStyles.searchModalHeader}>
              <TouchableOpacity
                activeOpacity={1}
                style={globalStyles.headerBackBtnContainer}
                onPress={this.closeSearchModal}
              >
                <Ionicons name="arrow-back" size={25} color={Colors.white} />
              </TouchableOpacity>
              <View style={globalStyles.headerTitleContainer}>
                <Text
                  style={[
                    styles.headerTitleContainerText,
                    { fontSize: Colors.headerSize },
                  ]}
                >
                  {this.state.searchFor === "father"
                    ? "Select Father"
                    : "Select Mother"}
                </Text>
              </View>
            </View>
            <View style={globalStyles.searchModalBody}>
              <View style={globalStyles.formBorder}>
                <InputDropdown
                  label={"Select Section:"}
                  value={this.state.animalSectionName}
                  isOpen={this.state.isAnimalSectionMenuOpen}
                  items={this.state.animalSections}
                  openAction={this.toggleAnimalSectionMenu}
                  closeAction={this.toggleAnimalSectionMenu}
                  setValue={this.setAnimalSection}
                  labelStyle={globalStyles.labelName}
                  textFieldStyle={[
                    globalStyles.textfield,
                    this.state.animalSectionName
                      ? [globalStyles.width50, styles.pl0]
                      : null,
                  ]}
                  style={[globalStyles.fieldBox]}
                />

                <InputDropdown
                  label={"Enclosure ID:"}
                  value={this.state.parentEnclosureIDName}
                  isOpen={this.state.isAnimalEnclosureMenuOpen}
                  items={this.state.animalEnclosures}
                  openAction={this.toggleAnimalEnclosureMenu}
                  closeAction={this.toggleAnimalEnclosureMenu}
                  setValue={this.setParentEnclosure}
                  labelStyle={globalStyles.labelName}
                  textFieldStyle={[
                    globalStyles.textfield,
                    this.state.parentEnclosureIDName
                      ? [globalStyles.width50, styles.pl0]
                      : null,
                  ]}
                  style={[globalStyles.fieldBox, globalStyles.bbw0]}
                />

                {typeof this.state.parentEnclosureIDName !== "undefined" ? (
                  <View
                    style={[
                      globalStyles.fieldBox,
                      {
                        borderRadius: 3,
                        borderColor: "#ddd",
                        borderTopWidth: 1,
                        borderBottomWidth: 0,
                      },
                    ]}
                  >
                    <TextInput
                      autoCompleteType="off"
                      autoCapitalize="none"
                      placeholder={"Type Animal Code"}
                      value={this.state.searchValue}
                      style={[globalStyles.textfield]}
                      onChangeText={(searchValue) =>
                        this.setState({ searchValue })
                      }
                    />
                  </View>
                ) : null}

                {this.state.isFetchingParent ? null : (
                  <FlatList
                    contentContainerStyle={globalStyles.flex1}
                    data={this.getParentAnimalsData()}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={this.renderSearchItem}
                    initialNumToRender={this.state.parentAnimals.length}
                    ListEmptyComponent={() => (
                      <Text style={globalStyles.searchingText}>
                        No Result Found
                      </Text>
                    )}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.animalDeadReasonModalVisible}
      >
        <View style={globalStyles.searchModalOverlay}>
          <View style={globalStyles.seacrhModalContainer}>
            <View style={globalStyles.searchModalHeader}>
              <TouchableOpacity
                activeOpacity={1}
                style={globalStyles.headerBackBtnContainer}
                onPress={() => {
                  this.setState({
                    animalDeadReasonModalVisible: false,
                  });
                }}
              >
                <Ionicons name="arrow-back" size={25} color={Colors.white} />
              </TouchableOpacity>
              <View style={globalStyles.headerTitleContainer}>
                <Text
                  style={[
                    styles.headerTitleContainerText,
                    { fontSize: Colors.headerSize },
                  ]}
                >
                  Reason
                </Text>
              </View>
            </View>

            <View style={globalStyles.searchModalBody}>
              <TextInput
                value={this.state.animal_dead_reason}
                onChangeText={(animal_dead_reason) =>
                  this.setState({ animal_dead_reason })
                }
                multiline={true}
                numberOfLines={12}
                style={styles.multiLineTextInput}
                autoCompleteType="off"
              />

              <TouchableOpacity
                style={globalStyles.button}
                onPress={() =>
                  this.setState({ animalDeadReasonModalVisible: false })
                }
              >
                <Text style={globalStyles.textWhite}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

// const windowHeight = Dimensions.get("window").height;
// const windowWidth = Dimensions.get("window").width;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 8,
//   },
//   popupContainer: {
//     backgroundColor: "#fff",
//     paddingTop: 20,
//     paddingBottom: 20,
//   },
//   popupText: {
//     fontSize: 16,
//     color: Colors.black,
//     alignSelf: "center",
//   },
//   inputContainer: {
//     marginVertical: 10,
//     padding: 10,
//   },
//   fieldBox: {
//     alignItems: "center",
//     width: "100%",
//     overflow: "hidden",
//     flexDirection: "row",
//     padding: 5,
//     borderRadius: 3,
//     borderColor: "#ddd",
//     borderBottomWidth: 1,
//     backgroundColor: "#fff",
//     height: "auto",
//     justifyContent: "space-between",
//   },
//   textfield: {
//     backgroundColor: "#fff",
//     height: "auto",

//     fontSize: Colors.textSize,
//     color: Colors.textColor,
//     textAlign: "left",
//     padding: 5,
//   },
//   labelName: {
//     color: Colors.labelColor,
//     // lineHeight: 40,
//     fontSize: Colors.lableSize,
//     paddingLeft: 4,
//     height: "auto",
//     paddingVertical: 10,
//   },

//   dateField: {
//     backgroundColor: "#fff",
//     height: "auto",

//     fontSize: Colors.textSize,
//     color: Colors.textColor,
//     textAlign: "left",
//     padding: 5,
//   },

//   button: {
//     alignItems: "center",
//     backgroundColor: Colors.primary,
//     padding: 10,
//     // shadowColor: "#000",
//     // shadowOffset: {
//     //   width: 0,
//     //   height: 2,
//     // },
//     // shadowOpacity: 0.23,
//     // shadowRadius: 2.62,
//     // elevation: 4,
//     borderRadius: 20,
//     color: "#fff",
//     marginTop: 10,
//   },
//   textWhite: {
//     color: "#fff",
//     fontWeight: "bold",
//     paddingVertical: 5,
//     fontSize:Colors.lableSize,
//   },
//   item: {
//     height: 35,
//     backgroundColor: "#00b386",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   itemtitle: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: Colors.textSize,
//   },
//   errorFieldBox: {
//     borderWidth: 1,
//     borderColor: Colors.tomato,
//   },
//   searchModalOverlay: {
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: Colors.white,
//     width: windowWidth,
//     height: windowHeight,
//   },
//   seacrhModalContainer: {
//     flex: 1,
//     backgroundColor: Colors.white,
//     width: windowWidth,
//     height: windowHeight,
//     elevation: 5,
//   },
//   searchModalHeader: {
//     height: 55,
//     flexDirection: "row",
//     width: "100%",
//     backgroundColor: Colors.primary,
//     elevation: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//   },
//   headerBackBtnContainer: {
//     width: "20%",
//     height: 55,
//     paddingLeft: 8,
//     alignItems: "flex-start",
//     justifyContent: "center",
//   },
//   headerTitleContainer: {
//     width: "80%",
//     height: 55,
//     alignItems: "flex-start",
//     justifyContent: "center",
//   },
//   searchModalBody: {
//     flex: 1,
//     height: windowHeight - 55,
//     padding: 6,
//   },
//   searchingText: {
//     fontSize: Colors.textSize,
//     color: Colors.textColor,
//     opacity: 0.8,
//     alignSelf: "center",
//     marginTop: 20,
//   },
//   imagePicker: {
//     borderColor: "#ccc",
//     borderWidth: 1,
//     padding: 3,
//     backgroundColor: "#fff",
//     borderRadius: 3,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   step_nav: {
//     // margin:10,
//     padding: 5,
//     backgroundColor: Colors.primary,
//     width: 30,
//     justifyContent: "center",
//     height: 30,
//     borderRadius: 50,
//   },
//   inactive_step_nav: {
//     backgroundColor: Colors.activeTab,
//     padding: 5,
//     width: 30,
//     justifyContent: "center",
//     height: 30,
//     borderRadius: 50,
//   },
//   activeText: {
//     textAlign: "center",
//     color: Colors.white,
//     fontSize: Colors.textSize,
//   },
//   textInputIcon: {
// 		position: "absolute",
// 		bottom: 14,
// 		right: 10,
// 		marginLeft: 8,
// 		color: Colors.primary,
// 		zIndex: 99,
// 	},
//   width50: {
// 		width:'50%'
// 	},
// });
