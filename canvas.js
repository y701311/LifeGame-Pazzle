import { Location } from "./game/location.js";
import { ALIVE, NOT_ALIVE, CANVAS_WIDTH, CANVAS_HEIGHT, LINE_COLOR, LINE_WIDTH } from "./appConfig.js";

export class Canvas {
    constructor(id, width, height) {
        this.xLineNum = width + 1;
        this.yLineNum = height + 1;
        // 小数点誤差により、CANVAS_WIDTHがwidthで割り切れないと線の描画がすこしずれる
        this.cellSizeWidth = CANVAS_WIDTH / width;
        this.cellSizeHeight = CANVAS_HEIGHT / height;
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext("2d");
        this.context.canvas.width = CANVAS_WIDTH;
        this.context.canvas.height = CANVAS_HEIGHT;
        this.width = this.context.canvas.width;
        this.height = this.context.canvas.height;
        this.clearAll();

        this.onClick = function (x, y) { };

        this.canvas.onclick = (e) => {
            let point = this.getPoint(e);
            this.onClick(point.x, point.y);
        };
    }

    getPoint(e) {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - Math.floor(rect.left);
        let y = e.clientY - Math.floor(rect.top);
        x = Math.floor(x / this.cellSizeWidth);
        y = Math.floor(y / this.cellSizeHeight);
        return new Location(x, y);
    };

    drawPoint(location, color) {
        this.context.fillStyle = color;
        this.context.fillRect(location.x * this.cellSizeWidth + 1, location.y * this.cellSizeHeight + 1, this.cellSizeWidth - 2, this.cellSizeHeight - 2);
    };

    // 縦の罫線を描く
    drawVirticalLine(x) {
        this.context.strokeStyle = LINE_COLOR;
        this.context.lineWidth = LINE_WIDTH;
        this.context.beginPath();
        this.context.moveTo(x, 0);
        this.context.lineTo(x, this.height);
        this.context.closePath();
        this.context.stroke();
    };

    // 横の罫線を描く
    drawHorizontialLine(y) {
        this.context.strokeStyle = LINE_COLOR;
        this.context.lineWidth = LINE_WIDTH;
        this.context.beginPath();
        this.context.moveTo(0, y);
        this.context.lineTo(this.width, y);
        this.context.closePath();
        this.context.stroke();
    };

    // 全てクリア
    clearAll() {
        this.context.clearRect(0, 0, this.width, this.height);
        for (let x = 0; x < this.xLineNum; x++) {
            this.drawVirticalLine(x * this.cellSizeWidth);
        }
        for (let y = 0; y < this.yLineNum; y++) {
            this.drawHorizontialLine(y * this.cellSizeHeight);
        }
    };

    // 指定された場所のセルの状態を描画
    drawCell(location, cell) {
        if (cell.isAlive) {
            this.drawPoint(location, ALIVE);
        } else {
            this.drawPoint(location, NOT_ALIVE);
        }
    };
}