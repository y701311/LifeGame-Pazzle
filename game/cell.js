export class Cell {
    constructor() {
        this.isAlive = false;
        // 次の世代での生死
        this._nextStatus = false;
    }

    // ライフの存在、非存在を反転させる
    toggle() { 
        if(this.isAlive == false){
            this.isAlive = true;
        }
        else{
            this.isAlive = false;
        }
    };

    // 周囲のライフの数を元に次の世代での生死を決定
    judgeSurvive(aroundLife) { };
}