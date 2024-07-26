import { _decorator, Camera, Component, Node, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraFollower')
export class CameraFollower extends Component {
    @property(Camera)
    camera: Camera;

    @property(Node)
    target: Node;

    @property(Number)
    moveSpeed = 1;

    update(deltaTime: number) {
        const cameraPosition = this.camera.node.getPosition();
        const targetPosition = this.target
            .getPosition()
            .add(
                v3(
                    this.camera.camera.width / 4,
                    this.camera.camera.height / 4,
                    0
                )
            );
        this.camera.node.setPosition(
            cameraPosition.lerp(targetPosition, deltaTime * this.moveSpeed)
        );
    }
}
