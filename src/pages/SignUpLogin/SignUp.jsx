import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import useStepNavigation from '../../hooks/useStepNavigation.js';
import SignUpAgree from '../../components/SignUp/SignUpAgree.jsx';
import SignUpEmail from '../../components/SignUp/SignUpEmail.jsx';
import SignUpNickname from '../../components/SignUp/SignUpNickname.jsx';
import SignUpAddress from '../../components/SignUp/SignUpAddress.jsx';
import ProgressBar from '../../components/SignUp/ProgressBar.jsx';
import SignUpPassword from '../../components/SignUp/SignUpPassword.jsx';
import {BackIcon2} from '../../assets/assets';

const SignUp = ({navigation}) => {
  const {step, handleNextStep, handlePreviousStep, userData} =
    useStepNavigation(navigation);
  const {checkboxState, email, nickname, password} = userData; // userData에서 email, nickname, password 가져오기
  const [showPostcode, setShowPostcode] = useState(false);

  const stepComponents = {
    1: <SignUpAgree onNextStep={handleNextStep} />,
    2: (
      <SignUpEmail
        onNextStep={handleNextStep}
        onPreviousStep={handlePreviousStep}
      />
    ),
    3: (
      <SignUpPassword
        onNextStep={handleNextStep}
        onPreviousStep={handlePreviousStep}
      />
    ),
    4: (
      <SignUpNickname
        onNextStep={handleNextStep}
        onPreviousStep={handlePreviousStep}
      />
    ),
    5: (
      <SignUpAddress
        navigation={navigation}
        email={email}
        nickname={nickname}
        password={password}
        checkboxState={checkboxState}
        onPreviousStep={handlePreviousStep}
        showPostcode={showPostcode}
        setShowPostcode={setShowPostcode}
      />
    ),
  };

  const progressPercentage = step * 20;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fefffe'}}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => {
          if (showPostcode) setShowPostcode(false);
          else handlePreviousStep();
        }}>
        <Image source={BackIcon2} />
      </TouchableOpacity>

      <ProgressBar percentage={progressPercentage} />
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>{stepComponents[step]}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    marginHorizontal: 8,
    marginBottom: 24,
  },
});

export default SignUp;
