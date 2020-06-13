import {PartLabel} from './PartLabel';

export class Part {
    // index: 同様のパートがあった時に、外側から見て何番目か
    // 0-origin
    // 例: 6x6x6キューブは(X_CENTER, 0)と(X_CENTER_1)の2つのXセンターがある
    constructor(private part_label: PartLabel, private index: number) {
    }
}
