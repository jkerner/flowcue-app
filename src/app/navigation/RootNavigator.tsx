import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { colors, typography } from '../../theme';

import { HomeScreen } from '../../screens/HomeScreen';
import { LibraryScreen } from '../../screens/LibraryScreen';
import { SequenceDetailScreen } from '../../screens/SequenceDetailScreen';
import { MeditationDetailScreen } from '../../screens/MeditationDetailScreen';
import { SequenceBuilderScreen } from '../../screens/SequenceBuilderScreen';
import { MeditationBuilderScreen } from '../../screens/MeditationBuilderScreen';
import { LiveTeachScreen } from '../../screens/LiveTeachScreen';
import { MeditationModeScreen } from '../../screens/MeditationModeScreen';
import { AIDraftingScreen } from '../../screens/AIDraftingScreen';
import { AIRecommendationsScreen } from '../../screens/AIRecommendationsScreen';
import { SettingsScreen } from '../../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          ...typography.h3,
          color: colors.textPrimary,
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Library"
        component={LibraryScreen}
        options={{ title: 'Library' }}
      />
      <Stack.Screen
        name="SequenceDetail"
        component={SequenceDetailScreen}
        options={{ title: 'Sequence' }}
      />
      <Stack.Screen
        name="MeditationDetail"
        component={MeditationDetailScreen}
        options={{ title: 'Meditation' }}
      />
      <Stack.Screen
        name="SequenceBuilder"
        component={SequenceBuilderScreen}
        options={{ title: 'Build Sequence' }}
      />
      <Stack.Screen
        name="MeditationBuilder"
        component={MeditationBuilderScreen}
        options={{ title: 'Build Meditation' }}
      />
      <Stack.Screen
        name="LiveTeach"
        component={LiveTeachScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MeditationMode"
        component={MeditationModeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AIDrafting"
        component={AIDraftingScreen}
        options={{ title: 'AI Drafting' }}
      />
      <Stack.Screen
        name="AIRecommendations"
        component={AIRecommendationsScreen}
        options={{ title: 'AI Suggestions' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
