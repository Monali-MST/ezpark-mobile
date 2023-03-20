import React from "react";
import { View, Text, SafeAreaView } from "react-native";


const Test = props => {
  return (
    <SafeAreaView>
      <View>
      <RNPickerSelect
                 onValueChange={(value) => console.log(value)}
                 items={[
                     { label: "JavaScript", value: "JavaScript" },
                     { label: "TypeScript", value: "TypeScript" },
                     { label: "Python", value: "Python" },
                     { label: "Java", value: "Java" },
                     { label: "C++", value: "C++" },
                     { label: "C", value: "C" },
                 ]}
             />
      </View>
    </SafeAreaView>
  );
};

export default Test;