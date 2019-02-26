/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  state = {
    items:[],
    refreshing:false,
    text :""
  }
  page = 0;
  fetchRepo(refreshing){
    const newPage = refreshing?1: this.page +1;
    this.setState({refreshing})
    //https://api.github.com/serach/repositories?q=react
    fetch(`https://api.github.com/search/repositories?q=${this.state.text}&page=${newPage}`)
    .then(respone =>respone.json())
    .then(({items}) =>{
      this.page = newPage;
      if(refreshing){
        this.setState({items,refreshing:false})
      }else{
        this.setState({items:[...this.state.items,...items]})
      }
      
    })
    .catch(error =>console.log(error)+"エラーです")
  }
  navigationDetail(item){
    // this.props.navigation.navigation("Detail")
    this.props.navigation.navigate("Detail",{item})
  }



  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} onChangeText={(text)=>this.setState({text})}/>
          <TouchableOpacity onPress={()=> this.fetchRepo(true)}>
            <Text style={styles.serachText}>Search</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList 
          data = {this.state.items} 
          renderItem={({item})=>(
              <TouchableOpacity style={{padding:10}}  onPress={()=>this.navigationDetail(item)}>
                  <Text style = {{fontSize:20,fontWeight:"bold"}}>{item.name}</Text>
                  <View style={{flexDirection:"row"}}>
                    <Image style={styles.ownerIcon} source={{uri:item.owner.avatar_url}}/>
                    <Text style={styles.ownerName}>{item.owner.login}</Text>
                  </View>
              </TouchableOpacity>
            )}
          keyExtractor = {(item)=>item.id}
          onEndReached = {()=>this.fetchRepo(false)}
          onEndReachedThreshold = {0.1}
          onRefresh = {()=>{this.fetchRepo(true)}}
          refreshing = { this.state.refreshing }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  input:{
    flex:1,
    padding:10,
    borderRadius:4,
    backgroundColor:"#EEE",
  },
  inputWrapper:{
    padding:20,
    flexDirection:"row",
    backgroundColor:"white",
    alignItems:"center"
  },
  serachText:{
    padding:10,
  },
  ownerIcon:{
    width:20,
    height:20,
    borderRadius:10,
    marginRight:5,
  },
  ownerName:{
      fontSize:14
  },

});
