import {
    _decorator,
    Camera,
    Component,
    EventTouch,
    find,
    Node,
    RigidBody2D,
    v2,
} from 'cc';
import { GameStateManager } from './GameStateManager';
const { ccclass, property } = _decorator;

@ccclass('BoxTapHandler')
export class BoxController extends Component {
    @property(Node)
    titleLabel: Node;

    @property(Camera)
    camera: Camera;

    @property(Number)
    forceScale = 10;

    gameStateManager: GameStateManager;
    boxController: BoxController;
    rigidBody: RigidBody2D;

    start() {
        this.rigidBody = this.getComponent(RigidBody2D);
        this.gameStateManager =
            find('/GameManager').getComponent(GameStateManager);
        this.boxController = this.getComponent(BoxController);

        this.node.on(Node.EventType.TOUCH_END, this.click, this);
    }

    click(event: EventTouch) {
        if (this.gameStateManager.gameState == 0) {
            this.titleLabel.emit('hide');
            this.boxController.node.emit('init');
            this.gameStateManager.gameState = 1;
        } else if (this.gameStateManager.gameState == 1) {
            const pos = this.rigidBody.node.getWorldPosition();
            console.log(event.getUILocation().subtract(v2(pos.x, pos.y)));
            this.rigidBody.applyForce(
                event
                    .getUILocation()
                    .subtract(v2(pos.x, pos.y))
                    .multiplyScalar(-1 * this.forceScale),
                event
                    .getUILocation()
                    .subtract(v2(pos.x, pos.y))
                    .multiplyScalar(0.01),
                true
            );
        }
    }

    update(deltaTime: number) {}
}
