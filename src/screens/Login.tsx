import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, CheckBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const handleRememberMe = async (email: string) => {
    await AsyncStorage.setItem('rememberedEmail', email);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', rememberMe: false }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={async (values) => {
        if (values.rememberMe) await handleRememberMe(values.email);
        alert('Login Successful');
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
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
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={values.rememberMe}
              onValueChange={(value) => setFieldValue('rememberMe', value)}
            />
            <Text style={styles.checkboxLabel}>Remember Me</Text>
          </View>

          <Button onPress={handleSubmit} title="Login" />
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
});

export default Login;
