import React, {
  Text,
  View,
  InteractionManager,
  Component,
} from 'react-native'

import Tabs from 'react-native-tabs';
import { Actions } from 'react-native-router-flux';

export default class extends Component {

  state = {
    selected: 'search'
  };

  onSelect(el) {
    if (!Actions[el.props.name]){
      throw new Error("No action is defined for name="+el.props.name+" actions:"+JSON.stringify(Object.keys(Actions)));
    }

    if (this.props.selected == el.props.name && Actions[el.props.defaultRoute]) {
      Actions[el.props.defaultRoute]({hideTabBar: el.props.hideTabBar});
    } else {
      Actions[el.props.name]({hideTabBar: el.props.hideTabBar});
    }

    this.setState({ selected: el.props.name });
  }
  
  render() {
    const { selected } = this.state;

    if (this.props.hideTabBar) return <View/>

    return (
      <Tabs
        style={[{backgroundColor:'white'}, this.props.tabBarStyle]}
        onSelect={this.onSelect.bind(this)}
        {...this.props}
        selected={selected}
      >
        {React.Children.map(this.props.children, el => {
          const schema = this.props.router && this.props.router.schemas[el.props.schema] ? this.props.router.schemas[el.props.schema] : {};
          let props = {...schema, ...el.props};

          if (!el.props.name) console.error("No name is defined for element");

          return (
            <View
              {...props}
              style={{
                borderBottomColor: '#f39c12',
                borderBottomWidth: el.props.name === selected ? 3 : 0,
              }}
            >
              <Text
                style={{
                  color: el.props.name === selected ? '#f39c12' : 'black',
                  paddingBottom: 3,
                }}
              >
                { props.title }
              </Text>
            </View>
          );
        })}
      </Tabs>
    );
  }
}