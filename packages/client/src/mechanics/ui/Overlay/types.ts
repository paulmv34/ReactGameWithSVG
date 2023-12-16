import {
  GameOverPopupScreen,
  GameStartScreen,
  LoadingScreen,
  MainMenuScreen,
} from '../screens'
import { ScreenType } from '../screens/data'

export const screenClasses = {
  [ScreenType.Loading]: LoadingScreen,
  [ScreenType.MainMenu]: MainMenuScreen,
  [ScreenType.GameStart]: GameStartScreen,
  [ScreenType.GameOverPopup]: GameOverPopupScreen,
}
