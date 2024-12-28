import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignUp = () => {
  const [passwordStrength, setPasswordStrength] = useState('');

  const calculatePasswordStrength = (password: string) => {
    if (password.length < 6) return 'Weak';
    if (password.length < 10) return 'Medium';
    return 'Strong';
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={(values) => {
        alert('Sign Up Successful');
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
          
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={(text) => {
              handleChange('password')(text);
              setPasswordStrength(calculatePasswordStrength(text));
            }}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
          <Text>Password Strength: {passwordStrength}</Text>

          <Button onPress={handleSubmit} title="Sign Up" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default SignUp;
