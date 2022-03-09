import { Canvas } from "./canvas.js";
import { Environment } from "./game/environment.js";
import { Field } from "./game/field.js";
import { Location } from "./game/location.js";
import { Questioner } from "./game/questioner.js";

class App {
    constructor() {
        // 盤面の広さ
        this.width, this.height;
        // 問題の盤面
        this.problemCanvas;
        // 解答用の盤面
        this.answerCanvas;
        // ゲームを進める環境
        this.environment;

        this.questioner;

        this.problemDifficultyId = document.getElementById("problemDifficulty");
        this.problemDifficultyId.addEventListener("change", () => this.changeDifficulty(), false);
        this.changeDifficulty();

        // 世代の更新頻度　何ミリ秒ごとに更新するか
        this.updateIntervalId = document.getElementById("updateInterval");

        this.generationId = document.getElementById("generation");

        this.timer = {};

    }

    run() {
        document.getElementById("startButton").addEventListener("click", () => this.start(), false);
        document.getElementById("stopButton").addEventListener("click", () => this.stop(), false);
        document.getElementById("resetButton").addEventListener("click", () => this.reset(), false);
        document.getElementById("problemGenerateButton").addEventListener("click", () => this.generateProblem(), false);
        document.getElementById("answerButton").addEventListener("click", () => this.judgeAnswer(), false);
    };

    start() {
        this.environment.start(this.updateIntervalId, this.generationId);
    };

    stop() {
        this.environment.stop();
    };

    reset() {
        this.environment.stop();
        this.environment.reset(this.generationId);
    };

    generateProblem() {
        let problem = this.questioner.generateProblem();
        let location = new Location();
        for (let y = 0; y < this.width; y++) {
            for (let x = 0; x < this.height; x++) {
                location.x = x;
                location.y = y;
                this.problemCanvas.drawCell(location, problem.field[location.y][location.x]);
            }
        }
    };

    judgeAnswer() {
        let answerInfo = this.questioner.judgeAnswer(this.environment._field);
        clearInterval(this.environment.timer);
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            let livesNum = this.environment._field.countLives();
            if (livesNum == 0 || this.environment.generation >= answerInfo.generation) {
                this.stop();
                clearInterval(this.timer);
                if (answerInfo.isCorrect) {
                    document.getElementById('pop-up').checked = true;
                }
            } else {
                this.environment._field.updateLivesStatus()
                this.environment.generation++;
                this.generationId.innerHTML = this.environment.generation;
            }
        }, parseInt(this.updateIntervalId.value));
    };

    changeDifficulty() {
        if (this.problemDifficultyId.value == "easy") {
            this._setState(6, 6, 2, 2, 2, 4);
            this.generateProblem();
        } else if (this.problemDifficultyId.value == "normal") {
            this._setState(6, 6, 2, 2, 5, 8);
            this.generateProblem();
        } else if (this.problemDifficultyId.value == "hard") {
            this._setState(10, 10, 2, 2, 20, 30);
            this.generateProblem();
        }
    };

    _setState(width = 10, height = 10, generationLowerLimit = 2, generationUpperLimit = 10, livesLowerLimit = 2, livesUpperLimit = 10) {
        this.width = width, this.height = height;
        this.problemCanvas = new Canvas("problemCanvas", this.width, this.height);
        this.answerCanvas = new Canvas("answerCanvas", this.width, this.height);
        this.environment = new Environment(new Field(this.width, this.height), this.answerCanvas);
        this.questioner = new Questioner(this.width, this.height);
        this.questioner.generationLowerLimit = generationLowerLimit;
        this.questioner.generationUpperLimit = generationUpperLimit;
        this.questioner.livesLowerLimit = livesLowerLimit;
        this.questioner.livesUpperLimit = livesUpperLimit;
        // 解答用の盤面のクリック時の処理
        this.answerCanvas.onClick = (x, y) => {
            this.environment._field.reverse(new Location(x, y));
        };
    };

}

function main() {
    window.onload = function () {
        let app = new App();
        app.run();
    };
}

main();