import {
    _decorator,
    Camera,
    Component,
    EPhysics2DDrawFlags,
    EventTouch,
    find,
    Node,
    PhysicsSystem2D,
    RigidBody2D,
    UITransform,
    v2,
    v3,
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
        // PhysicsSystem2D.instance.debugDrawFlags =
        //     EPhysics2DDrawFlags.Aabb |
        //     EPhysics2DDrawFlags.Pair |
        //     EPhysics2DDrawFlags.CenterOfMass |
        //     EPhysics2DDrawFlags.Joint |
        //     EPhysics2DDrawFlags.Shape;

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
            let touchPosition = event.getLocation();
            let worldPositionV3 = v3();
            this.camera.screenToWorld(
                v3(touchPosition.x, touchPosition.y, 0),
                worldPositionV3
            );

            let localPositionV3 =
                this.getComponent(UITransform).convertToNodeSpaceAR(
                    worldPositionV3
                );

            var massCenterWorld = v2();
            this.rigidBody.getWorldCenter(massCenterWorld);

            let massCenterV3 = this.getComponent(
                UITransform
            ).convertToNodeSpaceAR(v3(massCenterWorld.x, massCenterWorld.y));

            const localTouchPosition = v2(localPositionV3.x, localPositionV3.y);
            const massCenter = v2(massCenterV3.x, massCenterV3.y);

            const force = massCenter
                .subtract(localTouchPosition)
                .multiplyScalar(this.forceScale);
            console.log(force, localTouchPosition);

            this.rigidBody.applyForce(force, localTouchPosition, true);
        }
    }
}
