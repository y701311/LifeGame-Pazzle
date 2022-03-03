import { Field } from "./field";

export class Questioner {
    constructor(){
        // 何世代までに問題の盤面にしなければならないか
        this.generationLimit = 20;
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
    // 解答の盤面を受け取り、正解ならtrueと問題と盤面が一致する世代を、不正解ならfalseとgenerationLimitを返す
    judgeAnswer(answerField) {
        return new Boolean(), 0;
    };
}