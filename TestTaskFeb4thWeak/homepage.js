import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  Alert
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker'
import  Anim  from './animatedComponent'
import ImagePicker from 'react-native-image-picker'


var radio_props = [
  {label: 'Male ', value: 0 },
  {label: 'Female', value: 1 }
];

var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
export default class HomePage extends Component {
  constructor (props) {
    super(props)
    edit = this
    this.state = {
      isAttempting: true,
      userName: '',
      email: '',
      phoneNumber: '',
      gender:'',
      value: 0,
      image: null,
      date:"2017-03-06",
      isNewViewHandled: false,
      bounceValue: new Animated.Value(0),

    }
  }

  onPressDateofBirth() {

      alert('bday');
  }
  onPressGender() {

  }
  onPressSubmit() {
    console.log(this.state.userName);
    console.log(this.state.email);
    console.log(this.state.phoneNumber);
    console.log(this.state.value);
    console.log(this.state.date);

    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!emailPattern.test(this.state.email)) {
          Alert.alert(
            'Message',
            'Please enter valid email.',
            [
              {text: 'OK', onPress: () => this.scrollDownMethod()}
            ]
          )
        } else if (this.state.userName === '') {

        } else {
          this.setState({isNewViewHandled: true})
        }
    // alert('submit');
  }
  pickSingleWithCamera() {
    ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    let source = { uri: response.uri };

    // You can also display the image using data:
    // let source = { uri: 'data:image/jpeg;base64,' + response.data };

    this.setState({
      avatarSource: source
    });
  }
});
}

pickSingle(cropit, circular=false) {

}
onPressCancel () {
  this.setState({isNewViewHandled: false})
}

  render() {
    if (!this.state.isNewViewHandled) {
      return (
        <View>
           <Image source={require('./Images/bgImg1.jpg')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
             <View style={{height: Dimensions.get('window').width /2, width: Dimensions.get('window').width, backgroundColor: 'transparent' }}>
                 <View style={styles.profileStyleView} >
                 <TouchableOpacity onPress={() => this.pickSingleWithCamera()} style={styles.button}>
                   <Text style={styles.text}>Select Single</Text>
                  <Image source={this.state.avatarSource} style={{height: 120, width: 120, backgroundColor: 'transparent' }} >
                   </Image>
                 </TouchableOpacity>
                 </View>
             </View>
             <View>
               <View style={styles.textFieldBgView}>
               <TextInput style={styles.textInputStyle}
                               placeholder='User Name'
                               ref='Email'
                               returnKeyType='done'
                               underlineColorAndroid='transparent'
                               value={this.state.userName}
                               onChangeText={(constText) => this.setState({userName: constText})} />
               </View>
               <View style={styles.textFieldBgView}>
               <TextInput style={styles.textInputStyle}
                                ref='onfocus'
                                placeholder='Email'
                                keyboardType='email-address'
                                underlineColorAndroid='transparent'
                                autoCapitalize='none'
                                returnKeyType='done'
                               value={this.state.email}
                               onChangeText={(constText) => this.setState({email: constText})} />
               </View>
               <View style={styles.textFieldBgView}>
               <TextInput style={styles.textInputStyle}
                               placeholder='Phone Number'
                               ref='Phone'
                               returnKeyType='done'
                               underlineColorAndroid='transparent'
                               value={this.state.phoneNumber}
                               onChangeText={(constText) => this.setState({phoneNumber: constText})} />
               </View>
               <View style={styles.textFieldBgView}>
                 <View style={styles.fieldActionStyle}>
                   <DatePicker
                     style={{width: 200}}
                     date={this.state.date}
                     mode="date"
                     placeholder="select date"
                     format="YYYY-MM-DD"
                     minDate="1800-01-01"
                     maxDate="3016-06-01"
                     confirmBtnText="Confirm"
                     cancelBtnText="Cancel"
                     customStyles={{
                       dateIcon: {
                         position: 'absolute',
                         left: 0,
                         top: 4,
                         marginLeft: 0
                       },
                       dateInput: {
                         marginLeft: 36
                       }
                       // ... You can check the source to find the other keys.
                     }}
                     onDateChange={(date) => {this.setState({date: date})}}
                   />
                 </View>
               </View>
                 <View style={{flexDirection: 'row', justifyContent:'space-around', backgroundColor: 'transparent',}}>
                 <RadioForm
                   radio_props={radio_props}
                   initial={0}
                   formHorizontal={true}
                   labelStyle={{fontSize: 16, color: '#2ecc71'}}
                   labelWrapStyle={{}}
                   buttonSize={8}
                   onPress={(value) => {this.setState({value:value})}}
                   />
                 </View>
               <View style={styles.textFieldBgViewSubmit}>
                 <TouchableOpacity style={styles.submitActionStyle} onPress={() => this.onPressSubmit()}>
                 <Text>  Submit </Text>
                 </TouchableOpacity>
               </View>
             </View>
           </Image>
        </View>
      );
    } else {
      return (
        <Anim  >
        <Image source={require('./Images/bgImg1.jpg')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
        <TouchableOpacity style={{width: 50, height: 50 ,marginLeft: 30, top: 30, backgroundColor: "transparent"}} onPress={() => this.onPressCancel()}>
        <Text>  Back </Text>
        </TouchableOpacity>
        <View style={{height: Dimensions.get('window').width /2, width: Dimensions.get('window').width, backgroundColor: 're' }}>
            <View style={styles.profileStyleView} >
            <TouchableOpacity onPress={() => this.pickSingle(false)} style={styles.button}>
              <Text style={styles.text}>Select Single</Text>
            </TouchableOpacity>
            </View>
        </View >
        <View style={{ flexDirection: 'row' ,width: Dimensions.get('window').width,height: 40,top: 10,backgroundColor: 'transparent', alignItems: 'center', paddingLeft: 50}}>
        <Text>User Name : </Text>
        <Text> {this.state.userName} </Text>
        </View>
        <View style={{ flexDirection: 'row' ,width: Dimensions.get('window').width,height: 40,top: 10,backgroundColor: 'transparent', alignItems: 'center', paddingLeft: 50}}>
        <Text>User Name : </Text>
        <Text>{this.state.email} </Text>
        </View>
        <View style={{ flexDirection: 'row' ,width: Dimensions.get('window').width,height: 40,top: 10,backgroundColor: 'transparent', alignItems: 'center', paddingLeft: 50}}>
        <Text>User Name : </Text>
        <Text>{this.state.phoneNumber} </Text>
        </View>
        <View style={{ flexDirection: 'row' ,width: Dimensions.get('window').width,height: 40,top: 10,backgroundColor: 'transparent', alignItems: 'center', paddingLeft: 50}}>
        <Text>User Name : </Text>
        <Text>{this.state.date} </Text>
        </View>
        <View style={{ flexDirection: 'row' ,width: Dimensions.get('window').width,height: 40,top: 10,backgroundColor: 'transparent', alignItems: 'center', paddingLeft: 50}}>
        <Text>User Name : </Text>
        <Text>test </Text>
        </View>
        </Image>
        </Anim>
  );
    }

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  profileStyleView: {
    height: Dimensions.get('window').width / 3,
    width:  Dimensions.get('window').width / 3,
    marginLeft: Dimensions.get('window').width / 3,
    top: 30,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',

  },
  textFieldBgView: {
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width ,
    height: 50,
  },
  textInputStyle: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 30,
    marginRight: 30,
  },
  fieldActionStyle: {
    marginLeft: 30,
    marginRight: 30,
  },
  submitActionStyle: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontSize: 40
  },
  textFieldBgViewSubmit: {
    width: Dimensions.get('window').width ,
    height: 100,
    fontSize:40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  }
});

AppRegistry.registerComponent('HomePage', () => HomePage);
