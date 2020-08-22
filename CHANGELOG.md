# Changelog

> **Tags:**
> - :boom:       [Breaking Change]
> - :rocket:     [New Feature]
> - :bug:        [Bug Fix]
> - :memo:       [Documentation]

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

