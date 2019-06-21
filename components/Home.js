import React, { Component } from 'react';
import { Alert, TextInput,Text, View, Button, Image, StyleSheet } from 'react-native';

class Post extends Component {
    
    state = {
        emp_ID: '',
        lat: null,
        lon:null
    }

     handleEmp= (text) => {
        this.setState({ emp_ID: text })
     }

     getUserLocationHandler = () => {
         navigator.geolocation.getCurrentPosition(position => {
             this.state.lat = position.coords.latitude;
             this.state.lon = position.coords.longitude;
             console.log(this.state.lat)
             console.log(this.state.lon)
             
         }, err => console.log(err));
     }

     clicked = (emp_ID) => {
         console.log(emp_ID); 
         const url = 'http://192.168.85.241:5000/api/week/' + emp_ID + '/';  // change it to your current IP address
         console.log(18, url);

        this.getUserLocationHandler();

        
        //current coords => lat : 13.0587047, lon : 77.6254129
        //validate with real latlong
        console.log((this.state.lat !== null) && (this.state.lat > 9.0))
        if((this.state.lat > 9 && this.state.lat < 20) && 
            (this.state.lon > 50 && this.state.lon < 90) )
        {
        fetch(url, {
            method: 'PUT',
            body: emp_ID
            })
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', JSON.stringify(response))); // JSON.stringify(response)
            Alert.alert('Your Details are updated !!');
        }
        else{
            Alert.alert("Sorry, I think you are not in the company !!");
        }
     }

    
    render() {  
        return (  
            <View style={styles.container}>  
                <Text className={styles.container}>
                    Quikr Intern Attendance Tracker
                </Text>
            <Image
          style={styles.stretch}
          source={require('./quikr.jpg')}
        />
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter your Emp ID"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleEmp}/>
            
            <Button
                onPress = {
                    () => this.clicked(this.state.emp_ID)
                }
                title=  "I'm in Quikr !!"
                color ="#008000"
                
            />                
            </View>  
        );  
    }

}

export default Post;

const styles = StyleSheet.create({  
    container: {  
        // flex: 1,  
        justifyContent: 'center',  
    },  
    buttonContainer: {  
        margin: 30  
    },  
    multiButtonContainer: {  
        margin: 20,  
        flexDirection: 'row',  
        justifyContent: 'space-between'  
    },
    stretch: {
        width: 200,
        height: 200
      }  
})  