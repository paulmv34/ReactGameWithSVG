import {
  GameOverPopupScreen,
  GameStartScreen,
  LoadingScreen,
  LevelSelectorScreen,
  MainMenuScreen,
  ScoreScreen,
} from '../screens'
import { ScreenType } from '../screens/data'

export const screenClasses = {
  [ScreenType.Loading]: LoadingScreen,
  [ScreenType.MainMenu]: MainMenuScreen,
  [ScreenType.GameStart]: GameStartScreen,
  [ScreenType.GameOverPopup]: GameOverPopupScreen,
  [ScreenType.LevelSelector]: LevelSelectorScreen,
  [ScreenType.Score]: ScoreScreen,
}
