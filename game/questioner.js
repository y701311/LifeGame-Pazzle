import { Field } from "./field";

export class Questioner {
    // 問題を生成する
    generateProblem() {
        return new Field();
    };

    // 解答の正誤を判定する
    judgeAnswer() {
        return new Boolean();
    };
}