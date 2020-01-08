import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from './Styles/SearchBarStyles'
import { Colors, Metrics } from '../Themes/'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class SearchBar extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    searchTerm: PropTypes.string
  }

  render () {
    const { onSearch, onCancel, searchTerm } = this.props
    return (
      <View style={styles.container}>
        <Icon name='search' size={Metrics.icons.tiny} style={styles.searchIcon} />
        <TextInput
          ref='searchText'
          placeholder='Search'
          placeholderTextColor={Colors.snow}
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={onSearch}
          autoCapitalize='none'
          onSubmitEditing={onSearch.bind(this, searchTerm)}
          returnKeyType={'search'}
          autoCorrect={false}
          selectionColor={Colors.snow}
        />
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Text style={styles.buttonLabel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
