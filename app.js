import { Canvas } from "./canvas.js";
import { Environment } from "./game/environment.js";
import { Field } from "./game/field.js";
import { Location } from "./game/location.js";
import { Questioner } from "./game/questioner.js";
import { WIDTH, HEIGHT } from "./appConfig.js";

class App {
    constructor() {
        // 問題の盤面
        this.problemCanvas = new Canvas("problemCanvas", WIDTH, HEIGHT);
        // 解答用の盤面
        this.answerCanvas = new Canvas("answerCanvas", WIDTH, HEIGHT);
        // ゲームを進める環境
        this.environment = new Environment(new Field(WIDTH, HEIGHT), this.answerCanvas);
        this.questioner = new Questioner();
        // 世代の更新頻度　何ミリ秒ごとに更新するか
        this.updateInterval = 200;
        this.generationId = document.getElementById("generation");

        // 解答用の盤面のクリック時の処理
        this.answerCanvas.onClick = (x, y) => {
            this.environment._field.reverse(new Location(x, y));
        };
    }

    run() {
        document.getElementById("startButton").addEventListener("click", () => this.start(), false);
        document.getElementById("stopButton").addEventListener("click", () => this.stop(), false);
        document.getElementById("resetButton").addEventListener("click", () => this.reset(), false);
        document.getElementById("problemGenerateButton").addEventListener("click", () => this.generateProblem(), false);
        document.getElementById("answerButton").addEventListener("click", () => this.judgeAnswer(), false);
        document.getElementById("updateInterval").onchange = this.setUpdateInterval();
    };

    start() {
        this.environment.start(this.updateInterval, this.generationId);
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
        for(let y = 0; y < HEIGHT; y++){
            for(let x = 0; x < WIDTH; x++){
                location.x = x;
                location.y = y;
                this.problemCanvas.drawCell(location, problem.field[location.y][location.x]);
            }
        }
    };

    judgeAnswer() {
        let answerInfo = questioner.judgeAnswer(this.environment._field.field);
        clearInterval(this.environment.timer);
        setInterval(() => {
            let livesNum = this.environment._field.countLives();
            if (livesNum == 0 || this.environment.generation > answerInfo.generation) {
                this.stop();
                this.reset();
            } else {
                this.environment._field.updateLivesStatus()
                this.environment.generation++;
                this.generationId.innerHTML = this.environment.generation;
            }
        }, this.updateInterval);
    };

    setUpdateInterval() {
        this.updateInterval = document.getElementById("updateInterval").value;
    };
}

function main() {
    window.onload = function () {
        let app = new App();
        app.run();
    };
}

main();