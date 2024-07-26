import {
    _decorator,
    BoxCollider2D,
    Component,
    ERigidBody2DType,
    RigidBody2D,
    TiledMap,
    v2,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TileCollision')
export class TileCollision extends Component {
    @property(TiledMap)
    tiledMap: TiledMap;

    @property(String)
    layerName = 'Default';

    start() {
        let tiledSize = this.tiledMap.getTileSize();
        let layer = this.tiledMap.getLayer(this.layerName);
        let layerSize = layer.getLayerSize();

        for (let i = 0; i < layerSize.width; i++) {
            for (let j = 0; j < layerSize.height; j++) {
                let tiled = layer.getTiledTileAt(i, j, true);
                if (tiled.grid != 0) {
                    tiled.node.name = this.layerName;
                    let body = tiled.node.addComponent(RigidBody2D);
                    body.type = ERigidBody2DType.Static;
                    let collider = tiled.node.addComponent(BoxCollider2D);
                    collider.offset = v2(
                        tiledSize.width / 2,
                        tiledSize.height / 2
                    );
                    collider.size = tiledSize;
                    collider.apply();
                }
            }
        }
    }
}
