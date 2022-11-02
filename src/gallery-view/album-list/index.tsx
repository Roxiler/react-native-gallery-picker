import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
const AlbumList = (props: any) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={props.data}
        contentContainerStyle={styles.listStyle}
        renderItem={({ item }) => {
          const { title = '' } = item;

          return (
            <TouchableOpacity
              style={styles.textContainer}
              onPress={() => props.onAlbumNamePress(title)}
            >
              <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default AlbumList;
