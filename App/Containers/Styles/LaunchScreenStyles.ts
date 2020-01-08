import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Metrics.baseMargin,
    backgroundColor: Colors.aquaBlue
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  titleContainer: {
    height: Platform.OS === 'ios' ? 100 : 80,
    justifyContent: "center",
    marginTop: Platform.OS === 'ios' ? "65%" : "55%",
  },
  circleImageContainer: {
    borderRadius: 100,
    marginLeft: "2%",
    height: 133,
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: "10%",
    width: 133,
    backgroundColor: Colors.duckEggBlue
  },
  imageHouseAndNurseStyle: {
    height: 110,
    width: 110,
    resizeMode: 'contain',
    marginTop: "6%"
  },
  textStyle: {
    height: 100
  },
  firstLabelTitle: {
    marginTop: "2%",
    fontSize: Fonts.size.biggerTitle,
    color: Colors.darkTeal,
    includeFontPadding: false,
    marginBottom: -8,
    textAlignVertical: "center",
    fontFamily: 'Roboto-Regular',
    alignSelf: "flex-end",
    marginRight: "15%"
  },
  secondLabelTitle: {
    textAlignVertical: "center",
    alignSelf: "flex-end",
    includeFontPadding: false,
    fontSize: Fonts.size.biggerTitle2,
    fontFamily: 'Roboto-Bold',
    color: Colors.darkTeal,
    fontWeight: "bold",
    marginRight: "15%"
  }
})
