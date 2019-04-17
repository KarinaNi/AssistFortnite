import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ItemShopScreen from '../screens/ItemShopScreen';
import PatchNotesScreen from '../screens/PatchNotesScreen';
import RandomDropGeneratorScreen from '../screens/RandomDropGeneratorScreen';
import StatTrackerScreen from '../screens/StatTrackerScreen';
import UpcomingItemsScreen from '../screens/UpcomingItemsScreen';
import WeaponStatsScreen from '../screens/WeaponStatsScreen';
import WeeklyChallengesScreen from '../screens/WeeklyChallengesScreen';
import WeekScreen from '../screens/WeekScreen';
import ChallengeGuideScreen from '../screens/ChallengeGuideScreen';
import ControlsScreen from '../screens/ControlsScreen';


const MainNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        ItemShopScreen: ItemShopScreen,
        PatchNotesScreen: PatchNotesScreen,
        RandomDropGeneratorScreen: RandomDropGeneratorScreen,
        StatTrackerScreen: StatTrackerScreen,
        UpcomingItemsScreen: UpcomingItemsScreen,
        WeaponStatsScreen: WeaponStatsScreen,
        WeeklyChallengesScreen: WeeklyChallengesScreen,
        WeekScreen: WeekScreen,
        ChallengeGuideScreen: ChallengeGuideScreen,
        ControlsScreen: ControlsScreen
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
              backgroundColor: '#152D53'
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              color: '#ffffff',
              fontWeight: 'bold'
            },
        }
    });

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;
