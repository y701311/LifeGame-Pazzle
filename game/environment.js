export class Environment {
    constructor(field, canvas) {
        this._field = field;
        this._canvas = canvas;
        this.generation = 1;

        this.timer = {};

        // 状態が変化したときの色を変える処理
        this._field.onChange = (location, cell) => {
            this._canvas.drawCell(location, cell);
        };
    }

    // 世代の更新を開始
    start(updateInterval, generationId) {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            let livesNum = this._field.countLives();
            if (livesNum == 0) {
                this.stop();
            } else {
                this._field.updateLivesStatus()
                this.generation++;
                generationId.innerHTML = this.generation;
            }
        }, updateInterval);
    };

    // 世代の更新を止める
    stop() {
        clearInterval(this.timer);
    };

    // フィールドのライフを全て消す
    reset(generationId) {
        this.generation = 1;
        generationId.innerHTML = this.generation;
        this._canvas.clearAll();
        this._field.clear();
    };
}