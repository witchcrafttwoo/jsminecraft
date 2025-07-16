import Block from "../Block.js";
import BoundingBox from "../../../util/BoundingBox.js";

export default class BlockLadder extends Block {
    constructor(id,textureSlotId) {
        super(id,textureSlotId); // terrain.png の右上 (Index 15)
        this.name = "Ladder";
        this.sound = Block.sounds.wood;
    }

    isLadder() {
        return true;
    }

    isSolid() {
        return false;
    }

    onBlockPlaced(world, x, y, z, face) {
        // face: 設置された面の番号（2〜5が横壁）
        if (face >= 2 && face <= 5) {
            world.setBlockDataAt(x, y, z, face);
        }
    }

    getTextureForFace(face, data) {
        // 全面同じテクスチャでOK。将来向き別に切り替え可
        return this.textureSlotId;
    }

    getBoundingBox(world, x, y, z) {
        const face = world.getBlockDataAt(x, y, z);
        if (face === 2) { // 北
            return new BoundingBox(x + 0.0, y, z + 0.875, x + 1.0, y + 1.0, z + 1.0);
        } else if (face === 3) { // 南
            return new BoundingBox(x + 0.0, y, z + 0.0, x + 1.0, y + 1.0, z + 0.125);
        } else if (face === 4) { // 西
            return new BoundingBox(x + 0.875, y, z + 0.0, x + 1.0, y + 1.0, z + 1.0);
        } else if (face === 5) { // 東
            return new BoundingBox(x + 0.0, y, z + 0.0, x + 0.125, y + 1.0, z + 1.0);
        }

        // fallback（未設定時はフルサイズ）
        return new BoundingBox(x, y, z, x + 1.0, y + 1.0, z + 1.0);
    }
}
