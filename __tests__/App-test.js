'use strict';

import React from 'react';
import HomeScreen from '../screens/HomeScreen'
import StatTrackerScreen from '../screens/StatTrackerScreen'
import ItemShopScreen from '../screens/ItemShopScreen'
import renderer from 'react-test-renderer';
import userStats from '../assets/__mockAPI'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });  

//Homescreen.js __Tests__
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

//StatsTrackerScreen.js __Tests__
describe('stats screen tests', () => {
  it('renders correctly', () => {
    const navigation = { 
      getParam: (key, fallback) => {
        if(key == 'username') return 'foo'
        if(key == 'platformName') return 'foo'
        if(key == 'userStats') return userStats
      } 
    }
    const tree = renderer.create(<StatTrackerScreen navigation={navigation}/>).toJSON();
    expect(tree).toMatchSnapshot();

  });
})

//ItemShopScreen.js __Tests__
describe('item shop screen tests', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ItemShopScreen />).toJSON();
    expect(tree).toMatchSnapshot();

  });
})
