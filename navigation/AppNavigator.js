import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ItemShopScreen from '../screens/ItemShopScreen'
import RandomDropGeneratorScreen from '../screens/RandomDropGeneratorScreen';
import StatTrackerScreen from '../screens/StatTrackerScreen'
import WeeklyChallengesScreen from '../screens/WeeklyChallengesScreen'
import WeekScreen from '../screens/WeekScreen'


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
