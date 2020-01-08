import * as React from "react";
import FusedLocation from 'react-native-fused-location'
import { PermissionsAndroid } from "react-native";
// import { View } from "react-native";
import I18n from '../../i18n/i18n'
import Toast from "../../Utils/Toast";

class LocationServiceAndroid {
  
  async getCurrentLocation() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: I18n.t(['locationService', 'accessFineLocationPermissionTitle']),
        message: I18n.t(['locationService', 'accessFineLocationPermissionMessage'])
      }
    );

    if (granted) {
      FusedLocation.setLocationPriority(FusedLocation.Constants.HIGH_ACCURACY);
      const location = await FusedLocation.getFusedLocation();
      return location
    }
  }
}

export default new LocationServiceAndroid()

