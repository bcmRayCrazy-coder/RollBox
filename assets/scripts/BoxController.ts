import {
    _decorator,
    Component,
    ERigidBody2DType,
    RigidBody2D,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BoxController')
export class BoxStartComponent extends Component {
    rigidBody: RigidBody2D;

    start() {
        this.rigidBody = this.getComponent(RigidBody2D);
        this.node.on('init', this.init, this);
    }

    init() {
        this.rigidBody.type = ERigidBody2DType.Dynamic;
    }

    update(deltaTime: number) {}
}
