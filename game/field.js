import { Cell } from "./cell.js";
import { WIDTH, HEIGHT } from "../appConfig.js";

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
    setLife(location) {
        this.field[location.y][location.x].isAlive = true;
        this.onChange(location, this.field[location.y][location.x]);
    };

    // 受け取った場所のライフの存在、非存在を反転させる
    reverse(location) {
        this.field[location.y][location.x].toggle();
        this.onChange(location, this.field[location.y][location.x]);
    };

    // 受け取った場所の周囲のライフの数を数えて返す
    countAroundLives(location) {
        let aroundLives = 0;
        // 左
        if (location.x >= 1) {
            if (this.field[location.y][location.x - 1] == true) {
                aroundLives++;
            }
        }
        // 右
        if (location.x <= WIDTH - 2) {
            if (this.field[location.y][location.x + 1] == true) {
                aroundLives++;
            }
        }
        // 上
        if (location.y >= 1) {
            if (this.field[location.y - 1][location.x] == true) {
                aroundLives++;
            }
        }
        // 下
        if (location.y <= HEIGHT - 2) {
            if (this.field[location.y + 1][location.x] == true) {
                aroundLives++;
            }
        }
        // 左上 
        if (location.y >= 1 && location.x >= 1) {
            if (this.field[location.y - 1][location.x - 1] == true) {
                aroundLives++;
            }
        }
        // 右上
        if (location.y >= 1 && location.x <= WIDTH - 2) {
            if (this.field[location.y - 1][location.x + 1] == true) {
                aroundLives++;
            }
        }
        // 左下
        if (location.x >= 1 && location.y <= HEIGHT - 2) {
            if (this.field[location.y + 1][location.x - 1] == true) {
                aroundLives++;
            }
        }
        // 右下
        if (location.x <= WIDTH - 2 && location.y <= HEIGHT - 2) {
            if (this.field[location.y + 1][location.x + 1] == true) {
                aroundLives++;
            }
        }
        return aroundLives;
    };

    // 盤面のライフの数を数えて返す
    countLives() {
        let livesNum = 0;
        for (let y = 0; y <= HEIGHT - 1; y++) {
            for (let x = 0; x <= WIDTH - 1; x++) {
                if (this.field[y][x] == true) {
                    livesNum++;
                }
            }
        }
        return livesNum;
    };

    // 盤面をライフが無い状態にする
    clear() { };

    // 次の世代に更新する
    updateLivesStatus() { };
}