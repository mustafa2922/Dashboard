import { useState, useRef } from 'react';
import { Editor as ReactDraftWysiwyg } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Editor.css';

export default function Editor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const editorRef = useRef(null);
  return (
    <article className="editor">
      <ReactDraftWysiwyg
        ref={editorRef}
        editorState={editorState}
        onEditorStateChange={(s) => setEditorState(s)}
        placeholder="Write something!"
        toolbarClassName='toolbar-wrapper'
      />
    </article>
  )
}