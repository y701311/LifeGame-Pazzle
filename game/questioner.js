import { Field, copyField } from "./field.js";
import { Location } from "./location.js"
import { WIDTH, HEIGHT } from "../appConfig.js"

export class Questioner {
    constructor() {
        // 何世代以上で問題の盤面にしなければならないか
        this.generationLowerLimit = 2;
        // 何世代までに問題の盤面にしなければならないか
        this.generationUpperLimit = 20;
        // どのくらいのライフがあれば問題として成立するか
        let livesLowerLimit = 10;
        // 問題の盤面
        this.problem = {};
        // 問題の解答例
        this.correctField = {};
    }

    // 問題を生成する
    generateProblem() {
        let problemField = new Field(WIDTH, HEIGHT);
        let processField = [];

        while (true) {
            for (let generation = 0; generation <= processField.length - this.generationLowerLimit; generation++) {
                problemField = new Field;
                if (processField[generation + this.generationLowerLimit - 1].countLives() >= LivesLowerLimit) {
                    return processField[generation + this.generationLowerLimit - 1];
                } else if (generation == processField.length - this.generationLowerLimit) {
                    generation = 0;
                    problemField = this._getInitializeField();
                    processField = this._processProblem(problemField);
                }
            }
            let prob = this._selectProblem(problemField);
            if (prob.selected) {
                this.problem = prob.problem;
                this.correctField = problemField;
                break;
            }
        }

        return this.problem;
    };

    // 出題する問題盤面を選ぶ
    // 選べたらtrue、選べなかったらfalseを返す
    _selectProblem(processField) {
        return { selected: true, problem: processField[this.generationLowerLimit - 1] };
    };

    _getInitializeField() {
        let problemField = new Field();
        // ライフが置かれる確率の分子、分母
        let numeratorOfLifeExistProbability = 2, denominatorOfLifeExistProbability = 10;
        for (let h = 0; h < HEIGHT; h++) {
            for (let w = 0; w < WIDTH; w++) {
                let location = new Location(w, h);
                let num = Math.floor(Math.random() * denominatorOfLifeExistProbability);
                if (numeratorOfLifeExistProbability >= num) {
                    problemField.setLife(location);
                }
            }
        }
        return problemField;
    };

    _processProblem(problemField) {
        // 問題盤面候補を置いておくところ
        let processField = [];
        for (let generation = 1; generation <= this.generationUpperLimit; generation++) {
            processField.push(JSON.parse(JSON.strintgify(problemField)));
            if (problemField.countLives() == 0) {
                if (generation <= this.generationLowerLimit) {
                    problemField = getInitializeField();
                    generation = 1;
                } else {
                    break;
                }
            }
            problemField.updateLivesStatus();
        }
        return processField;
    };

    // 解答の正誤を判定する
    // 解答の盤面を受け取り、正解ならtrueと問題と盤面が一致する世代を、
    // 不正解ならfalseとgenerationLimitまたはgenerationLimit以下の盤面のライフが無くなる世代を返す
    judgeAnswer(answerField) {
        let answer = copyField(answerField);
        answer.onChange = function (location, cell) { };
        let generation = 1;
        let judge = false;
        let gene = this.generationUpperLimit;
        let count = 0;


        while (generation <= this.generationUpperLimit) {
            count = 0;

            for (let h = 0; h < answer.height; h++) {
                for (let w = 0; w < answer.width; w++) {
                    if (answer.field[h][w].isAlive == this.problem.field[h][w].isAlive) {
                        count++;
                    }

                }
            }

            if ((count == answer.width * answer.height) && (generation >= this.generationLowerLimit)) {

                judge = true;
                gene = generation;
                break;
            }

            if (answer.countLives() == 0) {
                gene = generation;
                break;
            }

            answer.updateLivesStatus();
            generation++;


        }


        return { isCorrect: judge, generation: gene };


    };
}