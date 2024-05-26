// import OpenAiApi from "openai";
import { useState } from "react";
import {
  TouchableOpacity,
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView
} from "react-native";
import axios from "axios";

const Chatgpt = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleInput = async () => {
    try {
      const options = {
        method: "POST",
        url: "https://api.cohere.ai/v1/generate",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: "Bearer Cnu4SrxZwXEdbqfSu6esrhB0pU1uAvEMwFHcJvd8",
        },
        data: {
          truncate: "END",
          return_likelihoods: "NONE",
          prompt: input,
        },
      };
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setOutput(response.data.generations[0].text);
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
    setInput("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your query here.."
            value={input}
            onChangeText={(text) => setInput(text)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleInput}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.outputContainer}>
          <Text style={styles.output}>{output}</Text>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // height: '95%'
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  chatContainer: {
    width: "90%",
    height: "70%",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    // flexDirection:'vertical',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F2F2F2",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  outputContainer:{
    marginTop: 15,
    marginLeft:15,
    marginRight:15,
  }
});
export default Chatgpt;
