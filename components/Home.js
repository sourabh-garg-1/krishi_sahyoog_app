import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import React, { useLayoutEffect, useState, useEffect } from "react";
import axios from "axios";
import HeadSection from "./HeadSection";
import Voice from "@react-native-voice/voice";
import * as Location from "expo-location";
// import { useLanguage } from "../languageContext";
import I18n from 'i18n-js';

const imagesList = {
  Ajwan: require("../assets/cropImages/Ajwan.png"),
  Amaranthus: require("../assets/cropImages/Amaranthus.png"),
  Amla: require("../assets/cropImages/Amla.png"),
  Apple: require("../assets/cropImages/Apple.jpg"),
  Amphophalus: require("../assets/cropImages/amphophalus.png"),
  Apple: require("../assets/cropImages/Apple.jpg"),
  Ashgourd: require("../assets/cropImages/Ashgourd.png"),
  Banana: require("../assets/cropImages/Banana.png"),
  Beans: require("../assets/cropImages/Beans.png"),
  Beetroot: require("../assets/cropImages/Beetroot.png"),
  "Bengal Gram(Gram)(Whole)": require("../assets/cropImages/BengalGram.jpg"),
  "Black Gram (Urd Beans)(Whole)": require("../assets/cropImages/BlackGram.jpg"),
  "Bhindi(Ladies Finger)": require("../assets/cropImages/Bhindi.jpg"),
  Brinjal: require("../assets/cropImages/Brinjal.png"),
  Cabbage: require("../assets/cropImages/Cabbage.png"),
  Capsicum: require("../assets/cropImages/Capsicum.png"),
  Carrot: require("../assets/cropImages/Carrot.png"),
  Cauliflower: require("../assets/cropImages/Cauliflower.png"),
  Cashewnuts: require("../assets/cropImages/Cashewnuts.png"),
  "Castor Seed": require("../assets/cropImages/Castor.png"),
  Cauliflower: require("../assets/cropImages/Cauliflower.png"),
  Cloves: require("../assets/cropImages/Cloves.png"),
  Coconut: require("../assets/cropImages/Coconut.png"),
  Colacasia: require("../assets/cropImages/Colacasia.png"),
  "Coriander(Leaves)": require("../assets/cropImages/Coriander.jpg"),
  Cotton: require("../assets/cropImages/Cotton.png"),
  "Cucumbar(Kheera)": require("../assets/cropImages/Cucumbar.jpg"),
  Drumstick: require("../assets/cropImages/Drumstick.png"),
  Firewood: require("../assets/cropImages/firewood.jpg"),
  "French Beans (Frasbean)": require("../assets/cropImages/FrenchBeans.jpg"),
  Garlic: require("../assets/cropImages/Garlic.png"),
  "Ginger(Dry)": require("../assets/cropImages/Ginger.jpg"),
  Grapes: require("../assets/cropImages/Grapes.png"),
  "Green Chilli": require("../assets/cropImages/Green_chilli.jpg"),
  Groundnut: require("../assets/cropImages/Groundnut.png"),
  Guar: require("../assets/cropImages/Guar.png"),
  Guava: require("../assets/cropImages/Guava.png"),
  "Jowar(Sorghum)": require("../assets/cropImages/Jowar.jpg"),
  Jute: require("../assets/cropImages/Jute.png"),
  Kinnow: require("../assets/cropImages/Kinnow.png"),
  Lemon: require("../assets/cropImages/Lemon.png"),
  Lily: require("../assets/cropImages/Lilly.png"),
  Lime: require("../assets/cropImages/Lime.png"),
  Linseed: require("../assets/cropImages/Linseed.png"),
  Maize: require("../assets/cropImages/Maize.png"),
  Mango: require("../assets/cropImages/Mango.png"),
  "Methi(Leaves)": require("../assets/cropImages/Methi.jpg"),
  "Moussambi(Sweet Lime)": require("../assets/cropImages/Mousambhi_sweet.jpg"),
  Mustard: require("../assets/cropImages/Mustard.png"),
  Onion: require("../assets/cropImages/Onion.png"),
  Orange: require("../assets/cropImages/Orange.png"),
  Orchid: require("../assets/cropImages/Orchid.png"),
  "Paddy(Dhan)(Basmati)": require("../assets/cropImages/paddy.jpg"),
  // "Papaya (Raw)": require("../assets/cropImages/Papaya.jpg"),
  Papaya: require("../assets/cropImages/Papaya.png"),
  Pineapple: require("../assets/cropImages/Pineapple.png"),
  Plum: require("../assets/cropImages/Plum.png"),
  Pomegranate: require("../assets/cropImages/Pomegranate.png"),
  Potato: require("../assets/cropImages/Potato.png"),
  Pumpkin: require("../assets/cropImages/Pumpkin.png"),
  Raddish: require("../assets/cropImages/Raddish.jpg"),
  Rice: require("../assets/cropImages/Rice.png"),
  Rubber: require("../assets/cropImages/Rubber.png"),
  Safflower: require("../assets/cropImages/Safflower.png"),
  Seetapal: require("../assets/cropImages/Seetapal.png"),
  Snakeguard: require("../assets/cropImages/snakeguard.png"),
  Soyabean: require("../assets/cropImages/Soyabean.png"),
  Spinach: require("../assets/cropImages/Spinach.png"),
  Sugar: require("../assets/cropImages/Sugar.png"),
  "Sweet Potato": require("../assets/cropImages/SweetPotato.jpg"),
  Tapioca: require("../assets/cropImages/Tapioca.png"),
  Tinda: require("../assets/cropImages/Tinda.png"),
  Tomato: require("../assets/cropImages/Tomato.png"),
  Turmeric: require("../assets/cropImages/Turmeric.png"),
  Turnip: require("../assets/cropImages/Turnip.png"),
  Walnut: require("../assets/cropImages/Walnut.png"),
  Wheat: require("../assets/cropImages/Wheat.png"),
  "White Peas": require("../assets/cropImages/WhitePeas.jpg"),
  Wood: require("../assets/cropImages/Wood.jpg"),
  "Yam (Ratalu)": require("../assets/cropImages/Yam.jpg"),
};

const Home = ({ navigation }) => {
  // const { language } = useLanguage(); // Use the useLanguage hook to get the current language
  // const { t } = useTranslation(); 
  const [isLoading, setLoading] = useState(false);
  const [coord, setCoord] = useState({});

  const [data, setData] = useState([]);
  const [finaldata, setfinaldata] = useState([]);
  const [Value, setValue] = useState("");

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    getdata();
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      try {
        let loc = await Location.getCurrentPositionAsync({});
        // console.log(loc.coords.latitude);
        setCoord(loc.coords);
        // console.log(coord);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [data]);

  const onSpeechStartHandler = (e) => {
    console.log("start handler==>>>", e);
  };
  const onSpeechEndHandler = (e) => {
    setLoading(false);
    console.log("stop handler", e);
  };

  const onSpeechResultsHandler = (e) => {
    let text = e.value[0];
    setValue(text);
    if (text) {
      let result = data.filter((c) => {
        return c.commodity.toLowerCase().includes(text.toLowerCase());
      });
      setfinaldata(result);
    } else {
      setfinaldata(data);
    }
    console.log("speech result handler", e);
  };

  const startRecording = async () => {
    setLoading(true);
    try {
      await Voice.start("en-IN");
    } catch (error) {
      console.log("error raised", error);
    }
  };

  const stopRecording = async () => {
    setLoading(false);
    // setResult(text);
    // setValue(text);
    try {
      await Voice.stop();
    } catch (error) {
      console.log("error raised", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  function getdata(commodity = "", limit = 2000) {
    let url =
      "https://api.data.gov.in/catalog/6141ea17-a69d-4713-b600-0a43c8fd9a6c?api-key=579b464db66ec23bdd0000019eaed1ae95144f925f630f26665d3a02&format=json";
    if (commodity !== "") {
      url = url + "&filters[commodity]=" + commodity;
    }
    if (limit > 0) {
      url = url + "&limit=" + limit;
    }
    axios
      .get(url)
      .then((res) => {
        let records = res.data.records;
        let uniquedata = [];
        let result = [];
        records.forEach((c) => {
          if (!uniquedata.includes(c.commodity)) {
            uniquedata.push(c.commodity);
            result.push(c);
          }
        });
        const filteredItems = result.filter(item => imagesList[item.commodity]);
        // result.sort((a, b) => {
        //   return a.commodity.localeCompare(b.commodity);
        // });
        setData(result);
        setfinaldata(filteredItems);
        // console.log(result.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function onChangetext(text) {
    setValue(text);
    if (text) {
      let result = data.filter((c) => {
        return c.commodity.toLowerCase().includes(text.toLowerCase());
      });
      setfinaldata(result);
    } else {
      const filteredItems = data.filter(item => imagesList[item.commodity]);
      setfinaldata(filteredItems);
    }
  }

  return (
    <SafeAreaView>
      <HeadSection />
      <View style={styles.searchconatiner}>
        {/* <TextInput
          style={styles.input}
          placeholder="Search Commodity"
          onChangeText={onChangetext}
          value={Value}
        /> */}
        {/* <Text style={styles.headingText}>Agro Grow</Text> */}
        <View style={styles.textInputStyle}>
          <MagnifyingGlassIcon size={20} color="#000" />
          <TextInput
            placeholder="Search Here..."
            style={{ flex: 1 }}
            onChangeText={onChangetext}
            value={Value}
            // onChangeText={(text) => setResult(text)}
          />
          {isLoading ? (
            <TouchableOpacity
              style={{
                alignSelf: "center",
                backgroundColor: "red",
                padding: 8,
                borderRadius: 4,
                height: 35,
              }}
              onPress={stopRecording}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Stop</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startRecording}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJUxxG7irI5LfuDGTQVUK2nktlhpsiXI8AnisuKISD&s",
                }}
                style={{ width: 24, height: 35 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* <Text>Comodity Prices</Text> */}
      {/* <Text>{finaldata.length}</Text> */}
      <FlatList
        data={finaldata}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Details", {
                  commodity: item.commodity,
                  coord,
                })
              }
            >
              <View style={styles.card}>
                <View style={{ width: 100, height: 80 }}>
                  {imagesList[item.commodity] && (
                    <Image
                      // key={item.id}
                      style={{ width: 100, height: 80 }}
                      source={imagesList[item.commodity]}
                    />
                  )}
                </View>
                <View style={{ marginHorizontal: 20 }}>
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {item.commodity}
                  </Text>
                  <Text>updated on {item.arrival_date}</Text>
                  <Text style={{ marginTop: 5 }}>
                    Min Rs.{item.min_price} - Max Rs.{item.max_price}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0faed",
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginTop: 10,
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  input: {
    marginLeft: 10,
    borderRadius: 5,
    flex: 1,
  },
  searchconatiner: {
    backgroundColor: "#fff",
    // padding: 10,
    marginHorizontal: 10,
    // flexDirection: "row",
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textInputStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    height: 48,
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
  },
});

export default Home;