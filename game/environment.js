export class Environment {
    constructor(field, canvas) {
        this._field = field;
        this._canvas = canvas;

        this.timer = {};

        // 状態が変化したときの色を変える処理
        this._field.onChenge = (location, cell) => { };
    }

    // 世代の更新を開始
    start() { };

    // 世代の更新を止める
    stop() { };

    // フィールドのライフを全て消す
    reset() { };
}