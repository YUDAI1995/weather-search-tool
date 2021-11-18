import React, { useRef, useState } from "react";
import { Area } from "./model/area.model";

interface DragList extends Area {
  events: {
    ref: (element: HTMLElement | null) => void;
    onMouseDown: (event: React.MouseEvent<HTMLElement>) => void;
  };
}

// 座標の型
interface Position {
  x: number;
  y: number;
}

// ドラッグ＆ドロップ要素の情報をまとめた型
interface DragData {
  id: string; // 要素と紐づいた一意な文字列
  areaName: string;
  areaRoman: string;
  position: Position; // 要素の座標
  element: HTMLElement; // DOM情報
}

// useRef()で保持するデータの型
interface DragRef {
  keys: Map<string, string>; // 要素に紐づいたkey文字列を管理するMap
  DragItems: DragData[]; // 並び替える全ての要素を保持するための配列
  canCheckHovered: boolean; // 重なり判定ができるかのフラグ
  pointerPosition: Position; // マウスポインターの座標
  dragElement: DragData | null; // ドラッグしてる要素
}

export const useDragList = (areaList: Area[]): DragList[] => {
  const [lists, setLists] = useState(areaList);

  const dragRef = useRef<DragRef>({
    keys: new Map(),
    DragItems: [],
    canCheckHovered: true,
    pointerPosition: {
      x: 0,
      y: 0,
    },
    dragElement: null,
  }).current;

  // ドラッグ中の処理
  const onMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    const { dragElement, pointerPosition } = dragRef;

    // ドラッグして無ければ何もしない
    if (!dragElement) return;

    // マウスポインターの移動量を計算
    const x = clientX - pointerPosition[0];
    const y = clientY - pointerPosition[1];

    const dragStyle = dragElement.element.style;

    // ドラッグ要素の座標とスタイルを更新
    dragStyle.zIndex = "100";
    dragStyle.cursor = "grabbing";
    dragStyle.transform = `translate(${x}px,${y}px)`;
  };

  // ドラッグが終了した時の処理
  const onMouseUp = (event: MouseEvent) => {
    const { dragElement } = dragRef;

    // ドラッグしていなかったら何もしない
    if (!dragElement) return;

    const dragStyle = dragElement.element.style;

    // ドラッグしてる要素に適用していたCSSを削除
    dragStyle.zIndex = "";
    dragStyle.cursor = "";
    dragStyle.transform = "";

    // ドラッグしている要素をstateから削除
    dragRef.dragElement = null;

    // windowに登録していたイベントを削除
    window.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("mousemove", onMouseMove);
  };

  return lists.map((item) => {
    dragRef.keys.set(item.areaRoman, item.id);

    return {
      id: item.id,
      areaName: item.areaName,
      areaRoman: item.areaRoman,
      color: item.color,
      num: item.num,
      events: {
        ref: () => void 0,
        id: item.id,

        onMouseDown: (event: React.MouseEvent<HTMLElement>) => {
          // ドラッグする要素(DOM)
          const element = event.currentTarget;

          // マウスポインターの座標を保持しておく
          dragRef.pointerPosition.x = event.clientX;
          dragRef.pointerPosition.y = event.clientY;

          // ドラッグしている要素のスタイルを上書き
          element.style.transition = ""; // アニメーションを無効にする
          element.style.cursor = "grabbing"; // カーソルのデザインを変更

          // 要素の座標を取得
          const { left: x, top: y } = element.getBoundingClientRect();
          const position: Position = { x: x, y: y };

          // ドラッグする要素を保持しておく
          dragRef.dragElement = {
            id: item.id,
            areaName: item.areaName,
            areaRoman: item.areaRoman,
            element,
            position,
          };

          // mousemove, mouseupイベントをwindowに登録する
          window.addEventListener("mouseup", onMouseUp);
          window.addEventListener("mousemove", onMouseMove);
        },
      },
    };
  });
};
