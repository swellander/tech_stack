import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';


//imports all create-action functions from action directory
import * as actions from '../actions';

class ListItem extends Component {
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  renderDescription() {
    const { library, expanded } = this.props;

    if (expanded) {
      return (
        <CardSection>
          <Text style={{ flex: 1, padding: 5 }}>
            {library.description}
          </Text>
        </CardSection>
      );
    }
  }

  render() {
    const { titleStyle } = styles;
    const { title, id } = this.props.library;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.selectLibrary(id)}
      >
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {title}
            </Text>
          </CardSection>
        {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.id;
  return { expanded };
};

//First argument is explicitly for mapStateToProps function
//automatically dispatches actions to redux store...also passes all actions into component as props
export default connect(mapStateToProps, actions)(ListItem);
