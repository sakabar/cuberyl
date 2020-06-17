const _ = require('lodash');
import {PartLabel} from './PartLabel';


export class Part {
    // index: 同様のパートがあった時に、外側から見て何番目か
    // 0-origin
    // 例: 6x6x6キューブは(X_CENTER, 0)と(X_CENTER_1)の2つのXセンターがある
    constructor(private partLabel: PartLabel, private index: number) {
    }

    public getPartLabel(): PartLabel {
        return _.cloneDeep(this.partLabel);
    }

    public getIndex(): number {
        return this.index;
    }

}
