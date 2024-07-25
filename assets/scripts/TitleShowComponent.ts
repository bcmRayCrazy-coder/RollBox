import { _decorator, Component, Label, tween, UIOpacity, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TitleShowComponent')
export class TitleShowComponent extends Component {
    @property(Label)
    clickTip: Label;

    init() {
        this.clickTip.getComponent(UIOpacity).opacity = 0;
        this.node.setPosition(v3(0, 620, 0));
    }

    start() {
        if (!this.clickTip)
            throw new Error(
                "Undefined property 'clickTip' in Title Show Component!"
            );

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
            .call(() => this.showClickTip())
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
