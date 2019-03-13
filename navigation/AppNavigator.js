import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from '../Screens/HomeScreen';
import ItemShopScreen from '../Screens/ItemShopScreen'
import RandomDropGeneratorScreen from '../Screens/RandomDropGeneratorScreen';
import StatTrackerScreen from '../Screens/StatTrackerScreen'
import WeeklyChallengesScreen from '../Screens/WeeklyChallengesScreen'
import WeekScreen from '../Screens/WeekScreen'


const MainNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        ItemShopScreen: ItemShopScreen,
        RandomDropGeneratorScreen: RandomDropGeneratorScreen,
        StatTrackerScreen: StatTrackerScreen,
        WeeklyChallengesScreen: WeeklyChallengesScreen,
        WeekScreen: WeekScreen
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
              backgroundColor: '#4c51f7'
            },
            headerTintColor: '#b30000',
            headerTitleStyle: {
              color: '#ffffff',
              fontWeight: 'bold'
            },
        }
    });

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;