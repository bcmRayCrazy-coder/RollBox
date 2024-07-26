import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameStateManager')
export class GameStateManager extends Component {
    /**
     * Game State
     * 0: Menu
     * 1: Start
     * 2: Failed
     * 3: Success
     */
    public gameState = 0;
}
