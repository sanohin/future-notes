import React from "react";
import { forward, step, blocks, createNode, createStoreObject } from "effector";
import { SelectionState, EditorState, convertToRaw } from "draft-js";
import { createEditorState } from "medium-draft";
import mediumDraftImporter from "medium-draft/lib/importer";
import mediumDraftExporter from "medium-draft/lib/exporter";

export function moveSelectionToEnd(editorState) {
  const content = editorState.getCurrentContent();
  const blockMap = content.getBlockMap();

  const key = blockMap.last().getKey();
  const length = blockMap.last().getLength();

  const selection = new SelectionState({
    anchorKey: key,
    anchorOffset: length,
    focusKey: key,
    focusOffset: length
  });
  return EditorState.forceSelection(editorState, selection);
}

export function getHtml(editorState) {
  return mediumDraftExporter(editorState.getCurrentContent());
}

export const createInitialState = (content = "") => {
  return createEditorState(convertToRaw(mediumDraftImporter(content)));
};

export const getPreviewText = (content = "") => {
  const st = createInitialState(content);
  const str = st.getCurrentContent().getPlainText();
  return str;
};

export const addDevtools = stores => {
  if (!("__REDUX_DEVTOOLS_EXTENSION__" in window)) {
    return;
  }
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect({});

  const initalValue = Object.entries(stores).reduce((acc, [key, val]) => {
    acc[key] = val.getState();
    return acc;
  }, {});
  devTools.init(initalValue);
  createStoreObject(stores).watch(n => devTools.send("change state", n));
};

const runSideEffect = step.run({
  fn(args, { run }) {
    run.current(args);
  }
});

const mapStep = step.run({
  fn(args, { map }) {
    return map.current(args);
  }
});

export function useMap(store, mapState) {
  const [state, update] = React.useState(() => mapState(store.getState()));
  const stateRef = React.useRef(state);
  stateRef.current = state;
  const updateRef = React.useRef(update);
  updateRef.current = update;
  const mapRef = React.useRef(mapState);
  mapRef.current = mapState;

  React.useEffect(() => {
    const mapTo = createNode({
      scope: { state: stateRef, run: updateRef, map: mapRef },
      node: [mapStep, blocks.filterChanged, runSideEffect]
    });

    return forward({
      from: store,
      to: mapTo
    });
  }, [store]);
  return state;
}
