import { AppRegistry } from 'react-native';
import { App } from './app/App.web';

AppRegistry.registerComponent('FlowCue', () => App);
AppRegistry.runApplication('FlowCue', {
  rootTag: document.getElementById('root'),
});
