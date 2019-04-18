import { SelectionState, EditorState } from "draft-js";

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
