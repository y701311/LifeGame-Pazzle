import { Cell } from "./cell.js";

export class Field {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.field = new Array(height);
        for (let h = 0; h < height; h++) {
            this.field[h] = new Array(width);
            for (let w = 0; w < width; w++) {
                this.field[h][w] = new Cell()
            }
        }

        this.onChange = function (location, cell) { };
    }

    // 受け取った場所にライフを置く
    setLife(location) { };

    // 受け取った場所のライフの存在、非存在を反転させる
    reverse(location) { };

    // 受け取った場所の周囲のライフの数を数えて返す
    countAroundLives(location) {
        return 0;
    };

    // 盤面のライフの数を数えて返す
    countLives() { };

    // 盤面をライフが無い状態にする
    clear() { };

    // 次の世代に更新する
    updateLivesStatus() { };
}