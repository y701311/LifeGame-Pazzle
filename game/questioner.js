import { Field, copyField } from "./field.js";
import { Location } from "./location.js"

export class Questioner {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        // 何世代以上で問題の盤面にしなければならないか
        this.generationLowerLimit = 2;
        // 何世代までに問題の盤面にしなければならないか
        this.generationUpperLimit = 20;
        // 問題の盤面に必要なライフ数の下限
        this.livesLowerLimit = 10;
        // 問題の盤面に必要なライフ数の上限
        this.livesUpperLimit = 20;
        // 問題の盤面
        this.problem = {};
        // 問題の解答例
        this.correctField = {};

        this.tutorialProblemId = 0;
    }

    // 問題を生成する
    generateProblem(difficulty) {
        if (difficulty == "tutorial") {
            return this._generateTutorialProblem();
        } else if (difficulty == "present") {
            return this._generatePresentProblem();
        } else {
            let problemField = new Field(this.width, this.height);
            let processField = [];

            while (true) {
                problemField = this._getInitializeField();
                processField = this._processProblem(problemField);
                let prob = this._selectProblem(processField);
                if (prob.selected) {
                    this.problem = prob.problem;
                    this.correctField = problemField;
                    break;
                }
            }
        }

        return this.problem;
    };

    // 出題する問題盤面を選ぶ
    // 選べたらtrue、選べなかったらfalseを返す
    _selectProblem(processField) {
        let selected = false;
        let problem;
        let legalField = [];

        if (processField.length < this.generationLowerLimit) {
            selected = false;
        } else {
            for (let index = this.generationLowerLimit - 1; index < processField.length; index++) {
                let livesNum = processField[index].countLives();
                if (this.livesLowerLimit <= livesNum && livesNum <= this.livesUpperLimit) {
                    legalField.push(copyField(processField[index]));
                }
            }
            if (legalField.length > 0) {
                selected = true;
                problem = legalField[Math.floor(legalField.length * Math.random())];
            } else {
                selected = false;
            }
        }

        return { selected: selected, problem: problem };
    };

    _getInitializeField() {
        let problemField = new Field(this.width, this.height);
        // ライフが置かれる確率の分子、分母
        let numeratorOfLifeExistProbability = 2, denominatorOfLifeExistProbability = 10;
        for (let h = 0; h < this.height; h++) {
            for (let w = 0; w < this.width; w++) {
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
        let problem = copyField(problemField);
        // 問題盤面候補を置いておくところ
        let processField = [];
        for (let generation = 1; generation <= this.generationUpperLimit; generation++) {
            processField.push(copyField(problem));
            if (problem.countLives() == 0) {
                if (generation <= this.generationLowerLimit) {
                    problem = this._getInitializeField();
                    generation = 1;
                } else {
                    break;
                }
            }
            problem.updateLivesStatus();
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

    // tutorial用の問題を生成する
    _generateTutorialProblem() {
        this.problem = new Field(this.width, this.height);
        this.correctField = new Field(this.width, this.height);
        // 問題の数
        let problemNum = 4;

        if (this.tutorialProblemId == 0) {
            this.problem.setLife(new Location(1, 1));
            this.problem.setLife(new Location(1, 2));
            this.correctField.setLife(new Location(0, 1));
            this.correctField.setLife(new Location(2, 1));
            this.correctField.setLife(new Location(1, 2));
        } else if (this.tutorialProblemId == 1) {
            this.problem.setLife(new Location(1, 1));
            this.problem.setLife(new Location(2, 1));
            this.problem.setLife(new Location(1, 2));
            this.problem.setLife(new Location(2, 2));
            this.correctField.setLife(new Location(2, 1));
            this.correctField.setLife(new Location(1, 2));
            this.correctField.setLife(new Location(2, 2));
        } else if (this.tutorialProblemId == 2) {
            this.problem.setLife(new Location(0, 0));
            this.problem.setLife(new Location(2, 0));
            this.problem.setLife(new Location(0, 2));
            this.problem.setLife(new Location(2, 2));
            this.correctField.setLife(new Location(0, 0));
            this.correctField.setLife(new Location(1, 0));
            this.correctField.setLife(new Location(2, 0));
            this.correctField.setLife(new Location(0, 1));
            this.correctField.setLife(new Location(1, 1));
            this.correctField.setLife(new Location(2, 1));
            this.correctField.setLife(new Location(0, 2));
            this.correctField.setLife(new Location(1, 2));
            this.correctField.setLife(new Location(2, 2));
        } else if (this.tutorialProblemId == 3) {
            this.problem.setLife(new Location(0, 0));
            this.problem.setLife(new Location(1, 0));
            this.problem.setLife(new Location(2, 0));
            this.problem.setLife(new Location(0, 1));
            this.problem.setLife(new Location(2, 1));
            this.problem.setLife(new Location(0, 2));
            this.problem.setLife(new Location(1, 2));
            this.problem.setLife(new Location(2, 2));
            this.correctField.setLife(new Location(1, 0));
            this.correctField.setLife(new Location(0, 1));
            this.correctField.setLife(new Location(1, 1));
            this.correctField.setLife(new Location(2, 1));
            this.correctField.setLife(new Location(1, 2));
        }

        this.tutorialProblemId++;
        if (this.tutorialProblemId >= problemNum) {
            this.tutorialProblemId = 0;
        }

        return this.problem;
    };

    _generatePresentProblem() {
        this.problem = new Field(this.width, this.height);
        this.correctField = new Field(this.width, this.height);

        this.problem.setLife(new Location(1, 1));
        this.problem.setLife(new Location(3, 1));
        this.problem.setLife(new Location(1, 3));
        this.problem.setLife(new Location(4, 3));
        this.problem.setLife(new Location(2, 4));
        this.problem.setLife(new Location(3, 4));
        this.problem.setLife(new Location(4, 4));

        return this.problem;
    };
}