const isDev = true; //False means production live url will work

const END_POINT = isDev
  ? "http://ehostingguru.com/stage/ZooApp/"
  : "http://funtoo.invoice2day.in/zooapplive/";

const Configs = {
  TOKEN_EXPERIENCEID: isDev
    ? "@desuntechnology/animalcaredevelopment"
    : "@desuntechnology/animalcare",
  ISDEV: isDev,
  PROFILE_URL: END_POINT + "upload/images/",
  ignoreWarnings: true,
  BASE_URL: END_POINT + "api/",
  BASE_URL_APP: END_POINT + "app/",
  TASK_URL: `${END_POINT}app/tasks/`,
  IMAGE_URL: END_POINT,
  DOCUMENT_URL: `${END_POINT}upload/documents/`,
  INVENTORY_MGMT_BASE: END_POINT + "app/inventory/",
  ANNOUNCEMENT_BASE: END_POINT + "app/announcement/",
  USER_MGMT_BASE: END_POINT + "app/user_mgmt/",
  MEDICAL_INCIDENT_BASE: END_POINT + "app/MedicalAndIncidentReport/",
  OBSERVATION_BASE: END_POINT + "app/observation/",
  MEDICAL_RECORD_UPLOAD_DATA_URL: END_POINT + "upload/medical_records/",
  INCIDENT_RECORD_UPLOAD_DATA_URL: END_POINT + "upload/incident_records/",
  WORK_ALLOCATION: END_POINT + "app/workallocation/",
  KITCHEN_BASEURL: END_POINT + "app/kitchen/",
  REPORTS_MGMT_BASE: END_POINT + "app/reports/",
  TAG_AND_TAGGROUP_BASE: END_POINT + "app/tag/",
  GOOGLE_PLACE_API_KEY: "AIzaSyAHG9wJDJThFRp7aZdG9O2LMRvSRXjjois",
  SUCCESS_TYPE: "success",
  FAILURE_TYPE: "failure",
  LONG_LAT: isDev
    ? {
        lat: 22.4828966,
        lng: 88.3863171,
      }
    : {
        lat: 13.077023303368748,
        lng: 77.61880928976724,
      }, //For live server
  DISTANCE_REQUIRED: 100000, // 100KM
  ANIMAL_GENDER: [
    { id: "Male", name: "Male", value: "Male" },
    { id: "Female", name: "Female", value: "Female" },
    { id: "Undetermined", name: "Undetermined", value: "Undetermined" },
    { id: "Indeterminate", name: "Indeterminate", value: "Indeterminate" },
  ],
  ANIMAL_BIRTH_TYPE: [
    { id: "Captive Born", name: "Captive Born", value: "Captive Born" },
    { id: "Wild Born", name: "Wild Born", value: "Wild Born" },
    { id: "Undetermined", name: "Undetermined", value: "Undetermined" },
    { id: "Indeterminate", name: "Indeterminate", value: "Indeterminate" },
  ],
  ANIMAL_STATUS: [
    { id: "Alive", name: "Alive", value: "Alive" },
    { id: "Dead", name: "Dead", value: "Dead" },
    { id: "Transferred", name: "Transferred", value: "Transferred" },
    { id: "Sold", name: "Sold", value: "Sold" },
  ],
  SEX_IDENTIFICATION_TYPES: [
    { id: "1", name: "Blood Sample" },
    { id: "2", name: "DNA" },
    { id: "3", name: "Visual" },
  ],
  ANIMAL_TYPE_GROUP: "Group",
  ANIMAL_TYPE_INDIVIDUAL: "Individual",
  ANIMAL_SOURCES: [
    { id: "1", name: "Transfer", value: "Transfer" },
    { id: "2", name: "Gifted", value: "Gifted" },
    { id: "3", name: "In House Breading", value: "In House Breading" },
    { id: "4", name: "Purchase", value: "Purchase" },
  ],
  ANIMAL_IDENTIFICATION_TYPES: [
    { id: "dna", name: "DNA", value: "DNA" },
    { id: "microchip", name: "Microchip", value: "Microchip" },
    { id: "ring_no", name: "Ring Number", value: "Ring Number" },
    { id: "dna_microchip", name: "DNA-Microchip", value: "DNA-Microchip" },
    { id: "dna_ring_no", name: "DNA-Ring Number", value: "DNA-Ring Number" },
    {
      id: "microchip_ring_no",
      name: "Microchip-Ring Number",
      value: "Microchip-Ring Number",
    },
    {
      id: "dna_microchip_ring_no",
      name: "DNA-Microchip-Ring Number",
      value: "DNA-Microchip-Ring Number",
    },
    { id: "without_id", name: "Without ID", value: "Without ID" },
  ],
  ANIMAL_IDENTIFICATION_TYPES_TEMP: [
    { id: "without_id", name: "Without ID", value: "Without ID" },
    { id: "dna", name: "DNA", value: "DNA" },
    { id: "microchip", name: "Microchip", value: "Microchip" },
    { id: "ring_no", name: "Ring Number", value: "Ring Number" },
  ],
  UNITS: [
    { id: "AMP", name: "AMPOULE", value: "AMP" },
    { id: "BAG", name: "BAGS", value: "BAG" },
    { id: "BTL", name: "BOTTLES", value: "BTL" },
    { id: "BOX", name: "BOX", value: "BOX" },
    { id: "BCK", name: "BUCKTES", value: "BCK" },
    { id: "BDL", name: "BUNDLES", value: "BDL" },
    { id: "CAN", name: "CANS", value: "CAN" },
    { id: "CPS", name: "CAPSULES", value: "CPS" },
    { id: "CTN", name: "CARTONS", value: "CTN" },
    { id: "COIL", name: "COIL", value: "COIL" },
    { id: "DRM", name: "DRUM", value: "DRM" },
    { id: "FT", name: "FEET", value: "FT" },
    { id: "GMS", name: "GRAMS", value: "GMS" },
    { id: "IN", name: "INCHES", value: "IN" },
    { id: "JAR", name: "JARS", value: "JAR" },
    { id: "KGS", name: "KILOGRAMS", value: "KGS" },
    { id: "LTR", name: "LITRE", value: "LTR" },
    { id: "MLG", name: "MILIGRAM", value: "MLG" },
    { id: "MLT", name: "MILLILITRE", value: "MLT" },
    { id: "NO", name: "NUMBER", value: "NO" },
    { id: "PET", name: "PETI", value: "PET" },
    { id: "PCS", name: "PIECES", value: "PCS" },
    { id: "PLT", name: "PLATES", value: "PLT" },
    { id: "POCH", name: "POUCH", value: "POCH" },
    { id: "TBS", name: "TABLETS", value: "TBS" },
    { id: "TIN", name: "TIN", value: "TIN" },
    { id: "TUB", name: "TUBES", value: "TUB" },
    { id: "VIAL", name: "VIALS", value: "VIAL" },
  ],
  HOME_SCREEN_MENUES: [
    {
      id: "feeding",
      name: "Feeding",
      screen: "FeedingSectionMenu",
      icon: require("../assets/image/feed-mgmt.jpg"),
    },
    {
      id: "journal",
      name: "Journal",
      screen: "JornalRecord",
      icon: require("../assets/image/Journal.png"),
    },
    {
      id: "daily_task_and_reports",
      name: "Task Management",
      screen: "Todo",
      icon: require("../assets/image/daily-task-reports.png"),
    },
    {
      id: "approval",
      name: "Approval",
      screen: "Approval",
      icon: require("../assets/image/approval.png"),
    },
    {
      id: "incident_reporting",
      name: "Incident Reporting",
      screen: "IncidentReportList",
      icon: require("../assets/image/incidentReport.webp"),
    },
    {
      id: "medical_reporting",
      name: "Medical Reporting",
      screen: "MedicalRecordsList",
      icon: require("../assets/image/medical.webp"),
    },
    {
      id: "observations",
      name: "Observations",
      screen: "Observations",
      icon: require("../assets/image/observation.png"),
    },

    // {
    // 	id: 'record_mgmt',
    // 	name: "Record Mgmt",
    // 	screen: 'AnimalGroups',
    // 	icon: require("../assets/image/record-mgmt.png")
    // },
    // {
    //   id: "record_mgmt",
    //   name: "Record Mgmt",
    //   screen: "Sections",
    //   icon: require("../assets/image/record-mgmt.png"),
    // },
    {
      id: "announcement",
      name: "Announcement",
      screen: "AddAnnouncement",
      icon: require("../assets/image/announcement.png"),
    },
    // {
    //   id: "enclosure_mgmt",
    //   name: "Enclosure",
    //   screen: "Enclosure",
    //   icon: require("../assets/image/enclousre-mgmt.png"),
    // },
    {
      id: "enclosure",
      name: "Enclosure",
      screen: "EnclosureMgmtHome",
      icon: require("../assets/image/enclousre-mgmt.png"),
    },
    {
      id: "inventory_mgmt",
      name: "Inventory Mgmt",
      screen: "InventoryHome",
      icon: require("../assets/image/inventory-mgmt.png"),
    },
    {
      id: "staff_mgmt",
      name: "Staff Mgmt",
      screen: "StaffHome",
      icon: require("../assets/image/staff-mgmt.jpg"),
    },

    {
      id: "reports",
      name: "Reports",
      screen: "ReportsHome",
      icon: require("../assets/image/report.png"),
    },
    // {
    // 	id: 'work_allocation',
    // 	name: "Work Allocation",
    // 	screen: 'WorkAllocation',
    // 	icon: require("../assets/image/WorkAllocation.webp")
    // },
    // {
    // 	id: 'survilence',
    // 	name: "Surveillance",
    // 	screen: '',
    // 	icon: require("../assets/image/survilence.png")
    // },
    // {
    // 	id: 'dashboard',
    // 	name: "Dashboard",
    // 	screen: '',
    // 	icon: require("../assets/image/dashboard.png")
    // },
    // {
    // 	id: 'animal_movement',
    // 	name: "Animal Movement",
    // 	screen: '',
    // 	icon: require("../assets/image/animal-movement.png")
    // },
    // {
    // 	id: 'attendance',
    // 	name: "Attendance",
    // 	screen: 'Attendance',
    // 	icon: require("../assets/image/attendance.png")
    // },
    // {
    // 	id: 'reproduction',
    // 	name: "Reproduction",
    // 	screen: '',
    // 	icon: require("../assets/image/Reproduction.png")
    // },
    // {
    // 	id: 'critical_alerts',
    // 	name: "Critical Alerts",
    // 	screen: '',
    // 	icon: require("../assets/image/critcal-alerts.png")
    // },
    // {
    // 	id: 'breeding_colony_mgmt',
    // 	name: "Breeding / Colony Mgmt",
    // 	screen: '',
    // 	icon: require("../assets/image/breeding-colony-mgmt.png")
    // },
    // {
    // 	id: 'enrichment',
    // 	name: "Enrichments",
    // 	screen: '',
    // 	icon: require("../assets/image/enrichments.jpg")
    // },
    {
      id: "master",
      name: "Master",
      screen: "MedIncMaster",
      icon: require("../assets/image/master_icon.jpg"),
    },
  ],
  USER_ACTION_TYPES: [
    { id: "Add", name: "Add" },
    { id: "Edit", name: "Edit" },
    { id: "Delete", name: "Delete" },
    { id: "View", name: "View" },
    { id: "Stats", name: "Statistic" },
  ],
  USER_ACTION_TYPES_CHECKING: {
    add: "Add",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    stats: "Stats",
  },
  JOURNAL_REVIEW_MENU: [
    { id: "View", name: "View" },
    { id: "Report", name: "Report" },
    { id: "Filter", name: "Filter" },
  ],
  STATES: [
    { id: "35", name: "Andaman and Nicobor Islands" },
    { id: "28", name: "Andhra Pradesh" },
    { id: "12", name: "Arunachal Pradesh" },
    { id: "18", name: "Assam" },
    { id: "10", name: "Bihar" },
    { id: "04", name: "Chandigarh" },
    { id: "22", name: "Chattisgarh" },
    { id: "26", name: "Dadra and Nagar Haveli" },
    { id: "25", name: "Daman and Diu" },
    { id: "07", name: "Delhi" },
    { id: "30", name: "Goa" },
    { id: "24", name: "Gujarat" },
    { id: "06", name: "Haryana" },
    { id: "02", name: "Himachal Pradesh" },
    { id: "01", name: "Jammu & Kashmir" },
    { id: "20", name: "Jharkhand" },
    { id: "29", name: "Karnataka" },
    { id: "32", name: "Kerla" },
    { id: "31", name: "Lakshadweep Islands" },
    { id: "23", name: "Madhya Pradesh" },
    { id: "27", name: "Maharashtra" },
    { id: "14", name: "Manipur" },
    { id: "17", name: "Meghalaya" },
    { id: "15", name: "Mizoram" },
    { id: "13", name: "Nagaland" },
    { id: "21", name: "Odisha" },
    { id: "34", name: "Pondichery" },
    { id: "03", name: "Punjab" },
    { id: "08", name: "Rajasthan" },
    { id: "11", name: "Sikkim" },
    { id: "33", name: "Tamil Nadu" },
    { id: "36", name: "Telangana" },
    { id: "16", name: "Tripura" },
    { id: "09", name: "Uttar Pradesh" },
    { id: "05", name: "Uttarakhand" },
    { id: "19", name: "West Bengal" },
  ],
  SEARCH_TYPES: [
    { id: "common_name", name: "Common Name" },
    { id: "section", name: "Section" },
    { id: "enclosure", name: "Enclosure" },
    { id: "category", name: "Category" },
    { id: "sub_category", name: "Sub Category" },
    { id: "animal_code", name: "Animal Code" },
  ],
  SCAN_OPTIONS: [
    { id: "section", name: "Section", screen: "EnclosureIds" },
    { id: "enclosure", name: "Enclosure", screen: "AnimalsListEnclosure" },
    { id: "medical", name: "Add Medical", screen: "AddMedicalRecord" },
    { id: "incident", name: "Add Incident", screen: "AddIncident" },
    { id: "feeding", name: "Feeding", screen: "FeedingSectionMenu" },
    { id: "task", name: "Add Task", screen: "AddCategoryItem" },
  ],
  ITEM_PRIORITIES: [
    { id: "1", name: "Low" },
    { id: "2", name: "Medium" },
    { id: "3", name: "High" },
    { id: "4", name: "Top" },
  ],
  MEDICAL_RECORD_STATUS: [
    { id: "P", name: "Pending" },
    { id: "O", name: "Ongoing" },
    { id: "A", name: "Closed" },
    { id: "all", name: "ALL" },
  ],
  INCIDENT_RECORD_STATUS: [
    { id: "P", name: "Pending" },
    { id: "A", name: "Closed" },
    { id: "all", name: "ALL" },
  ],
  TASK_STATUS: {
    pending: "Pending",
    approved: "Approved",
    waiting: "Waiting for approval",
    completed: "Completed",
    rejected: "Rejected",
  },
  ASSIGN_TYPE: [
    { value: "delicate", label: "Delicate" },
    { value: "permanent", label: "Permanent" },
  ],
  TASK_TYPE: [
    { value: "all", label: "All Tasks" },
    { value: "selected", label: "Selected Tasks" },
  ],
  ACTIVE_STATUS: [
    { id: "1", name: "Active" },
    { id: "0", name: "Inactive" },
  ],
  JOURNAL_TAB_MENU: [
    { id: "all", name: "All", value: "all" },
    { id: "observation", name: "Observation", value: "observation" },
    { id: "feed", name: "Feed", value: "feed" },
    { id: "task", name: "Task", value: "task" },
    { id: "incident", name: "Incident", value: "incident" },
    { id: "medical", name: "Medical", value: "medical" },
  ],
  DATEWISE_TASK_TAB_MENU: [
    { id: "all", name: "All", value: "all_task" },
    { id: "pending", name: "Pending", value: "pending" },
    { id: "overdue", name: "Over Due", value: "over_due_task" },
  ],
  PRIORITY_FOR_CATEGORY_ADD: [
    {
      id: "1",
      name: "Low",
    },
    {
      id: "2",
      name: "Moderate",
    },
    {
      id: "3",
      name: "High",
    },
    {
      id: "4",
      name: "Danger",
    },
    {
      id: "5",
      name: "Critical",
    },
  ],
  SETTINGS_MENU: [
    {
      id: "language",
      name: "Language",
    },
  ],

  APP_LANGUAGES: [
    {
      id: "english",
      name: "English",
      value: "en",
    },
    {
      id: "hindi",
      name: "Hindi",
      value: "hi",
    },
  ],
};

export default Configs;
