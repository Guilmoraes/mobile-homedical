import * as React from "react";
import {Image, Text, View} from "react-native";
import {connect} from "react-redux";
import styles from "./WaitingDocsApprovementStyles";
import I18n from '../../i18n/i18n'

export interface Props {
  professional?: any
}

export interface State {
  professional?: any,
}

class WaitingDocsApprovementScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      professional: props.professional
    };

  };

  componentWillReceiveProps(newProps: any) {
  }


  public render() {
    return (
      <View style={styles.container}>

        <View style={styles.roundedIconContainer}>
          <View style={styles.roundedBackground}>

            <Image
              style={styles.iconStyle}
              source={require("../../Images/waiting-docs-approvement-ic.png")}
            />
          </View>

        </View>
        <Text style={styles.greetingText}>{I18n.t(['waitingDocsApprovementScreen', 'greeting'], {name: this.props.professional.name})}</Text>

        <Text style={styles.waitText}>
          <Text>{I18n.t(['waitingDocsApprovementScreen', 'waitOne'])}</Text>
          <Text style={styles.waitBoldText}>{I18n.t(['waitingDocsApprovementScreen', 'waitTwo'])}</Text>
          <Text>{I18n.t(['waitingDocsApprovementScreen', 'waitThree'])}</Text>
          <Text style={styles.waitBoldText}>{I18n.t(['waitingDocsApprovementScreen', 'waitFour'])}</Text>
        </Text>

      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    professional: state.local.professional
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingDocsApprovementScreen)

