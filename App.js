import React,{useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert,
  Image
} from 'react-native';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-native-datepicker';
import { date } from 'yup/lib/locale';
import {Picker} from '@react-native-picker/picker';
import MultiSelect from 'react-native-multiple-select';
import icons from './source/common/resources/icons'
import { relativeTimeRounding } from 'moment';

const loginValidationSchema = yup.object().shape({
  fullName: yup
      .string()
      .matches(/(\w.+\s).+/, 'Enter First and Last Name')
      .required('Full name is required'),
  mobileNumber: yup
      .string()
      .matches(/(91)(\d){10}\b/, 'Enter a valid phone number')
      .required('Mobile number is required'),
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
})

const DismissKeyboard = ({children})=>(
  <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

const items = [
  {id: 1, name: 'Tamil'},
  {id: 2, name: 'English'},
  {id: 3, name: 'Telugu'},
  {id: 4, name: 'Malayalam'},
  {id: 5, name: 'Kannada'},
  {id: 6, name: 'Punjabi'},
  {id: 7, name: 'Bengali'},
  {id: 8, name: 'Kashmiri'},
  {id: 9, name: 'Hindi'},
  {id: 10, name: 'Greek'},
];

const App = () => {
  const ref_radioButton = useRef();
  const ref_dropDown = useRef();
  const ref_date = useRef();
  const ref_mobileNumber = useRef();
  const ref_email = useRef();
  const ref_password = useRef();
  const ref_confirmPassword = useRef();

  
const [date, setDate]=useState(new Date());
const [isSelected, setisSelected] = useState([
  {id: 1, value: true, name: 'Male', selected: false},
  {id: 2, value: false, name: 'Female', selected: false},
]);  

const [selectedZone, setSelectedZone] = useState();

const onRadioBtnClick = (item) => {
  let updatedState = isSelected.map((isSelectedItem) =>
    isSelectedItem.id === item.id
      ? {...isSelectedItem, selected: true}
      : {...isSelectedItem, selected: false},
  );
  setisSelected(updatedState);
};

const [hidePasswrd,setHidePasswrd]=useState(true);

const managePasswrdVisibility = () => {
  // console.log(hidePassword);
  setHidePasswrd((prevState)=> !prevState);
}

const [hidePassword,setHidePassword]=useState(true);

const managePasswordVisibility = () => {
  // console.log(hidePassword);
  setHidePassword((prevState)=> !prevState);
}

const [selectedItems, setSelectedItems] = useState([]);
const onSelectedItemsChange = (selectedItems) => {
  setSelectedItems(selectedItems);
  };

console.log(hidePassword);
  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <StatusBar barStyle="dark-content" />
      

      <ScrollView showsVerticalScrollIndicator={false}>
      <DismissKeyboard>
      
      <View style={styles.loginContainer}>
          <Text>FORMIK FORM WITH YUP VALIDATION</Text>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ fullName:'',date:'' ,mobileNumber:'' ,email: '', password: '', confirmPassword:'' }}
            onSubmit={values =>{ 
              values.date=date;
              Alert.alert(JSON.stringify(values));
              console.log(values);
            
            }}
          >
            {({ 
            handleChange, 
            handleBlur, 
            handleSubmit, 
            values, 
            touched, 
            errors, 
            isValid }) => (
              <>
                <TextInput
                  name="fullName"
                  maxLength={20}
                  placeholder="First and Last Name (e.g. John Smith)"
                  style={styles.textInput}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                  keyboardType="default"
                  autoFocus={true}
                  returnKeyType="next"
                  onSubmitEditing={() => ref_radioButton.current.focus()}
                />
                {errors.fullName &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.fullName}</Text>
                }

            <View style={styles.gender}>
            <View style={{justifyContent: 'flex-start'}}>
              <Text>Gender</Text>
            </View>
              {isSelected.map((item) => (
              <View style={styles.radioButtonContainer}>
                <TouchableOpacity
                onSubmitEditing={() => ref_dropDown.current.focus()}
                ref={ref_radioButton}
                  onPress={() => {
                    onRadioBtnClick(item);
                  }}
                  style={styles.radioButton}>
                  {item.selected ? (
                    <View style={styles.radioButtonIcon} />
                  ) : null}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    onRadioBtnClick(item);
                  }}>
                  <Text style={styles.radioButtonText}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.ageData}>
            <Text>Time Zone</Text>
          
          <View style={styles.pickDrop}>
            <Picker
              onSubmitEditing={() => ref_date.current.focus()}
              ref={ref_dropDown}
              selectedValue={selectedZone}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedZone(itemValue)
              }>
              <Picker.Item label="Greenwich Mean Time" value="GMT" />
              <Picker.Item label="European Central Time" value="GMT+1:00" />
              <Picker.Item label="Middle East Time" value="GMT+3:30" />
              <Picker.Item label="Indian Standard Time" value="GMT+5:30" />
              <Picker.Item label="Austaralia Central Time" value="GMT+9:30" />
              <Picker.Item label="Cental African Time" value="GMT-1:00" />
            </Picker>
          </View>
          </View>
          <View style={{width:'100%', marginTop:'4%', marginBottom:'4%'}}>
          <MultiSelect
          fixedHeight={false}
          hideTags
          styleDropdownMenu={{borderRadius:10, width:'99%' ,alignSelf:'center', justifyContent:'center'}}
          tagBorderColor='black'
          items={items}
          uniqueKey="id"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="    Pick Languages"
          searchInputPlaceholderText="Search Languages..."
          onChangeInput={(text) => console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{color: '#CCC'}}
          submitButtonColor="#bfe3aa"
          submitButtonText="Submit"
          hideSubmitButton={true}
        />
        </View>

            
            <DatePicker
              onSubmitEditing={() => ref_mobileNumber.current.focus()}
              ref={ref_date}
              style={styles.textInput}
               date={date} 
              onDateChange={setDate}
              mode="date"
              showIcon={false}
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="01-01-1921"
              maxDate= {new Date()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  left: 6,
                  top: 5,
                  marginLeft: 0,
                },
                dateInput: {
                  
                  borderColor: 'white',
                  borderWidth:0,
                  alignItems:'flex-start'

                },
              }}
              value={values.date}
              
              
            />
          

                <TextInput
                  name="mobileNumber"
                  placeholder="Mobile Number   (e.g.) 919090909090"
                  style={styles.textInput}
                  onChangeText={handleChange('mobileNumber')}
                  onBlur={handleBlur('mobileNumber')}
                  value={values.mobileNumber}
                  keyboardType="phone-pad"
                  autoFocus={true}
                  onSubmitEditing={() => ref_email.current.focus()}
                  ref={ref_mobileNumber}
                />
                 {errors.mobileNumber &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.mobileNumber}</Text>
                 }


                <TextInput
                  name="email"
                  maxLength={30}
                  placeholder="Email Address (e.g.) smith@mail.com"
                  style={styles.textInput}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  autoFocus={true}
                  blurOnSubmit={false}
                  onSubmitEditing={() => ref_password.current.focus()}
                  ref={ref_email}
                />
                 {errors.email &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                 }

                <View style={styles.passwrdInput}>    
                <TextInput
                  name="password"
                  style={styles.passwordArea}
                  placeholder="Password (at least 8 characters)"
                  maxLength={20}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  autoFocus={true}
                  onSubmitEditing={() => ref_confirmPassword.current.focus()}
                  ref={ref_password}
                  secureTextEntry={hidePasswrd}
                />
                <TouchableOpacity
                activeOpacity={0.8}
                style={styles.visibilityBtn}
                onPress={managePasswrdVisibility}
                ><Image 
                source={(hidePasswrd)?
                require('./source/common/resources/icons/EyeClose.png'):
                require('./source/common/resources/icons/EyeOpen.png')}
                style={styles.btnImage}
                  /></TouchableOpacity>
                </View>
                {errors.password &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                }

                <View style={styles.passwrdInput}>
                <TextInput
                  name="confirmPassword"
                  maxLength={20}
                  placeholder="Confirm Password"
                  style={styles.passwordArea}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  autoFocus={true}
                  ref={ref_confirmPassword}
                />
                <TouchableOpacity
                activeOpacity={0.8}
                style={styles.visibilityBtn}
                onPress={managePasswordVisibility}
                ><Image 
                source={(hidePassword)?
                require('./source/common/resources/icons/EyeClose.png'):
                require('./source/common/resources/icons/EyeOpen.png')}
                style={styles.btnImage}
                  /></TouchableOpacity>
                </View>
                {errors.confirmPassword &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.confirmPassword}</Text>
                }
                

                <Button onPress={handleSubmit} title="Submit" disabled={!isValid} />
              </>
            )}
          </Formik>
        </View>
      
      </DismissKeyboard>
      </ScrollView>
      </KeyboardAvoidingView>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    justifyContent: 'center',
    alignItems:'center',
    marginTop:15,
    marginBottom:15
  },

  loginContainer: {
    width: '94%',
    alignSelf:'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6'
  },
  textInput: {
    paddingLeft:'5%',
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    marginVertical:'4%'
  },
  passwordArea: {
    height:'100%',
    width:'100%'
  },
  passwrdInput: {
    flexDirection:'row',
    paddingLeft:'5%',
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    marginVertical:'4%'
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  },
  gender: {
    marginTop: '8%',
    flexDirection: 'row',
    marginVertical: '2%',
    marginLeft: '6%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  radioButtonContainer: {
    marginVertical: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: '#98CFB6',
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16,
  },
  ageData: {
    flexDirection:'row',
    marginLeft: '3%',
    alignItems: 'center',
    marginVertical: '2%',
    marginTop:'8%',
    marginBottom:'6%'
  },
  pickDrop: {
    height: 40,
    width: '65%',
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    marginVertical: '2%',
    fontSize: 10,
    position: 'relative',
    marginLeft: '7%',
    justifyContent: 'center',
  },
  visibilityBtn: { 
    position: 'absolute', 
    right: 3, 
    height: 40, 
    width: 35, 
    padding: 5 }, 
        
    btnImage: { 
    resizeMode: 'contain', 
    height: '80%', 
    width: '80%' } 
      
  
})


export default App