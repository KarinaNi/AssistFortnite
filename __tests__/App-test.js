'use strict';

// Components used for testing
// test comment
import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';

// Screens used for testing
import HomeScreen from '../screens/HomeScreen';
import StatTrackerScreen from '../screens/StatTrackerScreen';
import ItemShopScreen from '../screens/ItemShopScreen'
import RandomDropGeneratorScreen from '../screens/RandomDropGeneratorScreen';
import WeekScreen from '../screens/WeekScreen';
import WeeklyChallengesScreen from '../screens/WeeklyChallengesScreen';

// Used for mocking API calls
import * as api from '../api'
import * as mockCalls from '../assets/__mockAPI';

// Enzyme used for additional tests
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });  

// Homescreen.js __Tests__
describe('homescreen tests', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot()
  });
  it('renders the ActivityIndicator component', () => {
    const ActivityIndicator = require('ActivityIndicator');
    const tree = renderer
      .create(<ActivityIndicator animating={true} size="large" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the Background component', done => {
    const Image = require('Image');
    Image.getSize('path.jpg', (width, height) => {
      const tree = renderer.create(<Image style={{height, width}} />).toJSON();
      expect(tree).toMatchSnapshot();
      done();
    });
  });
})

// StatsTrackerScreen.js __Tests__
describe('stats screen tests', () => {
  it('renders correctly', () => {
    // Mocking navigation prop
    const navigation = { 
      getParam: (key) => {
        if(key == 'username') return 'foo'
        if(key == 'platformName') return 'foo'
        if(key == 'userStats') return mockCalls.userStats
      } 
    }
    const tree = renderer.create(<StatTrackerScreen navigation={navigation}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
})

// ItemShop.js __Tests__
describe('itemshop screen tests', () => {
  it('renders correctly', () => {
    // Mocking getDailyStore API call
    api.getDailyStore = jest.fn().mockReturnValue(new Promise((resolve, reject) => {
      resolve(mockCalls.dailyStore)
    }))
    const tree = renderer.create(<ItemShopScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
})

// RandomDropperGeneratorScreen.js __Tests__
describe('random dropper screen tests', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<RandomDropGeneratorScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it('generates drop & strats correctly', () => {
    const wrapper = shallow(<RandomDropGeneratorScreen />) 
    wrapper.find(TouchableOpacity).props().onPress();
    expect(wrapper.state('PlaceHolder')).toBeTruthy()
    expect(wrapper.state('StratHolder')).toBeTruthy()
  })
})

// WeekScreen.js __Tests__
describe('weekly screen tests', () => {
  it('all weeks render correctly', () => {
    // Mocking getChallenges API call
    api.getChallenges = jest.fn().mockReturnValue(new Promise((resolve, reject) => {
      resolve( mockCalls.challegesVal )
    }))
    const tree = renderer.create(<WeeklyChallengesScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });

  it('each week screen renders correctly', () => {
    // Mocking navigation prop
    const navigation = { 
      getParam: (key) => {
        if(key == 'week') return mockCalls.challegesVal.currentweek
        if(key == 'challenges') return mockCalls.challegesVal
      } 
    }
    const tree = renderer.create(<WeekScreen navigation={navigation}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})


