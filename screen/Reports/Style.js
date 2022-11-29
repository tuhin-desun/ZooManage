//created by Dibyendu
import { StyleSheet} from "react-native";
const styles = StyleSheet.create({

images:{height: 15, width: 15, resizeMode: "contain" },
    container: {
        flex: 1,
        backgroundColor: "#fff",
      },
      body: {
        flex: 9,
      },
      icon: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        left: 290,
        zIndex: 1,
      },
      numberBox: {
        position: "absolute",
        bottom: 75,
        width: 30,
        height: 30,
        borderRadius: 15,
        left: 330,
        zIndex: 3,
        backgroundColor: "#e3e3e3",
        justifyContent: "center",
        alignItems: "center",
      },
      number: { fontSize: 14, color: "#000" },
})
export default styles;