# Changelog

> **Tags:**
> - :boom:       [Breaking Change]
> - :rocket:     [New Feature]
> - :bug:        [Bug Fix]
> - :memo:       [Documentation]

## v1.0.0 (2021/01/03)
#### :rocket: New Feature
* `Cube555`, `Algorithm555`
  * [#28](https://github.com/sakabar/cuberyl/pull/28) simulate 555 cube

## v0.0.8 (2020/11/28)
#### :rocket: New Feature
* `Move333`, `Move444`
  * [#25](https://github.com/sakabar/cuberyl/pull/25) allow prime-two notation such as R'2

## v0.0.7 (2020/10/10)
#### :bug: Bug Fix
* `Algorithm333`
  * [#22](https://github.com/sakabar/cuberyl/pull/22) detect corner 3-style sticker cycle from the given buffer

## v0.0.6 (2020/08/23)
#### :rocket: New Feature
* `Algorithm333`, `Algorithm444`
  * [#18](https://github.com/sakabar/cuberyl/pull/18) detect 3-style sticker cycle from the given buffer

## v0.0.5 (2020/08/22)

#### :boom: Breaking Change
* `Algorithm333`
  * [#12](https://github.com/sakabar/cuberyl/pull/12) rename `Algorithm` to `Algorithm333` (also filename)
* `Move333`
  * [#12](https://github.com/sakabar/cuberyl/pull/12) rename `Move` to `Move333` (also filename)
* `Notation333`
  * [#12](https://github.com/sakabar/cuberyl/pull/12) rename `Notation` to `Notation333` (also filename)

#### :rocket: New Feature
* `Cube444`, `Algorithm444`
  * [#13](https://github.com/sakabar/cuberyl/pull/13) [#14](https://github.com/sakabar/cuberyl/pull/14) simulate 444 cube

## v0.0.3 (2020/06/20)

#### :boom: Breaking Change
Change I/F

`Algorithm.ts`
```
constructor(order, algorithmStr);
isValidThreeStyleCorner(bufferStr: string, sticker1Str: string, sticker2Str: string);
isValidThreeStyleCornerTyped(buffer: CornerSticker, sticker1: CornerSticker, sticker2: CornerSticker);
isValidThreeStyleEdge(bufferStr: string, sticker1Str: string, sticker2Str: string);
isValidThreeStyleEdgeTyped(buffer: EdgeSticker, sticker1: EdgeSticker, sticker2: EdgeSticker);
```

