import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class StaticCollage extends React.Component {
  renderMatrix(){
    const { matrix, direction, width, height, imageStyle, seperatorStyle, onPhotoPress, onPhotoPressIn, onPhotoPressOut } = this.props;

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sectionDirection = (direction == 'row') ? 'column' : 'row';

    return matrix.map((element, m, array) => {
      const startIndex = m ? array.slice(0, m).reduce(reducer) : 0;

      const images = this.props.images.slice(startIndex, startIndex + element).map((image, i) => {
        if(!onPhotoPress || !onPhotoPressIn || !onPhotoPressOut) {
          return <Image key={i} source={{ uri: image }} style={[ { flex: 1 }, imageStyle ]} />
        }

        return (
          <TouchableOpacity
            key={i} 
            onPress={() => onPhotoPress({ uri: image, index: i })} 
            onPressIn={() => onPhotoPressIn({ uri: image, index: i })} 
            onPressOut={() => onPhotoPressOut({ uri: image, index: i })}>
            <Image source={{ uri: image }} style={[ { flex: 1 }, imageStyle ]} />
          </TouchableOpacity>
        );
      });

      return (
        <View key={m} style={[ { flex: 1, flexDirection: sectionDirection }, seperatorStyle ]}>
          { images }
        </View>
      );
    });
  }

  render() {
    const { width, height, direction, containerStyle } = this.props;

    return (
      <View style={[ { width, height }, containerStyle ]}>
        <View style={{ flex: 1, flexDirection: direction }}>
          { this.renderMatrix() }
        </View>
      </View>
    );
  }
}

StaticCollage.defaultProps = {
  // VARIABLES
    direction: 'row',
  // STYLE OF SEPERATORS ON THE COLLAGE
    seperatorStyle: {
      borderWidth: 2,
      borderColor: 'white',
    },

  // STYLE
  containerStyle: {
    borderWidth: 4,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  imageStyle: {}, // DEFAULT IMAGE STYLE
};

StaticCollage.propTypes = {
  images: PropTypes.array,
  matrix: PropTypes.array,
  direction: PropTypes.oneOf(['row', 'column']),
};

export { StaticCollage };
