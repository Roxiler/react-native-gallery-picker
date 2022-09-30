import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

const AlbumList = (props: any) => {

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <FlatList
        data={props.data}
        contentContainerStyle={{paddingLeft: 15}}
        renderItem={({item, index}) => {
          const {title = ''} = item;
          
          return (
            <TouchableOpacity
              style={{marginTop: 15}}
              onPress={() => props.onAlbumNamePress(title)}>
              <Text style={{color: 'white', fontSize: 20}}>{title}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default AlbumList;
