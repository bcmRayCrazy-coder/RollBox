import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BoxStartComponent')
export class BoxController extends Component {
    @property(Node)
    titleLabel: Node;

    start() {
        this.node.on(Node.EventType.MOUSE_DOWN, this.click, this);
        this.node.on(Node.EventType.TOUCH_END, this.click, this);
    }

    click() {
        console.log('Clicked');
        this.titleLabel.emit('hide');
    }

    update(deltaTime: number) {}
}
