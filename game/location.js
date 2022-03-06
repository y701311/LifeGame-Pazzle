// xは0以上横幅未満、yは0以上縦幅未満の値をとる
export class Location {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}