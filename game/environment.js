import { copyField } from "./field.js";

export class Environment {
    constructor(field, canvas) {
        this._field = field;
        this._canvas = canvas;
        this.generation = 1;
        // 過去の世代
        this.pastField = [];

        this.timer = {};

        // 状態が変化したときの色を変える処理
        this._field.onChange = (location, cell) => {
            this._canvas.drawCell(location, cell);
        };
    }

    // 世代の更新を開始
    start(updateIntervalId, generationId) {
        this.generation = 1;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            let livesNum = this._field.countLives();
            if (livesNum == 0) {
                this.stop();
            } else {
                this.pastField.push(copyField(this._field));
                this._field.updateLivesStatus()
                this.generation++;
                generationId.innerHTML = this.generation;
            }
        }, parseInt(updateIntervalId.value));
    };

    // 世代の更新を止める
    stop() {
        clearInterval(this.timer);
    };

    // フィールドのライフを全て消す
    reset(generationId) {
        this.generation = 1;
        generationId.innerHTML = this.generation;
        this.pastField = [];
        this._canvas.clearAll();
        this._field.clear();
    };

    // 1世代進める
    generationAdvance(generationId) {
        clearInterval(this.timer);
        let livesNum = this._field.countLives();
        if (livesNum != 0) {
            this.pastField.push(copyField(this._field));
            this._field.updateLivesStatus();
            this.generation++;
            generationId.innerHTML = this.generation;
        }
    };

    // 1世代戻す
    generationRetreat(generationId) {
        if (this.generation > 1) {
            clearInterval(this.timer);
            this._field = this.pastField.pop();
            this.generation--;
            generationId.innerHTML = this.generation;
        }
    };

    // 1世代に戻す
    generationReset(generationId) {
        clearInterval(this.timer);
        if (this.pastField.length > 0) {
            this._field = this.pastField[0];
            this.pastField = [];
            this.generation = 1;
            generationId.innerHTML = this.generation;
        }
    };
}