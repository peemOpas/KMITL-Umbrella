import {StyleSheet} from 'react-native';

const Stylecomponent = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: '#FAC983',
    padding: 90,
  },
  root_signin: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAC983',
    justifyContent: 'space-between',
  },
  root_register: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAC983',
    justifyContent: 'space-between',
  },
  logos_umbrella: {
    borderRadius: 20,
    resizeMode: 'cover',
    height: 400,
    width: 300,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
  },
  button_login: {
    borderRadius: 12,
    justifycontent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#E35205',
    width: 300,
    marginBottom: 10,
  },
  button_login2: {
    borderRadius: 12,
    justifycontent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#E35205',
    width: 300,
    marginBottom: 10,
    },
  button_register: {
    borderRadius: 12,
    justifycontent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: 'white',
    width: 300,
    marginBottom: 10,
  },
  text_black: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    },
    text_white: {
      fontSize: 17,
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',  
    },
  text_grey: {
    fontSize: 17,
    color: 'grey',
    paddingLeft: 11,
    paddingRight: 4,
  },
  buttons_goback: {
    position: 'absolute',
    top: 10,
    left: 0,
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: 'white',
    width: 30,
    margin: 20,
  },
  text_padding: {
    marginTop: 20,
  },
  header_text: {
    fontSize: 38,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
    paddingLeft: 30,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 50,
    marginBottom: 20,
    marginTop: 100,
    },
  text_forgotpassword: {
    fontWeight: 'bold',
    left: 102,
    textAlign: 'right',
  },
  text_blue: {
    textAlign: 'center',
    color: '#35C2C1',
    fontWeight: 'bold',
  },
  inputsignin_label: {
    borderRadius: 5,
    margin: 10,
    padding: 10,
    width: 320,
    height: 50,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    flex: 2,
    justifyContent: 'space-around',
    width: '80%',
    //paddingBottom: -70,
    },
    input_label: {
      borderRadius: 5,
      width: '100%',
      padding:10,
      backgroundColor: 'white',
      
      },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAC983',
    padding: 90,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAC983',
    justifyContent: 'space-around',
  },
  logoContainer: {
    flex: 1,
    padding: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 200,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   // padding: 10,
  },
  linkContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //paddingTop: -50,
    },
    buttonContainer2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    registerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
    },


    
});

export default Stylecomponent;
