import RootToast from 'react-native-root-toast';

class Toast {

  showToast(message: string) {
    RootToast.show(message, {
      duration: RootToast.durations.SHORT,
      position: RootToast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
    });
  }

}

export default new Toast();
