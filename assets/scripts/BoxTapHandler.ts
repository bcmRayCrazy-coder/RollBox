import { _decorator, Component, find, Node } from 'cc';
import { GameStateManager } from './GameStateManager';
const { ccclass, property } = _decorator;

@ccclass('BoxTapHandler')
export class BoxController extends Component {
    @property(Node)
    titleLabel: Node;

    gameStateManager: GameStateManager;
    boxController: BoxController;

    start() {
        this.gameStateManager =
            find('/GameManager').getComponent(GameStateManager);

        this.boxController = this.getComponent(BoxController);

        this.node.on(Node.EventType.TOUCH_END, this.click, this);
    }

    click() {
        if (this.gameStateManager.gameState == 0) {
            this.titleLabel.emit('hide');
            this.boxController.node.emit('init');
            this.gameStateManager.gameState = 1;
        } else if (this.gameStateManager.gameState == 1) {
        }
    }

    update(deltaTime: number) {}
}
