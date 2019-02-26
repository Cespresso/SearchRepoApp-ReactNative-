import React from "react";
import { StackNavigator } from "react-navigation";
import Home from "./Home";
import Detail from "./Detail";

export default StackNavigator({
  Home:{
    screen :Home,
    navigationOptions: ({ navigation }) => ({//スタッナビゲーターに持たせる場合
      title: `Home`,
    }),
  },
  Detail:{
    screen:Detail,
  }
},{
  initialRouteName:'Home'
})