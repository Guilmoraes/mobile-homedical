import Metrics from './Metrics'

const type = {
  base: 'Avenir-Book',
  bold: 'Avenir-Black',
  emphasis: 'HelveticaNeue-Italic'
};

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  tiny: 8.5,
  small: Metrics.screenWidth < 500 ? 12 : 20,
  medium: Metrics.screenWidth < 500 ? 14 : 22,
  floatingLabel: Metrics.screenWidth < 500 ? 12 : 17,
  floatingPlaceholder: Metrics.screenWidth < 500 ? 17 : 22,
  regular: Metrics.screenWidth < 500 ? 16 : 24,
  input: Metrics.screenWidth < 500 ? 18 : 26,
  smallerTitle: Metrics.screenWidth < 500 ? 20 : 28,
  title: Metrics.screenWidth < 500 ? 22 : 30,
  biggerTitle: Metrics.screenWidth < 500 ? 24 : 32,
  biggerTitle2: Metrics.screenWidth < 500 ? 28 : 36,
  biggerTitle3: Metrics.screenWidth < 500 ? 30 : 39,
  biggerTitle4: Metrics.screenWidth < 500 ? 36 : 47,
  astronomicSize: Metrics.screenWidth < 500 ? 90 : 100
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
};

export default {
  type,
  size,
  style
}
