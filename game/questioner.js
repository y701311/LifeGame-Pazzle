import { Field } from "./field";

export class Questioner {
    constructor() {
        // 何世代以上で問題の盤面にしなければならないか
        this.generationLowerLimit = 2;
        // 何世代までに問題の盤面にしなければならないか
        this.generationUpperLimit = 20;
        // 問題の盤面
        this.ploblem = {};
        // 問題の解答例
        this.correctField = {};
    }

    // 問題を生成する
    generateProblem() {
        return new Field();
    };

    // 解答の正誤を判定する
    // 解答の盤面を受け取り、正解ならtrueと問題と盤面が一致する世代を、
    // 不正解ならfalseとgenerationLimitまたはgenerationLimit以下の盤面のライフが無くなる世代を返す
    judgeAnswer(answerField) {
        let generation = 1;
        let livesNum = answerField.countLives();
        let judge = false;
        let Gene = this.generationLimit;
        let Count = 0


        while (generation <= this.generationLimit) {
            for (let h = 0; h < answerField.height; h++) {
                for (let w = 0; w < answerField.width; w++) {
                    if (answerField.field[h][w].isAlive == this.ploblem[h][w].isAlive) {
                        Count++;
                    }
                }
            }
            if(Count == answerField.width*answerField.height){
                judge = true;
                Gene = generation;
                break;
            }
            answerField.updateLivesStatus();
            generation++;
        }


        return { isCorrect: judge, generation: Gene };

        
    };
}