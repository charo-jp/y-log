import React, {useState, useEffect, useRef} from "react";
import { Editor, EditorState, RichUtils} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CodeIcon from '@mui/icons-material/Code';

import "draft-js/dist/Draft";
import "./RichText.css"

const RichText = (props) => {
  const editor = useRef(null);
  const {onInput} = props;
  const focusEditor = () => {
    editor.current.focus();
  }
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  
  const [html, setHTML] = useState("");
  const [plainTextLength, setPlainTextLength] = useState(0);
  useEffect(() => {
    const current = editorState.getCurrentContent();
    setHTML(stateToHTML(current));
    setPlainTextLength(editorState.getCurrentContent().getPlainText().length);
  },[plainTextLength, editorState])

  useEffect(() => {
    let value = html;
    let isValid = plainTextLength >= 1;
    if (props.reset) {
      setHTML("");
      setEditorState(() => EditorState.createEmpty())
      value = "";
      props.resetFalseHandler();
    }
    onInput(props.placeholderAndId, value, isValid)
    
  }, [props.placeholderAndId, html, onInput, props.reset])

  const styleMap = {
    "CODE": {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    }
  }

  const h1Text = (e) => {
    e.preventDefault()
    let newState = RichUtils.toggleBlockType(editorState, "header-one");
    setEditorState(newState);
  }

  const h2Text = (e) => {
    e.preventDefault()
    let newState = RichUtils.toggleBlockType(editorState, "header-two");
    setEditorState(newState);
  }
  const h3Text = (e) => {
    e.preventDefault()
    let newState = RichUtils.toggleBlockType(editorState, "header-three");
    setEditorState(newState);
  }
  const h4Text = (e) => {
    e.preventDefault()
    let newState = RichUtils.toggleBlockType(editorState, "header-four");
    setEditorState(newState);
  }

  const boldText = (e) => {
    e.preventDefault()
    let newState = RichUtils.toggleInlineStyle(editorState, "BOLD");
    setEditorState(newState);
  }

  const italicText = (e) => {
    e.preventDefault()
    let newState = RichUtils.toggleInlineStyle(editorState, "ITALIC");
    setEditorState(newState);
  }

  const underlineText = (e) => {
    e.preventDefault()
    let newState = RichUtils.toggleInlineStyle(editorState, "UNDERLINE");
    setEditorState(newState);
  }


  const codeText = (e) => {
    e.preventDefault()
    let newState = RichUtils.toggleInlineStyle(editorState, "CODE");
    setEditorState(newState);
  }

  const unorderedListText = (e) => {
    e.preventDefault();
    let newState = RichUtils.toggleBlockType(editorState, "unordered-list-item");
    setEditorState(newState);
  }

  const orderedListText = (e) => {
    e.preventDefault();
    let newState = RichUtils.toggleBlockType(editorState, "ordered-list-item");
    setEditorState(newState);
  }
  

  return (
    <div 
      className = "rich-editor-container"
      onClick = {() => focusEditor()}
    >
      <div className = "draft-js-buttons" >
        <button type = "button" className = "button-for-draft header-draft" onMouseDown={h1Text}>H1</button>
        <button type = "button" className = "button-for-draft header-draft" onMouseDown={h2Text}>H2</button>
        <button type = "button" className = "button-for-draft header-draft" onMouseDown={h3Text}>H3</button>
        <button type = "button" className = "button-for-draft header-draft" onMouseDown={h4Text}>H4</button>
        <button type = "button" className = "button-for-draft" onMouseDown={boldText}><FormatBoldIcon /></button>
        <button type = "button" className = "button-for-draft" onMouseDown={italicText}><FormatItalicIcon /></button>
        <button type = "button" className = "button-for-draft" onMouseDown={underlineText}><FormatUnderlinedIcon /></button>
        <button type = "button" className = "button-for-draft" onMouseDown={codeText}><CodeIcon /></button>
        <button type = "button" className = "button-for-draft" onMouseDown={unorderedListText}><FormatListBulletedIcon /></button>
        <button type = "button" className = "button-for-draft" onMouseDown={orderedListText}><FormatListNumberedIcon /></button>
      </div>
      <Editor
      onChange={setEditorState}
      editorState={editorState}
      customStyleMap = {styleMap}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      ref = {editor}
      />
    </div>
  )
}

export default RichText;