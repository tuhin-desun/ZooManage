// Created by Dibyendu
import { StyleSheet } from "react-native";
import Colors from '../../config/colors'
const styles = StyleSheet.create({
  ScrollView:{
   paddingHorizontal: Colors.formPaddingHorizontal,
    paddingBottom: 20,
    paddingTop: 5,
     marginBottom: 20,
  },
images:{
   width: 35,
   height: 35 
},
marginRight10:{marginRight: 10},

  Text:{
     fontSize: 12,
      color: Colors.primary 
  },
  flex1:{
   flex: 1
  },
  backgroundColorTransparent:{backgroundColor: "transparent"},
  fontSize12:{fontSize: 12},
  fontWeightNormal:{fontWeight: "normal"},
  displayFlex:{display: "flex"},
      justifyContentFlexStart:{justifyContent: "flex-start"},
  
})
export default styles