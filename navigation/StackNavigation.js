// Updated at 22/11/22
// Updated by Tuhin

import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

// screens
import {
  Home,
  Logout,
  Location,
  AddLocation,
  SectionRelations,
  AddSectionRelation,
  AnimalGroups,
  AddGroup,
  Category,
  AddCategory,
  SubCategory,
  AddSubCategory,
  CommonNames,
  AddCommonName,
  CommonNameDetails,
  CommonNameTabDetails,
  CommonNameSections,
  CommonNameEnclosures,
  GenerateExcel,
  UploadExcel,
  AnimalsList,
  AnimalInfo,
  Animals,
  Minerals,
  Vitamin,
  NutritionalValues,
  Attendence,
  Attendence2,
  OptionsAfterScan,
  FeedingSchedule,
  FeedingAllocation,
  FeedAssign,
} from "../screen";

// AnimalDetails
import {
  VaccineRecordEntry,
  VaccinationSchedule,
  VaccinationRecordEntry,
  MedicalRecordEntry,
  EnclosureRecordEntry,
  IncidentRecordEntry,
  MeasurementRecordEntry,
  FeedingAssignmentRecordEntry,
  FeedingRecordEntry,
} from "../screen/AnimalDetails";

// Inventory Management Screens //
import {
  InventoryHome,
  InventoryMasterHome,
  ItemCategories,
  AddItemCategory,
  StoreNames,
  AddStoreName,
  Items,
  AddItem,
  ItemDetails,
  EditItem,
  LowInventoryList,
  Recipes,
  AddRecipe,
  Parties,
  AddParty,
  PurchaseOrders,
  AddPurchaseOrder,
  EditPurchaseOrder,
  PurchaseOrderDetails,
  Purchase,
  Consumption,
  AddConsumption,
  ConsumptionDetails,
  StockTransfer,
  addUp,
  AddRequestingItems,
  RequestItemDetails,
  StocksType,
  StockItems,
  LowStockTypes,
  ItemsMenu,
} from "../screen/inventory";

// Staff
import {
  StaffHome,
  StaffMaster,
  Departments,
  AddDepartment,
  Designations,
  AddDesignation,
  UserTypes,
  AddUserType,
  Users,
  UsersProfileList,
  UserProfileNewList,
  AddUser,
  EditUserProfile,
  Employeer,
  AddEmployeer,
  UserDepartments,
  UserProfileDetailsview,
  AddUserPermission,
} from "../screen/staff/";

// Enclosure Management Screens
import {
  EnclosureMgmtHome,
  Sections,
  AddSection,
  EnclosureTypes,
  AddEnclosureType,
  EnclosureIds,
  AddEnclosureId,
  ChangeEnclosure,
  ViewChangeEnclosure,
  EnclosureChangeHistory,
  AnimalsListEnclosure,
  CommonNameList,
  AnimalList,
  EnclosureSection,
  Enclosure,
  AnimalEnclosureSection,
} from "../screen/enclosure-mgmt";

// Feed Management Screens //
import FeedManagement from "../screen/feed/FeedManagement";

// Medical, Incident and Observations Reporting  //
import {
  MedicalAndIncidentHome,
  MedicalRecordsList,
  IncidentReportList,
  MedIncMaster,
  IncidentMaster,
  IncidentTypes,
  AddIncidentTypes,
  AddIncident,
  ViewIncident,
  MedicalMaster,
  DiagnosisList,
  AddDiagnosis,
  AddMedicalRecord,
  ViewMedicalRecord,
  AffectedPartList,
  ManageAffectedParts,
  RoutesList,
  ManageRoute,
  Observations,
  AddObservation,
  ViewObservation,
  LocationMaster,
  LocationPermission,
  LocationRange,
  Task_mngt,
  Enclosure_Master,
  FeedingMaster,
  GetPrintLabelMaster,
  GetPrintLabel,
} from "../screen/medical-incident";

// Todo/Tasks Screens //
import TodoStack from "./tasks";

//Reports Screens
import {
  ReportsHome,
  DeathReport,
  TransferReport,
  TaskReport,
  IncidentReport,
  MedicalReport,
  ObservationsReport,
} from "../screen/Reports";

import JournalRecord from "../screen/JournalRecords/JornalRecord";

// WorkAllocation
import {
  WorkAllocation,
  FeedMenu,
  AddAllocation,
  FeedDetails,
} from "../screen/WorkAllocation";

// Tasks
import {
  FeedingSectionMenu,
  FeedBySection,
  FeedingTask,
  UpdateFeedingTask,
  CleaningTasks,
  AddCategoryItem,
  AddCompleteTasks,
} from "../screen/tasks";

import ApprovalTask from "../screen/Approval/ApprovalTask";

import { Announcement, AddAnnouncement } from "./../screen/Announcement";

// Tag screens
import {
  TagMaster,
  AddTag,
  TagList,
  AddTagGroup,
  TagGroupList,
  TagAssign,
} from "../screen/Tags";

// Kitchen
import {
  KitchenMaster,
  Foods,
  FeedTypes,
  AddFoods,
  AddFeedingFactors,
  AddFeedTypes,
  FeedingFactors,
  MealSlots,
  AddMealSlots,
  FeedingPlaters,
  AddFeedingPlaters,
} from "../screen/Kitchen";

// Settings
import { Settings, LanguageSettings } from "../screen/Settings";

const Stack = createStackNavigator();

const MainStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00B386",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="AddLocation" component={AddLocation} />
      <Stack.Screen name="Logout" component={Logout} />
      <Stack.Screen name="SectionRelations" component={SectionRelations} />
      <Stack.Screen name="AddSectionRelation" component={AddSectionRelation} />
      <Stack.Screen name="AnimalGroups" component={AnimalGroups} />
      <Stack.Screen name="AddGroup" component={AddGroup} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Add Category" component={AddCategory} />
      <Stack.Screen name="SubCategory" component={SubCategory} />
      <Stack.Screen name="AddSubCategory" component={AddSubCategory} />
      <Stack.Screen name="CommonNames" component={CommonNames} />
      <Stack.Screen name="AddCommonName" component={AddCommonName} />
      <Stack.Screen name="CommonNameDetails" component={CommonNameDetails} />
      <Stack.Screen
        name="CommonNameTabDetails"
        component={CommonNameTabDetails}
      />
      <Stack.Screen name="GenerateExcel" component={GenerateExcel} />
      <Stack.Screen name="UploadExcel" component={UploadExcel} />
      <Stack.Screen name="AnimalsList" component={AnimalsList} />
      <Stack.Screen name="CommonNameSections" component={CommonNameSections} />
      <Stack.Screen
        name="CommonNameEnclosures"
        component={CommonNameEnclosures}
      />
      <Stack.Screen name="Animals" component={Animals} />
      <Stack.Screen name="AnimalInfo" component={AnimalInfo} />
      <Stack.Screen name="VaccineRecordEntry" component={VaccineRecordEntry} />
      <Stack.Screen
        name="VaccinationSchedule"
        component={VaccinationSchedule}
      />
      <Stack.Screen
        name="VaccinationRecordEntry"
        component={VaccinationRecordEntry}
      />
      <Stack.Screen name="MedicalRecordEntry" component={MedicalRecordEntry} />
      <Stack.Screen
        name="MeasurementRecordEntry"
        component={MeasurementRecordEntry}
      />
      <Stack.Screen
        name="EnclosureRecordEntry"
        component={EnclosureRecordEntry}
      />
      <Stack.Screen
        name="IncidentRecordEntry"
        component={IncidentRecordEntry}
      />
      <Stack.Screen
        name="FeedingAssignmentRecordEntry"
        component={FeedingAssignmentRecordEntry}
      />
      <Stack.Screen name="FeedingRecordEntry" component={FeedingRecordEntry} />
      <Stack.Screen name="NutritionalValues" component={NutritionalValues} />
      <Stack.Screen name="Vitamin" component={Vitamin} />
      <Stack.Screen name="Minerals" component={Minerals} />
      <Stack.Screen name="OptionsAfterScan" component={OptionsAfterScan} />
      {/* For add Task from scan */}
      <Stack.Screen name="AddCategoryItem" component={AddCategoryItem} />
      {/* Approval Screens */}
      <Stack.Screen name="Approval" component={ApprovalTask} />

      {/* Inventory Management Screens */}
      <Stack.Screen name="InventoryHome" component={InventoryHome} />
      <Stack.Screen
        name="InventoryMasterHome"
        component={InventoryMasterHome}
      />
      <Stack.Screen name="ItemCategories" component={ItemCategories} />
      <Stack.Screen name="AddItemCategory" component={AddItemCategory} />
      <Stack.Screen name="StoreNames" component={StoreNames} />
      <Stack.Screen name="AddStoreName" component={AddStoreName} />
      <Stack.Screen name="ItemsMenu" component={ItemsMenu} />
      <Stack.Screen name="Items" component={Items} />
      <Stack.Screen name="AddItem" component={AddItem} />
      <Stack.Screen name="ItemDetails" component={ItemDetails} />
      <Stack.Screen name="EditItem" component={EditItem} />
      <Stack.Screen name="LowInventoryList" component={LowInventoryList} />
      <Stack.Screen name="Recipes" component={Recipes} />
      <Stack.Screen name="AddRecipe" component={AddRecipe} />
      <Stack.Screen name="Parties" component={Parties} />
      <Stack.Screen name="AddParty" component={AddParty} />
      <Stack.Screen name="PurchaseOrders" component={PurchaseOrders} />
      <Stack.Screen name="AddPurchaseOrder" component={AddPurchaseOrder} />
      <Stack.Screen name="EditPurchaseOrder" component={EditPurchaseOrder} />
      <Stack.Screen name="addUp" component={addUp} />
      <Stack.Screen name="AddRequestingItems" component={AddRequestingItems} />
      <Stack.Screen name="RequestItemDetails" component={RequestItemDetails} />
      <Stack.Screen
        name="PurchaseOrderDetails"
        component={PurchaseOrderDetails}
      />
      <Stack.Screen name="Purchase" component={Purchase} />
      <Stack.Screen name="Consumption" component={Consumption} />
      <Stack.Screen name="AddConsumption" component={AddConsumption} />
      <Stack.Screen name="ConsumptionDetails" component={ConsumptionDetails} />
      <Stack.Screen name="StockTransfer" component={StockTransfer} />
      <Stack.Screen name="StocksType" component={StocksType} />
      <Stack.Screen name="StockItems" component={StockItems} />
      <Stack.Screen name="LowStockTypes" component={LowStockTypes} />
      {/* 

{/* Staff Management Screens */}
      <Stack.Screen name="StaffHome" component={StaffHome} />
      <Stack.Screen name="StaffMaster" component={StaffMaster} />
      <Stack.Screen name="Designations" component={Designations} />
      <Stack.Screen name="AddDesignation" component={AddDesignation} />
      <Stack.Screen name="Departments" component={Departments} />
      <Stack.Screen name="AddDepartment" component={AddDepartment} />
      <Stack.Screen name="UserTypes" component={UserTypes} />
      <Stack.Screen name="AddUserType" component={AddUserType} />
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="UsersProfileList" component={UsersProfileList} />
      <Stack.Screen name="UserProfileNewList" component={UserProfileNewList} />
      <Stack.Screen name="AddUser" component={AddUser} />
      <Stack.Screen name="AddUserPermission" component={AddUserPermission} />
      <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
      <Stack.Screen name="Employeer" component={Employeer} />
      <Stack.Screen name="AddEmployeer" component={AddEmployeer} />
      <Stack.Screen name="UserDepartments" component={UserDepartments} />
      <Stack.Screen
        name="UserProfileDetailsview"
        component={UserProfileDetailsview}
      />
      {/* Enclosure Management Screens */}
      <Stack.Screen name="EnclosureMgmtHome" component={EnclosureMgmtHome} />
      <Stack.Screen name="Sections" component={Sections} />
      <Stack.Screen name="AddSection" component={AddSection} />
      <Stack.Screen name="EnclosureTypes" component={EnclosureTypes} />
      <Stack.Screen name="AddEnclosureType" component={AddEnclosureType} />
      <Stack.Screen
        name="AnimalEnclosureSection"
        component={AnimalEnclosureSection}
      />
      <Stack.Screen name="EnclosureIds" component={EnclosureIds} />
      <Stack.Screen name="AddEnclosureId" component={AddEnclosureId} />
      <Stack.Screen name="ChangeEnclosure" component={ChangeEnclosure} />
      <Stack.Screen name="Enclosure" component={Enclosure} />
      <Stack.Screen
        name="ViewChangeEnclosure"
        component={ViewChangeEnclosure}
      />
      <Stack.Screen
        name="EnclosureChangeHistory"
        component={EnclosureChangeHistory}
      />
      <Stack.Screen
        name="AnimalsListEnclosure"
        component={AnimalsListEnclosure}
      />
      <Stack.Screen name="CommonNameList" component={CommonNameList} />
      <Stack.Screen name="AnimalList" component={AnimalList} />
      <Stack.Screen name="EnclosureSection" component={EnclosureSection} />
      {/* Feed Management Screens */}
      <Stack.Screen name="FeedManagement" component={FeedManagement} />
      {/* Medical and Incident Reporting */}
      <Stack.Screen
        name="MedicalAndIncidentHome"
        component={MedicalAndIncidentHome}
      />
      <Stack.Screen name="MedicalRecordsList" component={MedicalRecordsList} />
      <Stack.Screen name="IncidentReportList" component={IncidentReportList} />
      <Stack.Screen name="Observations" component={Observations} />
      <Stack.Screen name="MedIncMaster" component={MedIncMaster} />
      <Stack.Screen name="IncidentMaster" component={IncidentMaster} />
      <Stack.Screen name="IncidentTypes" component={IncidentTypes} />
      <Stack.Screen name="AddIncidentTypes" component={AddIncidentTypes} />
      <Stack.Screen name="AddIncident" component={AddIncident} />
      <Stack.Screen name="AddObservation" component={AddObservation} />
      <Stack.Screen name="ViewObservation" component={ViewObservation} />
      <Stack.Screen name="ViewIncident" component={ViewIncident} />
      <Stack.Screen name="MedicalMaster" component={MedicalMaster} />
      <Stack.Screen name="DiagnosisList" component={DiagnosisList} />
      <Stack.Screen name="AddDiagnosis" component={AddDiagnosis} />
      <Stack.Screen name="AddMedicalRecord" component={AddMedicalRecord} />
      <Stack.Screen name="ViewMedicalRecord" component={ViewMedicalRecord} />
      <Stack.Screen name="AffectedPartList" component={AffectedPartList} />
      <Stack.Screen
        name="ManageAffectedParts"
        component={ManageAffectedParts}
      />
      <Stack.Screen name="RoutesList" component={RoutesList} />
      <Stack.Screen name="ManageRoute" component={ManageRoute} />
      <Stack.Screen name="Task_mngt" component={Task_mngt} />
      <Stack.Screen name="Enclosure_Master" component={Enclosure_Master} />
      {/** Task Management Screens */}
      <Stack.Screen name="Todo" component={TodoStack} />
      <Stack.Screen name="AddCompleteTasks" component={AddCompleteTasks} />
      {/** Reports Management Screens */}
      <Stack.Screen name="ReportsHome" component={ReportsHome} />
      <Stack.Screen name="DeathReport" component={DeathReport} />
      <Stack.Screen name="TransferReport" component={TransferReport} />
      <Stack.Screen name="TaskReport" component={TaskReport} />
      <Stack.Screen name="IncidentReport" component={IncidentReport} />
      <Stack.Screen name="MedicalReport" component={MedicalReport} />
      <Stack.Screen name="ObservationsReport" component={ObservationsReport} />
      {/** Journal Management Screens */}
      <Stack.Screen name="JornalRecord" component={JournalRecord} />
      {/** Work Allocation Screens */}
      <Stack.Screen name="WorkAllocation" component={WorkAllocation} />
      <Stack.Screen name="FeedMenu" component={FeedMenu} />
      <Stack.Screen name="AddAllocation" component={AddAllocation} />
      <Stack.Screen name="FeedDetails" component={FeedDetails} />
      <Stack.Screen name="FeedingSectionMenu" component={FeedingSectionMenu} />
      <Stack.Screen name="FeedBySection" component={FeedBySection} />
      <Stack.Screen name="FeedingTask" component={FeedingTask} />
      <Stack.Screen name="UpdateFeedingTask" component={UpdateFeedingTask} />
      <Stack.Screen name="CleaningTasks" component={CleaningTasks} />
      {/** Attendance Management Screens */}
      <Stack.Screen name="Attendance" component={Attendence} />
      <Stack.Screen name="Attendence2" component={Attendence2} />
      {/** Announcement Screens */}
      <Stack.Screen name="Announcement" component={Announcement} />
      <Stack.Screen name="AddAnnouncement" component={AddAnnouncement} />
      {/* Feeding Allocation */}
      <Stack.Screen name="FeedAssign" component={FeedAssign} />
      <Stack.Screen name="FeedingSchedule" component={FeedingSchedule} />
      <Stack.Screen name="FeedingAllocation" component={FeedingAllocation} />
      <Stack.Screen name="FeedingMaster" component={FeedingMaster} />
      {/* Get Print Label*/}
      <Stack.Screen
        name="GetPrintLabelMaster"
        component={GetPrintLabelMaster}
      />
      <Stack.Screen name="GetPrintLabel" component={GetPrintLabel} />

      {/* Location screens */}
      <Stack.Screen name="LocationMaster" component={LocationMaster} />
      <Stack.Screen name="LocationPermission" component={LocationPermission} />
      <Stack.Screen name="LocationRange" component={LocationRange} />

      {/* Tag screens */}
      <Stack.Screen name="TagMaster" component={TagMaster} />
      <Stack.Screen name="AddTag" component={AddTag} />
      <Stack.Screen name="TagList" component={TagList} />
      <Stack.Screen name="AddTagGroup" component={AddTagGroup} />
      <Stack.Screen name="TagGroupList" component={TagGroupList} />
      <Stack.Screen name="TagAssign" component={TagAssign} />

      {/* Kitchen screens */}
      <Stack.Screen name="KitchenMaster" component={KitchenMaster} />
      <Stack.Screen name="Foods" component={Foods} />
      <Stack.Screen name="AddFoods" component={AddFoods} />
      <Stack.Screen name="FeedTypes" component={FeedTypes} />
      <Stack.Screen name="AddFeedTypes" component={AddFeedTypes} />
      <Stack.Screen name="FeedingFactors" component={FeedingFactors} />
      <Stack.Screen name="AddFeedingFactors" component={AddFeedingFactors} />
      <Stack.Screen name="MealSlots" component={MealSlots} />
      <Stack.Screen name="AddMealSlots" component={AddMealSlots} />
      <Stack.Screen name="FeedingPlaters" component={FeedingPlaters} />
      <Stack.Screen name="AddFeedingPlaters" component={AddFeedingPlaters} />

      {/* Settings */}
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="LanguageSettings" component={LanguageSettings} />
    </Stack.Navigator>
  );
};

export default MainStackNavigation;
