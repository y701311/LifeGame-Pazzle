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
    judgeAnswer() {
        return new Boolean();
    };
}