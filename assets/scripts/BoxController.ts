import { _decorator, Component, ERigidBody2DType, Node, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BoxController')
export class BoxStartComponent extends Component {
    start() {
        this.node.on('init', this.init, this);
    }

    init() {
        this.getComponent(RigidBody2D).type = ERigidBody2DType.Dynamic;
    }

    update(deltaTime: number) {}
}
