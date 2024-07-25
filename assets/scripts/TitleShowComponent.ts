import {
    _decorator,
    Component,
    ERigidBody2DType,
    Label,
    RigidBody2D,
    Sprite,
    tween,
    UIOpacity,
    v2,
    v3,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TitleShowComponent')
export class TitleShowComponent extends Component {
    @property(Label)
    clickTip: Label;

    @property(Sprite)
    mainCharactor: Sprite;

    init() {
        this.clickTip.getComponent(UIOpacity).opacity = 0;
        this.mainCharactor.enabled = false;
        this.node.setPosition(v3(0, 620, 0));
    }

    start() {
        const titleDestinationY = this.node.position.y;

        this.init();

        this.node.on('hide', () => {
            const opacityComponent = this.getComponent(UIOpacity);

            this.hideClickTip();
            tween(opacityComponent)
                .to(0.2, { opacity: 0 })
                .call(() => (this.enabled = false))
                .start();
        });

        tween(this.node)
            .to(0.6, {
                position: v3(0, titleDestinationY, this.node.position.z),
            })
            .call(() => {
                this.mainCharactor.enabled = true;

                // const rigidbody = this.mainCharactor.getComponent(RigidBody2D);
                // rigidbody.type = ERigidBody2DType.Dynamic;
                // rigidbody.applyForceToCenter(v2(0, 1000), true);

                this.showClickTip();
            })
            .start();
    }

    showClickTip() {
        const opacityComponent = this.clickTip.getComponent(UIOpacity);
        tween(opacityComponent).to(0.6, { opacity: 255 }).start();
    }

    async hideClickTip() {
        const opacityComponent = this.clickTip.getComponent(UIOpacity);
        tween(opacityComponent)
            .to(0.2, { opacity: 0 })
            .call(() => (this.clickTip.enabled = false))
            .start();
    }

    update(deltaTime: number) {}
}
