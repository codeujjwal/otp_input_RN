import React, {Component} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import theme from '../../../theme';
import {connect} from 'react-redux';
import {setTrue, setFalse, setNull} from '../../../store/actions/otp';
class OtpInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pin1: '',
      pin2: '',
      pin3: '',
      pin4: '',
      key: null,
    };
    const OTP = this.props.otp.otp;
    this.componentDidUpdate = (prevProps, prevState) => {
      if (prevState.pin4 !== this.state.pin4) {
        const eneterdValue =
          this.state.pin1 + this.state.pin2 + this.state.pin3 + this.state.pin4;
        const value = parseInt(eneterdValue, 10);
        if (value === OTP) {
          this.props.dispatch(setTrue());
          setTimeout(() => {
            this.props.navigation.navigate('signUp', {screen: 'nameInput'});
            this.props.dispatch(setNull());
          }, 100);
        } else {
          this.props.dispatch(setFalse());
          setTimeout(() => {
            this.props.dispatch(setNull());
            this.setState({pin1: ''});
            this.setState({pin2: ''});
            this.setState({pin3: ''});
            this.setState({pin4: ''});
            this.pin1Ref.focus();
          }, 1000);
        }
        if (this.state.pin4.length === 0) {
          this.props.dispatch(setNull());
        }
      } else if (prevState.pin3 !== this.state.pin3) {
        if (this.state.pin3.length !== 0) {
          this.pin4Ref.focus();
        }
      } else if (prevState.pin2 !== this.state.pin2) {
        if (this.state.pin2.length !== 0) {
          this.pin3Ref.focus();
        }
      } else if (prevState.pin1 !== this.state.pin1) {
        if (this.state.pin1.length !== 0) {
          this.pin2Ref.focus();
        }
      }
    };
  }
  render() {
    const {pin1, pin2, pin3, pin4} = this.state;
    const valid = this.props.otp.valid;

    return (
      <View style={styles.OTP_container}>
        <TextInput
          value={pin1}
          onChangeText={pin =>
            this.setState({pin1: pin.replace(/[^0-9]/g, '')})
          }
          placeholderTextColor={theme.colors.primary[4]}
          keyboardType="numeric"
          style={[
            styles.input,
            valid === true
              ? styles.ValidInput
              : valid === false
              ? styles.invalidInput
              : null,
          ]}
          maxLength={1}
          autoFocus
          ref={input => {
            this.pin1Ref = input;
          }}
          placeholder="_"
        />
        <TextInput
          value={pin2}
          onChangeText={pin =>
            this.setState({pin2: pin.replace(/[^0-9]/g, '')})
          }
          placeholderTextColor={theme.colors.primary[4]}
          keyboardType="numeric"
          style={[
            styles.input,
            valid === true
              ? styles.ValidInput
              : valid === false
              ? styles.invalidInput
              : null,
          ]}
          maxLength={1}
          ref={input => {
            this.pin2Ref = input;
          }}
          placeholder="_"
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              if (pin2.length === 0) {
                this.pin1Ref.focus();
                this.setState({pin1: ''});
              }
            }
          }}
        />
        <TextInput
          value={pin3}
          onChangeText={pin =>
            this.setState({pin3: pin.replace(/[^0-9]/g, '')})
          }
          placeholderTextColor={theme.colors.primary[4]}
          keyboardType="numeric"
          style={[
            styles.input,
            valid === true
              ? styles.ValidInput
              : valid === false
              ? styles.invalidInput
              : null,
          ]}
          maxLength={1}
          ref={input => {
            this.pin3Ref = input;
          }}
          placeholder="_"
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              if (pin3.length === 0) {
                this.pin2Ref.focus();
                this.setState({pin2: ''});
              }
            }
          }}
        />
        <TextInput
          value={pin4}
          onChangeText={pin =>
            this.setState({pin4: pin.replace(/[^0-9]/g, '')})
          }
          placeholderTextColor={theme.colors.primary[4]}
          keyboardType="numeric"
          style={[
            styles.input,
            valid === true
              ? styles.ValidInput
              : valid === false
              ? styles.invalidInput
              : null,
          ]}
          maxLength={1}
          ref={input => {
            this.pin4Ref = input;
          }}
          placeholder="_"
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              if (pin4.length === 0) {
                this.pin3Ref.focus();
                this.setState({pin3: ''});
              }
            }
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    otp: state.otp,
  };
};

export default connect(mapStateToProps)(OtpInput);
const styles = StyleSheet.create({
  OTP_container: {
    flexDirection: 'row',
    marginTop: 22,
    marginBottom: 26,
  },
  input: {
    height: 50,
    width: 60,
    borderWidth: 2,
    borderColor: theme.colors.primary[1],
    marginRight: 10,
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
    paddingLeft: 25,
    paddingBottom: 0,
    color: 'rgb(46,46,46)',
    alignSelf: 'center',
    borderRadius: 12,
  },
  invalidInput: {borderColor: 'rgb(232,72,85)'},
  ValidInput: {borderColor: 'rgb(0,197,187)'},
});
