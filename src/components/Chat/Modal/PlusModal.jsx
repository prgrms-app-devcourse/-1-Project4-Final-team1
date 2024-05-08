import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';

const PlusModal = ({isVisible, toggleModal, getPhotos}) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      onBackdropPress={toggleModal}
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 0,
      }}>
      <View
        style={{
          flex: 0.15,
          width: '100%',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            paddingHorizontal: 24,
            flex: 3,
          }}>
          <TouchableOpacity
            style={{alignItems: 'center', justifyContent: 'center', gap: 8}}
            onPress={getPhotos}>
            <Image
              style={{width: 32, height: 32}}
              source={require('../../../assets/icons/image.png')}
            />
            <Text>사진</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignItems: 'center', justifyContent: 'center', gap: 8}}>
            <Image
              style={{width: 32, height: 32}}
              source={require('../../../assets/icons/image.png')}
            />
            <Text>카메라</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{flex: 1}} onPress={toggleModal}>
          <Text>취소</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PlusModal;
