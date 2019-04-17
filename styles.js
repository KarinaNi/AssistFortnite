import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1F1F'
    },
    homeScreenStatTrackerView: {
        flex:.4,
        margin:10,
        flexDirection:'column',
        borderRadius:5,
        backgroundColor: 'rgba(43, 75, 149, 0.25)',
        justifyContent:'center',
        alignItems: 'center'
    },
    homeScreenStatTrackerInputView: {
        flex: 1,
        flexDirection: 'row',
    },
    homeScreenStatTrackerTextInputView: {
        flex: .85,
        justifyContent: 'space-between',
        flexDirection: 'column',
        margin:10,
    },
    sectionTitleTextStyle: {
        color:'#ffffff',
        fontSize:20,
        fontWeight:"bold"
    },
    subTitleTextStyle: {
        color:'#ffffff',
        fontSize:30,
        fontWeight:"bold"
    },
    activityIndicatorStyle: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(43, 75, 149, 0.25)',
    },
    homeScreenButtonStyle: {
        flex:1,
        margin:10,
        borderRadius:5, 
        borderWidth:2, 
        borderColor:'#9d4dbb', 
        backgroundColor:'rgba(43, 75, 149, 0.25)',
        alignItems:'center',
        justifyContent:'center'
    },
    homeScreenButtonText:{
        color:'#ffffff', 
        fontSize:20, 
        fontWeight:'bold', 
        textAlign:'center'
    },
    weeksList: {
        flex:1,
        margin:10,
        padding:25,
        borderRadius:5, 
        borderWidth:2, 
        justifyContent:'space-evenly',
        borderColor:'#9d4dbb', 
        backgroundColor:'rgba(43, 75, 149, 0.25)',
        color:'#ffffff', 
        fontSize:40, 
        fontWeight:'bold', 
        textAlign:'center'
    },
    challengeList:{
        flex:1,
        margin:10,
        padding:25,
        borderRadius:5, 
        borderWidth:2, 
        justifyContent:'space-evenly',
        borderColor:'#9d4dbb', 
        backgroundColor:'rgba(43, 75, 149, 0.25)',
        color:'white', 
        fontSize:18, 
        fontWeight:'bold', 
        textAlign:'center'
    },
    dropButtonStyle: {
        flex:0.1,
        margin:15,
        borderRadius:5, 
        borderWidth:2, 
        borderColor:'#9d4dbb', 
        backgroundColor:'rgba(43, 75, 149, 0.25)',
        alignItems:'center',
        justifyContent:'center'
    },
    weaponStatTitle: {
        fontSize:15,
        fontWeight:'bold',
        color: '#ffffff',
        margin:2
    },
    controlScreenInputView: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 10,
        borderRadius: 5,  
        backgroundColor:'rgba(43, 75, 149, 0.25)',
    },
    controlScreenImageView: {
        flex: 2,
        alignItems:'center',
        margin: 10,
    },
    controlScreenPickerBar: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin :10,
        borderRadius: 5, borderWidth: 2, borderColor: '#9d4dbb' ,
    },
    controlImage: {
        flex: 1,
        width: '95%'
    }

})