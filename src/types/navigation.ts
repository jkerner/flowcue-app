export type RootStackParamList = {
  Home: undefined;
  Library: undefined;
  SequenceDetail: { sequenceId: string };
  MeditationDetail: { meditationId: string };
  SequenceBuilder: { sequenceId?: string };
  MeditationBuilder: { meditationId?: string };
  LiveTeach: { sequenceId: string };
  MeditationMode: { meditationId: string };
  AIDrafting: undefined;
  AIRecommendations: { sessionId: string };
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
