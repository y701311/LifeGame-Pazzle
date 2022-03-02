import { Canvas } from "./canvas";
import { Environment } from "./game/environment";
import { Field } from "./game/field";
import { Questioner } from "./game/questioner";
import { WIDTH, HEIGHT } from "./appConfig";

export class App {
    constructor() {
        // 問題の盤面
        this.problemCanvas = new Canvas("ploblemCanvas", WIDTH, HEIGHT);
        // 解答用の盤面
        this.answerCanvas = new Canvas("answerCanvas", WIDTH, HEIGHT);
        // ゲームを進める環境
        this.environment = new Environment(new Field(WIDTH, HEIGHT), this.answerCanvas);
        this.questioner = new Questioner();
        // 世代の更新頻度　何ミリ秒ごとに更新するか
        this.updateInterval = 200;

        // 解答用の盤面のクリック時の処理
        this.answerCanvas.onClick = (x, y) => { };
    }

    run() {
        document.getElementById("startButton").addEventListener("click", () => this.start(), false);
        document.getElementById("stopButton").addEventListener("click", () => this.stop(), false);
        document.getElementById("resetButton").addEventListener("click", () => this.reset(), false);
        document.getElementById("ploblemGenerateButton").addEventListener("click", () => this.generatePloblem(), false);
        document.getElementById("answerButton").addEventListener("click", () => this.judgeAnswer(), false);
        document.getElementById("updateInterval").onchange = this.setUpdateInterval();
    };

    start() {
        this.environment.start();
    };

    stop() {
        this.environment.stop();
    };

    reset() {
        this.environment.stop();
        this.environment.reset();
    };

    generatePloblem() { };

    judgeAnswer() { };

    setUpdateInterval() { };
}