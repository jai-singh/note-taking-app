import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import Constants from 'expo-constants';

const Editor = () => {
  const _editor = React.createRef();
  const options = [
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
    ['clean']
  ];

  const styles = StyleSheet.create({
    container: {
      marginTop: 0,
      flexGrow: 1,
      flexShrink: 1
    },
    editor: {
      flex: 1,
      padding: 0,
      borderColor: 'gray',
      borderWidth: 0,
      marginHorizontal: 0,
      marginVertical: 0,
      backgroundColor: 'white', 
    },
    title:{
      padding: 0,
      fontSize: 20,
      paddingLeft: 10,
      paddingTop: 5,
      backgroundColor: 'white',
      height: 27,
      borderBottomColor: '#D3D3D3',
      borderBottomWidth: 1,
    }
  });

  return (
    <View style={styles.container}>
      <TextInput value="This is title" style={styles.title}     
      />
      <QuillEditor
          style={styles.editor}
          ref={_editor}
          initialHtml="<h1>Quill Editor for react-native</h1>"
      />
      <QuillToolbar editor={_editor} options={options} theme="light" />
    </View>
  );
}

export default Editor;