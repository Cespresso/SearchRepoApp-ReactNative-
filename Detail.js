import React from "react";
import {Text,View,Image,StyleSheet} from "react-native";

export default class Detail extends React.Component{
    //React Navigaterをクラスコンポーネントに持たせるパターン
    static navigationOptions =  ({ navigation }) => ({
        title: navigation.state.params.item.name,
    })
    
    render(){
        const {navigation:{state:{params:{item}}}} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.repoName}>{item.full_name}</Text>
                <View style={{flexDirection:"row"}}>
                    <Image style={styles.ownerIcon} source={{uri:item.owner.avatar_url}}/>
                    <Text style={styles.ownerName}>{item.owner.login}</Text>
                </View>
                <Text>{item.description}</Text>
                <Text style={styles.repoUrl}>{item.url}</Text>
            </View>
            
        )
    }
}
const styles = StyleSheet.create({
    container:{
        padding:20,
        backgroundColor:"white",
    },
    repoName:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:10,
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
    repoUrl:{
        marginTop:10,
        marginBottom:10,
    }
})