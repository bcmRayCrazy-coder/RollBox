import { _decorator, Component, Label, Sprite, tween, UIOpacity, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TitleShowComponent')
export class TitleShowComponent extends Component {
    @property(Label)
    clickTip: Label;

    @property(Sprite)
    mainCharactor: Sprite;

    @property()
    showDuration = 0.6;

    @property()
    hideDuration = 0.1;

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
                .to(this.hideDuration, { opacity: 0 })
                .call(() => (this.enabled = false))
                .start();
        });

        tween(this.node)
            .to(this.showDuration, {
                position: v3(0, titleDestinationY, this.node.position.z),
            })
            .call(() => {
                this.mainCharactor.enabled = true;

                this.showClickTip();
            })
            .start();
    }

    showClickTip() {
        const opacityComponent = this.clickTip.getComponent(UIOpacity);
        tween(opacityComponent).to(this.showDuration, { opacity: 255 }).start();
    }

    async hideClickTip() {
        const opacityComponent = this.clickTip.getComponent(UIOpacity);
        tween(opacityComponent)
            .to(this.hideDuration, { opacity: 0 })
            .call(() => (this.clickTip.enabled = false))
            .start();
    }

    update(deltaTime: number) {}
}
