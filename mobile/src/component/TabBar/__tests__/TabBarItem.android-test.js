import React from 'react';
import faker from 'faker';
import TabBarItem from '../TabBarItem.android';
import renderer from 'react-test-renderer';

faker.locale = 'zh_TW';

describe('TabBarItem Android Component', () => {
  it('constructor', () => {
    renderer.create(<TabBarItem />);
  });
});
