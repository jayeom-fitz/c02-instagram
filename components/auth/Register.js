import React, { Component } from 'react'
import { TextInput, View, Button } from 'react-native';

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: ''
    };

    this.onSignUp = this.onSignUp.bind(this);
  }
  
  onSignUp() {

  }

  render() {
    return (
      <View>
        <TextInput 
          placeholder='name'
          onChangeText={(name) => this.setState({ name })}
        />   
        <TextInput 
          placeholder='email'
          onChangeText={(email) => this.setState({ email })}
        />   
        <TextInput 
          secureTextEntry={true}
          placeholder='password'
          onChangeText={(password) => this.setState({ password })}
        />

        <Button
          onPress={() => this.signUp()}
          title="Sign Up"
        />
      </View>
    )
  }
}

export default Register
